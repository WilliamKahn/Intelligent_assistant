import { dialogClick, findAndClick, fixedClick, randomClick, scrollClick } from "../common/click";
import { closeByImageMatching } from "../common/ocr";
import { search } from "../common/search";
import { convertSecondsToMinutes, moveDown, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_VEDIO_WATERMELON, NORMAL_WAIT_TIME, PACKAGE_VEDIO_WATERMELON } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { Base, BaseKey } from "./abstract/Base";

export class Watermelon extends Base {

    constructor() {
        super()
        this.appName = NAME_VEDIO_WATERMELON
        this.packageName = PACKAGE_VEDIO_WATERMELON
        this.initialNum = 0
        this.medEffInheritance = true
        this.lowEff1Inheritance = true
        this.lowEff1Index = 5
        this.exchangeRate = 33000
    }

    reSearchTab(): void {
        const component = search("我的", {
            throwErrIfNotExist:true,fixed:true
        })
        if(component){
            const tmp:any = search(
                className("android.widget.LinearLayout")
                .clickable(false)
                .boundsInside(0, device.height*2/3, device.width, device.height)
                .boundsContains(0, component.bounds().top,device.width, component.bounds().top))
            if(tmp){
                this.tab = id(tmp.id())
                this.initialComponent = this.tab
                Record.debug(`${this.tab}`)
            } else {
                throw "id定位失败"
            }
        }
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        this.watchLive()
        this.mealSupp()
    }

    @measureExecutionTime
    medEff(): void {
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && this.watchAds()){
            this.openTreasure()
            this.swipeVideo(10 * 60)
        }
        this.swipeReward()
        this.lowEff1Start = 3
    }

    @measureExecutionTime
    lowEff1(time: number): void {
        this.swipeVideo(time)
        this.openTreasure()
        this.swipeReward()
    }

    @measureExecutionTime
    weight(): void {
        this.goto(-1)
        const component = search("我的金币:",{
            throwErrIfNotExist:true
        })
        if(component){
            const component1 = search("[0-9]+",{
                bounds:{
                    left:component.bounds().right,
                    top:component.bounds().top,
                    bottom:component.bounds().bottom}})
            if(component1){
                const weight = parseInt(component1.text())
                Record.debug(`${this.constructor.name}:${weight}`)
                this.store(BaseKey.Weight, weight)
            }
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goto(-1)
        if(findAndClick("立即签到.+",{fixed:true,feedback:true})){
            this.watchAdsForCoin("每日任务")
        } else {
            if(scrollClick("签到","签到领金币|明日签到")){
                if(findAndClick("立即签到.+",{fixed:true,feedback:true})){
                    this.watchAdsForCoin("每日任务")
                }
            }
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goto(-1)
        if(fixedClick("点击领金币")){
            this.watchAdsForCoin("每日任务")
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goto(-1)
        if(scrollClick("领取", "看广告赚金币")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("每日任务"))
            return true
        }
        return false
    }

    @functionLog("看直播")
    watchLive(): void {
        this.goto(-1)
        if(scrollClick("领取", "看直播赚金币")){
            if(findAndClick("直播宝箱",{
                disableCoverCheck:true,
                disableGrayCheck:true, 
                fixed:true
            })){
                while(search("再等一下")){
                    const tmp = search("开宝箱", {waitFor:40, fixed:true})
                    if(tmp){
                        randomClick(tmp.bounds())
                        waitRandomTime(2)
                        //会点击右上角的关闭
                        closeByImageMatching()
                    } else {
                        break
                    }
                }
            }
            this.backUntilFind(text("每日任务"))
        }
    }
    @functionLog("吃饭打卡")
    mealSupp(): void {
        this.goto(-1)
        if(scrollClick("领取", "吃饭打卡赚金币")){
            this.watchAdsForCoin("已打卡")
            let cycleCounts = 0
            while(++cycleCounts < MAX_CYCLES_COUNTS 
                && fixedClick("点击补卡")){
                if(fixedClick("去补卡")){
                    waitRandomTime(NORMAL_WAIT_TIME)
                    this.watch(text("已打卡"))
                }
            }
            this.backUntilFind(text("每日任务"))
        }
    }

    @functionLog("开启翻倍")
    doubleEarn(): void{
        this.goto(-1)
        if(findAndClick("点击翻倍")){
            dialogClick("我知道了")
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goto(0)
        Record.log(`预计刷视频${convertSecondsToMinutes(totalTime)}分钟`)
        moveDown(totalTime, 30)
    }

    @functionLog("看视频奖励领取")
    swipeReward():void{
        this.goto(-1)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick("可领取")){
            this.watchAdsForCoin("每日任务")
        }
    }

    goto(num: number):void{
        if(num === -1){
            if(this.first){
                if(fixedClick(id("com.ixigua.plugin.uglucky:id/root_view_duration_view_use_as_tag"))){
                    this.first = false
                }
            }
        } else {
            this.first = true
            this.goTo(this.tab, num)
        }
    }
}