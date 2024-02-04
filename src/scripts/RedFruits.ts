import { fixedClick, randomClick, scrollClick, selectedClick, waitClick } from "../common/click";
import { Move } from "../common/enums";
import { search } from "../common/search";
import { convertSecondsToMinutes, merge, swipeDown, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_RED_FRUITS, NORMAL_WAIT_TIME, PACKAGE_READ_RED_FRUITS } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { AbstractNewFreeNovel } from "./abstract/AbstractNewFreeNovel";


export class RedFruits extends AbstractNewFreeNovel {

    constructor() {
        super()
        this.appName = NAME_READ_RED_FRUITS
        this.packageName = PACKAGE_READ_RED_FRUITS
        this.lowEff2Inheritance = true
        this.childIndex = 1
        this.lowEff1Start = 4
        this.lowEff2Start = 5
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && 
            this.watchAds()){}
        this.mealSupp()
    }

    @measureExecutionTime
    lowEff1(time: number): void {
        this.swipeVideo(time)
        this.openTreasure()
        this.swipeReward()
        this.depositReward()
    }

    @measureExecutionTime
    lowEff2(time: number): void {
        this.readBook(time)
        this.openTreasure()
        this.readReward()
    }

    goto(): void {
        this.goTo(this.tab, 1)
        this.checkDetection()
    }

    @functionLog("看短剧")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 0)
        if(selectedClick("推荐", 170)){
            this.swipevideo(totalTime)
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 0)
        if(selectedClick("经典", 170)){
            if(this.readClick(random(1,4))){
                this.read(totalTime)
            }
        }
    }

    @functionLog("领取额外存金币奖励")
    depositReward(): void{
        this.goto()
        if(scrollClick("立即领取", "看短剧额外存金币")){
            this.watchAdsForCoin("日常福利")
        }
    }

    @functionLog("领取短剧奖励")
    swipeReward(): void{
        this.goto()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("立即领取", "看短剧(自动)?赚金币")) {
            this.watchAdsForCoin("日常福利")
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goto()
        if(waitClick("立即领取", "看视频赚海量金币")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("日常福利"))
            return true
        }
        return false
    }

    @functionLog("吃饭补贴")
    mealSupp(): void {
        this.goto()
        if(scrollClick("去领取", "吃饭补贴")){
            if(fixedClick("领.*补贴[0-9]+金币")){
                this.watchAdsForCoin("已按时吃饭.*天")
            }
            let cycleCounts = 0
            while(++cycleCounts < MAX_CYCLES_COUNTS &&
                fixedClick("看视频补领一次补贴")){
                waitRandomTime(NORMAL_WAIT_TIME)
                this.watch(textMatches("已按时吃饭.*天|恭喜获得"))
                this.watchAdsForCoin("已按时吃饭.*天")
            }
        }
    }
}