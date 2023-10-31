/*
 * @Author: BATU1579
 * @CreateDate: 2022-05-24 16:58:03
 * @LastEditor: BATU1579
 * @LastTime: 2022-09-23 17:45:32
 * @FilePath: \\src\\index.ts
 * @Description: 脚本入口
 */
import { BASE_ASSIMT_TIME, MAX_ASSIMT_TIME, RANGE_FOUR_FIFTHS_SCREEN, RANGE_MIDDLE_SCREEN, STORAGE, deJian, eggplantFree, filteredList, kuaiShouFree, list, marvelFree, pandaBrain, redFruits, sevenCatsFree, shuQi, speedFree, starrySky, tomato, tomatoFree, tomatoLite, youShi } from "./global";
import { clearBackground, convertSecondsToMinutes, doFuncUntilPopupsGone, findAndClick, normalClick, resizeX, resizeY, scrollTo, sendErrorMessage, sendIncomeMessageToWxPuher, toShowString } from "./lib/utils";
import { init } from "./lib/init";
import { Record as LogRecord } from "./lib/logger";
import { ConfigInvalidException } from "./lib/exception";
import { BaseKey } from "./scripts/abstract/Base";

init()

test()
// main()

function test() {
    // for(let app of list){
    //     log(`${app.appName}: ${app.fetch(BaseKey.Weight)}`)
    // }
    STORAGE.put("app","DeJian")
    //doFuncUntilPopupsGone(['从第一天签到'], undefined, {errorMsg: "账号异常"})
    //账号异常如何判断
    //watch
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
        if(date === STORAGE.get("date")){
            let search = false
            for(let app of list){
                //肯定查找到
                if(search || app.constructor.name === STORAGE.get("app")){
                    let num = runList.indexOf(app)
                    if(num == -1){
                        search = true
                    } else {
                        LogRecord.info("继续执行剩余app")
                        runList = runList.slice(num)
                        break
                    }
                }
            }
        }
        STORAGE.put("date", date)

        const endTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 23, 59, 59);
        const timeDifference = endTime.getTime() - startTime.getTime();
        //化毫秒为秒
        let timePerMethod = timeDifference / 1000
        // let timePerMethod = 24 * 60 * 60
        //初始化map
        const map:Record<string, number> = {}
        //将数组按照权重等级排序
        const sortedList = runList.slice().sort((a,b) => b.fetch(BaseKey.Weight) - a.fetch(BaseKey.Weight))
        for (let app of sortedList) {
            map[app.constructor.name] = 0
            LogRecord.debug(`${app.appName}: ${app.fetch(BaseKey.Weight)}`)
        }
        //时间分配算法
        appTimeAllocation(map, timePerMethod, sortedList)
        for(let app of runList){
            LogRecord.debug(`${app.appName}: ${convertSecondsToMinutes(map[app.constructor.name])}分钟`)
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
            map[app.constructor.name] = 0
            //执行流程
            STORAGE.put("app", app.constructor.name)
            surplus = app.start(executeTime)

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
            LogRecord.log(`等待${convertSecondsToMinutes(waitTime/1000 + 5)}分钟开启新一天任务`)
            sleep(waitTime + 10000)
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



