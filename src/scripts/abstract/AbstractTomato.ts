import { Record } from "../../lib/logger";
import { close, doFuncUntilPopupsGone, findAndClick, merge } from "../../lib/utils";
import { Base } from "./Base";

export abstract class AbstractTomato extends Base {

    buttonNameList:string[] = [
        '额外领.*', 
        '看视频得.*', 
        '看视频领最多.*', 
        '看视频立即领取.*', 
        '看视频再得.*', 
        '看视频再领.*',
        '看视频再抽一次.*',
        '看视频最高再领.*'
    ];
    //app账号情况
    situation:boolean = true
    //账号恢复正常重新签到标志
    resign:boolean =  false

    constructor() {
        super()
        this.verify = false
    }
    
    sign(): void {
        try {
            doFuncUntilPopupsGone(['立即签到.+'], {
                func: ()=>{
                    //看广告
                    doFuncUntilPopupsGone(this.buttonNameList, {
                        func: () => {
                            this.watch(text("日常福利"))
                        }
                    })
                },
                normalClickOptions:{errorMsg: "账号异常"}
            })
        } catch (error) {
            Record.warn(`${this.appName}账号异常, 但不影响后续收益`)
            this.situation = false
            close(0)
        }
        doFuncUntilPopupsGone(['看视频立即续签'], {
            func: ()=>{
                this.watch(textMatches(merge(["日常福利", "看视频立即续签"])))
                if(text("看视频立即续签").exists()){
                    Record.warn(`${this.appName}账号异常, 但不影响后续收益`)
                    this.situation = false
                    close(0)
                }
            }
        })
        doFuncUntilPopupsGone(this.buttonNameList, {
            func: ()=>{
                this.watch(text("日常福利"))
            }
        })
    }

    open(): void{
        if (findAndClick(text("开宝箱得金币"))) {
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: ()=>{
                    if(this.situation == false) {
                        this.situation = true
                        this.resign = true
                    }
                    this.watch(text("日常福利"))
                }
            })
        }
    }
}