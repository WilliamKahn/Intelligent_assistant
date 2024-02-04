import { findAndClick, fixedClick, randomClick, scrollClick, selectedClick } from "../../common/click";
import { Move } from "../../common/enums";
import { closeByImageMatching, overDetection } from "../../common/ocr";
import { search } from "../../common/search";
import { convertSecondsToMinutes, merge, swipeDown, waitRandomTime } from "../../common/utils";
import { MAX_CYCLES_COUNTS, NORMAL_WAIT_TIME } from "../../global";
import { functionLog, measureExecutionTime } from "../../lib/decorators";
import { Record } from "../../lib/logger";
import { AbstractTomato } from "./AbstractTomato";

export abstract class AbstractNewFreeNovel extends AbstractTomato {

    childIndex = 0

    constructor(){
        super()
        this.initialNum = 0
        this.lowEff1Inheritance = true
    }
    
    reSearchTab(): void {
        const component = search("我的", {
            throwErrIfNotExist:true,
            fixed:true
        })
        if(component){
            const tmp = search(
                className("android.view.ViewGroup")
                .clickable(false)
                .boundsInside(0, device.height*2/3, device.width, device.height)
                .boundsContains(100, component.bounds().top,device.width-100, component.bounds().top))
            if(tmp){
                this.tab = id(tmp.id()||"")
                this.initialComponent = this.tab
                Record.debug(`${this.tab}`)
            } else {
                throw "id定位失败"
            }
        }
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.listenBook()
        this.openTreasure()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && 
            this.watchAds()){}
        this.listenReward()
        this.freshGift()
    }
    @measureExecutionTime
    lowEff1(time: number): void {
        this.readBook(time)
        this.openTreasure()
        this.readReward()
    }

    sign(): boolean {
        if(findAndClick('立即签到.+', {
            fixed:true, 
            feedback:true
        })){
            this.watchAdsForCoin("日常福利")
            return true
        }
        return false
    }

    checkDetection(): void{
        let flag = false
        let checkText = search("请完成下列验证后继续")
        while(checkText){
            Record.log("检测到滑块验证")
            flag = true
            const parent = checkText.parent()?.parent()
            if(parent){
                const detection = parent?.child(2)?.child(1)
                const slide = parent?.child(3)?.child(1)?.child(1)
                if(detection  && slide){
                    waitRandomTime(2)
                    overDetection(detection.bounds(), slide.bounds(),0)
                    waitRandomTime(3)
                    checkText = search("请完成下列验证后继续")
                }
            }
        }
        if(flag){
            this.afterDetection()
        }
    }
    
    afterDetection(): void {
        if(!search("日常福利")){
            throw "空白页"
        }
    }
    
    goto(): void {
        this.goTo(this.tab, 2)
        this.checkDetection()
    }

    @functionLog("签到")
    signIn(): void {
        this.goto()
        if(!this.sign()
        && scrollClick("去签到", "签到领金币|明日签到")){
            this.sign()
        }
    }
    
    @functionLog("听书")
    listenBook(): void {
        this.goTo(this.tab, 0)
        if(selectedClick("听书", 170)){
            if(this.readClick(random(1,4))){
                fixedClick("全部播放|续播")
            }
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 0)
        if(selectedClick("经典", 170)){
            if(this.readClick(random(1,4))){
                this.read(totalTime)
            }
        }
    }

    @functionLog("阅读赚金币")
    readReward(): void{
        this.goto()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && 
            scrollClick("立即领取", "阅读赚金币")
        ) {
            this.watchAdsForCoin("日常福利")
        }
    }
    @functionLog("听书赚金币")
    listenReward(): void{
        this.goto()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && 
            scrollClick("立即领取", "听书赚金币")
        ) {
            this.watchAdsForCoin("日常福利")
        }
    }

    
    @functionLog("看短剧赚金币")
    swipeReward():void{
        this.goto()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && 
            scrollClick("立即领取", "看短剧赚金币"))
        {
            this.watchAdsForCoin("日常福利")
        }
    }

    freshGift():void{
        this.goto()
        if(search("新人限时见面礼") 
        && scrollClick("立即领取","新人限时见面礼")){
            if(fixedClick("立即领取")){
                closeByImageMatching()
            }
        }
    }

    @functionLog("看广告")
    watchAds(): boolean {
        this.goto()
        if(scrollClick("立即领取", "看视频赚金币")){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(text("日常福利"))
            return true
        }
        return false
    }

    @functionLog("看短剧")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 0)
        if(selectedClick("短剧", 170)){
            this.swipevideo(totalTime)
        }
    }

    swipevideo(totalTime: number){
        const parent = search(className("androidx.recyclerview.widget.RecyclerView").depth(16))
        if(parent){
            const child = parent.child(random(this.childIndex, parent.childCount()-1))
            if(child){
                randomClick(child.bounds())
                Record.log(`计划时间: ${convertSecondsToMinutes(totalTime)}分钟`)
                let watchTime=0;
                while(totalTime > watchTime){
                    if(search(merge(["上滑查看下一集", "上滑继续观看短剧"]))){
                        swipeDown(Move.Fast, 200)
                    }
                    watchTime += waitRandomTime(30)
                }
            }
        }
    }
}