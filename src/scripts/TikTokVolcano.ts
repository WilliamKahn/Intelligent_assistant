import { dialogClick, findAndClick, fixedClick, randomClick } from "../common/click";
import { Move } from "../common/enums";
import { search, searchByOcrRecognize } from "../common/search";
import { closeByImageMatching, getNumFromComponent, moveDown, swipeDown, swipeUp, waitRandomTime } from "../common/utils";
import { NAME_VEDIO_TIKTOK_VOLCANO, PACKAGE_VEDIO_TIKTOK_VOLCANO } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
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
        if(findAndClick(".?开宝箱得火苗.?", 
        {ocrRecognize:true, fixed:true, feedback:true})){
            this.watchAdsForCoin("我的赠送榜")
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goto()
        if(this.scrollOcrClick(".?去领取.?", "限时任务赚火苗.*")){
            this.watch(text("我的赠送榜"))
            return true
        }
        return false
    }

    @functionLog("逛街")
    shopping(): void{
        this.goto()
        if(this.scrollOcrClick(".?去.?街.?", ".?街得火苗.*")){
            moveDown(65, 4)
            this.backUntilFind(text("我的赠送榜"))
        }
    }

    @functionLog("看直播")
    watchLive(): void{
        this.goto()
        if(this.scrollOcrClick(".?去看看.?", "看直播领火苗.*")){
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
        moveDown(totalTime, 10)
    }

    move(): void{
        const before = search("我的赠送榜", {waitFor:true})
        if(this.moveFlag){
            swipeDown(Move.Fast, 1000)
        } else {
            swipeUp(Move.Fast, 1000)
        }
        waitRandomTime(2)
        const after = search("我的赠送榜", {waitFor:true})
        if(before?.bounds.top === after?.bounds.top){
            if(!closeByImageMatching()){
                this.moveFlag = !this.moveFlag
            }
        }
    }

    //自定义跳转
    goto(){
        if(text("首页").exists()){
            this.goTo(text("首页"), -1)
            if(fixedClick(desc("侧边栏"))){
                fixedClick("火苗")
            }
        } else {
            this.backUntilFind(text("我的赠送榜"))
        }
    }
}