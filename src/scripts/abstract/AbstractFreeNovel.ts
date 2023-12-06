import { findAndClick, fixedClick, dialogClick, normalClick, readClick, scrollClick, selectedClick, ocrClick, goneClick } from "../../common/click";
import { doFuncAtGivenTime, merge, randomExecute, waitRandomTime } from "../../common/utils";
import { MAX_CYCLES_COUNTS } from "../../global";
import { functionLog, measureExecutionTime } from "../../lib/decorators";
import { Record } from "../../lib/logger";
import { Base, BaseKey } from "./Base";

export abstract class AbstractFreeNovel extends Base {

    tab: UiSelector

    constructor(packageName: string) {
        super()
        this.tab = id(packageName+":id/home_activity_navigation_bar")
        this.initialComponent = this.tab
        this.initialNum = 1
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, 15 * 60)
        this.lowEffEstimatedTime = 0
        this.lowEffAssmitCount = 2
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.watchAds()},
            ()=>{this.shopping()},
            ()=>{this.luckySpin()},
        ])
    }

    @measureExecutionTime
    lowEff(time: number): void {
        //每十分钟执行一次
        doFuncAtGivenTime(time / 2, 30 * 60,(perTime: number)=>{
            this.readBook(perTime)
            this.openTreasure()
            return perTime
        })
        let isFirst = true
        doFuncAtGivenTime(time / 2, 30 * 60,(perTime: number)=>{
            if(isFirst){
                this.listenBook()
                isFirst = false
            } else {
                this.continueListen()
            }
            let actualTime = waitRandomTime(perTime)
            this.openTreasure()
            return actualTime
        })
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 2)
        if(scrollClick("我的金币")){
            let tmp = textStartsWith("今日金币").findOnce()
            if(tmp != null) {
                const match = tmp.text().replace(",", "").match(/[0-9]+/)
                if(match){
                    const weight = parseInt(match[0])
                    Record.debug(`${this.constructor.name}:${parseInt(match[0])}`)
                    this.store(BaseKey.Weight, weight)
                    this.store(BaseKey.Money, (weight/10000).toFixed(2))
                }
            }
        }
    }
    
    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        this.watchAdsForCoin("日常福利")
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        this.watchAdsForCoin("日常福利")
        if (ocrClick('开宝箱得金币')) {
            this.watchAdsForCoin("日常福利")
        }
    }

    @functionLog("看视频")
    watchAds(): void {
        this.goTo(this.tab, 2)
        if(scrollClick("去观看", "看小视频赚金币.*")){
            this.watch(text("日常福利"))
            scrollClick("领金币", "看小视频赚金币.*")
        }
    }

    @functionLog("逛街")
    shopping(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("去逛逛", "逛街赚金币.*")) {
            this.watch(text("日常福利"))
            scrollClick("领金币", "逛街赚金币.*")
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.openBook()
        this.read(totalTime)        
    }

    @functionLog("听书")
    listenBook(): void {
        this.openBook()
        if(!id(this.packageName+":id/reader_listen_entry").exists()){
            normalClick(device.width/2, device.height/2)
        }
        if(findAndClick(id(this.packageName+":id/reader_listen_entry"), {fixed:true})){
            if(dialogClick("去看小视频")){
                this.watch(text("边听边读"))
            }
            goneClick("边听边读")
        }
    }

    @functionLog("幸运大转盘")
    luckySpin(): void {
        this.goTo(this.tab, 2)
        if(scrollClick("去抽奖", "幸运大转盘.*")){
            let tmp = textStartsWith("今日剩余抽奖次数").findOnce()
            if(tmp != null){
                const count = tmp.text().match("[0-9]+")
                if(count){
                    Record.debug(`${count}`)
                    for(let i = 0;i<parseInt(count[0]);i++) {
                        findAndClick("抽奖", {
                            fixed:true,
                            ocrRecognize:true,
                            waitTimes:10,
                            bounds:{bottom: 1656}
                        })
                        this.watch(text("幸运大转盘"))
                        findAndClick("好的", {fixed:true, waitFor:true, clickUntilGone:true})
                    }
                }
            }
        }
    }

    continueListen(): void {
        if(!id(this.packageName+":id/voice_rl").exists()){
            this.listenBook()
        } else {
            if(findAndClick(id(this.packageName+":id/voice_rl"))){
                if(dialogClick("去看小视频")){
                    this.watch(text("边听边读"))
                }
                goneClick("边听边读")
            }
        }
    }

    openBook(): void {
        this.goTo(this.tab, 1)
        if(selectedClick("推荐", 170)){
            readClick(id(this.packageName+":id/tv_book_one_book_title"), random(0, 3))
        }
    }
}