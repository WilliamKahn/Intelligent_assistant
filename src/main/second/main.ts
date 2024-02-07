import { sendIncomeMessageToWxPuher, toShowString } from "../../common/report";
import { clearBackground } from "../../common/utils";
import { ORDER, STORAGE, STORAGE_APP, STORAGE_DATE, article, articleLite, baidu, baiduBig, baiduLite, changReadFree, deJian, eggFlower, eggplantFree, kuaiShou, kuaiShouFree, kuaiShouLite, lightningSearch, marvelFree, pandaBrain, redFruits, sevenCatsFree, shengRead, shuQi, speedFree, starrySky, tikTokLite, tikTokVolcano, tomato, tomatoFree, tomatoLite, watermelon, ximalayaLite, xinyaFree, youShi } from "../../global"
import { Record as LogRecord } from "../../lib/logger";
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
    const filteredList = list.filter(
        item => hamibot.env[`${item.constructor.name}Flag`] !== false
    )
    let first = true
    while(true){
        let runList = filteredList
        if(first && STORAGE.get(STORAGE_APP) !== undefined){
            first = false
            let index = -1
            for(let i = 0;i < runList.length; i++){
                if(runList[i].constructor.name === STORAGE.get(STORAGE_APP)){
                    index = i
                    break
                }
            }
            runList = runList.slice(index)
        }
        LogRecord.info("进入主流程")
        clearBackground()
        for(const app of runList){
            STORAGE.put(STORAGE_APP, app.constructor.name)
            app.start2()
            clearBackground()
        }
        LogRecord.info("发送运行收益")
        sendIncomeMessageToWxPuher(toShowString(runList))
    }
}