import { fixedClick, scrollClick } from "../common/click";
import { scrollTo, searchByOcrRecognize } from "../common/search";
import { NAME_VEDIO_BAIDU_BIG, PACKAGE_VEDIO_BAIDU_BIG } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Base, BaseKey } from "./abstract/Base";

export class BaiduBig extends Base {

    constructor() {
        super()
        this.packageName = PACKAGE_VEDIO_BAIDU_BIG
        this.appName = NAME_VEDIO_BAIDU_BIG
        this.tab = id("android:id/tabs")
        this.initialComponent = this.tab
        this.initialNum = 0
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, 25 * 60)
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        this.watchAds()
        this.openTreasure()
    }
    
    @measureExecutionTime
    weight(): void {
        this.goto()
        scrollTo("现金收益",{coverBoundsScaling:1})
        const [_, name] = searchByOcrRecognize("[0-9]+", {bounds:{bottom:device.height*1/5}})
        if(name !== undefined){
            const weight = parseInt(name.toString())
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goto()
        if(fixedClick("额外领[0-9]+金币")){
            this.watch(text("现金收益"))
            this.watchAdsForCoin("现金收益")
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goto()
        while(scrollClick("去完成", "看广告赚钱.*")){
            this.watch(text("现金收益"))
            this.watchAdsForCoin("现金收益")
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goto()
        if(fixedClick("开宝箱得金币")){
            this.watchAdsForCoin("现金收益")
        }
    }

    goto(): void{
        if(this.tab.exists()){
            this.goTo(this.tab, 4)
            fixedClick("立即签到")
        }else{
            this.backUntilFind(text("现金收益"))
        }
    }

}