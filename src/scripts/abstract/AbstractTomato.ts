import { findAndClick, fixedClick, scrollClick, waitClick} from "../../common/click";
import { Move } from "../../common/enums";
import { scrollTo, search } from "../../common/search";
import { closeByImageMatching, merge, overDetection, swipeDown, swipeUp, waitRandomTime } from "../../common/utils";
import { MAX_CYCLES_COUNTS } from "../../global";
import { measureExecutionTime } from "../../lib/decorators";
import { CurrentAppBanned } from "../../lib/exception";
import { Record } from "../../lib/logger";
import { Base, BaseKey } from "./Base";

export abstract class AbstractTomato extends Base {

    moveFlag:boolean = true

    constructor() {
        super()
        this.exchangeRate = 33000
    }

    abstract goto():void

    beforeDoTask(): void {
        fixedClick("立即领取")
    }

    @measureExecutionTime
    weight(): void {
        this.goto()
        const component = scrollTo("金币",{
            waitFor:true,
            disableCoverCheck:true
        })
        if(component !== undefined){
            const component1 = search("[0-9]+",{bounds:{right:component.bounds.left}})
            if(component1 !== undefined){
                const weight = parseInt(component1.text)
                this.store(BaseKey.Weight, weight)
            }
        }
    }
    
    sign(): void {
        findAndClick('立即签到.+', {
            fixed:true, 
            feedback:true,
            disableGrayCheck:true
        })

        if(findAndClick('看视频立即续签|额外领[0-9]+金币', {fixed:true})){
            this.watch(textMatches(merge(["日常福利", "看视频立即续签"])))
            if(text("看视频立即续签").exists()){
                throw new CurrentAppBanned(this.appName)
            }
        }
        this.watchAdsForCoin("日常福利")
    }

    open(): void{
        if (fixedClick("开宝箱得金币")) {
            this.watchAdsForCoin("日常福利")
        }
    }

    checkDetection(): void{
        let flag = false
        let checkText = text("请完成下列验证后继续").findOnce()
        while(checkText !== null){
            Record.log("检测到滑块验证")
            flag = true
            const parent = checkText.parent()?.parent()
            if(parent){
                const detection = parent?.child(2)?.child(1)
                const slide = parent?.child(3)?.child(1)?.child(1)
                if(detection  && slide){
                    overDetection(detection.bounds(), slide.bounds(),0)
                    waitRandomTime(3)
                    checkText = text("请完成下列验证后继续").findOnce()
                }
            }
        }
        if(flag){
            this.afterDetection()
        }
    }

    afterDetection(): void{}

    scrollClick(text:string, range:string, clickUntilGone:boolean = false): boolean{
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
             && search(range) === undefined){
            this.move()
        }
        if(cycleCounts >= MAX_CYCLES_COUNTS){
            return false
        }
        return scrollClick(text, range, {clickUntilGone:clickUntilGone})
    }

    waitClick(text:string, range:string): boolean{
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
             && search(range) === undefined){
            this.move()
        }
        if(cycleCounts >= MAX_CYCLES_COUNTS){
            return false
        }
        return waitClick(text, range)
    }

    move(): void {
        const before = search("金币献爱心", {waitFor:true})
        if(this.moveFlag){
            swipeDown(Move.Fast, 1000)
        } else {
            swipeUp(Move.Fast, 1000)
        }
        waitRandomTime(2)
        const after = search("金币献爱心", {waitFor:true})
        if(before?.bounds.top === after?.bounds.top){
            if(!closeByImageMatching()){
                this.moveFlag = !this.moveFlag
            }
        }
    }
}