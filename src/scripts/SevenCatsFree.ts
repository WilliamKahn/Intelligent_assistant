import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_READ_SEVEN_CATS_FREE, PACKAGE_READ_SEVEN_CATS_FREE, RANGE_FOUR_FIFTHS_SCREEN, RANGE_MIDDLE_SCREEN } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { findAndClick, closeByImageMatching, getStrByOcrRecognizeLimitBounds, doFuncAtGivenTime, doFuncUntilPopupsGone, randomClickChildInList, waitRandomTime, normalClick, resizeX, resizeY } from "../lib/utils";
import { Base, BaseKey } from "./abstract/Base";

export class SevenCatsFree extends Base{

    buttonNameList:string[] = [
        '看小视频再领.*',
    ]

    constructor(){
        super()
        this.appName = NAME_READ_SEVEN_CATS_FREE
        this.packageName = PACKAGE_READ_SEVEN_CATS_FREE
        this.tab = id(this.packageName+":id/home_activity_navigation_bar")
        this.lowEffAssmitCount = 2
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 10 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        closeByImageMatching()
        this.signIn()
        this.openTreasure()
    }

    @measureExecutionTime
    medEff(): void {
        this.watchAds()
        this.shopping()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        doFuncAtGivenTime(time/2, 10 * 60, (perTime: number)=>{
            this.readBook(perTime)
            this.openTreasure()
        })
        this.listenBook()
        doFuncAtGivenTime(time/2, 10 * 60, (perTime: number)=>{
            this.readBook(perTime)
            this.openTreasure()
        })
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 2)
        let tmp = textMatches(".*今日金币.*").findOnce()
        if(tmp != null){
            const match = tmp.text().match(/[0-9]+今日金币/)
            if(match){
                this.store(BaseKey.Weight, parseInt(match[0]))
            }
        }
    }


    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        this.clickPop()
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        this.clickPop()
        if(findAndClick(text("开宝箱得金币"))) {
            this.clickPop()
        }
    }

    @functionLog("看广告")
    watchAds(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && findAndClick(text("去观看"), {bounds: RANGE_FOUR_FIFTHS_SCREEN})){
            this.watch(text("日常福利"))
            findAndClick(text("领金币"))
        }
    }

    @functionLog("逛街")
    shopping(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick(text("去逛逛"), {bounds: RANGE_FOUR_FIFTHS_SCREEN})) {
            this.watch(text("日常福利"))
            findAndClick(text("领金币"))
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 1)
        if(findAndClick(text("热门"))){
            if(findAndClick(textMatches("完整榜单.*"))){
                randomClickChildInList(
                    id(this.packageName+":id/right_content_view"), 
                    random(0, 6)
                )
                this.read(totalTime)
            }
        }
    }
    
    @functionLog("听书")
    listenBook(): void {
        this.goTo(this.tab, 1)
        if(findAndClick(text("听书"))){
            if(findAndClick(textMatches("完整榜单.*"))){
                randomClickChildInList(
                    id(this.packageName+":id/right_content_view"), 
                    random(0, 7)
                )
                if(findAndClick(id(this.packageName+":id/book_detail_foot_free_read_tv"))){
                    if(findAndClick(text("去看小视频"))){
                        this.watch(id(this.packageName+":id/activity_voice_play_bg"))
                    }
                }
            }
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
            const match = str.match(/看小视频再领[0-9]+金币/)
            if(match){
                normalClick(resizeX(random(350, 700)), resizeY(random(1250, 1300)))
                this.watch(text("日常福利"))
            }
        }
    }
}