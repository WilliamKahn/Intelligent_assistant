import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_VEDIO_YOUSHI, PACKAGE_VEDIO_YOUSHI, RANGE_FOUR_FIFTHS_SCREEN, RANGE_MIDDLE_SCREEN } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { findAndClick, moveDown, doFuncAtGivenTime, doFuncUntilPopupsGone, waitRandomTime, resizeX, resizeY, normalClick } from "../lib/utils";
import { Base, BaseKey } from "./abstract/Base"

export class YouShi extends Base{

    buttonNameList:string[] = [
        '看视频再?领[0-9]+金币',
    ]

    returnOfWatchAds: boolean = false

    constructor() {
        super()
        this.appName = NAME_VEDIO_YOUSHI
        this.packageName = PACKAGE_VEDIO_YOUSHI
        this.tab = id("android:id/tabs")
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 100 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.walkEarn()
        this.mealSupp()
        this.sleepEarn()
        this.doubleEarn()
    }

    @measureExecutionTime
    medEff(): void {
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS){
            this.watchAds()
            if(!this.returnOfWatchAds){
                Record.debug("break")
                break
            }
            this.openTreasure()
            this.readBook(10 * 60)
        }
        this.reward()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        time -= 2 * 60
        //每十分钟执行一次
        doFuncAtGivenTime(time, 10 * 60, (perTime:number) =>{
            this.watchAds()
            this.openTreasure()
            this.swipeVideo(perTime)
        })
        this.reward()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 3)
        if(findAndClick(textMatches("我的金币:.*"))) {
            let tmp = textMatches(/(\d+)/)
            .boundsInside(0, 0, resizeX(500), resizeY(600)).findOnce()
            if(tmp != null) {
                Record.debug(`${this.constructor.name}:${tmp.text()}`)
                this.store(BaseKey.Weight, parseInt(tmp.text()))
            }
        }
    }

    @functionLog("签到")
    signIn(): void{
        this.goTo(this.tab, 3)
        if(findAndClick(text("立即签到"), {bounds: RANGE_MIDDLE_SCREEN})){
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: ()=>{
                    this.watch(text("日常任务"))
                }
            })
            findAndClick(text("开心收下"))
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 3)
        if (findAndClick(text("开宝箱得金币"))) {
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: ()=>{
                    this.watch(text("日常任务"))
                }
            })
            findAndClick(text("开心收下"))
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goTo(this.tab, 3)
        if(findAndClick(text("领福利"))){
            this.watch(text("日常任务"))
            this.returnOfWatchAds = true
        } else {
            this.returnOfWatchAds = false
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 1)
        moveDown(totalTime, 15)
    }

    @functionLog("领取所有奖励")
    reward(): void {
        this.goTo(this.tab, 3)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS  && findAndClick(text("点击领取"))){
            if(findAndClick(text("开始抽奖"))){
                normalClick(resizeX(random(395, 689)), resizeY(random(750, 1067)))
                if(findAndClick(text("点击领取").boundsInside(resizeX(0),resizeY(1190),resizeX(1080), resizeY(1305)))){
                    break
                }
            }
        }
    }

    @functionLog("吃饭补贴")
    mealSupp(): void {
        this.goTo(this.tab, 3)
        if(findAndClick(text("吃饭补贴"))){
            if(findAndClick(textMatches("领取.*补贴[0-9]+金币"))){
                doFuncUntilPopupsGone(this.buttonNameList, {
                    func: ()=>{
                        this.watch(text("日常任务"))
                    }
                })
                findAndClick(text("开心收下"))
            }
        }
    }

    @functionLog("走路赚钱")
    walkEarn(): void{
        this.goTo(this.tab, 3)
        if(findAndClick(text("走路赚钱"))){
            if(findAndClick(textMatches("领取[0-9]+金币"))){
                doFuncUntilPopupsGone(this.buttonNameList, {
                    func: ()=>{
                        this.watch(text("走路奖励"))
                    }
                })
                findAndClick(text("开心收下"))
            }
        }
    }

    @functionLog("睡觉赚钱")
    sleepEarn(): void{
        this.goTo(this.tab, 3)
        if(findAndClick(text("睡觉赚钱"))){
            if(findAndClick(text("我睡醒了"))){
                if(findAndClick(textMatches("领取[0-9]+金币"))){
                    doFuncUntilPopupsGone(this.buttonNameList, {
                        func: ()=>{
                            this.watch(textEndsWith("后可开启"))
                        }
                    })
                    findAndClick(text("开心收下"))
                }
            }
            findAndClick(text("我要睡了"))
        }
    }

    doubleEarn(): void{
        this.goTo(this.tab, 3)
        if(findAndClick(text("去翻倍"))){
            waitRandomTime(2)
            findAndClick(text("我知道了"))
        }
    }
}
