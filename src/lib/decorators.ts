import { sendErrorMessage } from "../common/report";
import { clearBackground, convertSecondsToMinutes, waitRandomTime } from "../common/utils";
import { MAX_RETRY_COUNTS, STORAGE, STORAGE_APP} from "../global";
import { BaseKey } from "../scripts/abstract/Base";
import { ExceedMaxNumberOfAttempts, isCurrentAppBanned } from "./exception";
import { LOG_STACK, Record } from "./logger";

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
        const instance = this as any
        let startTime = new Date()
        try {
          if(isEnabled){
            if(key === "signIn"){
              instance.lastSignInTime = new Date()
              instance.canSign = true
            } else if(instance.canSign){
              const now = new Date()
              if(now.getDay() !== instance.lastSignInTime.getDay()){
                instance.signIn()
              } else if(instance.terminalAfterSign
                && now.getDay() !== instance.startTime.getDay()){
                return descriptor
              }
            }
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
                instance.beforeDoTask()
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
      return descriptor
    }
}

/**
 * @description 方法执行时间检测
 * @param _ 
 * @param __ 
 * @param descriptor 
 * @returns 
 */
export function measureExecutionTime(_: any, __: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function (...args: any[]) {
      const startTime = new Date();
      originalMethod.apply(this, args);
      const endTime = new Date();
      const executionTime = (endTime.getTime() - startTime.getTime())/1000;
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
      const instance = this as any
      try{
        originalMethod.apply(this, args)
      }catch(error:any) {
        if(isCurrentAppBanned(error)){
          Record.error(`账号异常`)
          instance.highEffIncomePerMinute = 0.0005
          const funcList = ["medEff", "lowEff1","lowEff2","lowEff3"]
          for(const funcName of funcList){
            if(instance[`${funcName}Inheritance`]){
              instance[`${funcName}IncomePerMinute`] = 0.0005
            }
          }
        } else {
          Record.error(`当前app发生异常: ${error.message}`)
          sendErrorMessage(error.message)
          instance.executable = false
        }
      }
      const endTime = new Date();
      const executionTime = (endTime.getTime() - startTime.getTime())/1000
      Record.info("即将执行下一个app")
      Record.debug(`当前app执行${convertSecondsToMinutes(executionTime)}分钟`)
      LOG_STACK.clear()
      //返回剩余时间
      return executionTime
    }

    return descriptor; 
}