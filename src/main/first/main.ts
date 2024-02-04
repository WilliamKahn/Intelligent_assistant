import { FuncIncome } from "../../common/interfaces"
import { sendIncomeMessageToWxPuher, toShowString } from "../../common/report"
import { clearBackground } from "../../common/utils"
import { INCOME_RECOVER, INCOME_THRESHOLD, ORDER, STORAGE, STORAGE_APP, STORAGE_DATE, article, articleLite, baidu, baiduBig, baiduLite, changReadFree, deJian, eggFlower, eggplantFree, kuaiShou, kuaiShouFree, kuaiShouLite, lightningSearch, marvelFree, pandaBrain, redFruits, sevenCatsFree, shengRead, shuQi, speedFree, starrySky, tikTokLite, tikTokVolcano, tomato, tomatoFree, tomatoLite, watermelon, ximalayaLite, xinyaFree, youShi } from "../../global"
import { BaseKey } from "../../scripts/abstract/Base"

//阈值10元标准0.007  视频70金币（10000）  230（33000）

main()
export function main(){
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
        "24": watermelon,
        "25": changReadFree,
        "26": eggFlower,
        "27": ximalayaLite,
        "28": shengRead,
        "29": xinyaFree,
        "30": lightningSearch
    }

    const list:any = []
    if(ORDER){
        let orderList = ORDER.split(" ")
        if(orderList.length > 0){
            //去重复
            orderList = orderList.filter((value:string, index: number, self:string) => self.indexOf(value) === index)
            for(const key of orderList){
                const app = map[key]
                if(app){
                    list.push(app)
                }
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
    //特殊处理
    for(const app of list){
        // log(`${app.appName}: ${app.fetch(BaseKey.Weight)}`)
        app.terminalAfterSign = true
        app.canSign = true
    }
    // exit()
    while(true){
        let indexList = list
        indexList = indexList.filter(app=>{
            return app.executable = true
        })
        const funcIncomeList:FuncIncome[] = []
        const funcList = ["medEff", "lowEff1", "lowEff2", "lowEff3"]
        for(const index in indexList){
            const app = indexList[index]
            funcIncomeList.push({
                index: index,
                funcName: "highEff",
                income: app.highEffIncomePerMinute
            })
            for(const funcName of funcList){
                if(app[`${funcName}Inheritance`]){
                    app[`${funcName}Flag`] = false
                    funcIncomeList.push({
                        index: index,
                        funcName: funcName,
                        income: app[`${funcName}IncomePerMinute`]
                    })
                }
            }
        }
        
        const allIncomesZero = funcIncomeList.every((item) => item.income === 0)
        if (!allIncomesZero) {
            funcIncomeList.sort((a, b)=>{
                const incomeComparison = b.income - a.income
                if(b.income === 0){
                    if(a.income >= INCOME_THRESHOLD){
                        return -1
                    } else if(a.income > 0) {
                        return 1
                    }
                } else if(a.income === 0){
                    if(b.income >= INCOME_THRESHOLD){
                        return 1
                    } else if(b.income > 0){
                        return -1
                    }
                }
                return incomeComparison
            })
        }
        // for(const item of funcIncomeList){
        //     if(item.income > INCOME_THRESHOLD)
        //         log(`${indexList[item.index].appName},${item.funcName},${item.income}`)
        // }
        // exit()
        //funcList.includes(element.funcName)

        const runList:any[] = []
        const startTime = new Date()
        const date = startTime.getMonth().toString()+"/"+startTime.getDate().toString()

        for (let i = 0; i < funcIncomeList.length; i++) {
            const item = funcIncomeList[i]
            const app = indexList[item.index]
            if(item.income > INCOME_THRESHOLD || item.income === 0){
                app[`${item.funcName}Flag`] = true
                runList.push(app)
                for (let j = i + 1; j < funcIncomeList.length; j++) {
                    const next = funcIncomeList[j]
                    if (next.index === item.index) {
                        if(next.income > INCOME_THRESHOLD || next.income === 0){
                            app[`${next.funcName}Flag`] = true
                        }
                        funcIncomeList.splice(j, 1)
                        j-- // 调整索引，因为删除了一个元素
                    }
                }
            } else if (date !== STORAGE.get(STORAGE_DATE)) {
                app[`${item.funcName}IncomePerMinute`] += INCOME_RECOVER
            }
        }
        let realList = runList
        if(date === STORAGE.get(STORAGE_DATE)
            && STORAGE.get(STORAGE_APP) !== undefined){
            let index = runList.length
            for(let i = 0;i < runList.length; i++){
                if(runList[i].constructor.name === STORAGE.get(STORAGE_APP)){
                    index = i
                    break
                }
            }
            realList = runList.slice(index)
        }
        STORAGE.put(STORAGE_DATE, date)
        // for(const app of runList){
        //     log(`${app.appName}`)
        // }
        // exit()
        clearBackground()
        let execute = true
        for(const app of realList){
            if(execute){
                STORAGE.put(STORAGE_APP, app.constructor.name)
                app.store(BaseKey.Weight, 0)
                app.start1()
                clearBackground()
                const endTime = new Date()
                if(startTime.getDay() !== endTime.getDay()){
                    execute = false
                }
            }
        }
        STORAGE.put(STORAGE_APP, "finish")
        if(execute){
            const lowFuncIncomeList:FuncIncome[] = []
            for(const index in runList){
                const app = runList[index]
                for(const funcName of funcList){
                    if(funcName !== "medEff" && app[`${funcName}Inheritance`]){
                        lowFuncIncomeList.push({
                            index: index,
                            funcName: funcName,
                            income: app[`${funcName}IncomePerMinute`]
                        })
                    }
                }
            }
            lowFuncIncomeList.sort((a, b) => b.income - a.income)
            // for(const item of lowFuncIncomeList){
            //     log(`${runList[item.index].appName},${item.funcName},${item.income}`)
            // }
            // exit()
            for(const item of lowFuncIncomeList){
                const app = runList[item.index]
                app.startContinue(item.funcName)
                clearBackground()
                const endTime = new Date()
                if(startTime.getDay() !== endTime.getDay()){
                    break
                }
            }
        }
        sendIncomeMessageToWxPuher(toShowString(list))
    }
}
