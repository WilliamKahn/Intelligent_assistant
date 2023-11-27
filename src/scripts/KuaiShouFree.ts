import { goneClick, scrollClick } from "../common/click";
import { closeByImageMatching, doFuncAtGivenTime, getScreenImage, resizeX, resizeY } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_KUAISHOU_FREE, PACKAGE_READ_KUAISHOU_FREE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Base, BaseKey } from "./abstract/Base";

export class KuaiShouFree extends Base{

    buttonNameList:string[] = [
        '看视频赚更多',
        '看广告赚更多'
    ]

    coin: number = 0
    isFirst: boolean = true

    constructor(){
        super()
        this.appName = NAME_READ_KUAISHOU_FREE
        this.packageName = PACKAGE_READ_KUAISHOU_FREE
        this.tab = id(this.packageName+":id/home_bottom_bar")
        this.exitNum = 2
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, 20 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.coin = this.record()
        this.openTreasure()
        this.watchAds()
    }
    @measureExecutionTime
    lowEff(time: number): void {
        //每十分钟执行一次
        doFuncAtGivenTime(time, 30 * 60, (perTime: number) =>{
            this.readBook(perTime)
            this.openTreasure()
            this.reward()
        })
    }
    @measureExecutionTime
    weight(): void {
        let cCoin = this.record()
        this.store(BaseKey.Weight, cCoin -this.coin)
    }
    
    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        if(goneClick("立即签到")){
            closeByImageMatching()
        }
    }

    @functionLog("看视频")
    watchAds(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && scrollClick("去赚钱", "看视频赚[0-9]+金币")){
            this.watch(text("日常任务"))
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        if (goneClick("点击领[0-9]+金币")) {
            this.watchAdsForCoin("日常任务")
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 1)
        if(this.isFirst){
            closeByImageMatching()
            this.isFirst = false
        }
        goneClick("领[0-9]+金币")
        if(scrollClick("完整榜单")){
            if(goneClick(random(1,7).toString())){
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
        const str = ocr.recognizeText(getScreenImage({
            left:resizeX(78),top:resizeY(339), right:resizeX(360), bottom: resizeY(438)}))
        const match = str.match("[0-9]+")
        if(match){
            return parseInt(match[0])
        }
        return 0
    }

}