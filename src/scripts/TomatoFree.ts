import { fixedClick, scrollClick, selectedClick, waitClick } from "../common/click";
import { waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_TOMATO_FREE, NORMAL_WAIT_TIME, PACKAGE_READ_TOMATO_FREE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { AbstractNewFreeNovel } from "./abstract/AbstractNewFreeNovel";



export class TomatoFree extends AbstractNewFreeNovel {

    constructor() {
        super()
        this.appName = NAME_READ_TOMATO_FREE
        this.packageName = PACKAGE_READ_TOMATO_FREE
        this.childIndex = 1
        this.lowEff2Inheritance = true
    }
    @measureExecutionTime
    lowEff2(time: number): void {
        this.swipeVideo(time)
        this.openTreasure()
        this.swipeReward()
    }

    @functionLog("领取餐补")
    mealSupp(): void{
        this.goto()
        if(this.scrollClick("去领取", "吃饭补贴")){
            if(fixedClick("领取.*补贴[0-9]+金币")) {
                this.watchAdsForCoin("日常福利")
            }
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 0)
        if(selectedClick("经典", 170)){
            if(this.readClick(random(1,3))){
                this.read(totalTime)
            }
        }
    }
    @functionLog("领取短剧奖励")
    swipeReward():void{
        this.goto()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && 
            scrollClick("立即领取", "看短剧赚金币")
        ) {
            this.watchAdsForCoin("日常福利")
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goto()
        try {
            if(waitClick("立即领取", "看视频赚金币", {feedback:true})){
                waitRandomTime(NORMAL_WAIT_TIME)
                this.watch(text("日常福利"))
                return true
            }
        } catch (error) {
            this.goTo(this.tab, 0)
            return true
        }
        return false
    }

    @functionLog("看短剧")
    swipeVideo(totalTime: number) {
        this.goTo(this.tab, 0)
        if(selectedClick("看剧", 170)){
            this.swipevideo(totalTime)
        }
    }

    goto(): void{
        const tmp = this.backUntilFind(this.tab)
        if(tmp.childCount() === 6){
            this.goTo(this.tab, 3)
        } else {
            this.goTo(this.tab, 2)
        }
    }
}