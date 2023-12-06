/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-24 16:58:03
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-23 17:45:32
 * @FilePath: \\src\\index.ts
 * @Description: 脚本入口
 */
import { sendIncomeMessageToWxPuher, toShowString } from "./common/report";
import { clearBackground, convertSecondsToMinutes } from "./common/utils";
import { BASE_ASSIMT_TIME, MAX_ASSIMT_TIME, STORAGE, STORAGE_APP, STORAGE_DATE, filteredList, speedFree } from "./global";
import { ConfigInvalidException } from "./lib/exception";
import { init } from "./lib/init";
import { Record as LogRecord } from "./lib/logger";
import { BaseKey } from "./scripts/abstract/Base";

init()

// test()
main()
function test() {
    // for(let app of filteredList){
    //     log(`${app.appName}: ${app.fetch(BaseKey.Weight)}----${app.fetch(BaseKey.Money)}`)
    // }
    speedFree.watchAdsForCoin("日常福利")
}

function main() {
    while (true) {
        //实际运行列表
        let runList = filteredList
        if(runList.length == 0){
            throw new ConfigInvalidException("拿我这测试了?");
        }
        //脚本运行当前时间
        const startTime = new Date();
        const date = startTime.getMonth().toString()+"/"+startTime.getDate().toString()
        //断开重连
        if(date === STORAGE.get(STORAGE_DATE)){
            runList = runList.filter(
                app => app.fetch(BaseKey.Executed, false) === false
            )
        } else {
            for(let app of runList){
                app.store(BaseKey.Executed, false)
            }
        }
        STORAGE.put(STORAGE_DATE, date)

        const endTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 23, 59, 59);
        const timeDifference = endTime.getTime() - startTime.getTime();
        //化毫秒为秒
        let timePerMethod = timeDifference / 1000
        // let timePerMethod = 24 * 60 * 60
        //初始化map
        const map:Record<string, number> = {}
        //将数组按照权重等级排序
        const sortedList = runList.slice().sort((a,b) => b.fetch(BaseKey.Money, 0) * 100 - a.fetch(BaseKey.Money, 0) * 100)
        for (let app of sortedList) {
            map[app.constructor.name] = 0
            LogRecord.debug(`${app.appName}`)
        }
        //时间分配算法
        appTimeAllocation(map, timePerMethod, sortedList)
        for(let app of runList){
            LogRecord.log(`${app.appName}: ${convertSecondsToMinutes(map[app.constructor.name])}分钟`)
        }
        
        //前一个app剩余时间
        let surplus:any = 0;
        //主流程
        LogRecord.info("进入主流程")
        for (let app of runList) {
            // log(`${app.appName}:${convertSecondsToMinutes(map[app.constructor.name])}`)
            clearBackground()
            let executeTime = surplus + map[app.constructor.name]
            //权重置零 避免前天的遗留权重，导致即使昨天运行失败但是权重依然存在
            app.store(BaseKey.Weight, 0)
            app.store(BaseKey.Money, 0)
            map[app.constructor.name] = 0
            //执行流程
            STORAGE.put(STORAGE_APP, app.constructor.name)
            surplus = app.start(executeTime)
            //代表app已执行
            app.store(BaseKey.Executed, true)
            LogRecord.debug(`surplus: ${surplus}`)
            //surplus分配算法
            let remainingAllocation = 30 * 60
            for (let tmp of sortedList) {
                if(surplus <= 0) {
                    break
                }
                const allocation = Math.min(surplus, remainingAllocation)
                if(map[tmp.constructor.name] != 0){
                    map[tmp.constructor.name] += allocation
                    surplus -= allocation
                }
            }
        }
        //返回桌面
        clearBackground()
        LogRecord.info("发送今日收益")
        sendIncomeMessageToWxPuher(toShowString(filteredList))
        const doneTime = new Date();
        if(endTime.getTime() > doneTime.getTime()) {
            const waitTime = (endTime.getTime() - doneTime.getTime())
            LogRecord.log(`等待${convertSecondsToMinutes(waitTime/1000 + 1)}分钟开启新一天任务`)
            sleep(waitTime + 60 * 1000)
        }
    }
}

/**
 * @param map app时间分配字典
 * @param timePerMethod 刷app总时间
 * @param sortedList 按照权重排序后的数组
 */
function appTimeAllocation(map: Record<string, number>, timePerMethod: number, sortedList: any[]){
    LogRecord.info("分配执行时间")
    //基础时间分配
    for (let app of sortedList) {
        timePerMethod -= app.highEffEstimatedTime
        if(timePerMethod > 0) {
            map[app.constructor.name] = app.highEffEstimatedTime
        } else {
            break
        }
    }

    //进阶任务时间分配
    for (let app of sortedList) {
        if (app.medEffEstimatedTime != MAX_ASSIMT_TIME) {
            timePerMethod -= app.medEffEstimatedTime
            if(timePerMethod > 0) {
                map[app.constructor.name] += app.medEffEstimatedTime
            } else {
                //未执行需要对原时间进行恢复
                timePerMethod += app.medEffEstimatedTime
            }
        }
    }

    //耗时任务时间分配
    let count = 1
    if(sortedList.length > 0){
        while(timePerMethod >= BASE_ASSIMT_TIME){
            let time = count * BASE_ASSIMT_TIME
            for (let app of sortedList) {
                if (app.lowEffEstimatedTime != MAX_ASSIMT_TIME) {
                    const allocaTime = Math.min(time * app.lowEffAssmitCount, timePerMethod)
                    let key = app.constructor.name
                    map[key] += allocaTime
                    timePerMethod -= allocaTime
                }
            }
            if(count < 4) {
                count++
            }
        }
    }
}



