import { dialogClick, findAndClick, fixedClick, scrollClick } from "../common/click";
import { scrollTo } from "../common/search";
import { closeByImageMatching, doFuncAtGivenTime, padZero } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_KUAISHOU_FREE, PACKAGE_READ_KUAISHOU_FREE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { CurrentAppBanned } from "../lib/exception";
import { Record } from "../lib/logger";
import { Base, BaseKey } from "./abstract/Base";

export class KuaiShouFree extends Base{

    constructor(){
        super()
        this.appName = NAME_READ_KUAISHOU_FREE
        this.packageName = PACKAGE_READ_KUAISHOU_FREE
        this.tab = id(this.packageName+":id/home_bottom_bar")
        this.initialComponent = this.tab
        this.initialNum = 1
        this.lowEff1Inheritance = true
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && textMatches("看视频赚[0-9]+金币").exists() 
            && this.watchAds()){}
    }
    @measureExecutionTime
    lowEff1(time: number): void {
        this.readBook(time)
        this.openTreasure()
        this.reward()
    }
    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 4)
        if(fixedClick(id(this.packageName+":id/total_coin_tv"))){
            const year = this.startTime.getFullYear()
            const month = padZero(this.startTime.getMonth() + 1)
            const day = padZero(this.startTime.getDate())
            const list = textMatches(`${year}-${month}-${day}.*`).find()
            let weight = 0
            for(let i =0;i<list.length;i++){
                const parent = list[i].parent()
                if(parent!==null){
                    const coin = parent.child(2)
                    if(coin !== null){
                        weight+=parseInt(coin.text())
                    }
                }
            }
            Record.debug(`weight: ${weight}`)
            this.store(BaseKey.Weight, weight)
        }
    }
    
    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        if(fixedClick("立即签到")){
            if(fixedClick("立即签到")){
                throw new CurrentAppBanned(this.appName)
            } else {
                closeByImageMatching()
            }
        }
    }

    @functionLog("看视频")
    watchAds(): boolean {
        this.goTo(this.tab, 2)
        if(scrollClick("去赚钱", "看视频赚[0-9]+金币")){
            this.watch(text("日常任务"))
            return true
        }
        return false
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        if (fixedClick("点击领[0-9]+金币")) {
            this.watchAdsForCoin("日常任务")
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 1)
        fixedClick("领[0-9]+金币")
        const component = scrollTo(random(1,4).toString(),{waitFor:true})
        if(component !== undefined){
            if(findAndClick(className("android.widget.TextView"), {
                fixed:true,
                bounds:{
                    left:component.bounds.right, 
                    top:component.bounds.top,
                    bottom:component.bounds.bottom + 100
                }
            })){
                this.read(totalTime)
            }
        }
    }

    @functionLog("领取阅读奖励")
    readReward(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("去领取", "认真阅读小说额外奖励")) {
            this.watchAdsForCoin("日常任务")
        }
    }

}