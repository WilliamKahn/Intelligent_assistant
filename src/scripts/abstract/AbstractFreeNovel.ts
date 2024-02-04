import { dialogClick, findAndClick, fixedClick, normalClick, ocrClick, readClick, scrollClick, selectedClick } from "../../common/click";
import { search } from "../../common/search";
import { getNumFromComponent, randomExecute, waitRandomTime } from "../../common/utils";
import { MAX_CYCLES_COUNTS, NORMAL_WAIT_TIME } from "../../global";
import { functionLog, measureExecutionTime } from "../../lib/decorators";
import { Record } from "../../lib/logger";
import { Base, BaseKey } from "./Base";

export abstract class AbstractFreeNovel extends Base {

    constructor(packageName: string) {
        super()
        this.tab = id(packageName+":id/home_activity_navigation_bar")
        this.initialComponent = this.tab
        this.initialNum = 1
        this.lowEff1Inheritance = true
        this.lowEff2Inheritance = true
    }

    @measureExecutionTime
    highEff(): void {
        //0.0065
        this.signIn()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{
                let cycleCounts = 0
                while(++cycleCounts < MAX_CYCLES_COUNTS
                    && this.watchAds()){}},
            ()=>{this.shopping()},
            ()=>{this.luckySpin()},
        ])
    }

    @measureExecutionTime
    lowEff1(time: number): void {
        this.readBook(time)
        this.readReward()
        this.openTreasure()
    }

    @measureExecutionTime
    lowEff2(time: number): void {
        this.listenBook()
        sleep(time * 1000)
        this.listenReward()
        this.openTreasure()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 2)
        if(findAndClick("我的金币")){
            waitRandomTime(2)
            const tmp = search("今日金币.*")
            if(tmp) {
                const match = tmp.text().replace(",", "").match(/[0-9]+/)
                if(match){
                    const weight = parseInt(match[0])
                    Record.debug(`${this.constructor.name}:${weight}`)
                    this.store(BaseKey.Weight, weight)
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
        if (ocrClick('开宝箱得金币')) {
            this.watchAdsForCoin("日常福利")
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goTo(this.tab, 2)
        if(scrollClick("去观看", "看小视频赚金币.*")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("日常福利"))
            scrollClick("领金币", "看小视频赚金币.*")
            return true
        }
        return false
    }

    @functionLog("逛街")
    shopping(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("去逛逛", "逛街赚金币.*")) {
            waitRandomTime(NORMAL_WAIT_TIME)
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
        if(fixedClick(id(this.packageName+":id/reader_listen_entry"))){
            if(dialogClick("去看小视频")){
                waitRandomTime(NORMAL_WAIT_TIME)
                this.watch(text("边听边读"))
            }
            fixedClick("边听边读")
        }
    }

    @functionLog("幸运大转盘")
    luckySpin(): void {
        this.goTo(this.tab, 2)
        if(scrollClick("去抽奖", "幸运大转盘.*")){
            waitRandomTime(NORMAL_WAIT_TIME)
            const tmp = search("今日剩余抽奖次数.*")
            if(tmp){
                const num = getNumFromComponent(tmp.text())
                Record.debug(`${num}`)
                for(let i = 0; i < num;i++) {
                    if(ocrClick("抽奖|看视频", {
                        bounds:{
                            bottom: device.height * 2 / 3, 
                            top: device.height / 3}
                    })){
                        waitRandomTime(NORMAL_WAIT_TIME)
                        this.watch(text("幸运大转盘"))
                        fixedClick("好的")
                        findAndClick("好的",{waitFor:2})
                    }
                }
                
            }
        }
    }

    @functionLog("阅读赚金币")
    readReward():void{
        this.goTo(this.tab, 2)
        this.watchAdsForCoin("日常福利")
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS &&
            scrollClick("领金币", "阅读赚金币.*")){
            this.watchAdsForCoin("日常福利")
        }
    }

    @functionLog("听书赚金币")
    listenReward():void{
        this.goTo(this.tab, 2)
        this.watchAdsForCoin("日常福利")
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS &&
            scrollClick("领金币", "听书赚金币.*")){
            this.watchAdsForCoin("日常福利")
        }
    }

    continueListen(): void {
        if(!id(this.packageName+":id/voice_rl").exists()){
            this.listenBook()
        } else {
            if(findAndClick(id(this.packageName+":id/voice_rl"))){
                if(dialogClick("去看小视频")){
                    waitRandomTime(NORMAL_WAIT_TIME)
                    this.watch(text("边听边读"))
                }
                fixedClick("边听边读")
            }
        }
    }

    openBook(): void {
        this.goTo(this.tab, 1)
        if(selectedClick("推荐", 170)){
            findAndClick(id(this.packageName+":id/tv_book_one_book_title"), {
                index: random(0, 3)
            })
        }
    }
}