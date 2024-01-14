import { dialogClick, findAndClick, fixedClick, normalClick, randomClick, scrollClick, selectedClick } from "../common/click";
import { search } from "../common/search";
import { closeByImageMatching, doFuncAtGivenTime, moveDown, randomExecute, randomMoveDown, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_VEDIO_BAIDU_LITE, PACKAGE_VEDIO_BAIDU_LITE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { AbstractBaidu } from "./abstract/AbstractBaidu";
import { Base, BaseKey } from "./abstract/Base";

export class BaiduLite extends AbstractBaidu {

    constructor() {
        super(PACKAGE_VEDIO_BAIDU_LITE)
        this.appName = NAME_VEDIO_BAIDU_LITE
        this.initialNum = 1
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, 40 * 60)
        this.lowEffEstimatedTime = 0
        this.exitSign = "每日任务"
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        let cycleCounts = 0
        while(++cycleCounts <= MAX_CYCLES_COUNTS 
            && this.watchAds()){}
        this.searchForCoin()
        this.mealSupp()
        this.openTreasure()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        doFuncAtGivenTime(time, 20 * 60, (perTime:number) => {
            this.swipeVideo(perTime)
            this.openTreasure()
            this.readReward()
        })
    }
    
    @measureExecutionTime
    weight(): void {
        this.goto(4)
        const component = search("[0-9]+", {index:2})
        if(component != undefined){
            this.store(BaseKey.Weight, component.text)
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
            waitRandomTime(2)
            this.watchAdsForCoin("每日任务")
        }
    }

    @functionLog("看文章视频赚金币")
    readReward(): void {
        this.goto(2)
        fixedClick("立即收下")
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && scrollClick("可领")){
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
                const slideTime = random(10, 30)
                const waitTime = random(10, 30)
                moveDown(slideTime, 4)
                normalClick(device.width/2, device.height/2)
                randomMoveDown(waitTime, 5, 20)
                totalTime -= slideTime
                totalTime -= waitTime
                this.backUntilFind(text("推荐"))
            }
        }
    }

    goto(num: number): void{
        if(num === -1){
            num = 2
        }
        if(num == 2 && this.preNum !== 1){
            this.goTo(this.tab, 1)
            this.goTo(this.tab, 2)
        } else {
            this.goTo(this.tab, num)
        }
    }

    // @functionLog("领取听书奖励")
    // listenReward(): void {
    //     this.goto(2)
    //     if(scrollClick("去听书", "听书赚金币")){
    //         if(findAndClick(className("android.widget.ImageView"), {bounds:{top:device.height*2/3, left:device.width*2/3}})){
    //             let cycleCounts = 0
    //             while(++cycleCounts<MAX_CYCLES_COUNTS
    //                 && scrollClick("可领取")){
    //                 this.watchAdsForCoin("听书赚金币")
    //             }
    //         }
    //     }
    // }

    // @functionLog("听书")
    // listenBook(): void {
    //     this.goto(0)
    //     if(findAndClick("听书",{
    //         selectedThreshold: 170,
    //         waitFor:true,
    //     })){
    //         if(scrollClick(className("android.widget.TextView"), random(1,4).toString())){
    //             if(fixedClick("开始听书|续播")){
    //                 if(fixedClick("立即看视频领[0-9]+分钟")){
    //                     this.watch(text("看视频领免费时长"))
    //                     // const tmp = this.backUntilFind(id("com.baidu.searchbox.reader:id/novel_voice_lav_play"))
    //                     // randomClick(tmp.bounds())
    //                 }
    //             }
    //         }
    //     }
    // }

}