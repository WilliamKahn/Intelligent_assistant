import { dialogClick, findAndClick, fixedClick, readClick, scrollClick } from "../common/click"
import { scrollTo } from "../common/search"
import { randomExecute, closeByImageMatching, padZero, getNumFromComponent } from "../common/utils"
import { MAX_CYCLES_COUNTS, NAME_READ_SHENGREAD, PACKAGE_READ_SHENGREAD } from "../global"
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
        if(findAndClick("金币[0-9]+", {clickUntilGone:false})){
            if(fixedClick("金币明细")){
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
            }
        }
    }

    beforeDoTask(): void {
        fixedClick("立即领取")
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(desc("bookstore_button"), -1)
        let tmp = id(this.packageName+":id/channel_tab").findOnce()
        if(tmp != null && findAndClick("推荐", 
        {fixed:true, ocrRecognize:true, bounds: tmp.bounds(), selectedThreshold:100})){
            if(findAndClick(id("com.zhangyue.iReader.bookStore:id/id_tv_book_name"), {
                index:random(0, 5),
                waitFor:true,
                clickUntilGone:true,
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
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("领取", "每日阅读福利", {clickUntilGone:false})) {
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