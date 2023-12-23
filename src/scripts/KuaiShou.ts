import { dialogClick, findAndClick, fixedClick, scrollClick } from "../common/click";
import { Move } from "../common/enums";
import { scrollTo } from "../common/search";
import { closeByImageMatching, convertSecondsToMinutes, doFuncAtGivenTime, doFuncAtGivenTimeByEstimate, moveDown, randomExecute, resizeX, resizeY, swipeDown, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_VEDIO_KUAISHOU, PACKAGE_VEDIO_KUAISHOU, WAIT_TIME_AFTER_CLICK } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { Base, BaseKey } from "./abstract/Base";

export class KuaiShou extends Base{

    register: UiSelector

    constructor(){
        super()
        this.appName = NAME_VEDIO_KUAISHOU
        this.packageName = PACKAGE_VEDIO_KUAISHOU
        this.tab = id(this.packageName+":id/tab_layout")
        this.register = id(this.packageName + ":id/pendant_mask_bg")
        this.initialComponent = this.tab
        this.initialNum = 1
        this.depth = 1
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, 30 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        fixedClick("我知道了")
        this.signIn()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.mealSupp()},
            ()=>{this.like()},
            ()=>{this.comment()},
            ()=>{this.collect()},
            ()=>{this.like()},
            ()=>{this.comment()},
            ()=>{this.collect()},
        ])
    }
    @measureExecutionTime
    lowEff(time: number): void {
        let count = 0
        doFuncAtGivenTimeByEstimate(time/2, ()=>{
            this.watchAds()
            if(++count % 25 === 0){
                this.openTreasure()
            }
        })
        doFuncAtGivenTime(time/2, 25 * 60, (perTime: number) => {
            this.swipeVideo(perTime)
            this.openTreasure()
        })
        this.reward()
    }
    @measureExecutionTime
    weight(): void {
        this.goto(-1)
        scrollTo("[0-9]+", {coverBoundsScaling:1})
        let tmp = textMatches(/(\d+)/)
        .boundsInside(0, 0, resizeX(549), resizeY(429)).findOnce()
        if(tmp != null) {
            const weight = parseInt(tmp.text())
            Record.debug(`weight: ${weight}`)
            this.store(BaseKey.Weight, weight)
        }
    }
    
    @functionLog("签到")
    signIn(): void {
        this.goto(-1)
        if(dialogClick("立即领取")) {
            this.watchAdsForCoin("日常任务")
            closeByImageMatching()
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goto(1)
        Record.log(`预计刷视频${convertSecondsToMinutes(totalTime)}分钟`)
        moveDown(totalTime, 10)
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goto(-1)
        if(fixedClick("立刻领[0-9]+金币")){
            this.watchAdsForCoin("日常任务")
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goto(-1)
        if(findAndClick("领福利 赚更多", {
            coverBoundsScaling:1.2, 
            leftRange:"看广告得.*金币", 
            clickUntilGone:true})){
            this.watch(text("日常任务"))
            return true
        }
        return false
    }

    @functionLog("看直播")
    watchlive(): void {
        this.goto(-1)
        if(findAndClick("去观看 限时领", {
            coverBoundsScaling:1.2, 
            leftRange:"看直播得.*金币", 
            clickUntilGone:true})){
            for(let i = 0;i < 6;i++){
                swipeDown(Move.Fast, 1000)
                waitRandomTime(2)
                if(findAndClick(id(this.packageName+":id/photo"), {
                    index: random(0,3),
                    waitTimes: 40
                })){
                    this.backUntilFind(id(this.packageName+":id/photo"))
                }
            }
            this.backUntilFind(text("日常任务"))
            if(findAndClick("领金币 限时领", {coverBoundsScaling:1.2, leftRange:"看直播得.*金币"})){
                dialogClick("知道了")
            }
        }
    }

    @functionLog("领饭补")
    mealSupp(): void {
        this.goto(-1)
        if(scrollClick("去查看|去领取", "到饭点领饭补")){
            let cycleCounts = 0
            if(fixedClick("领取饭补")){
                this.watchAdsForCoin("看直播")
            }
            while(++cycleCounts < MAX_CYCLES_COUNTS && fixedClick(".*待补签")){
                this.watch(text("已补签"))
            }
        }
    }

    @functionLog("点赞")
    like(): void{
        this.goto(-1)
        if(scrollClick("去点赞", "点赞1个作品")){
            this.preNum = 1
            swipeDown(Move.Fast, 400)
            waitRandomTime(2)
            let cycleCounts = 0
            while(++cycleCounts < MAX_CYCLES_COUNTS 
                && !fixedClick(id(this.packageName+":id/like_icon"))){
                swipeDown(Move.Fast, 400)
                waitRandomTime(2)
            }
        }
    }

    @functionLog("评论")
    comment(): void{
        this.goto(-1)
        if(scrollClick("去评论", "评论1个作品")){
            this.preNum = 1
            swipeDown(Move.Fast, 400)
            waitRandomTime(2)
            let cycleCounts = 0
            while(++cycleCounts < MAX_CYCLES_COUNTS
                && !fixedClick(id(this.packageName+":id/comment_icon"))){
                swipeDown(Move.Fast, 400)
                waitRandomTime(2)
            }
            if(++cycleCounts < MAX_CYCLES_COUNTS 
                && fixedClick(id(this.packageName+":id/editor_holder_text"))){
                let tmp = id(this.packageName+":id/editor").findOnce()
                if(tmp != null){
                    tmp.setText("打卡")
                    waitRandomTime(3)
                    if(fixedClick(id(this.packageName+":id/finish_button"))){
                        back()
                    }
                }
            }
        }
    }

    @functionLog("收藏")
    collect(): void{
        this.goto(-1)
        if(scrollClick("去收藏", "收藏1个作品")){
            this.preNum = 1
            swipeDown(Move.Fast, 400)
            waitRandomTime(2)
            let cycleCounts = 0
            while(++cycleCounts < MAX_CYCLES_COUNTS 
                && !fixedClick(id(this.packageName+":id/collect_icon"))){
                swipeDown(Move.Fast, 400)
                waitRandomTime(2)
            }
        }
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goto(-1)
        if(fixedClick("领取奖励")){
            closeByImageMatching()
        }
    }

    //自定义跳转
    goto(num: number){
        //收起来 pendant_red_packet
        //任务页
        if(num === -1){
            if(this.tab.exists()){
                this.goTo(this.tab, 0)
                if(fixedClick(id(this.packageName+":id/left_btn_parent"))){
                    fixedClick("任务中心")
                }
            } else {
                this.backUntilFind(text("日常任务"))
            }
        } else {
            this.goTo(this.tab, num)
        }
    }
}