import { dialogClick, findAndClick, fixedClick, scrollClick, scrollPopClick, selectedClick } from "../common/click";
import { scrollTo } from "../common/search";
import { randomExecute, resizeX, resizeY } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_TOMATO_LITE, PACKAGE_READ_TOMATO_LITE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { AbstractTomato } from "./abstract/AbstractTomato";
import { BaseKey } from "./abstract/Base";


export class TomatoLite extends AbstractTomato {

    constructor() {
        super()
        this.appName = NAME_READ_TOMATO_LITE
        this.packageName = PACKAGE_READ_TOMATO_LITE
        this.randomTab = className("android.widget.RadioGroup")
        .boundsInside(0, device.height-300, device.width, device.height)
        .boundsContains(0, device.height - 100,device.width, device.height - 50)
        this.initialNum = 0
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, 35 * 60)
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.mealSupp()},
            ()=>{this.winGoldCoin()},
            ()=>{
                this.listenBook()
                this.watchAds()
            },
        ])
        this.reward()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 2)
        scrollTo("金币收益")
        let tmp = textMatches(/(\d+)/).boundsInside(0, 0, resizeX(540), resizeY(373)).findOnce()
        if(tmp != null) {
            const weight = parseInt(tmp.text())
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("签到")
    signIn(): void{
        this.goTo(this.tab, 2)
        this.sign()
        if(scrollPopClick("立即签到", "签到")){
            this.sign()
        }
    }

    @functionLog("听书")
    listenBook(): void {
        this.goTo(this.tab, 0)
        if(selectedClick("音乐", 170)){
            if(fixedClick("排行榜")){
                scrollClick(random(1,8).toString())
            }
        }
        
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goTo(this.tab, 2)
        let list = ["听音乐赚金币", "每日听歌赚钱"]
        let cycleCounts = 0
        for(let range of list){
            while(++cycleCounts < MAX_CYCLES_COUNTS 
                && scrollPopClick("立即领取", range)) {
                    this.watchAdsForCoin("日常福利")
            }
        }
    }

    @functionLog("领取餐补")
    mealSupp(): void{
        this.goTo(this.tab, 2)
        if(scrollClick("去领取", "吃饭补贴")){
            if(dialogClick("领取.*补贴[0-9]金币")) {
                this.watchAdsForCoin("日常福利")
            }
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("立即观看", "看视频赚金币")) {
            Record.log(`正在观看第${cycleCounts}个广告`)
            this.watch(text("日常福利"))
            if(cycleCounts % 3 === 0) {
                this.openTreasure()
            }
            text("立即观看").findOne(3 * 60 * 1000)
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        this.open()
    }

    @functionLog("去抽奖")
    winGoldCoin(): void {
        this.goTo(this.tab, 2)
        if(scrollClick("去抽奖", "天天抽奖赢金币")){
            let cycleCounts = 0
            while(++cycleCounts < MAX_CYCLES_COUNTS 
                && findAndClick("抽奖", {fixed:true, waitTimes:10})) {
                if(!dialogClick("开心收下")){
                    this.watchAdsForCoin("日常福利")
                } else {
                    break
                }
            }
        }
    }

}