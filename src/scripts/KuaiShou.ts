import { dialogClick, findAndClick, fixedClick, scrollClick } from "../common/click";
import { Move } from "../common/enums";
import { closeByImageMatching } from "../common/ocr";
import { search } from "../common/search";
import { convertSecondsToMinutes, doFuncAtGivenTimeByEstimate, moveDown, randomExecute, swipeDown, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_VEDIO_KUAISHOU, NORMAL_WAIT_TIME, PACKAGE_VEDIO_KUAISHOU } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { Base, BaseKey } from "./abstract/Base";

export class KuaiShou extends Base{

    constructor(){
        super()
        this.appName = NAME_VEDIO_KUAISHOU
        this.packageName = PACKAGE_VEDIO_KUAISHOU
        this.tab = id(this.packageName+":id/tab_layout")
        this.initialComponent = this.tab
        this.dialogCheck = false
        this.depth = 1
        this.lowEff1Inheritance = true
        this.lowEff2Inheritance = true
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.mealSupp()},
            ()=>{this.like()},
            ()=>{this.comment()},
            ()=>{if(text("收藏1个作品").exists())this.collect()},
            ()=>{this.like()},
            ()=>{this.comment()},
            ()=>{if(text("收藏1个作品").exists())this.collect()},
        ])
    }
    @measureExecutionTime
    lowEff1(time: number): void {
        let count = 0
        doFuncAtGivenTimeByEstimate(time, ()=>{
            this.watchAds()
            if(++count % 25 === 0){
                this.openTreasure()
            }
        })
    }
    @measureExecutionTime
    lowEff2(time: number): void {
        this.swipeVideo(time)
        this.openTreasure()
        this.reward()
    }
    @measureExecutionTime
    weight(): void {
        this.goto(-1)
        if(findAndClick("金币收益")){
            const component = search("[0-9]+金币")
            if(component){
                const weight = parseInt(component.text())
                this.store(BaseKey.Weight, weight)
            }
            this.backUntilFind(text("日常任务"))
        }
    }

    beforeDoTask(): void {
        if(fixedClick("首页")){
            this.initialNum = 0
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
        if(scrollClick("领福利 赚更多", "看广告得.*金币", {
            leftToRight: true
        })){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("日常任务"))
            return true
        }
        return false
    }

    @functionLog("看直播")
    watchLive(): void {
        this.goto(-1)
        if(scrollClick("去观看 限时领", "看直播得.*金币", {
            coverBoundsScaling:1.2,
            leftToRight: true
        })){
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
            if(scrollClick("领金币 限时领", "看直播得.*金币", {
                coverBoundsScaling: 1.2,
                leftToRight: true
            })){
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
                waitRandomTime(NORMAL_WAIT_TIME)
                this.watch(text("已补签"))
            }
            this.backUntilFind(text("日常任务"))
        }
    }

    @functionLog("点赞")
    like(): void{
        this.goto(-1)
        if(scrollClick("去点赞", "点赞1个作品")){
            this.goto(1)
            this.first = true
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
            this.goto(1)
            this.first = true
            swipeDown(Move.Fast, 400)
            waitRandomTime(2)
            let cycleCounts = 0
            while(++cycleCounts < MAX_CYCLES_COUNTS
                && !fixedClick(id(this.packageName+":id/comment_icon"))){
                swipeDown(Move.Fast, 400)
                waitRandomTime(2)
            }
            if(++cycleCounts < MAX_CYCLES_COUNTS 
                && findAndClick(id(this.packageName+":id/editor_holder_text"), {
                    fixed:true, 
                    threshold:0.5})){
                const tmp = search(id(this.packageName+":id/editor"))
                if(tmp){
                    tmp.setText("打卡")
                    waitRandomTime(3)
                    if(fixedClick(id(this.packageName+":id/finish_button"))){
                        fixedClick("忽略")
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
            this.goto(1)
            this.first = true
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
            if(this.first){
                this.goTo(this.tab, 0)
                if(fixedClick(id(this.packageName+":id/left_btn_parent"))){
                    if(fixedClick("任务中心")){
                        this.first = false
                    }
                }
            }
        } else {
            this.goTo(this.tab, num)
            this.first = true
        }
    }
}