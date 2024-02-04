import { dialogClick, findAndClick, readClick, scrollClick, selectedClick } from "../common/click";
import { closeByImageMatching } from "../common/ocr";
import { search } from "../common/search";
import { waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_SHUQI, NORMAL_WAIT_TIME, PACKAGE_READ_SHUQI } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Base, BaseKey } from "./abstract/Base";

export class ShuQi extends Base{

    constructor(){
        super()
        this.appName = NAME_READ_SHUQI
        this.packageName = PACKAGE_READ_SHUQI
        this.tab = id("android:id/tabs")
        this.initialComponent = this.tab
        this.initialNum = 1
        this.lowEff1Inheritance = true
    }

    @measureExecutionTime
    highEff(): void {
        //0.0133
        this.signIn()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && this.watchAds()){}
        this.reward()
    }

    @measureExecutionTime
    lowEff1(time: number): void {
        this.readBook(time)
        this.reward()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 4)
        const component = search(id(this.packageName+":id/account_worth_money"),{
            throwErrIfNotExist:true
        })
        if(component){
            const weight = parseInt(component.text())
            this.store(BaseKey.Weight, weight)
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        if(dialogClick("立即签到")){
            closeByImageMatching()
            closeByImageMatching()
        } else {
            if(scrollClick("去签到", "每日签到")){
                if(dialogClick("立即签到")){
                    closeByImageMatching()
                    closeByImageMatching()
                }
            }
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goTo(this.tab, 2)
        if(scrollClick("去观看", "看视频赚[0-9]+金币")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("做任务 赚金币"))
            return true
        }
        return false
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 1)
        if(selectedClick("推荐", 170)){
            if(readClick(id(this.packageName+":id/tpl_book_name"), random(0,3)*2)){
                this.read(totalTime)
            }
        }
    }

    @functionLog("领取奖励")
    reward(): void {
        this.goTo(this.tab, 2)
        if(findAndClick("(一键|加倍)收取")){
            this.watchAdsForCoin("做任务 赚金币")
            dialogClick("领取加倍奖励")
            closeByImageMatching()
        }
    }
}