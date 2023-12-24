import { dialogClick, findAndClick, fixedClick, normalClick, ocrClick, randomClick } from "../common/click";
import { Move } from "../common/enums";
import { scrollTo, search, searchByOcrRecognize } from "../common/search";
import { closeByImageMatching, doFuncAtGivenTime, getNumFromComponent, moveDown, resizeX, resizeY, swipeDown, swipeUp, waitRandomTime, } from "../common/utils";
import { NAME_VEDIO_TIKTOK_LITE, PACKAGE_VEDIO_TIKTOK_LITE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { AbstractTikTok } from "./abstract/AbstractTikTok";
import { BaseKey } from "./abstract/Base";

export class TikTokLite extends AbstractTikTok{

    constructor(){
        super()
        this.appName = NAME_VEDIO_TIKTOK_LITE
        this.packageName = PACKAGE_VEDIO_TIKTOK_LITE
        this.tab = id(this.packageName+":id/root_view")
        this.initialComponent = this.tab
        this.initialNum = 0
    }

    move(): void {
        if(this.moveFlag){
            swipeDown(Move.Fast, 1000)
        } else {
            swipeUp(Move.Fast, 1000)
        }
        waitRandomTime(2)
        if(searchByOcrRecognize("日常任务")[0] !== undefined){
            this.moveFlag = true
        }
        if(searchByOcrRecognize("已经到底了")[0] !== undefined){
            this.moveFlag = false
        }
    }

    @measureExecutionTime
    weight(): void {
        this.goto(-1)
        while(searchByOcrRecognize("金币收益.*")[0] === undefined){
            this.move()
        }
        const [_, name]:any = searchByOcrRecognize("金币收益.*")
        let weight = getNumFromComponent(name)
        if(weight === 0){
            const [_, num]:any = searchByOcrRecognize("[0-9]+")
            weight = getNumFromComponent(num)
        }
        this.store(BaseKey.Weight, weight)
    }

    @functionLog("签到")
    signIn(): void {
        this.goto(-1)
        if(dialogClick("立即签到.+|立即领取.+")){
            this.watchAdsForCoin("首页")
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goto(-1)
        if(findAndClick(".?开宝箱得金币", {ocrRecognize:true, bounds:{top:device.height*4/5,left:device.width/3}})){
            this.watchAdsForCoin("首页")
        }
    }

    @functionLog("看视频")
    watchAds(): void {
        this.goto(-1)
        if(this.scrollOcrClick(".?去领取.?", "看广告赚金币.*")){
            this.watch(text("首页"))
        }
    }

    @functionLog("看直播")
    watchLive(): void {
        this.goto(-1)
        if(this.scrollOcrClick(".?去看看.?", "看直播开宝箱.*")){
            while(textEndsWith("后可开").exists()){
                let tmp = text("开宝箱").findOne(3 * 60 * 1000)
                if(tmp != null){
                    randomClick(tmp.bounds())
                    closeByImageMatching()
                } else {
                    break
                }
            }
            this.backUntilFind(text("首页"))
        }
    }

    @functionLog("浏览爆款")
    shoppingHot():void{
        this.goto(-1)
        if(this.scrollOcrClick(".?去抢购.?", ".?浏览爆款得金币.*")){
            moveDown(130, 2)
            this.backUntilFind(text("首页"))
        }
    }

    @functionLog("逛街")
    shopping(): void{
        this.goto(-1)
        if(this.scrollOcrClick(".?去.?街.?", ".?街赚钱.*")){
            moveDown(65, 4)
            this.backUntilFind(text("首页"))
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goto(0)
        moveDown(totalTime, 10)
    }

    //自定义跳转
    goto(num: number){
        const [bounds,_] = search(className("android.widget.HorizontalScrollView"))
        const center = (bounds.top + bounds.bottom)/2
        this.goTo(this.tab, 0)
        //任务页
        if(num === -1){
            if(center < 500){
                findAndClick(className("android.widget.FrameLayout"),{fixed:true, bounds:{top:center, bottom:device.height / 3, left:device.width * 2 / 3}})
            } else {
                this.backUntilFind(this.tab)
            }
        } else if(num === 0){
            if(center > 500){
                back()
            }
        }
    }
}