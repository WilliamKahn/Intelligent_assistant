import { findAndClick, fixedClick, scrollClick, waitClick } from "../../common/click";
import { Move } from "../../common/enums";
import { closeByImageMatching } from "../../common/ocr";
import { scrollTo, search } from "../../common/search";
import { merge, swipeDown, swipeUp, waitRandomTime } from "../../common/utils";
import { MAX_CYCLES_COUNTS, NORMAL_WAIT_TIME } from "../../global";
import { functionLog, measureExecutionTime } from "../../lib/decorators";
import { CurrentAppBanned } from "../../lib/exception";
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
            throwErrIfNotExist:true,
        })
        if(component){
            const component1 = search("[0-9]+",{
                bounds:{
                    right:component.bounds().left
                }
            })
            if(component1){
                const weight = parseInt(component1.text())
                this.store(BaseKey.Weight, weight)
            }
        }
    }

    sign(): boolean {
        if(findAndClick('立即签到.+', {
            fixed:true, 
            feedback:true
        })){
            this.watchAdsForCoin("日常福利")
            return true
        } else if(fixedClick('看视频立即续签|额外领[0-9]+金币')){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(textMatches(merge(["日常福利", "看视频立即续签"])))
            if(search("看视频立即续签", {waitFor:2})){
                throw new CurrentAppBanned(this.appName)
            }
            return true
        }
        return false
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goto()
        if (findAndClick("开宝箱得金币", {
            fixed:true,
            feedback:true
        })) {
            this.watchAdsForCoin("日常福利")
        }
    }

    openBook(str: string): void{
        let find = false
        for(let i = 1; i < 5 ;i++){
            if(this.readClick(i)){
                if(fixedClick(str)){
                    find = true
                    break
                } else{
                    back()
                }
            }
        }
        if(!find){
            throw "执行错误"
        }
    }

    readClick(num: number):boolean{
        const tmp = search(text(num.toString()), {
            fixed:true,
            waitFor:10,
            throwErrIfNotExist:true
        })
        if(tmp){
            const parent = tmp.parent()
            if(parent){
                return findAndClick(className("android.widget.TextView"),{
                    bounds: parent.bounds(),
                    index: 1,
                    disableCoverCheck:true
                })
            }
        }
        return false
    }

    scrollClick(text:string, range:string): boolean{
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
             && search(range) === undefined){
            this.move()
        }
        if(cycleCounts >= MAX_CYCLES_COUNTS){
            return false
        }
        return scrollClick(text, range)
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
        const before = search("金币献爱心", {
            throwErrIfNotExist:true
        })
        if(this.moveFlag){
            swipeDown(Move.Fast, 1000)
        } else {
            swipeUp(Move.Fast, 1000)
        }
        waitRandomTime(2)
        const after = search("金币献爱心", {
            throwErrIfNotExist:true})
        if(before?.bounds().top === after?.bounds().top){
            if(!closeByImageMatching()){
                this.moveFlag = !this.moveFlag
            }
        }
    }
}