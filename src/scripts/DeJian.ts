import { dialogClick, findAndClick, findByOcrAndClick, fixedClick, readClick, scrollClick } from "../common/click";
import { closeByImageMatching } from "../common/ocr";
import { scrollTo, search } from "../common/search";
import { randomExecute, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_DEJIAN, NORMAL_WAIT_TIME, PACKAGE_READ_DEJIAN } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { Base, BaseKey } from "./abstract/Base";


export class DeJian extends Base {

    constructor() {
        super()
        this.appName = NAME_READ_DEJIAN
        this.packageName = PACKAGE_READ_DEJIAN
        this.initialComponent = desc("bookstore_button")
        this.medEffInheritance = true
        this.lowEff1Inheritance = true
    }

    @measureExecutionTime
    highEff(): void {
        //签到
        this.signIn()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.mealSupp()},
            ()=>{this.joinActivity()},
        ])
    }
    @measureExecutionTime
    medEff(): void {
        //0.005
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && this.watchAds()){
            this.readBook(3 * 60)
        }
        this.readReward()
        this.lowEff1Start = 2
    }

    @measureExecutionTime
    lowEff1(time: number): void {
        this.readBook(time)
        this.readReward()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(desc("discovery_button"), -1)
        scrollTo("金币收益")
        let tmp = search(".*币")
        if(tmp) {
            const weight = parseInt(tmp.text())
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(desc("bookstore_button"), -1)
        const tmp = search(id(this.packageName+":id/channel_tab"))
        if(tmp && findByOcrAndClick("推荐", {
            bounds: tmp.bounds(), 
            selectedThreshold:100}))
        {
            if(readClick(id("com.zhangyue.iReader.bookStore:id/id_tv_book_name"), random(0, 5))){
                this.read(totalTime)
            }
        }
    }

    @functionLog("领取奖励")
    readReward(): void {
        this.goTo(desc("discovery_button"), -1)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("领取", "每日阅读福利")) {
            this.watchAdsForCoin("金币收益")
            if (text("恭喜获得").exists()) {
                closeByImageMatching()
            }
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(desc("discovery_button"), -1)
        if(search("明日签到可得|成功签到.+")) {
            closeByImageMatching()
        } else {
            if(findAndClick("点击签到.+")){
                closeByImageMatching()
            }
        }
    }

    @functionLog("领取餐补")
    mealSupp(): void{
        this.goTo(desc("discovery_button"), -1)
        if(findAndClick("点击领取")){
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
            waitRandomTime(NORMAL_WAIT_TIME)
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
        if(findAndClick("参与活动赚金币")){
            this.activity()
            back()
        }
    }

    activity():void{
        const title = search(id("com.zhangyue.module.ad:id/tv_reward_video_title"))
        if(title){
            const regex = /\((\d+)\/(\d+)\)/;
            const match = title.text().match(regex)
            if(match) {
                for(let i = parseInt(match[1]); i < parseInt(match[2]); i++){
                    if(findAndClick("看视频赚金币", {
                        waitFor:6,
                        fixed:true, 
                    })){
                            Record.log(`参与活动, 正在观看${i+1}/${match[2]}个广告`)
                            waitRandomTime(NORMAL_WAIT_TIME)
                            this.watch(text("金币收益"))
                    }
                }
                this.activity()
            } else {
                Record.log("活动已完成")
            }
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