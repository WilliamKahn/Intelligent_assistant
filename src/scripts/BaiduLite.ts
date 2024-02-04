import { dialogClick, findAndClick, fixedClick, normalClick, randomClick, scrollClick, selectedClick } from "../common/click";
import { closeByImageMatching } from "../common/ocr";
import { search } from "../common/search";
import { convertSecondsToMinutes, moveDown, randomMoveDown, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_VEDIO_BAIDU_LITE, NORMAL_WAIT_TIME, PACKAGE_VEDIO_BAIDU_LITE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { AbstractBaidu } from "./abstract/AbstractBaidu";
import { BaseKey } from "./abstract/Base";

export class BaiduLite extends AbstractBaidu {

    constructor() {
        super(PACKAGE_VEDIO_BAIDU_LITE)
        this.appName = NAME_VEDIO_BAIDU_LITE
        this.initialNum = 1
        this.exitSign = "每日任务"
        this.dialogBounds = {
            bottom: device.height * 4 / 5, 
            top: device.height * 1 / 3,
            right: device.width *5/6,
            left: device.width/6
        }
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        let cycleCounts = 0
        while(++cycleCounts <= MAX_CYCLES_COUNTS 
            && textMatches("看广告赚钱.*").exists()){
            this.watchAds()
        }
        this.searchForCoin()
        this.mealSupp()
        this.openTreasure()
    }
    @measureExecutionTime
    lowEff1(time: number): void {
        this.swipeVideo(time)
        this.openTreasure()
        this.readReward()
    }
    
    @measureExecutionTime
    weight(): void {
        this.goto(4)
        const coin = search("金币")
        if(coin){
            const parent = coin.parent()
            if(parent){
                const weight = parent.child(0)
                if(weight){
                    this.store(BaseKey.Weight, parseInt(weight.text()))
                }
            }
        }
    }

    beforeDoTask(): void {
        if(dialogClick("立即领今日打款")){
            closeByImageMatching()
        }
    }

    @functionLog("搜索赚金币")
    searchForCoin():void{
        this.goto(2)
        let cycleCounts = 0
        while(++cycleCounts <= MAX_CYCLES_COUNTS &&
            scrollClick("随心搜", "搜索赚金币.*")){
            waitRandomTime(15)
            this.backUntilFind(text("每日任务"))
            this.watchAdsForCoin("每日任务")
        }
    }

    @functionLog("看文章视频赚金币")
    readReward(): void {
        this.goto(2)
        fixedClick("立即收下")
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && findAndClick("可领")){
        }
    }

    @functionLog("吃饭补贴")
    mealSupp(): void {
        this.goto(2)
        if(scrollClick("去领取", "吃饭补贴")){
            if(fixedClick("(补签)?领取.*补贴")){
                waitRandomTime(NORMAL_WAIT_TIME)
                this.watch(textMatches(".*时间.*"))
            }
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goto(0)
        if(selectedClick("发现", 170)){
            const parent = search(className("androidx.recyclerview.widget.RecyclerView").depth(15))
            if(parent){
                const child = parent.child(1)
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
            num = 2
        }
        if(num == 2){
            if(this.preNum === 1 || this.preNum === 2){
                this.goTo(this.tab, 2)
            } else {
                this.goTo(this.tab, 1)
                this.goTo(this.tab, 2)
            }
        } else {
            this.goTo(this.tab, num)
        }
    }

}