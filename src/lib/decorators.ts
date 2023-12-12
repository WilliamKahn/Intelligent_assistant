import { sendErrorMessage } from "../common/report";
import { clearBackground, convertSecondsToMinutes, waitRandomTime } from "../common/utils";
import { MAX_RETRY_COUNTS} from "../global";
import { BaseKey } from "../scripts/abstract/Base";
import { ExceedMaxNumberOfAttempts, isCurrentAppBanned } from "./exception";
import { Record } from "./logger";

/**
 * @description 方法日志
 * @param message 
 * @returns 
 */
export function functionLog(message: string) {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
      let isEnabled = true
      
      descriptor.value = function (...args: any[]) {
        let startTime = new Date();
        try {
          if(isEnabled){
            waitRandomTime(4)
            Record.info(`执行下一步任务：${message}`)
            const result = originalMethod.apply(this, args)
            if(result === false){
              isEnabled = false
            }
            return result
          }
        } catch (error:any) {
          if(isCurrentAppBanned(error)){
            throw error
          } else {
            Record.debug(`${error.message}`)
          }
          const instance = this as any;
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
                waitRandomTime(4)
                Record.info(`执行下一步任务：${message}`)
                instance.reset()
                const result = originalMethod.apply(this, args)
                if(result === false){
                  isEnabled = false
                }
                return result
              }
              break
            } catch (error:any) {
              Record.debug(`${error.message}`)
              sendErrorMessage(error.message)
              retries++
            }
          }
          if(retries >= MAX_RETRY_COUNTS) {
            throw new ExceedMaxNumberOfAttempts("超过最大尝试次数")
          }
        }
      }
      if(key === "watchAds") {
        target[`enable${key}`] = function () {
          isEnabled = true
        }
      }
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
      if(key === "highEff"){
        Record.debug(`highEff时间调整为${convertSecondsToMinutes(executionTime)}分钟`)
        instance.highEffEstimatedTime = executionTime
        instance.store(BaseKey.HighEffEstimatedTime, executionTime)
      } else if(key === "medEff") {
        Record.debug(`medEff时间调整为${convertSecondsToMinutes(executionTime)}分钟`)
        instance.medEffEstimatedTime = executionTime
        instance.store(BaseKey.MedEffEstimatedTime, executionTime)
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
      }catch(error:any) {
        if(isCurrentAppBanned(error)){
          Record.error(`账号异常`)
        } else {
          Record.error(`当前app发生异常: ${error.message}`)
          sendErrorMessage(error.message)
        }
      }
      const endTime = new Date();
      const executionTime = (endTime.getTime() - startTime.getTime())/1000;
      Record.info("即将执行下一个app")
      Record.debug(`剩余${convertSecondsToMinutes(args[0] - executionTime)}分钟`)
      //返回剩余时间
      return args[0] - executionTime
    }

    return descriptor; 
}