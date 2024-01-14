import { findAndClick, fixedClick, ocrClick, randomClick, scrollClick, selectedClick } from "../common/click";
import { scrollTo, searchByOcrRecognize } from "../common/search";
import { closeByImageMatching, convertSecondsToMinutes, doFuncAtGivenTime, moveDown, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_VEDIO_BAIDU_BIG, PACKAGE_VEDIO_BAIDU_BIG } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { AbstractBaidu } from "./abstract/AbstractBaidu";
import { Base, BaseKey } from "./abstract/Base";

export class BaiduBig extends AbstractBaidu {

    constructor() {
        super(PACKAGE_VEDIO_BAIDU_BIG)
        this.appName = NAME_VEDIO_BAIDU_BIG
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, 30 * 60)
        this.lowEffEstimatedTime = 0
        this.readRewardText = "看视频/热搜赚金币"
        this.exitSign = "现金收益"
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        this.listenBook()
        this.searchForCoin()
        let cycleCounts = 0
        while(++cycleCounts <= MAX_CYCLES_COUNTS 
            && this.watchAds()){}
        this.openTreasure()
        this.dailyReward()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        doFuncAtGivenTime(time, 20 * 60, (perTime:number) => {
            this.swipeVideo(perTime)
            this.openTreasure()
            this.listenReward()
            this.swipeReward()
            this.dailyReward()
        })
    }
    
    @measureExecutionTime
    weight(): void {
        this.goto(-1)
        scrollTo("现金收益")
        const component = searchByOcrRecognize("[0-9]+", {bounds:{bottom:device.height/5}})
        if(component !== undefined){
            const weight = parseInt(component.text)
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("听书")
    listenBook(): void {
        this.goto(1)
        const tmp = text(random(1,4).toString()).findOnce()
        if(tmp !== null){
            const parent = tmp.parent()
            if(parent !== null){
                randomClick(parent.bounds())
                if(fixedClick("开始听书|续播")){
                    if(fixedClick("立即看视频领[0-9]+分钟")){
                        this.watch(text("看视频领免费时长"))
                    }
                }
            }
        }
    }

    @functionLog("看视频/热搜")
    swipeVideo(totalTime: number): void {
        this.goto(0)
        if(selectedClick("视频", 170)){
            Record.log(`预计刷视频${convertSecondsToMinutes(totalTime)}分钟`)
            moveDown(totalTime, 10)
        }
    }

    @functionLog("听书赚金币")
    listenReward(): void {
        this.goto(-1)
        let cycleCounts = 0
        while(++cycleCounts <= MAX_CYCLES_COUNTS 
            && scrollClick("领取", undefined, {clickUntilGone:false})){
            this.watchAdsForCoin("现金收益")
        }
    }

    goto(num:number): void{
        if(num === -1){
            this.goTo(this.tab, 3)
        } else {
            this.goTo(this.tab , num)
        }
    }

}