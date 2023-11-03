import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_READ_SPEED_FREE, PACKAGE_READ_SPEED_FREE, RANGE_FOUR_FIFTHS_SCREEN } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { findAndClick, merge, doFuncAtGivenTime, doFuncUntilPopupsGone, randomClickChildInList, scrollTo, waitRandomTime, normalClick, resizeX, resizeY } from "../lib/utils";
import { Base, BaseKey } from "./abstract/Base";

export class SpeedFree extends Base {

    buttonNameList:string[] = [
        '看视频再领[0-9]+金币',
        '看视频最高领[0-9]+金币'
    ]

    constructor() {
        super()
        this.appName = NAME_READ_SPEED_FREE
        this.packageName = PACKAGE_READ_SPEED_FREE
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 20 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
    }

    @measureExecutionTime
    medEff(): void {
        this.listenBook()
        this.watchAds()
        this.reward()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        time -= 5 * 60
        doFuncAtGivenTime(time, 10 * 60, (perTime:number) => {
            this.readBook(perTime)
            this.openTreasure()
        })
        this.reward()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(desc("discovery_button"), -1)
        scrollTo(text("金币收益"))
        let tmp = textMatches("[0-9]+").boundsInside(0,0,resizeX(420), resizeY(432)).findOnce()
        if(tmp != null) {
            this.store(BaseKey.Weight, parseInt(tmp.text()))
        }
    }

    
    @functionLog("签到")
    signIn(): void{
        this.goTo(desc("discovery_button"), -1)
        if (findAndClick(textStartsWith("立即签到"))) {
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: ()=>{
                    this.watch(text("日常福利"))
                }
            })
            findAndClick(text("我知道了"))
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(desc("discovery_button"), -1)
        if(findAndClick(text("开宝箱得金币"))) {
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: ()=>{
                    this.watch(text("日常福利"))
                }
            })
            findAndClick(text("我知道了"))
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goTo(desc("discovery_button"), -1)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick(text("去观看"), {bounds: RANGE_FOUR_FIFTHS_SCREEN})){
            this.watch(text("日常福利"))
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: ()=>{
                    this.watch(text("日常福利"))
                }
            })
            findAndClick(text("我知道了"))
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(desc("bookstore_button"), -1)
        normalClick(resizeX(320), resizeY(400))
        randomClickChildInList(
            classNameMatches(merge([
                "android.support.v7.widget.RecyclerView",
                "android.view.ViewGroup"
        ])).depth(17).drawingOrder(1),
            random(0, 7)
        )
        this.read(totalTime)
    }
    
    @functionLog("听书")
    listenBook(): void {
        this.goTo(desc("bookstore_button"), -1)
        normalClick(resizeX(750), resizeY(385))
        randomClickChildInList(
            className("android.view.ViewGroup").depth(16).drawingOrder(2)
            .boundsInside(resizeX(36),resizeY(648),resizeX(1044), resizeY(1037)), 
            random(0, 3))
        if(findAndClick(text("立即收听"))){
            if(findAndClick(text("看视频"))){
                this.watch(id("com.zhangyue.iReader.bookStore:id/listen_add_bk_tv"))
            }
            back()
            waitRandomTime(4)
        }
        back()
    }

    @functionLog("领饭补")
    mealSupp(): void {
        this.goTo(desc("discovery_button"), -1)
        if(findAndClick(text("立即领取"), {
            searchByLeftRangeOption: text("吃饭赚钱"),
            bounds: RANGE_FOUR_FIFTHS_SCREEN
        })) {
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: ()=>{
                    this.watch(text("日常福利"))
                }
            })
            findAndClick(text("我知道了"))
        }
    }

    @functionLog("领取所有奖励")
    reward(): void {
        this.goTo(desc("discovery_button"), -1)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick(text("领取"), {bounds: RANGE_FOUR_FIFTHS_SCREEN})) {
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: ()=>{
                    this.watch(text("日常福利"))
                }
            })
            findAndClick(text("我知道了"))
        }
    }
}