import { findAndClick, fixedClick, scrollClick} from "../../common/click";
import { Move } from "../../common/enums";
import { search } from "../../common/search";
import { closeByImageMatching, merge, swipeDown, swipeUp, waitRandomTime } from "../../common/utils";
import { MAX_CYCLES_COUNTS } from "../../global";
import { CurrentAppBanned } from "../../lib/exception";
import { Base } from "./Base";

export abstract class AbstractTomato extends Base {

    moveFlag:boolean = true

    constructor() {
        super()
        this.exchangeRate = 33000
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

    scrollClick(text:string, range:string, clickUntilGone:boolean): boolean{
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