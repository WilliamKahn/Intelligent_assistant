import { findAndClick, randomClick } from "../../common/click";
import { searchByOcrRecognize } from "../../common/search";
import { doFuncAtGivenTime, randomExecute } from "../../common/utils";
import { MAX_CYCLES_COUNTS } from "../../global";
import { measureExecutionTime } from "../../lib/decorators";
import { Base, BaseKey } from "./Base";

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
        while(++cycleCounts < 10
            && searchByOcrRecognize(left) === undefined){
            this.move()
        }
        if(cycleCounts >= 10){
            return false
        }
        const component = searchByOcrRecognize(left)
        if(component !== undefined){
            const com = searchByOcrRecognize(str, {
                bounds:{top: component.bounds.top, bottom: component.bounds.bottom + 200}
            })
            if(component.bounds.bottom > device.height/3){    
                if(com !== undefined){
                    randomClick(com.bounds)
                } else {
                    return false
                }
            } else {
                if(com !== undefined){
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