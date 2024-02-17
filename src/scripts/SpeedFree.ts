import { dialogClick, findAndClick, fixedClick, findByOcrAndClick, readClick, scrollClick } from "../common/click";
import { scrollTo, search } from "../common/search";
import { merge, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_SPEED_FREE, NORMAL_WAIT_TIME, PACKAGE_READ_SPEED_FREE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Base, BaseKey } from "./abstract/Base";

export class SpeedFree extends Base {

    constructor() {
        super()
        this.appName = NAME_READ_SPEED_FREE
        this.packageName = PACKAGE_READ_SPEED_FREE
        this.initialComponent = desc("bookstore_button")
        this.exchangeRate = 33000
        this.medEffInheritance = true
        this.lowEff1Inheritance = true
        this.dialogBounds = {
            left: device.width / 6,
            top: device.height / 3,
            right: device.width * 5 / 6,
            bottom: device.height * 4 / 5,
        }
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
    }

    @measureExecutionTime
    medEff(): void {
        this.listenBook()
        this.openTreasure()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && this.watchAds()){}
        this.listenReward()
    }

    @measureExecutionTime
    lowEff1(time: number): void {
        this.listenBook()
        this.readBook(time)
        this.openTreasure()
        this.readReward()
        this.listenReward()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(desc("discovery_button"), -1)
        const component = scrollTo("币",{
            throwErrIfNotExist:true,  
            disableCoverCheck:true
        })
        if(component){
            const component1 = search("[0-9]+",{bounds:{right:component.bounds().left}})
            if(component1){
                const weight = parseInt(component1.text())
                this.store(BaseKey.Weight, weight)
            }
        }
    }
    
    @functionLog("签到")
    signIn(): void{
        //每日签到 签到
        this.goTo(desc("discovery_button"), -1)
        if (findByOcrAndClick("立即签到.+")) {
            this.watchAdsForCoin("日常福利")
        } else {
            if(findAndClick("签到")){
                this.watchAdsForCoin("日常福利")
            }
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(desc("discovery_button"), -1)
        if(fixedClick("开宝箱得金币")) {
            this.watchAdsForCoin("日常福利")
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goTo(desc("discovery_button"), -1)
        if(scrollClick("去观看", "看视频赚金币")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("日常福利"))
            this.watchAdsForCoin("日常福利")
            return true
        }
        return false
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(desc("bookstore_button"), -1)
        const tmp = search(id("com.dj.speed:id/channel_tab"))
        if(tmp && findByOcrAndClick("推荐",
        {bounds:tmp.bounds(), selectedThreshold:100})){
            if(readClick(id("com.zhangyue.iReader.bookStore:id/iv_book"), random(0, 5))){
                this.read(totalTime)
            }
        }
    }
    
    @functionLog("听书")
    listenBook(): void {
        this.goTo(desc("bookstore_button"), -1)
        let tmp = id("com.dj.speed:id/channel_tab").findOnce()
        if(tmp!=null && findByOcrAndClick("听书",
        {bounds: tmp.bounds(), selectedThreshold:100})){
            if(findAndClick(id("com.zhangyue.iReader.bookStore:id/id_audition_btn"), {
                index: random(0, 7)
            })){
                fixedClick("确定")
                if(dialogClick(merge(["看视频", "看广告加时长"]))){
                    waitRandomTime(NORMAL_WAIT_TIME)
                    this.watch(desc("bookstore_button"))
                }
            }
        }
    }

    @functionLog("领饭补")
    mealSupp(): void {
        this.goTo(desc("discovery_button"), -1)
        if(scrollClick("立即领取", "吃饭赚钱")) {
            this.watchAdsForCoin("日常福利")
        }
    }

    @functionLog("领取阅读金币")
    readReward():void{
        this.goTo(desc("discovery_button"), -1)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && scrollClick("领取", "阅读赚海量金币")){
            this.watchAdsForCoin("日常福利")
        }
    }

    @functionLog("领取听书金币")
    listenReward():void{
        this.goTo(desc("discovery_button"), -1)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && scrollClick("领取", "听书赚海量金币")){
            this.watchAdsForCoin("日常福利")
        }
    }
}