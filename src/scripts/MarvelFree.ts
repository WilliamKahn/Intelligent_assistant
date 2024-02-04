import { fixedClick, readClick, scrollClick, selectedClick } from "../common/click";
import { closeByImageMatching } from "../common/ocr";
import { scrollTo, search } from "../common/search";
import { resizeX, resizeY, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_MARVEL_FREE, NORMAL_WAIT_TIME, PACKAGE_READ_MARVEL_FREE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Base, BaseKey } from "./abstract/Base";

export class MarvelFree extends Base{

    constructor() {
        super()
        this.appName = NAME_READ_MARVEL_FREE
        this.packageName = PACKAGE_READ_MARVEL_FREE
        this.tab = id(this.packageName+":id/tab_layout")
        this.initialComponent = this.tab
        this.initialNum = 0
        this.depth = 1
        this.lowEff1Inheritance = true
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && textMatches("看视频领金币.+").exists()){
            this.watchAds()
        }
    }

    @measureExecutionTime
    lowEff1(time: number): void {
        this.readBook(time)
        this.reward()
        this.openTreasure()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 2)
        scrollTo("金币收益")
        const tmp = search(textMatches("[0-9]+").boundsInside(0,0,resizeX(582), resizeY(735)))
        if(tmp) {
            const weight = parseInt(tmp.text())
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        if(textStartsWith("今日签到").exists()){
            closeByImageMatching()
        }
    }
    
    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        if (fixedClick("开宝箱")) {
            this.watchAdsForCoin("日常福利")
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goTo(this.tab, 2)
        if(textMatches("看视频领金币.+").exists()){
            if(scrollClick("去领取", "看视频领金币.+")){
                waitRandomTime(NORMAL_WAIT_TIME)
                this.watch(text("日常福利"))
            }
            return true
        }
        return false
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 0)
        if(selectedClick("推荐", 170)){
            if(readClick(id(this.packageName+":id/tv_book_name"), random(0,3) * 2)){
                this.read(totalTime)
            }
        }   
    }

    @functionLog("领取阅读奖励")
    readReward(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("领金币", "阅读领金币")) {
                this.watchAdsForCoin("日常福利")
        }
    }

}