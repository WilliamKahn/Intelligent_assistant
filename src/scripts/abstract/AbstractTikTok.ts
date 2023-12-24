import { findAndClick } from "../../common/click";
import { searchByOcrRecognize } from "../../common/search";
import { doFuncAtGivenTime, randomExecute } from "../../common/utils";
import { MAX_CYCLES_COUNTS } from "../../global";
import { measureExecutionTime } from "../../lib/decorators";
import { Base, BaseKey } from "./Base";

export abstract class AbstractTikTok extends Base{

    moveFlag: boolean = true

    constructor() {
        super()
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, 10 * 60)
        this.medEffEstimatedTime = this.fetch(BaseKey.MedEffEstimatedTime, 30 * 60)
        this.lowEffEstimatedTime = 0
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
    lowEff(time: number): void {
        doFuncAtGivenTime(time, 20 * 60, (perTime: number) => {
            this.swipeVideo(perTime)
            randomExecute([
                ()=>{this.openTreasure()},
                ()=>{this.watchAds()},
                ()=>{this.shopping()},
            ])
        })
    }

    scrollOcrClick(str:string, left:string): boolean{
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && searchByOcrRecognize(left)[0] === undefined){
            this.move()
        }
        if(cycleCounts >= MAX_CYCLES_COUNTS){
            return false
        }
        const [bounds, _]:any = searchByOcrRecognize(left)
        if(!findAndClick(str, {fixed:true, ocrRecognize:true, bounds:{top: bounds.top, bottom: bounds.bottom + 80}})){
            this.move()
            return this.scrollOcrClick(str, left)
        }
        return true
    }
}