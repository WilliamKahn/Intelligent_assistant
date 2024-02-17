import { dialogClick, findAndClick, fixedClick, findByOcrAndClick, readClick, scrollClick } from "../common/click"
import { closeByImageMatching } from "../common/ocr"
import { scrollTo, search } from "../common/search"
import { randomExecute, padZero, getNumFromComponent, waitRandomTime } from "../common/utils"
import { MAX_CYCLES_COUNTS, NAME_READ_SHENGREAD, NORMAL_WAIT_TIME, PACKAGE_READ_SHENGREAD } from "../global"
import { measureExecutionTime, functionLog } from "../lib/decorators"
import { Record } from "../lib/logger"
import { Base, BaseKey } from "./abstract/Base"

export class ShengRead extends Base {

    constructor() {
        super()
        this.appName = NAME_READ_SHENGREAD
        this.packageName = PACKAGE_READ_SHENGREAD
        this.initialComponent = desc("bookstore_button")
        this.medEffInheritance = true
        this.lowEff1Inheritance = true
    }

    @measureExecutionTime
    highEff(): void {
        //签到
        this.signIn()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.mealSupp()},
        ])
    }
    @measureExecutionTime
    medEff(): void {
        //0.005
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && this.watchAds()){
            this.readBook(3 * 60)
        }
        this.readReward()
        this.lowEff1Start = 2
    }

    @measureExecutionTime
    lowEff1(time: number): void {
        this.readBook(time)
        this.readReward()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(desc("discovery_button"), -1)
        if(findAndClick("金币[0-9]+")){
            if(fixedClick("金币明细")){
                waitRandomTime(4)
                const year = this.startTime.getFullYear()
                const month = padZero(this.startTime.getMonth() + 1)
                const day = padZero(this.startTime.getDate())
                const list = textMatches(`${year}-${month}-${day}.*`).find()
                let weight = 0
                for(let i =0;i<list.length;i++){
                    const parent = list[i].parent()
                    if(parent!==null){
                        const coin = parent.child(0)
                        if(coin !== null){
                            weight+=getNumFromComponent(coin.text())
                        }
                    }
                }
                Record.debug(`weight: ${weight}`)
                this.store(BaseKey.Weight, weight)
                back()
            }
            waitRandomTime(4)
            back()
        }
    }

    beforeDoTask(): void {
        fixedClick("立即领取")
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(desc("bookstore_button"), -1)
        const tmp = search(id(this.packageName+":id/channel_tab"))
        if(tmp && findByOcrAndClick("推荐",
        {bounds: tmp.bounds(), selectedThreshold:100})){
            if(findAndClick(id("com.zhangyue.iReader.bookStore:id/id_tv_book_name"), {
                index:random(0, 5),
                throwErrIfNotExist:true,
                disableCoverCheck:true
            })){
                this.read(totalTime)
            }
        }
    }

    @functionLog("领取阅读奖励")
    readReward(): void {
        this.goTo(desc("discovery_button"), -1)
        let cycleCounts = 0
        const component = scrollTo("每日阅读福利", {
            throwErrIfNotExist:true
        }, {bottom:device.height*2/3})
        while(++cycleCounts < MAX_CYCLES_COUNTS && component
            && findByOcrAndClick("领取", {
                bounds:{
                    top: component.bounds().top - 20,
                    bottom: component.bounds().bottom + 200
                }})) {
            this.watchAdsForCoin("去提现")
            if (text("恭喜获得").exists()) {
                closeByImageMatching()
            }
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(desc("discovery_button"), -1)
        if(textStartsWith("成功签到").exists()) {
            closeByImageMatching()
        } else {
            if(findAndClick("点击签到.+")){
                closeByImageMatching()
            }
        }
    }

    @functionLog("领取餐补")
    mealSupp(): void{
        this.goTo(desc("discovery_button"), -1)
        if(findAndClick("点击领取")){
            this.watchAdsForCoin("去提现")
            if (text("恭喜获得").exists()) {
                closeByImageMatching()
            }
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goTo(desc("discovery_button"), -1)
        if(scrollClick("去观看", "看视频赚金币与声望")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("去提现"))
            if(!dialogClick("知道了")){
                closeByImageMatching()
            }
            return true
        }
        return false
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(desc("discovery_button"), -1)
        if(fixedClick("开宝箱得金币")) {
            this.watchAdsForCoin("去提现")
            if (text("恭喜获得").exists()) {
                closeByImageMatching()
            }
        }
    }
}