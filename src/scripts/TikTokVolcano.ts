import { dialogClick, findAndClick, findByOcrAndClick, fixedClick, randomClick } from "../common/click";
import { Move } from "../common/enums";
import { closeByImageMatching, searchByOcrRecognize } from "../common/ocr";
import { search } from "../common/search";
import { convertSecondsToMinutes, getNumFromComponent, moveDown, swipeDown, swipeUp, waitRandomTime } from "../common/utils";
import { NAME_VEDIO_TIKTOK_VOLCANO, NORMAL_WAIT_TIME, PACKAGE_VEDIO_TIKTOK_VOLCANO } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { AbstractTikTok } from "./abstract/AbstractTikTok";
import { BaseKey } from "./abstract/Base";

export class TikTokVolcano extends AbstractTikTok{

    constructor(){
        super()
        this.appName = NAME_VEDIO_TIKTOK_VOLCANO
        this.packageName = PACKAGE_VEDIO_TIKTOK_VOLCANO
        this.initialComponent = text("首页")
        this.exchangeRate = 30000
    }

    @measureExecutionTime
    weight(): void {
        this.goto()
        while(searchByOcrRecognize("今日领取火苗.*") === undefined){
            this.move()
        }
        const component = searchByOcrRecognize("今日领取火苗.*")
        if(component !== undefined){
            const weight = getNumFromComponent(component.text)
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goto()
        this.watchAdsForCoin("我的赠送榜")
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goto()
        if(findByOcrAndClick("开宝箱得火苗", {feedback:true})){
            this.watchAdsForCoin("我的赠送榜")
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goto()
        if(this.scrollOcrClick("去领取", "限时任务赚火苗.*")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("我的赠送榜"))
            return true
        }
        return false
    }

    @functionLog("逛街")
    shopping(): void{
        this.goto()
        if(this.scrollOcrClick("去逛街", "逛街得火苗.*")){
            moveDown(65, 4)
            this.backUntilFind(text("我的赠送榜"))
        }
    }

    @functionLog("看直播")
    watchLive(): void{
        this.goto()
        if(this.scrollOcrClick("去看看", "看直播领火苗.*")){
            while(textEndsWith("后可开").exists()){
                let tmp = text("开宝箱").findOne(3 * 60 * 1000)
                if(tmp != null){
                    randomClick(tmp.bounds())
                    dialogClick("收下火苗")
                } else {
                    break
                }
            }
            this.backUntilFind(text("我的赠送榜"))
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goTo(text("首页"), -1)
        this.first = true
        Record.log(`预计刷视频${convertSecondsToMinutes(totalTime)}分钟`)
        moveDown(totalTime, 10)
    }

    move(): void{
        const before = search("我的赠送榜", {
            throwErrIfNotExist:true
        })
        if(this.moveFlag){
            swipeDown(Move.Fast, 1000)
        } else {
            swipeUp(Move.Fast, 1000)
        }
        waitRandomTime(2)
        const after = search("我的赠送榜", {
            throwErrIfNotExist:true
        })
        if(before?.bounds().top === after?.bounds().top){
            if(!closeByImageMatching()){
                this.moveFlag = !this.moveFlag
            }
        }
    }

    //自定义跳转
    goto(){
        if(this.first){
            this.goTo(text("首页"), -1)
            if(fixedClick(desc("侧边栏"))){
                if(fixedClick("火苗")){
                    this.first = false
                }
            }
        }
    }
}