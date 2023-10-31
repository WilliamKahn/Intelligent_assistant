import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_READ_DEJIAN, PACKAGE_READ_DEJIAN, RANGE_MIDDLE_SCREEN } from "../global";
import { Base, BaseKey } from "./abstract/Base";
import { findAndClick, scrollTo, randomClickChildInList, clickUntilGone, merge, doFuncUntilPopupsGone, doFuncAtGivenTime, closeByImageMatching } from "../lib/utils";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";


export class DeJian extends Base {

    constructor() {
        super()
        this.appName = NAME_READ_DEJIAN
        this.packageName = PACKAGE_READ_DEJIAN
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 45 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        //签到
        this.signIn()
        //开宝箱
        this.openTreasure()
        //领取餐补
        this.mealSupp()
    }
    @measureExecutionTime
    medEff(): void {
        //参加活动
        this.joinActivity()
        //观看广告
        this.watchAds()
        //领取奖励
        this.reward()
    }
    @measureExecutionTime
    lowEff(time: number): void {
        //阅读，预留五分钟给领奖
        time -= 5 * 60
        //每十分钟执行一次
        doFuncAtGivenTime(time, 10 * 60, (perTime: number) =>{
            this.readBook(perTime)
            this.openTreasure()
        })
        this.reward()
    }
    @measureExecutionTime
    weight(): void {

        this.goTo(desc("discovery_button"), -1)
        scrollTo(text("金币收益"))
        let tmp = textEndsWith("币").findOnce()
        if(tmp != null) {
            this.store(BaseKey.Weight, parseInt(tmp.text()))
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(desc("bookstore_button"), -1)
        randomClickChildInList(
            classNameMatches(merge([
                "android.support.v7.widget.RecyclerView",
                "android.view.ViewGroup"
        ])).depth(17).drawingOrder(1),
            random(0, 7)
        )
        this.read(totalTime)
    }

    @functionLog("领取所有奖励")
    reward(): void {
        this.goTo(desc("discovery_button"), -1)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick(text("领取"), {bounds: RANGE_MIDDLE_SCREEN})) {
            doFuncUntilPopupsGone(['看视频再领.*'], {
                func: ()=> {
                    this.watch(text("金币收益"))
                }
            })
            if (text("恭喜获得").exists()) {
                closeByImageMatching()
            }
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(desc("discovery_button"), -1)
        if(textStartsWith("成功签到").exists()) {
            closeByImageMatching()
        }
    }

    @functionLog("领取餐补")
    mealSupp(): void{
        this.goTo(desc("discovery_button"), -1)
        if(findAndClick(text("点击领取"), {bounds: RANGE_MIDDLE_SCREEN})){
            doFuncUntilPopupsGone(['看视频再领.*'], {
                func: ()=>{
                    this.watch(text("金币收益"))
                }
            })
            if (text("恭喜获得").exists()) {
                closeByImageMatching()
            }
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goTo(desc("discovery_button"), -1)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick(text("去观看"), {bounds: RANGE_MIDDLE_SCREEN})){
            this.watch(text("金币收益"))
            if(!findAndClick(text("知道了"))){    
                closeByImageMatching()
            }
            this.readBook(3 * 60)
            this.goTo(desc("discovery_button"), -1)
        }
    }

    @functionLog("参加活动")
    joinActivity(): void {
        this.goTo(desc("discovery_button"), -1)
        
        if(findAndClick(text("参与活动赚金币"), {bounds: RANGE_MIDDLE_SCREEN})){
            let title = id("com.zhangyue.module.ad:id/tv_reward_video_title").findOnce()
            if(title != null){
                const regex = /\((\d+)\/(\d+)\)/;
                const match = title.text().match(regex)
                if(match) {
                    for(let i = parseInt(match[1]); i < parseInt(match[2]); i++){
                        clickUntilGone(text("看视频赚金币"))
                        Record.log(`参与活动, 正在观看${i+1}/${match[2]}个广告`)
                        this.watch(text("金币收益"))
                        //看视频继续赚金币
                        findAndClick(id("com.zhangyue.module.ad:id/iv_dialog_reward_close"))
                    }
                } else {
                    Record.log("活动已完成")
                }
            }
            back()
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(desc("discovery_button"), -1)
        if(findAndClick(text("开宝箱得金币"))) {
            doFuncUntilPopupsGone(['看视频再领.*'], {
                func: ()=>{
                    this.watch(text("金币收益"))
                }
            })
            if (text("恭喜获得").exists()) {
                closeByImageMatching()
            }
        }
    }
}