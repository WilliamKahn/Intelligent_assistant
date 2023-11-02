import { MAX_RETRY_COUNTS, REDUNDANCY_TIME } from "../global";
import { BaseKey } from "../scripts/abstract/Base";
import { ExceedMaxNumberOfAttempts, isCurrentAppBanned } from "./exception";
import { LOG_STACK, Record } from "./logger";
import { clearBackground, convertSecondsToMinutes, sendErrorMessage, waitRandomTime } from "./utils";

/**
 * @description 方法日志
 * @param message 
 * @returns 
 */
export function functionLog(message: string) {
    return function (_: any, key: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
      
      descriptor.value = function (...args: any[]) {
        const instance = this as any;
        waitRandomTime(4)
        Record.info(`执行下一步任务：${message}`)
        let startTime = new Date();
        try {
          originalMethod.apply(this, args);
        } catch (error) {
          let retries = 1;
          while (retries < MAX_RETRY_COUNTS) {
            if(key === "readBook" || key === "swipeVideo") {
              const terminationTime = new Date();
              args[0] = args[0] - (terminationTime.getTime() - startTime.getTime())/1000
              if(args[0] <= 0) {
                break
              }
            }
            Record.warn(`尝试第${retries}次重启`)
            try {
              startTime = new Date()
              clearBackground()
              if(instance.lauchApp()){
                instance.clear()
                originalMethod.apply(this, args)
              }
              break
            } catch (error) {
              retries++
            }
          }
          if(retries >= MAX_RETRY_COUNTS) {
            Record.error(`${error}`)
            throw new ExceedMaxNumberOfAttempts(key)
          }
        }
        
        Record.info(`${message}任务结束`)
      };
      return descriptor;
    };
}

/**
 * @description 方法执行时间检测
 * @param _ 
 * @param __ 
 * @param descriptor 
 * @returns 
 */
export function measureExecutionTime(_: any, key: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      const startTime = new Date();
      originalMethod.apply(this, args);
      const endTime = new Date();
      const executionTime = (endTime.getTime() - startTime.getTime())/1000;
      Record.debug(`${key}执行了${convertSecondsToMinutes(executionTime)}分钟`)
      const instance = this as any;
      const time = (executionTime / (REDUNDANCY_TIME) + 1)  * REDUNDANCY_TIME
      if(key === "highEff"){
        Record.debug(`highEff时间调整为${convertSecondsToMinutes(time)}分钟`)
        instance.highEffEstimatedTime = time
        instance.store(BaseKey.highEffEstimatedTime, time)
      } else if(key === "medEff") {
        Record.debug(`medEff时间调整为${convertSecondsToMinutes(time)}分钟`)
        instance.medEffEstimatedTime = time
        instance.store(BaseKey.medEffEstimatedTime, time)
      }
      return executionTime;
    }
    return descriptor;
}

/**
 * @description start方法注解
 * @param _ 
 * @param __ 
 * @param descriptor 
 * @returns 
 */
export function startDecorator(_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      const startTime = new Date();
      try{
        originalMethod.apply(this, args)
      }catch(e) {
        Record.error(`当前app发生异常: ${e}`)
        sendErrorMessage()
      }
      const endTime = new Date();
      const executionTime = (endTime.getTime() - startTime.getTime())/1000;
      Record.info("即将执行下一个app")
      Record.debug(`剩余${convertSecondsToMinutes(args[0] - executionTime)}分钟`)
      LOG_STACK.clear()
      //返回剩余时间
      return args[0] - executionTime
    }

    return descriptor; 
}