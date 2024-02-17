import { findAndClick, fixedClick, findByOcrAndClick, scrollClick } from "../../common/click";
import { closeByImageMatching } from "../../common/ocr";
import { scrollTo, search } from "../../common/search";
import { waitRandomTime } from "../../common/utils";
import { MAX_CYCLES_COUNTS, NORMAL_WAIT_TIME } from "../../global";
import { functionLog } from "../../lib/decorators";
import { Base } from "./Base";

export abstract class AbstractBaidu extends Base {

    readRewardText:string =  "看文章或视频赚金币"
    exitSign:string = "金币收益"

    constructor(packageName: string) {
        super()
        this.packageName = packageName
        this.tab = id("android:id/tabs")
        this.initialComponent = this.tab
        this.initialNum = 0
        this.lowEff1Inheritance = true
        this.dialogBounds = {
            bottom: device.height * 4 / 5, 
            top: device.height * 1 / 3,
        }
    }

    //高效率 T0 1
    abstract goto(num: number): void

    @functionLog("签到")
    signIn(): void {
        this.goto(-1)
        if(fixedClick("额外领[0-9]+金币|立即签到")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text(this.exitSign))
            this.watchAdsForCoin(this.exitSign)
        } else {
            if(scrollClick("去签到", "今日签到|明日签到")){
                if(fixedClick("额外领[0-9]+金币|立即签到")){
                    waitRandomTime(NORMAL_WAIT_TIME)
                    this.watch(text(this.exitSign))
                    this.watchAdsForCoin(this.exitSign)
                }
            }
        }
    }

    @functionLog("搜索赚金币")
    searchForCoin():void{
        this.goto(-1)
        const tmp = scrollTo("搜索赚金币.*", {
            throwErrIfNotExist:true
        },{bottom:device.height/2})
        if(tmp){
            const regex = /\((\d+)\/(\d+)\)/;
            const match = tmp.text().match(regex)
            if(match){
                for(let i = parseInt(match[1]); i < parseInt(match[2]); i++){
                    if(findAndClick(className("android.widget.TextView"),{
                        bounds:tmp.parent()?.parent()?.parent()?.child(1)?.bounds(),
                        fixed:true,
                        disableGrayCheck:true
                    })){
                        waitRandomTime(17)
                        this.backUntilFind(text(this.exitSign))
                        this.watchAdsForCoin(this.exitSign)
                        if(search("立即添加", {waitFor:2})){
                            closeByImageMatching()
                        }
                    }
                }
            }
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goto(-1)
        if(scrollClick("去完成", "看广告赚钱.*")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text(this.exitSign))
            this.watchAdsForCoin(this.exitSign)
            return true
        }
        return false
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goto(-1)
        if(fixedClick("开宝箱得金币")){
            this.watchAdsForCoin(this.exitSign)
        }
    }

    @functionLog("每日挑战奖励领取")
    dailyReward(): void {
        this.goto(-1)
        let cycleCounts = 0
        const component = scrollTo("今日任务")
        while(++cycleCounts <= MAX_CYCLES_COUNTS && component
            && findByOcrAndClick(".?领取", {
                bounds:{
                    top:component.bounds().top - 30, 
                    bottom:component.bounds().bottom + 30}
            })){
        }
    }

    @functionLog("看视频领红包")
    swipeReward(): void{
        this.goto(-1)
        let cycleCounts = 0
        const component = scrollTo(this.readRewardText,undefined,{bottom:device.height/2})
        while(++cycleCounts <= MAX_CYCLES_COUNTS && component
            && findByOcrAndClick("领",{
                bounds:{
                    top:component.bounds().bottom, 
                    bottom:component.bounds().bottom+500},
            })){
        }
    }

}