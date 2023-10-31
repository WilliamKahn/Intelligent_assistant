import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_READ_TOMATO_FREE, PACKAGE_READ_TOMATO_FREE, RANGE_MIDDLE_SCREEN } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { randomClick, findAndClick, doFuncUntilPopupsGone, randomClickChildInList, scrollTo, doFuncAtGivenTime, resizeX, resizeY, merge, normalClick } from "../lib/utils";
import { AbstractTomato } from "./abstract/AbstractTomato";
import { BaseKey } from "./abstract/Base";



export class TomatoFree extends AbstractTomato {

    constructor() {
        super()
        this.appName = NAME_READ_TOMATO_FREE
        this.packageName = PACKAGE_READ_TOMATO_FREE
        this.tab = id(this.packageName +":id/bhe")
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 35 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        this.mealSupp()
    }

    @measureExecutionTime
    medEff(): void {
        this.listenBook()
        this.watchAds()
        this.reward()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        //阅读，预留五分钟给领奖
        time -= 5 * 60
        //每十分钟执行一次
        doFuncAtGivenTime(time, 10 * 60, (perTime: number)=>{
            this.readBook(perTime)
            this.openTreasure()
        })
        this.reward()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 2)
        scrollTo(text("金币收益"))
        let tmp = textMatches(/(\d+)/)
        .boundsInside(0, 0, resizeX(581), resizeY(567)).findOnce()
        if(tmp != null) {
            this.store(BaseKey.Weight, parseInt(tmp.text()))
        }
    }

    @functionLog("签到")
    signIn(): void{
        this.goTo(this.tab, 2)
        if(findAndClick(text("福利中心"))){
            this.sign()
            scrollTo(text("金币献爱心"))
            if(findAndClick(text("去签到"), {bounds: RANGE_MIDDLE_SCREEN})) {    
                this.sign()
            }
        }
    }
    
    @functionLog("听书")
    listenBook(): void {
        this.goTo(this.tab, 0)
        
        if(findAndClick(text("听书"))){
            randomClickChildInList(
                className("androidx.recyclerview.widget.RecyclerView")
                .depth(21).drawingOrder(1),
                random(0, 1)
            )
            normalClick(resizeX(random(240,1032)), resizeY(random(420,2094)))
            findAndClick(className("android.widget.FrameLayout")
            .depth(10).drawingOrder(4))
        }
    }

    @functionLog("领取餐补")
    mealSupp(): void{
        this.goTo(this.tab, 2)
        if(findAndClick(text("去领取"), {
            searchByLeftRangeOption: textMatches("吃饭补贴.+"), 
            bounds: RANGE_MIDDLE_SCREEN
        })){
            let reward = textStartsWith("领取").findOnce()
            if(reward != null) {
                randomClick(reward)
                doFuncUntilPopupsGone(this.buttonNameList, {
                    func: () => { 
                        this.watch(text("日常福利"))
                    }
                })
            }
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 0)
        if(findAndClick(text("经典"))){
            if(findAndClick(text("完整榜单"))){
                randomClickChildInList(
                    className("android.view.View").depth(19).drawingOrder(0)
                    .boundsInside(resizeX(213),resizeY(249), resizeX(1080),resizeY(2340)),
                    random(1, 6)
                )
                normalClick(resizeX(540), resizeY(1170))
                this.read(totalTime)
            }
        }
    }

    @functionLog("领取所有奖励")
    reward(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && 
            findAndClick(text("立即领取"),{
                searchByLeftRangeOption: text("阅读赚金币"),
                bounds: RANGE_MIDDLE_SCREEN
            })
        ) {
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: () => { 
                    this.watch(text("日常福利"))
                }
            })
        }
        while(++cycleCounts < MAX_CYCLES_COUNTS && 
            findAndClick(text("立即领取"),{
                searchByLeftRangeOption: text("听书赚金币"),
                bounds: RANGE_MIDDLE_SCREEN
            })
        ) {
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: () => { 
                    this.watch(text("日常福利"))
                }
            })
        }
    }

    @functionLog("看视频")
    watchAds(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick(text("立即领取"), {
                searchByLeftRangeOption: textMatches("看视频赚金币.+"),
                bounds: RANGE_MIDDLE_SCREEN
            })){
            this.watch(text("日常福利"))
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        this.open()
    }

}