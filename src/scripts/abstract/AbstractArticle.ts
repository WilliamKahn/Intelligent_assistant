import { dialogClick, findAndClick, fixedClick, normalClick, ocrClick, randomClick, scrollClick, selectedClick } from "../../common/click";
import { Move } from "../../common/enums";
import { SearchByOcrRecognizeOptions } from "../../common/interfaces";
import { coverCheck, scrollTo, search, searchByOcrRecognize, searchByUiSelect } from "../../common/search";
import { closeByImageMatching, convertSecondsToMinutes, doFuncAtGivenTime, getNumFromComponent, moveDown, randomExecute, resizeX, resizeY, swipeDown, swipeUp, waitRandomTime } from "../../common/utils";
import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, MIN_RUN_THRESHOLD } from "../../global";
import { functionLog, measureExecutionTime } from "../../lib/decorators";
import { CurrentAppBanned } from "../../lib/exception";
import { Record } from "../../lib/logger";
import { Base, BaseKey } from "./Base";

export abstract class AbstractArticle extends Base {

    moveFlag:boolean = true
    moveTimes:number = 5

    constructor(packageName: string) {
        super()
        this.packageName = packageName
        this.tab = id("android:id/tabs")
        this.initialComponent = this.tab
        this.initialNum = 0
        this.exchangeRate = 33000
    }

    scrollClick(text:string, options?:SearchByOcrRecognizeOptions): boolean{
        let cycleCounts = 0
        let component = searchByOcrRecognize(text)
        while(++cycleCounts < this.moveTimes
             && component === undefined){
            this.move()
            component = searchByOcrRecognize(text, options)
        }
        if(cycleCounts >= this.moveTimes){
            return false
        } else {
            if(component !== undefined){
                randomClick(component.bounds)
                return true
            }
            return false
        }
    }

    scrollTo(text:string){
        let cycleCounts = 0
        let component = searchByOcrRecognize(text)
        while(++cycleCounts < this.moveTimes
             && component === undefined){
            this.move()
            component = searchByOcrRecognize(text)
        }
    }

    move(): void {
        const before = search("每日凌晨.*", {waitFor:true})
        if(this.moveFlag){
            swipeDown(Move.Fast, 1000)
        } else {
            swipeUp(Move.Fast, 1000)
        }
        waitRandomTime(2)
        const after = search("每日凌晨.*", {waitFor:true})
        if(before && after){
            if(before.bounds.top+before.bounds.bottom=== after.bounds.top+after.bounds.bottom){
                if(!closeByImageMatching()){
                    this.moveFlag = !this.moveFlag
                }
            }
        } else {
            throw "异常情况"
        }
    }

    ocrClick(text:string):boolean{
        const component = searchByUiSelect(textMatches(text))
        if(component !== undefined){
            if(coverCheck(component)){
                return false
            } else {
                randomClick(component.bounds)
                return true
            }
        }
        return false
    }
}