import { dialogClick, findAndClick, normalClick, randomClick } from "../common/click";
import { scrollTo } from "../common/search";
import { doFuncAtGivenTime, moveDown, resizeX, resizeY, } from "../common/utils";
import { NAME_VEDIO_TIKTOK_LITE, PACKAGE_VEDIO_TIKTOK_LITE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { Base, BaseKey } from "./abstract/Base";

export class TikTokVolcano extends Base{

    register: UiSelector

    constructor(){
        super()
        this.appName = NAME_VEDIO_TIKTOK_LITE
        this.packageName = PACKAGE_VEDIO_TIKTOK_LITE
        this.register = className("android.widget.ImageView").depth(19).drawingOrder(1)
        this.tab = id(this.packageName+":id/root_view").boundsInside(0,device.height * 4 / 5, device.width, device.height)
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
    }
    @measureExecutionTime
    medEff(): void {
        this.watchLive()
        this.shopping()
    }
    @measureExecutionTime
    lowEff(time: number): void {
        doFuncAtGivenTime(time, 10 * 60, (perTime: number) => {
            this.swipeVideo(perTime)
            this.openTreasure()
            this.watchAds()
        })
    }
    @measureExecutionTime
    weight(): void {
        if(!text("日常任务").exists()){
            this.goTo(this.register, -1)
        }
        scrollTo("金币收益")
        normalClick(resizeX(random(104, 328)), resizeY(random(389, 493)))
        let tmp = textMatches(/(\d+)/)
        .boundsInside(0, 0, resizeX(328), resizeY(594)).findOnce()
        if(tmp != null) {
            this.store(BaseKey.Weight, parseInt(tmp.text()))
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goto(-1)
        this.watchAdsForCoin("日常福利")
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goto(-1)
        if(findAndClick(text("开宝箱得金币"))){
            this.watchAdsForCoin("日常任务")
        }
    }

    @functionLog("看视频")
    watchAds(): void {
        if(!text("日常任务").exists()){
            this.goTo(this.register, -1)
        }
        if(findAndClick(text("去观看"))){
            // this.watchUntil()
        }
    }

    @functionLog("看直播")
    watchLive(): void {
        if(!text("日常任务").exists()){
            this.goTo(this.register, -1)
        }
        if(findAndClick(text("去看看"))){
            for(let i = 0;i<10;i++){
                let tmp = text("开宝箱").findOne(3 * 65 * 1000)
                if(tmp != null) {
                    randomClick(tmp.bounds())
                    back()
                }
            }
            this.backUntilFind(text("日常任务"))
        }
    }

    @functionLog("逛街")
    shopping(): void{
        if(!text("日常任务").exists()){
            this.goTo(this.register, -1)
        }
        if(findAndClick(text("去逛街"))){
            moveDown(95, 2)
        }
    }

    @functionLog("晚安小岛")
    goodNight(): void{
        if(!text("日常任务").exists()){
            this.goTo(this.register, -1)
        }
        if(findAndClick(text("去小岛"))){
            if(findAndClick(text("我睡觉了"))){
                this.backUntilFind(text("日常任务"))
            }
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 0)
        moveDown(totalTime, 10)
    }

    //自定义跳转
    goto(num: number){
        //任务页
        if(num === -1){
            if(this.tab.exists()){
                log(this.tab.findOnce())
                this.goTo(this.register, num)
            } else {
                Record.log("日常任务")
                this.backUntilFind(text("日常任务"))
            }
        } else {
            this.goTo(this.tab, num)
        }
    }
}