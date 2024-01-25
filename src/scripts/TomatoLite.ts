import { dialogClick, findAndClick, fixedClick, scrollClick, selectedClick, waitClick } from "../common/click";
import { scrollTo, search } from "../common/search";
import { convertMinutesToSeconds, randomExecute, resizeX, resizeY } from "../common/utils";
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
        .boundsInside(0, device.height*2/3, device.width, device.height)
        this.initialNum = 0
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.listenBook()
        this.openTreasure()
        this.winGoldCoin()
        this.mealSupp()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && this.watchAds()) {}
        this.listenReward()
        this.depositReward()
        this.dailyReward()
    }

    goto(): void {
        this.goTo(this.tab, 2)
    }

    @functionLog("签到")
    signIn(): void{
        this.goTo(this.tab, 2)
        this.sign()
        if(scrollClick("立即签到", "签到", {clickUntilGone:false})){
            this.sign()
        }
    }

    @functionLog("听书")
    listenBook(): void {
        this.goTo(this.tab, 0)
        if(selectedClick("音乐", 170)){
            const component = search(className("android.widget.ImageView"), {
                bounds: {top: device.height / 3},
                index: random(0, 4)
            })
            if(findAndClick(className("android.widget.TextView")
            .boundsInside(0, component?.bounds.top||0, device.width, component?.bounds.bottom||device.height))){
                if(fixedClick("看视频领时长")){
                    this.watch(text("看视频领时长"))
                }  
            }
        }
        
    }

    @functionLog("领取听歌奖励")
    listenReward(): void{
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("立即领取", "听音乐赚金币", {clickUntilGone:false})) {
                this.watchAdsForCoin("日常福利")
        }
    }
    @functionLog("领取每日听歌奖励")
    dailyReward():void{
        this.goTo(this.tab, 2)
        if(scrollClick("立即领取", "每日听歌赚钱", {clickUntilGone:false})){
            this.watchAdsForCoin("日常福利")
        }
    }
    @functionLog("领取额外存金币奖励")
    depositReward(): void{
        this.goTo(this.tab, 2)
        if(scrollClick("立即领取", "听音乐额外存金币", {clickUntilGone:false})){
            this.watchAdsForCoin("日常福利")
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
    watchAds(): boolean {
        this.goTo(this.tab, 2)
        if(waitClick("立即观看", "看视频赚金币")){
            this.watch(text("日常福利"))
            return true
        }
        return false
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