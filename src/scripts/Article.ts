import { dialogClick, fixedClick, findAndClick, normalClick, findByOcrAndClick } from "../common/click";
import { searchByOcrRecognize } from "../common/ocr";
import { search } from "../common/search";
import { randomExecute, getNumFromComponent, convertSecondsToMinutes, moveDown, resizeX, resizeY, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, MIN_RUN_THRESHOLD, NAME_READ_ARTICLE, NORMAL_WAIT_TIME, PACKAGE_READ_ARTICLE } from "../global";
import { measureExecutionTime, functionLog } from "../lib/decorators";
import { CurrentAppBanned } from "../lib/exception";
import { Record } from "../lib/logger";
import { AbstractArticle } from "./abstract/AbstractArticle";
import { BaseKey } from "./abstract/Base";

export class Article extends AbstractArticle{

    constructor(){
        super(PACKAGE_READ_ARTICLE)
        this.appName = NAME_READ_ARTICLE
        this.medEffInheritance = true
        this.lowEff1Inheritance = true
        this.lowEff2Inheritance = true
    }

    goToTask(): void {
        this.goTo(this.tab, 2)
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
    lowEff2(time: number): void {
        this.readBook(time)
        this.openTreasure()
        this.readReward()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 2)
        if(this.scrollClick("现金收益")) {
            const component = searchByOcrRecognize(".*我的金币.*")
            if(component){
                const weight = getNumFromComponent(component.text)
                Record.debug(`${this.constructor.name}:${weight}`)
                this.store(BaseKey.Weight, weight)
            }
        }
    }

    
    @functionLog("签到")
    signIn(): void{
        this.goTo(this.tab, 2)
        if(dialogClick("立即签到")){
            this.watchAdsForCoin("日常任务")
        } else {//"签到失败"
            if(this.scrollClick("立即签到")){
                this.watchAdsForCoin("每日凌晨.*")
            }
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        if (fixedClick("开宝箱得金币")) {
            const str = this.getCoinStr()
            const coin = getNumFromComponent(str)
            if(coin < MIN_RUN_THRESHOLD){
                throw new CurrentAppBanned(this.appName+"账号异常")
            }
            this.watchAdsForCoin("每日凌晨.*")
        }
    }

    getCoinStr(): string {
        const component = searchByOcrRecognize("恭喜你获得[0-9]+金币", {bounds:{
            top:device.height/3,
            bottom:device.height*2/3,
        }})
        if(component !== undefined){
            return component.text
        }
        return ""
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goTo(this.tab, 2)
        if(this.scrollClick("领福利")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(textMatches("每日凌晨.*"))
            return true
        }
        return false
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 1)
        Record.log(`预计刷视频${convertSecondsToMinutes(totalTime)}分钟`)
        moveDown(totalTime, 15)
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        this.scrollTo("现金收益")
        while(++cycleCounts < MAX_CYCLES_COUNTS  
            && findByOcrAndClick("点击领取|点击抽奖", {
            // ocrRecognize:true,
            bounds:{
                bottom:device.height / 3,
                left:device.width / 2
            }
        })){
            this.watchAdsForCoin("每日凌晨.*")
            if(dialogClick("开始抽奖")){
                normalClick(resizeX(random(395, 689)), resizeY(random(750, 1067)))
                if(dialogClick("点击领取")){
                    this.watchAdsForCoin("每日凌晨.*")
                }
            }
        }
    }

    @functionLog("吃饭补贴")
    mealSupp(): void {
        this.goTo(this.tab, 2)
        if(this.scrollClick("吃饭补贴")){
            if(findAndClick("领取.*补贴[0-9]+金币", {fixed:true})){
                this.watchAdsForCoin("每日凌晨.*")
            }
        }
    }

    @functionLog("走路赚钱")
    walkEarn(): void{
        this.goTo(this.tab, 2)
        if(this.scrollClick("走路赚钱")){
            if(findAndClick("领取[0-9]+金币", {fixed:true, feedback:true})){
                this.watchAdsForCoin("每日凌晨.*")
            }
        }
    }

    @functionLog("睡觉赚钱")
    sleepEarn(): void{
        this.goTo(this.tab, 2)
        if(this.scrollClick("睡觉赚钱")){
            if(fixedClick("我睡醒了")){
                if(fixedClick("领取[0-9]+金币")){
                    this.watchAdsForCoin("每日凌晨.*")
                }
            }
            fixedClick("我要睡了")
        }
    }

    @functionLog("开启翻倍")
    doubleEarn(): void{
        this.goTo(this.tab, 2)
        if(this.scrollClick("去翻倍|点击翻倍")){
            dialogClick("我知道了")
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 2)
        if(this.scrollClick("去看小说")){
            this.preNum = 0
            dialogClick("立即签到")
            const range = search(random(1,4).toString())
            if(range){
                if(findAndClick(className("com.lynx.tasm.behavior.ui.text.FlattenUIText"),{
                    bounds:{
                        left:range.bounds().right,
                        top:range.bounds().top,
                        bottom:range.bounds().bottom,
                    }
                })){
                    this.read(totalTime)
                }
            }
        }
    }
    @functionLog("领取阅读奖励")
    readReward():void{
        this.goTo(this.tab, 2)
        if(this.scrollClick("去看小说")){
            if(fixedClick("待领取")){
                fixedClick("待领取")
            }
        }
    }

    @functionLog("听书")
    listenBook(): void {
        this.goTo(this.tab, 2)
        if(this.scrollClick("去完成")){
            const range = search(random(1,4).toString())
            if(range){
                if(findAndClick(className("android.widget.TextView"),{
                    bounds:{
                        left:range.bounds().right,
                        top:range.bounds().top,
                        bottom:range.bounds().bottom,
                    }
                })){

                }
            }
        }
    }

    @functionLog("听书奖励领取")
    listenReward(): void{
        this.goTo(this.tab, 2)
        if(this.scrollClick("去看小说")){
            if(fixedClick("待领取")){
                fixedClick("待领取")
            }
        }
    }
}