import { sendErrorMessage } from "../common/report";
import { clearBackground, convertSecondsToMinutes, waitRandomTime } from "../common/utils";
import { APP_ENV, INCOME_RECOVER, MAX_RETRY_COUNTS } from "../global";
import { ExceedMaxNumberOfAttempts, isCurrentAppBanned } from "./exception";
import { LOG_STACK, Record } from "./logger";

/**
 * @description 方法日志
 * @param message 
 * @returns 
 */
export function functionLog(message: string) {
    return function (_: any, key: string, descriptor: PropertyDescriptor) {
      const originalMethod = descriptor.value;
      
      descriptor.value = function (...args: any[]) {
        const instance = this as any
        let startTime = new Date()
        try {
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
            Record.info(`执行下一步任务：${message}`)
            return originalMethod.apply(this, args)
        } catch (error:any) {
          if(isCurrentAppBanned(error)){
            throw error
          } else {
            if(APP_ENV === "development"){
              Record.error(error)
            }
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
                Record.info(`执行下一步任务：${message}`)
                instance.reset()
                instance.beforeDoTask()
                return originalMethod.apply(this, args)
              }
              break
            } catch (error:any) {
              if(isCurrentAppBanned(error)){
                throw error
              } else {
                Record.debug(`${error.message}`)
                sendErrorMessage(error.message)
                retries++
              }
            }
          }
          if(retries >= MAX_RETRY_COUNTS) {
            throw new ExceedMaxNumberOfAttempts("超过最大尝试次数")
          }
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
          instance.highEffIncomePerMinute = INCOME_RECOVER
          const funcList = ["medEff", "lowEff1","lowEff2","lowEff3"]
          for(const funcName of funcList){
            if(instance[`${funcName}Inheritance`]){
              instance[`${funcName}IncomePerMinute`] = INCOME_RECOVER
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

    return descriptor
}