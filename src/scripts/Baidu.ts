import { dialogClick, findAndClick, fixedClick, ocrClick, scrollClick, selectedClick } from "../common/click";
import { scrollTo, searchByOcrRecognize } from "../common/search";
import { closeByImageMatching, convertSecondsToMinutes, merge, moveDown, randomExecute, waitRandomTime } from "../common/utils";
import { NAME_VEDIO_BAIDU, NAME_VEDIO_BAIDU_BIG, PACKAGE_VEDIO_BAIDU, PACKAGE_VEDIO_BAIDU_BIG } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { Base, BaseKey } from "./abstract/Base";

export class Baidu extends Base {

    constructor() {
        super()
        this.packageName = PACKAGE_VEDIO_BAIDU
        this.appName = NAME_VEDIO_BAIDU
        this.tab = id("android:id/tabs")
        this.initialComponent = this.tab
        this.initialNum = 0
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, 30 * 60)
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
        randomExecute([
            ()=>{this.searchForCoin()},
            ()=>{this.watchAds()},
            ()=>{this.makesureFortune()},
            ()=>{this.swipeVideo(4 * 60)},
        ])
        this.openTreasure()
    }
    
    @measureExecutionTime
    weight(): void {
        this.goto(0)
        scrollTo("金币收益",{coverBoundsScaling:1})
        const [_, name] = searchByOcrRecognize("[0-9]+")
        if(name != undefined){
            const weight = parseInt(name.toString())
            Record.debug(`weight: ${weight}`)
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goto(0)
        if(fixedClick("额外领[0-9]+金币")){
            this.watch(text("金币收益"))
            this.watchAdsForCoin("金币收益")
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goto(0)
        while(scrollClick("去完成", "看广告赚钱.*")){
            this.watch(text("金币收益"))
            this.watchAdsForCoin("金币收益")
        }
    }

    @functionLog("搜索赚金币")
    searchForCoin():void{
        this.goto(0)
        let tmp = textMatches("搜索赚金币.*").findOnce()
        const regex = /\((\d+)\/(\d+)\)/;
        const match = tmp?.text().match(regex)
        if(match){
            for(let i = parseInt(match[1]); i < parseInt(match[2]); i++){
                if(findAndClick(className("android.widget.TextView"), {
                    bounds:tmp?.parent()?.parent()?.parent()?.child(1)?.bounds(),
                    waitTimes: 15
                })){
                    this.backUntilFind(text("金币收益"))
                    waitRandomTime(2)
                    this.watchAdsForCoin("金币收益")
                }
            }
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goto(0)
        this.watchAdsForCoin("金币收益")
        if(fixedClick("开宝箱得金币")){
            this.watchAdsForCoin("金币收益")
        }
    }

    @functionLog("测运势")
    makesureFortune(): void{
        this.goto(0)
        if(scrollClick("测一测", "测测今日运势")){
            if(ocrClick("测一测")){
                closeByImageMatching()
                this.backUntilFind(text("金币收益"))
                dialogClick(merge(["(开心|立即)收下", "(我)?知道了"]))
            }
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goto(0)
        if(scrollClick("去完成", "阅读赚金币")){
            this.preNum = 0
            if(selectedClick("发现", 170)){
                if(findAndClick(className("android.widget.ImageView"), {bounds:{top:device.height/5}})){
                    Record.log(`预计刷视频${convertSecondsToMinutes(totalTime)}分钟`)
                    moveDown(totalTime, 30)
                }
            }
        }
        
    }

    goto(num: number): void{
        if(num === 0){
            if(this.tab.exists()){
                this.goTo(this.tab, 4)
                findAndClick("天天领现金",{
                    ocrRecognize:true, 
                    clickUntilGone:true,
                    bounds:{bottom:device.height/5, left:device.width/2}})
            }else {
                this.backUntilFind(text("金币收益"))
            }
        } else if(num === 1){
            this.goTo(this.tab, 1)
            if(!text("我的铜钱").exists()){
                fixedClick("换现金")
            }
        }
    }

}