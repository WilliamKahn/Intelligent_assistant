import { BASE_ASSIMT_TIME, DEVICE_HEIGHT, DEVICE_WIDTH, MAX_CYCLES_COUNTS, NAME_READ_MARVEL_FREE, PACKAGE_READ_MARVEL_FREE, RANGE_FOUR_FIFTHS_SCREEN } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { findAndClick, closeByImageMatching, getStrByOcrRecognizeLimitBounds, doFuncAtGivenTime, doFuncUntilPopupsGone, randomClickChildInList, scrollTo, normalClick, resizeX, resizeY } from "../lib/utils";
import { Base, BaseKey } from "./abstract/Base";

export class MarvelFree extends Base{

    buttonNameList:string[] = [
        '看视频再领(最高)?[0-9]+金币'
    ]

    constructor() {
        super()
        this.appName = NAME_READ_MARVEL_FREE
        this.packageName = PACKAGE_READ_MARVEL_FREE
        this.tab = id(this.packageName+":id/tab_layout")
        this.depth = 1
        this.exitNum = 0
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 10 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
    }

    @measureExecutionTime
    medEff(): void {
        this.watchAds()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        time -= 5 * 60
        doFuncAtGivenTime(time, 10 * 60, (perTime:number) => {
            this.readBook(perTime)
            this.openTreasure()
        })
        this.reward()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 2)
        scrollTo(text("金币收益"))
        let tmp = textMatches("[0-9]+").boundsInside(0,0,resizeX(582), resizeY(735)).findOnce()
        if(tmp != null) {
            this.store(BaseKey.Weight, parseInt(tmp.text()))
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        if(textStartsWith("今日签到").exists()){
            closeByImageMatching()
        }
    }
    
    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        if (findAndClick(text("开宝箱"))) {
            this.clickPop()
        }
    }

    @functionLog("看视频")
    watchAds(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && textMatches("看视频领金币.+").exists()
            && findAndClick(text("去领取"), {//1068 32 63  1131
                searchByLeftRangeOption: textMatches("看视频领金币.+"), 
                bounds: RANGE_FOUR_FIFTHS_SCREEN}))
        {
            this.watch(text("日常福利"))
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 0)
        if(findAndClick(text("男生"))){
            if(findAndClick(id(PACKAGE_READ_MARVEL_FREE+":id/tv_right_title"))){
                randomClickChildInList(
                    id(PACKAGE_READ_MARVEL_FREE+":id/rv_gender_rank"),
                    random(0, 5)
                )
                this.read(totalTime)
            }
        }   
    }

    @functionLog("领取所有奖励")
    reward(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick(text("领金币").depth(24))) {
            this.clickPop()
        }
    }

    clickPop(): void {
        let flag = true
        doFuncUntilPopupsGone(this.buttonNameList, {
            func: ()=>{
                this.watch(text("日常福利"))
                flag = false
            }
        })
        if(flag) {
            let str = getStrByOcrRecognizeLimitBounds()
            const match = str.match(/看视频再领(最高)?[0-9]+金币/)
            if(match){
                normalClick(resizeX(random(300, 800)), resizeY(random(1150, 1250)))
                this.watch(text("日常福利"))
            }
        }
    }

}