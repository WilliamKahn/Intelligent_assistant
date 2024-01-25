import { findAndClick, fixedClick, scrollClick, selectedClick } from "../common/click";
import { search } from "../common/search";
import { clearBackground, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_CHANG_READ_FREE, NAME_READ_EGG_FLOWER, PACKAGE_READ_CHANG_READ_FREE, PACKAGE_READ_EGG_FLOWER } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { AbstractTomato } from "./abstract/AbstractTomato";



export class EggFlower extends AbstractTomato {

    constructor() {
        super()
        this.appName = NAME_READ_EGG_FLOWER
        this.packageName = PACKAGE_READ_EGG_FLOWER
        this.initialNum = 0
        this.lowEff1Inheritance = true
    }

    reSearchTab(): void {
        const component = search("我的", {waitFor:true,fixed:true})
        if(component !== undefined){
            const tmp:any = className("android.view.ViewGroup")
            .clickable(false)
            .boundsInside(0, device.height*2/3, device.width, device.height)
            .boundsContains(100, component.bounds.top,device.width-100, component.bounds.top).findOnce()            
            if(tmp !== null){
                this.tab = id(tmp.id())
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

    afterDetection(): void {
        if(!text("日常福利").exists()){
            throw "空白页"
        }
    }

    @functionLog("签到")
    signIn(): void{
        this.goto()
        this.sign()
        if(scrollClick("去签到", "签到领金币|明日签到", {clickUntilGone:false})) {
            this.sign()
        }
    }
    
    @functionLog("听书")
    listenBook(): void {
        this.goTo(this.tab, 0)
        if(selectedClick("听书", 170)){
            for(let i = 1;i<5;i++){
                const component = search(i.toString())
                if(findAndClick(className("android.widget.TextView"), {
                    bounds: {top: component?.bounds.top, left:component?.bounds.right},
                })){
                    if(fixedClick("全部播放|续播")){
                        break
                    } else{
                        back()
                        waitRandomTime(4)
                    }
                }
            }
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 0)
        if(selectedClick("推荐", 170)){
            const component = search(random(1,4).toString())
            if(findAndClick(className("android.widget.TextView"), {
                bounds: {top: component?.bounds.top, left:component?.bounds.right},
            })){
                this.read(totalTime)    
            }
        }
    }

    @functionLog("阅读赚金币")
    readReward(): void{
        this.goto()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && 
            scrollClick("立即领取", "阅读赚金币", {clickUntilGone:false})
        ) {
            this.watchAdsForCoin("日常福利")
        }
    }
    @functionLog("听书赚金币")
    listenReward(): void{
        this.goto()
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS && 
            scrollClick("立即领取", "听书赚金币", {clickUntilGone:false})
        ) {
            this.watchAdsForCoin("日常福利")
        }
    }

    freshGift():void{
        this.goto()
        if(scrollClick("立即领取","新人限时见面礼",{clickUntilGone:false})){
            fixedClick("立即领取")
        }
    }

    @functionLog("看视频")
    watchAds(): boolean {
        this.goto()
        if(scrollClick("立即领取", "看视频赚金币")){
            this.watch(text("日常福利"))
            return true
        }
        return false
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goto()
        this.open()
    }

    goto(): void {
        this.goTo(this.tab, 2)
        this.checkDetection()
    }
}