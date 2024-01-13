import { dialogClick, findAndClick, fixedClick, readClick, scrollClick } from "../common/click";
import { scrollTo, searchByOcrRecognize } from "../common/search";
import { closeByImageMatching, doFuncAtGivenTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_KUAISHOU_FREE, PACKAGE_READ_KUAISHOU_FREE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Base, BaseKey } from "./abstract/Base";

export class KuaiShouFree extends Base{

    coin: number = 0
    isFirst: boolean = true

    constructor(){
        super()
        this.appName = NAME_READ_KUAISHOU_FREE
        this.packageName = PACKAGE_READ_KUAISHOU_FREE
        this.tab = id(this.packageName+":id/home_bottom_bar")
        this.initialComponent = this.tab
        this.initialNum = 1
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, 20 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.coin = this.record()
        this.openTreasure()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && textMatches("看视频赚[0-9]+金币").exists()){
            this.watchAds()        
        }
    }
    @measureExecutionTime
    lowEff(time: number): void {
        //每十分钟执行一次
        doFuncAtGivenTime(time, 10 * 60, (perTime: number) =>{
            this.readBook(perTime)
            this.openTreasure()
            this.reward()
        })
    }
    @measureExecutionTime
    weight(): void {
        const weight = this.record() - this.coin
        if(weight > 0){
            this.store(BaseKey.Weight, weight)
        }
    }
    
    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        if(dialogClick("立即签到")){
            closeByImageMatching()
        }
    }

    @functionLog("看视频")
    watchAds(): void {
        this.goTo(this.tab, 2)
        if(scrollClick("去赚钱", "看视频赚[0-9]+金币")){
            this.watch(text("日常任务"))
        }
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

    @functionLog("领取奖励")
    reward(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("去领取", "认真阅读小说额外奖励")) {
            this.watchAdsForCoin("日常任务")
        }
    }

    record(): number{
        this.goTo(this.tab, 2)
        const [_, name]:any = searchByOcrRecognize("[0-9]+",{bounds:{bottom: device.height/5}})
        if(name != undefined){
            return parseInt(name)
        }
        return 0
    }

}