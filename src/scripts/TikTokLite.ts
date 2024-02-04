import { dialogClick, findAndClick, findByOcrAndClick, fixedClick, randomClick, scrollClick } from "../common/click";
import { Move } from "../common/enums";
import { closeByImageMatching, searchByOcrRecognize } from "../common/ocr";
import { search } from "../common/search";
import { convertSecondsToMinutes, getNumFromComponent, moveDown, replaceCharacters, swipeDown, swipeUp, waitRandomTime } from "../common/utils";
import { NAME_VEDIO_TIKTOK_LITE, NORMAL_WAIT_TIME, PACKAGE_VEDIO_TIKTOK_LITE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
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
        const sign = searchByOcrRecognize("日常任务|已经到底了", {waitFor:2})
        if(sign){
            if(RegExp("^"+replaceCharacters("日常任务")+"$").test(sign.text)){
                this.moveFlag = true
            } else {
                this.moveFlag = false
            }
        }
    }

    @measureExecutionTime
    weight(): void {
        this.goto(-1)
        while(searchByOcrRecognize("金币收益.*") === undefined){
            this.move()
        }
        const component = searchByOcrRecognize("金币收益.*")
        if(component){
            let weight = getNumFromComponent(component.text)
            if(weight === 0){
                const component1 = searchByOcrRecognize("[0-9]+")
                if(component1){
                    weight = getNumFromComponent(component1.text)
                }
            }
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goto(-1)
        if(dialogClick("立即签到.+|立即领取.+")){
            this.watchAdsForCoin("日常任务")
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goto(-1)
        if(findByOcrAndClick("开宝箱得金币|点击立得[0-9]+", {
            bounds:{top:device.height*4/5,left:device.width/3},
        })){
            this.watchAdsForCoin("日常任务")
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goto(-1)
        if(this.scrollOcrClick("去领取", "看广告赚金币.*")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("日常任务"))
            return true
        }
        return false
    }

    @functionLog("看直播")
    watchLive(): void {
        this.goto(-1)
        if(this.scrollOcrClick("去看看", "看直播开宝箱.*")){
            while(search(".*后可开|开宝箱")){
                const tmp = search("开宝箱", {waitFor:3*60})
                if(tmp){
                    randomClick(tmp.bounds())
                    closeByImageMatching()
                } else {
                    break
                }
            }
        }
    }

    @functionLog("浏览爆款")
    shoppingHot():void{
        this.goto(-1)
        if(this.scrollOcrClick("去抢购", "浏览爆款得金币.*")){
            moveDown(130, 2)
        }
    }

    @functionLog("逛街")
    shopping(): void{
        this.goto(-1)
        if(this.scrollOcrClick("去逛街", "逛街赚钱.*")){
            const com = search("[0-9]+秒", {
                bounds:{
                    left:device.width*2/3,
                    top:device.height*2/3
            }})
            if(com){
                moveDown(parseInt(com.text()), 4)
            }
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goto(0)
        Record.log(`预计刷视频${convertSecondsToMinutes(totalTime)}分钟`)
        moveDown(totalTime, 10)
    }

    //自定义跳转
    goto(num: number){
        this.goTo(this.tab, 0)
        if(num === -1){
            if(this.first){
                const component = search(className("android.widget.HorizontalScrollView"), {
                    throwErrIfNotExist:true
                })
                if(component){
                    if(findAndClick(className("android.widget.FrameLayout"),{
                        fixed:true, 
                        bounds:{
                            top:component.bounds().bottom, 
                            bottom:device.height / 3}})){
                        this.first = false
                    }
                }
            }
        } else if(num === 0){
            if(!this.first){
                this.first = true
                back()
            }
        }
    }
}