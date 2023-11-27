import { findAndClick } from "../common/click";
import { scrollTo } from "../common/search";
import { closeByImageMatching, doFuncAtGivenTime, moveDown, resizeX, resizeY, waitRandomTime } from "../common/utils";
import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_VEDIO_KUAISHOU, PACKAGE_VEDIO_KUAISHOU } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Base, BaseKey } from "./abstract/Base";

export class KuaiShou extends Base{

    register: UiSelector

    buttonNameList:string[] = [
        '看内容最高可得[0-9]+金币.*',
        '看视频最高可得[0-9]+金币.*'
    ]

    constructor(){
        super()
        this.appName = NAME_VEDIO_KUAISHOU
        this.packageName = PACKAGE_VEDIO_KUAISHOU
        this.tab = id(this.packageName+":id/tab_layout")
        this.register = id(this.packageName + ":id/pendant_mask_bg")
        this.depth = 1
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 15 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
    }
    @measureExecutionTime
    medEff(): void {
        this.watchAds()
        this.openTreasure()
        this.watchlive()
    }
    @measureExecutionTime
    lowEff(time: number): void {
        doFuncAtGivenTime(time, 10 * 60, (perTime: number) => {
            this.swipeVideo(perTime)
            this.openTreasure()
        })
        this.reward()
    }
    @measureExecutionTime
    weight(): void {
        if(!text("日常任务").exists()){
            this.goTo(this.register, -1)
        }
        scrollTo("金币收益")
        let tmp = textMatches(/(\d+)/)
        .boundsInside(0, 0, resizeX(549), resizeY(429)).findOnce()
        if(tmp != null) {
            this.store(BaseKey.Weight, parseInt(tmp.text()))
        }
    }
    
    @functionLog("签到")
    signIn(): void {
        if(!text("日常任务").exists()){
            this.goTo(this.register, -1)
        }
        if(findAndClick("立即领取")) {
            this.watchAdsForCoin("日常任务")
            closeByImageMatching()
        }
    }

    @functionLog("刷视频")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 1)
        moveDown(totalTime, 10)
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        if(!text("日常任务").exists()){
            this.goTo(this.register, -1)
        }
        if(findAndClick("立刻领[0-9]+金币")){
            this.watchAdsForCoin("日常任务")
        }
    }

    @functionLog("看视频")
    watchAds(): void {
        if(!text("日常任务").exists()){
            this.goTo(this.register, -1)
        }
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick("领福利 赚更多")){
            // this.watchUntil()
        }
    }

    @functionLog("看直播")
    watchlive(): void {
        if(!text("日常任务").exists()){
            this.goTo(this.register, -1)
        }
        if(findAndClick("去观看")){
            for(let i = 0;i<6;i++){
                let tmp = id(this.packageName+":id/recycler_view").findOnce()
                if(tmp != null){
                    let child = tmp.child(0) 
                    if(child != null){
                        child.click()
                        waitRandomTime(40)
                        back()
                        waitRandomTime(4)
                        findAndClick("退出")
                    }
                    for(let j = 0 ;j<2;j++){
                        tmp.scrollForward()
                        waitRandomTime(2)
                    }
                }
            }
            this.backUntilFind(text("日常任务"))
            if(findAndClick("领金币 限时领")){
                findAndClick("知道了")
            }
        }
    }

    @functionLog("领饭补")
    mealSupp(): void {
        if(!text("日常任务").exists()){
            this.goTo(this.register, -1)
        }
        if(findAndClick("去领取")){
            if(findAndClick("领取饭补")){
                this.watchAdsForCoin("日常任务")
            }
            this.backUntilFind(text("日常任务"))
        }
    }

    @functionLog("领取奖励")
    reward(): void {
        if(!text("日常任务").exists()){
            this.goTo(this.register, -1)
        }
        findAndClick("领取奖励")
    }

}