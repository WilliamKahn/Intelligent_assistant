import { dialogClick, findAndClick, fixedClick, normalClick } from "../common/click";
import { searchByOcrRecognize } from "../common/ocr";
import { scrollTo, search } from "../common/search";
import { convertSecondsToMinutes, getNumFromComponent, moveDown, randomExecute, resizeX, resizeY, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_VEDIO_YOUSHI, NORMAL_WAIT_TIME, PACKAGE_VEDIO_YOUSHI } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { AbstractArticle } from "./abstract/AbstractArticle";
import { BaseKey } from "./abstract/Base";

export class YouShi extends AbstractArticle{

    constructor() {
        super(PACKAGE_VEDIO_YOUSHI)
        this.appName = NAME_VEDIO_YOUSHI
        this.medEffInheritance = true
        this.lowEff1Inheritance = true
    }

    getCoinStr(): string {
        const component = search("恭喜获得宝箱奖励")
        const component2 = search("\\+[0-9]+金币", {
            bounds: {top: component?.bounds().bottom}})
        if(component2){
            return component2.text()
        }
        return ""
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        randomExecute([
            ()=>{this.walkEarn()},
            ()=>{this.mealSupp()},
            ()=>{this.sleepEarn()},
            ()=>{this.doubleEarn()},
        ])
        this.reward()
    }
    
    @measureExecutionTime
    medEff(): void {
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && this.watchAds()){
            this.openTreasure()
            this.swipeVideo(10 * 60)
        }
        this.reward()
    }
    
    @measureExecutionTime
    lowEff1(time: number): void {
        this.swipeVideo(time)
        this.openTreasure()
        this.reward()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 3)
        if(this.scrollClick("现金收益")) {
            const component = searchByOcrRecognize(".*我的金币.*")
            if(component !== undefined){
                const weight = getNumFromComponent(component.text)
                Record.debug(`${this.constructor.name}:${weight}`)
                this.store(BaseKey.Weight, weight)
            }
        }
    }

    @functionLog("签到")
    signIn(): void{
        this.goTo(this.tab, 3)
        if(dialogClick("签到领金币")){
            this.watchAdsForCoin("日常任务")
        } else {//"签到失败"
            if(findAndClick("立即签到", {feedback:true})){
                this.watchAdsForCoin("日常任务")
            }
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goTo(this.tab, 3)
        if(findAndClick("领福利")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("日常任务"))
            return true
        }
        return false
    }

    @functionLog("吃饭补贴")
    mealSupp(): void {
        this.goTo(this.tab, 3)
        if(findAndClick("吃饭补贴")){
            if(findAndClick("领取.*补贴[0-9]+金币", {fixed:true})){
                this.watchAdsForCoin("日常任务")
            }
        }
    }

    @functionLog("走路赚钱")
    walkEarn(): void{
        this.goTo(this.tab, 3)
        if(findAndClick("走路赚钱")){
            if(findAndClick("领取[0-9]+金币", {fixed:true, feedback:true})){
                this.watchAdsForCoin("日常任务")
            }
        }
    }

    @functionLog("睡觉赚钱")
    sleepEarn(): void{
        this.goTo(this.tab, 3)
        if(findAndClick("睡觉赚钱")){
            if(fixedClick("我睡醒了")){
                if(fixedClick("领取[0-9]+金币")){
                    this.watchAdsForCoin("日常任务")
                }
            }
            fixedClick("我要睡了")
        }
    }

    
    @functionLog("开启翻倍")
    doubleEarn(): void{
        this.goTo(this.tab, 3)
        if(findAndClick("去翻倍|点击翻倍")){
            dialogClick("我知道了")
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 1)
        Record.log(`预计刷视频${convertSecondsToMinutes(totalTime)}分钟`)
        moveDown(totalTime, 15)
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goTo(this.tab, 3)
        let cycleCounts = 0
        scrollTo("现金收益")
        while(++cycleCounts < MAX_CYCLES_COUNTS  && this.ocrClick("点击领取|点击抽奖")){
            this.watchAdsForCoin("日常任务")
            if(dialogClick("开始抽奖")){
                normalClick(resizeX(random(395, 689)), resizeY(random(750, 1067)))
                if(dialogClick("点击领取")){
                    this.watchAdsForCoin("日常任务")
                }
            }
        }
    }
}
