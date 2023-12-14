import { findAndClick, fixedClick, dialogClick, readClick, scrollClick, selectedClick } from "../common/click";
import { scrollTo } from "../common/search";
import { closeByImageMatching, doFuncAtGivenTime, randomExecute } from "../common/utils";
import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_READ_DEJIAN, PACKAGE_READ_DEJIAN } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { Base, BaseKey } from "./abstract/Base";


export class DeJian extends Base {

    constructor() {
        super()
        this.appName = NAME_READ_DEJIAN
        this.packageName = PACKAGE_READ_DEJIAN
        this.initialComponent = desc("bookstore_button")
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.MedEffEstimatedTime, 45 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        //签到
        this.signIn()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.watchAds()},
            ()=>{this.mealSupp()},
            ()=>{this.joinActivity()},
        ])
    }
    @measureExecutionTime
    medEff(): void {
        let cycleCounts = 0
        do{
            if(cycleCounts % 3 ==0){
                this.openTreasure()
            }
            this.readBook(3 * 60)
            this.reward()
        }while(++cycleCounts < MAX_CYCLES_COUNTS && this.watchAds())
    }
    
    @measureExecutionTime
    lowEff(time: number): void {
        //每十分钟执行一次
        doFuncAtGivenTime(time, 10 * 60, (perTime: number) =>{
            this.readBook(perTime)
            this.watchAds()
            this.openTreasure()
            this.reward()
        })
    }
    @measureExecutionTime
    weight(): void {

        this.goTo(desc("discovery_button"), -1)
        scrollTo("金币收益")
        let tmp = textEndsWith("币").findOnce()
        if(tmp != null) {
            const weight = parseInt(tmp.text())
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(desc("bookstore_button"), -1)
        let tmp = id(this.packageName+":id/channel_tab").findOnce()
        if(tmp != null && findAndClick("推荐", 
        {fixed:true, ocrRecognize:true, bounds: tmp.bounds(), selectedThreshold:100})){
            if(readClick(id("com.zhangyue.iReader.bookStore:id/id_tv_book_name"), random(0, 5))){
                this.read(totalTime)
            }
        }
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goTo(desc("discovery_button"), -1)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("领取")) {
            this.watchAdsForCoin("金币收益")
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
        } else {
            if(scrollClick("点击签到.+")){
                closeByImageMatching()
            }
        }
    }

    @functionLog("领取餐补")
    mealSupp(): void{
        this.goTo(desc("discovery_button"), -1)
        if(scrollClick("点击领取")){
            this.watchAdsForCoin("金币收益")
            if (text("恭喜获得").exists()) {
                closeByImageMatching()
            }
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goTo(desc("discovery_button"), -1)
        if(scrollClick("去观看", "看视频赚金币与声望")){
            this.watch(text("金币收益"))
            if(!dialogClick("知道了")){    
                closeByImageMatching()
            }
            return true
        }
        return false
    }

    @functionLog("参加活动")
    joinActivity(): void {
        this.goTo(desc("discovery_button"), -1)
        
        if(findAndClick("参与活动赚金币", {coverBoundsScaling:1})){
            let title = id("com.zhangyue.module.ad:id/tv_reward_video_title").findOnce()
            if(title != null){
                const regex = /\((\d+)\/(\d+)\)/;
                const match = title.text().match(regex)
                if(match) {
                    for(let i = parseInt(match[1]); i < parseInt(match[2]); i++){
                        findAndClick("看视频赚金币", {fixed:true, clickUntilGone: true})
                        Record.log(`参与活动, 正在观看${i+1}/${match[2]}个广告`)
                        this.watch(text("金币收益"))
                        //看视频继续赚金币
                        // findAndClick(id("com.zhangyue.module.ad:id/iv_dialog_reward_close"))
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
        if(fixedClick("开宝箱得金币")) {
            this.watchAdsForCoin("金币收益")
            if (text("恭喜获得").exists()) {
                closeByImageMatching()
            }
        }
    }
}