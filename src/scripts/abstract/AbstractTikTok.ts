import { randomClick } from "../../common/click";
import { searchByOcrRecognize } from "../../common/ocr";
import { randomExecute } from "../../common/utils";
import { measureExecutionTime } from "../../lib/decorators";
import { Base } from "./Base";

export abstract class AbstractTikTok extends Base{

    moveFlag: boolean = true

    constructor() {
        super()
        this.medEffInheritance = true
        this.lowEff1Inheritance = true
    }

    abstract move():void

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.watchAds()},
            ()=>{this.shopping()},
        ])
    }
    
    @measureExecutionTime
    medEff(): void {
        this.watchLive()
    }
    @measureExecutionTime
    lowEff1(time: number): void {
        this.swipeVideo(time)
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.watchAds()},
            ()=>{this.shopping()},
        ])
    }

    scrollOcrClick(str:string, left:string): boolean{
        let cycleCounts = 0
        let component = searchByOcrRecognize(left)
        while(++cycleCounts < 12
            &&  component === undefined){
            this.move()
            component = searchByOcrRecognize(left, {waitFor:0})
        }
        if(cycleCounts >= 12){
            return false
        } else {
            if(component){
                const com = searchByOcrRecognize(str, {
                    waitFor:0,
                    bounds:{top: 
                        component.bounds.top, bottom: 
                        component.bounds.bottom + 200
                    }
                })
                if(component.bounds.bottom < device.height*2/3){
                    if(com){
                        randomClick(com.bounds)
                    } else {
                        return false
                    }
                } else {
                    if(com){
                        randomClick(com.bounds)
                    } else {
                        this.move()
                        return this.scrollOcrClick(str, left)
                    }
                }
            }
            return true
        }
    }
}