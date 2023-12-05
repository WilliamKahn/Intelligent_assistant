import { findAndClick, fixedClick, dialogClick } from "../../common/click";
import { close, merge } from "../../common/utils";
import { CurrentAppBanned, isCurrentAppBanned } from "../../lib/exception";
import { Record } from "../../lib/logger";
import { Base } from "./Base";

export abstract class AbstractTomato extends Base {

    constructor() {
        super()
    }
    
    sign(): void {
        findAndClick('立即签到.+', {fixed:true, feedback:true})

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
}