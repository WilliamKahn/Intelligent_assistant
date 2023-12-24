import { dialogClick, findAndClick, fixedClick, normalClick, scrollClick, selectedClick } from "../common/click";
import { search } from "../common/search";
import { closeByImageMatching, doFuncAtGivenTime, moveDown, randomExecute, randomMoveDown, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_VEDIO_BAIDU_LITE, PACKAGE_VEDIO_BAIDU_LITE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { Base, BaseKey } from "./abstract/Base";

export class BaiduLite extends Base {

    constructor() {
        super()
        this.packageName = PACKAGE_VEDIO_BAIDU_LITE
        this.appName = NAME_VEDIO_BAIDU_LITE
        this.tab = id("android:id/tabs")
        this.initialComponent = this.tab
        this.initialNum = 1
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, 40 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        if(dialogClick("立即领今日打款")){
            closeByImageMatching()
        }
        this.signIn()
        this.listenBook()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.watchAds()},
            ()=>{this.searchForCoin()},
            ()=>{this.mealSupp()},
        ])
    }

    @measureExecutionTime
    lowEff(time: number): void {
        doFuncAtGivenTime(time, 10 * 60, (perTime:number) => {
            this.swipeVideo(perTime)
            this.reward()
            this.reward2()
            this.openTreasure()
        })
    }
    
    @measureExecutionTime
    weight(): void {
        this.goto(4)
        const [_, weight] = search("[0-9]+", {index:2})
        this.store(BaseKey.Weight, weight)
    }

    @functionLog("签到")
    signIn(): void {
        this.goto(2)
        if(fixedClick("额外领[0-9]+金币")){
            this.watch(text("每日任务"))
            this.watchAdsForCoin("每日任务")
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goto(2)
        while(scrollClick("去完成", "看广告赚钱")){
            this.watch(text("每日任务"))
            this.watchAdsForCoin("每日任务")
        }
    }

    @functionLog("搜索赚金币")
    searchForCoin():void{
        this.goto(2)
        let cycleCounts = 0
        while(++cycleCounts <= MAX_CYCLES_COUNTS &&
            findAndClick("随心搜", {leftRange: "搜索赚金币.*", waitTimes: 15})){
            this.backUntilFind(text("每日任务"))
            waitRandomTime(2)
            this.watchAdsForCoin("每日任务")
        }
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goto(2)
        fixedClick("立即收下")
        let cycleCounts = 0
        while(++cycleCounts<MAX_CYCLES_COUNTS
            && scrollClick("可领")){

        }
    }

    @functionLog("领取听书奖励")
    reward2(): void {
        this.goto(2)
        if(scrollClick("去听书", "听书赚金币")){
            if(findAndClick(className("android.widget.ImageView"), {bounds:{top:device.height*2/3, left:device.width*2/3}})){
                let cycleCounts = 0
                while(++cycleCounts<MAX_CYCLES_COUNTS
                    && scrollClick("可领取")){
                    this.watchAdsForCoin("听书赚金币")
                }
            }
        }
    }

    @functionLog("听书")
    listenBook(): void {
        this.goto(0)
        if(selectedClick("听书", 170)){
            if(findAndClick(className("android.widget.TextView"), {
                leftRange: random(1,4).toString(),
                clickUntilGone:true
            })){
                fixedClick("开始听书|续播")
            }
        }
    }

    @functionLog("吃饭补贴")
    mealSupp(): void {
        this.goto(2)
        if(scrollClick("去领取", "吃饭补贴")){
            if(fixedClick("(补签)?领取.*补贴")){
                this.watch(textMatches(".*时间.*"))
            }
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goto(0)
        if(selectedClick("推荐", 170)){
            while(totalTime > 0){
                const slideTime = random(0, totalTime/2)
                const waitTime = random(0, totalTime/2)
                moveDown(slideTime, 4)
                normalClick(device.width/2, device.height/2)
                totalTime -= waitRandomTime(waitTime)
                totalTime -= slideTime
                this.backUntilFind(text("推荐"))
            }
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goto(2)
        if(fixedClick("开宝箱得金币")){
            this.watchAdsForCoin("每日任务")
        }
    }

    goto(num: number): void{
        if(num == 2 && this.preNum == 1){
            this.goTo(this.tab, 0)
            this.goTo(this.tab, 2)
        } else {
            this.goTo(this.tab, num)
        }
    }

}