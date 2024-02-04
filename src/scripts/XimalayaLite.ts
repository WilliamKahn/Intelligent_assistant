import { dialogClick, findAndClick, fixedClick, readClick, scrollClick, selectedClick } from "../common/click"
import { closeByImageMatching } from "../common/ocr"
import { search } from "../common/search"
import { waitRandomTime } from "../common/utils"
import { MAX_CYCLES_COUNTS, NAME_READ_XIMALAYA_LITE, NORMAL_WAIT_TIME, PACKAGE_READ_XIMALAYA_LITE } from "../global"
import { functionLog, measureExecutionTime } from "../lib/decorators"
import { Base, BaseKey } from "./abstract/Base"

export class XimalayaLite extends Base {

    constructor() {
        super()
        this.appName = NAME_READ_XIMALAYA_LITE
        this.packageName = PACKAGE_READ_XIMALAYA_LITE
        this.tab = id(this.packageName+":id/rg_tabs")
        this.initialComponent = this.tab
        this.initialNum = 0
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.listenBook()
        this.openTreasure()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && this.watchAds()){}
        this.listenReward()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 3)
        if(findAndClick("我的金币")){
            const component = search("今日金币")
            if(component){
                const component1 = search("[0-9]+", {bounds:{
                    top:component.bounds().top,
                    left:component.bounds().left,
                    right:component.bounds().right
                }})
                if(component1){
                    const weight = parseInt(component1.text())
                    this.store(BaseKey.Weight, weight)
                }
            }
        }
    }

    
    @functionLog("签到")
    signIn(): void{
        //每日签到 签到
        this.goTo(this.tab, 3)
        if(fixedClick("去芭芭农场再领[0-9]+金币")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("日常福利"))
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 3)
        if(fixedClick("开宝箱领金币")) {
            closeByImageMatching()
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goTo(this.tab, 3)
        if(findAndClick("看视频")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("日常福利"))
            closeByImageMatching()
            return true
        }
        return false
    }

    @functionLog("听书")
    listenBook(): void {
        this.goTo(this.tab, 0)
        if(readClick(id(this.packageName+":id/main_tv_album_title"), random(0,7))){
            if(fixedClick("继续播放|立即播放")){
                this.backUntilFind(text("目录"))
                back()
            }
        }
    }

    @functionLog("领取听书奖励")
    listenReward():void{
        this.goTo(this.tab, 3)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && scrollClick("领金币", "听书领金币")){
            this.watchAdsForCoin("日常福利")
            closeByImageMatching()
        }
    }
}