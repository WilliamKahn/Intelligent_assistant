import { sendIncomeMessageToWxPuher, toShowString } from "../../common/report";
import { clearBackground, convertSecondsToMinutes } from "../../common/utils";
import { BASE_ASSIMT_TIME, MAX_ASSIMT_TIME, ORDER, STORAGE, STORAGE_APP, STORAGE_DATE, article, articleLite, baidu, baiduBig, baiduLite, deJian, eggplantFree, kuaiShou, kuaiShouFree, kuaiShouLite, marvelFree, pandaBrain, redFruits, sevenCatsFree, shuQi, speedFree, starrySky, tikTokLite, tikTokVolcano, tomato, tomatoFree, tomatoLite, wanChao, youShi } from "../../global";
import { ConfigInvalidException } from "../../lib/exception";
import { Record as LogRecord } from "../../lib/logger";
import { BaseKey } from "../../scripts/abstract/Base";

//初始化map
const highEffmap:Record<string, number> = {}
const medEffMap:Record<string, number> = {}
const lowEffMap:Record<string, number> = {}
const fixedMap:Record<string, number> = {}

main()

export function main() {

    const map:Record<string, any> = {
        "1" : speedFree,
        "2" : deJian,
        "3" : starrySky,
        "4" : eggplantFree,
        "5" : pandaBrain,
        "6" : sevenCatsFree,
        "7" : shuQi,
        "8" : marvelFree,
        "9" : kuaiShouFree,
        "10": redFruits,
        "11": tomato,
        "12": tomatoFree,
        "13": tomatoLite,
        "14": kuaiShou,
        "15": kuaiShouLite,
        "16": baidu,
        "17": baiduLite,
        "18": baiduBig,
        "19": youShi,
        "20": article,
        "21": articleLite,
        "22": tikTokLite,
        "23": tikTokVolcano,
        "24": wanChao
    }
    //执行列表
    const list:any = []
    if(ORDER != undefined){
        LogRecord.info("调整执行顺序")
        let orderList = ORDER.split(" ")
        if(orderList.length > 0) {
            //去重复
            orderList = orderList.filter((value:string, index: number, self:string) => self.indexOf(value) === index)
            for(let key of orderList){
                const parts = key.split(":")
                if(parts.length === 2){
                    key = parts[0]
                    const time = Number(parts[1])
                    if(!isNaN(time)){
                        const app = map[key]
                        if(app != undefined) fixedMap[app.constructor.name] = time * 60
                    }
                }
                let app = map[key]
                if(app != undefined) list.push(app)
            }
        }
    }

    if(list.length != map.length){
        for(let key in map){
            if(list.indexOf(map[key]) == -1){
                list.push(map[key])
            }
        }
    }
    const filteredList = list.filter(
        item => hamibot.env[item.constructor.name] !== false
    )

    while (true) {
        //实际运行列表
        let runList = filteredList
        if(runList.length == 0){
            throw new ConfigInvalidException("拿我这测试了?");
        }
        //脚本运行当前时间
        const startTime = new Date();
        const endTime = new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate(), 23, 59, 59);
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
            STORAGE.remove(STORAGE_APP)
        }
        STORAGE.put(STORAGE_DATE, date)
        const timeDifference = endTime.getTime() - startTime.getTime();
        //化毫秒为秒
        const timePerMethod = timeDifference / 1000 - runList.length * 60
        //将数组按照权重等级排序
        const sortedList = runList.slice().sort((a:any,b:any) => 
            b.fetch(BaseKey.Weight, 0) / b.exchangeRate * 100 - a.fetch(BaseKey.Weight, 0) /a.exchangeRate * 100
        )
        //执行数组清空
        for (let app of sortedList) {
            highEffmap[app.constructor.name] = 0
            medEffMap[app.constructor.name] = 0
            lowEffMap[app.constructor.name] = 0
            LogRecord.debug(`${app.appName}`)
        }
        //时间分配算法
        appTimeAllocation(timePerMethod, sortedList)
        //显示执行时间
        for(let app of runList){
            const sum = highEffmap[app.constructor.name] + medEffMap[app.constructor.name] + lowEffMap[app.constructor.name]
            if(sum != 0){
                LogRecord.log(`${app.appName}: ${convertSecondsToMinutes(sum)}分钟`)
            }
        }
        //前一个app剩余时间
        let surplus:any = 0;
        //主流程
        LogRecord.info("进入主流程")
        clearBackground()
        for (let app of runList) {
            const executeTime = surplus + highEffmap[app.constructor.name] + medEffMap[app.constructor.name] + lowEffMap[app.constructor.name]
            //时间为正数才执行
            if(executeTime > 0){
                //权重置零 避免前天的遗留权重，导致即使昨天运行失败但是权重依然存在
                app.store(BaseKey.Weight, 0)
                //执行流程
                STORAGE.put(STORAGE_APP, app.constructor.name)
                surplus = app.start(executeTime)
                //代表app已执行
                app.store(BaseKey.Executed, true)
                allocateSurplus(surplus, sortedList)
                clearBackground()
            }
        }
        LogRecord.info("发送今日收益")
        sendIncomeMessageToWxPuher(toShowString(filteredList))
        //等待新的一天
        const doneTime = new Date();
        if(endTime.getTime() > doneTime.getTime()) {
            const waitTime = (endTime.getTime() - doneTime.getTime())
            LogRecord.log(`等待${convertSecondsToMinutes(waitTime/1000 + 1)}分钟开启新一天任务`)
            sleep(waitTime + 60 * 1000)
        }
    }
}

function allocateSurplus(surplus:number, sortedList: any[]){
    LogRecord.debug(`surplus: ${surplus}`)
    //surplus分配算法
    let remainingAllocation = 30 * 60
    if(surplus < 0){
        for (let tmp of sortedList.reverse()) {
            if(tmp.fetch(BaseKey.Executed) === false){
                const valueToSubtract = Math.min(lowEffMap[tmp.constructor.name], -surplus)
                lowEffMap[tmp.constructor.name] -= valueToSubtract
                surplus += valueToSubtract
            }
        }
    } else if (surplus > 0){
        for (let tmp of sortedList) {
            if(tmp.fetch(BaseKey.Executed) === false){
                const allocation = Math.min(surplus, remainingAllocation)
                lowEffMap[tmp.constructor.name] += allocation
                surplus -= allocation
            }
        }
    }
}

/**
 * @param timePerMethod 刷app总时间
 * @param sortedList 按照权重排序后的数组
 */
function appTimeAllocation(timePerMethod: number, sortedList: any[]){
    LogRecord.info("分配执行时间")
    //分配固定时间
    for (let app of sortedList){
        let fixedTime = fixedMap[app.constructor.name]
        if(fixedTime != undefined){
            //对比总时间取最小时间
            let currentAppFixedRunTime = Math.min(timePerMethod, fixedTime)
            //执行一阶段
            if(currentAppFixedRunTime >= app.highEffEstimatedTime){
                currentAppFixedRunTime -= app.highEffEstimatedTime
                //总时间去除
                timePerMethod -= app.highEffEstimatedTime
                highEffmap[app.constructor.name] += app.highEffEstimatedTime
                //执行二阶段
                if(currentAppFixedRunTime >= app.medEffEstimatedTime){
                    currentAppFixedRunTime -= app.medEffEstimatedTime
                    timePerMethod -= app.medEffEstimatedTime
                    medEffMap[app.constructor.name] += app.medEffEstimatedTime
                }
                //执行三阶段
                if(app.lowEffEstimatedTime != MAX_ASSIMT_TIME && currentAppFixedRunTime > 0){
                    timePerMethod -= currentAppFixedRunTime
                    lowEffMap[app.constructor.name] += currentAppFixedRunTime
                }
            }
        }
    }
    //基础时间分配
    for (let app of sortedList) {
        if(timePerMethod >= app.highEffEstimatedTime 
            && fixedMap[app.constructor.name] === undefined) {
            highEffmap[app.constructor.name] = app.highEffEstimatedTime
            timePerMethod -= app.highEffEstimatedTime
        }
    }

    //进阶任务时间分配(进阶任务必须在基础任务后)
    for (let app of sortedList) {
        if (timePerMethod >= app.medEffEstimatedTime
            && fixedMap[app.constructor.name] === undefined
            && highEffmap[app.constructor.name] > 0) {
            medEffMap[app.constructor.name] += app.medEffEstimatedTime
            timePerMethod -= app.medEffEstimatedTime
        }
    }

    //耗时任务时间分配
    let count = 1
    if(sortedList.length > 0){
        let flag = true
        //等时间分配结束
        while(flag && timePerMethod >= BASE_ASSIMT_TIME){
            //时间按照10，20，30，30分配
            const time = count * BASE_ASSIMT_TIME
            flag = false
            for (let app of sortedList) {
                if (app.lowEffEstimatedTime != MAX_ASSIMT_TIME
                    && fixedMap[app.constructor.name] === undefined
                    && highEffmap[app.constructor.name] > 0) {
                    flag = true
                    const allocaTime = Math.min(time * app.lowEffAssmitCount, timePerMethod)
                    lowEffMap[app.constructor.name] += allocaTime
                    timePerMethod -= allocaTime
                }
            }
            if(count < 4) {
                count++
            }
        }
    }
}
