import { dialogClick, findAndClick, fixedClick, randomClick, scrollClick, selectedClick, waitClick } from "../common/click";
import { search } from "../common/search";
import { waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_TOMATO_LITE, NORMAL_WAIT_TIME, PACKAGE_READ_TOMATO_LITE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { AbstractTomato } from "./abstract/AbstractTomato";


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
        this.listenMusic()
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
        if(!this.sign()
        && scrollClick("立即签到", "签到")){
            this.sign()
        }
    }

    @functionLog("听音乐")
    listenMusic(): void {
        this.goTo(this.tab, 0)
        if(selectedClick("音乐", 170)){
            const parent = search(className("androidx.recyclerview.widget.RecyclerView").depth(17))
            if(parent){
                const child = parent.child(random(2,6))
                if(child){
                    randomClick(child.bounds())
                    if(fixedClick("看视频领时长")){
                        waitRandomTime(NORMAL_WAIT_TIME)
                        this.watch(text("看视频领时长"))
                    }
                }
            }
        }
    }

    @functionLog("领取听歌奖励")
    listenReward(): void{
        this.goto()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("立即领取", "听音乐赚金币")) {
                this.watchAdsForCoin("日常福利")
        }
    }
    @functionLog("领取每日听歌奖励")
    dailyReward():void{
        this.goto()
        if(scrollClick("立即领取", "每日听歌赚钱")){
            this.watchAdsForCoin("日常福利")
        }
    }
    @functionLog("领取额外存金币奖励")
    depositReward(): void{
        this.goto()
        if(scrollClick("立即领取", "听音乐额外存金币")){
            this.watchAdsForCoin("日常福利")
        }
    }

    @functionLog("领取餐补")
    mealSupp(): void{
        this.goto()
        if(scrollClick("去领取", "吃饭补贴")){
            if(dialogClick("领取.*补贴[0-9]金币")) {
                this.watchAdsForCoin("日常福利")
            }
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goto()
        if(waitClick("立即观看", "看视频赚金币")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("日常福利"))
            return true
        }
        return false
    }

    @functionLog("去抽奖")
    winGoldCoin(): void {
        this.goto()
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