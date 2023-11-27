import { findAndClick, fixedClick, goneClick } from "../../common/click";
import { close, merge } from "../../common/utils";
import { isCurrentAppBanned } from "../../lib/exception";
import { Record } from "../../lib/logger";
import { Base } from "./Base";

export abstract class AbstractTomato extends Base {

    //app账号情况
    situation:boolean = true

    constructor() {
        super()
    }
    
    sign(): void {
        try {
            if(findAndClick('立即签到.+', {fixed:true, feedback:true})){
                this.situation = true
            }
        } catch (error) {
            if(isCurrentAppBanned(error)){
                Record.warn(`${this.appName}账号异常, 但不影响后续收益`)
                this.situation = false
                close(0)
            }
        }
        if(findAndClick('看视频立即续签|额外领[0-9]+金币', {fixed:true})){
            this.watch(textMatches(merge(["日常福利", "看视频立即续签"])))
            if(text("看视频立即续签").exists()){
                Record.warn(`${this.appName}账号异常, 但不影响后续收益`)
                this.situation = false
                close(0)
            } else {
                this.situation = true
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