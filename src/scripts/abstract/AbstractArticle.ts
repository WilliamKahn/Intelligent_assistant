import { randomClick } from "../../common/click";
import { Move } from "../../common/enums";
import { SearchByOcrRecognizeOptions } from "../../common/interfaces";
import { closeByImageMatching, coverCheck, searchByOcrRecognize } from "../../common/ocr";
import { scrollTo, search } from "../../common/search";
import { swipeDown, swipeUp, waitRandomTime } from "../../common/utils";
import { Base } from "./Base";

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

    scrollClick(text:string, options:SearchByOcrRecognizeOptions = {}): boolean{
        let cycleCounts = 0
        let component = searchByOcrRecognize(text, options)
        options.waitFor = 0
        while(++cycleCounts < this.moveTimes
             && component === undefined){
            this.move()
            component = searchByOcrRecognize(text, options)
        }
        if(cycleCounts >= this.moveTimes){
            return false
        } else {
            if(component){
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
        const before = search("每日凌晨.*", {
            throwErrIfNotExist:true
        })
        if(this.moveFlag){
            swipeDown(Move.Fast, 1000)
        } else {
            swipeUp(Move.Fast, 1000)
        }
        waitRandomTime(2)
        const after = search("每日凌晨.*", {
            throwErrIfNotExist:true
        })
        if(before && after){
            if(before.bounds().top+before.bounds().bottom === after.bounds().top+after.bounds().bottom){
                if(!closeByImageMatching()){
                    this.moveFlag = !this.moveFlag
                }
            }
        } else {
            throw "异常情况"
        }
    }

    ocrClick(text:string):boolean{
        const component = scrollTo(textMatches(text))
        if(component){
            if(coverCheck(component)){
                return false
            } else {
                randomClick(component.bounds())
                return true
            }
        }
        return false
    }
}