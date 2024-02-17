import { findByOcrAndClick, randomClick, scrollClick, selectedClick } from "../common/click";
import { closeByImageMatching, searchByOcrRecognize } from "../common/ocr";
import { scrollTo, search } from "../common/search";
import { convertSecondsToMinutes, moveDown, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_VEDIO_BAIDU, NORMAL_WAIT_TIME, PACKAGE_VEDIO_BAIDU } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { AbstractBaidu } from "./abstract/AbstractBaidu";
import { BaseKey } from "./abstract/Base";

export class Baidu extends AbstractBaidu {

    constructor() {
        super(PACKAGE_VEDIO_BAIDU)
        this.appName = NAME_VEDIO_BAIDU
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        this.searchForCoin()
        this.makesureFortune()
        this.goFarm()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && this.watchAds()){}
        this.swipeVideo(6 * 60)
        this.swipeReward()
        this.openTreasure()
        this.dailyReward()
    }
    @measureExecutionTime
    lowEff1(time: number): void {
        this.swipeVideo(time)
        this.openTreasure()
        this.swipeReward()
        this.dailyReward()
    }
    
    @measureExecutionTime
    weight(): void {
        this.goto(-1)
        scrollTo("金币收益")
        const component = searchByOcrRecognize("[0-9]+")
        if(component != undefined){
            const weight = parseInt(component.text)
            Record.debug(`weight: ${weight}`)
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("去芭芭农场")
    goFarm():void{
        this.goto(-1)
        if(search("去支付宝芭芭农场") && 
        scrollClick("去完成","去支付宝芭芭农场")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("金币收益"))
            this.watchAdsForCoin("金币收益")
        }
    }

    @functionLog("测运势")
    makesureFortune(): void{
        this.goto(-1)
        if(scrollClick("测一测", "测测今日运势")){
            if(findByOcrAndClick("测一测")){
                closeByImageMatching()
                this.backUntilFind(text("金币收益"))
                this.watchAdsForCoin("金币收益")
            }
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goto(0)
        if(selectedClick("发现", 170)){
            const parent = search(className("androidx.recyclerview.widget.RecyclerView").depth(22))
            if(parent){
                const child = parent.child(random(0,3))
                if(child){
                    randomClick(child.bounds())
                    Record.log(`预计刷视频${convertSecondsToMinutes(totalTime)}分钟`)
                    moveDown(totalTime, 30)
                }
            }
        }
    }

    goto(num: number): void{
        if(num === -1){
            if(this.first){
                this.goTo(this.tab, 4)
                if(findByOcrAndClick("天天领现金",{
                    bounds:{bottom:device.height/5, left:device.width/2}})){
                        this.first = false
                    }
            }else {
                this.backUntilFind(text("金币收益"))
            }
        } else {
            this.first = true
            this.goTo(this.tab, num)
        }
    }

}