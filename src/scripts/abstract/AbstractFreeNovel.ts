import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, RANGE_FIXED_SCREEN, RANGE_FOUR_FIFTHS_SCREEN } from "../../global";
import { functionLog, measureExecutionTime } from "../../lib/decorators";
import { Record } from "../../lib/logger";
import { doFuncAtGivenTime, doFuncUntilPopupsGone, findAndClick, getStrByOcrRecognizeLimitBounds, merge, normalClick, randomClickChildInList, resizeX, resizeY, waitRandomTime } from "../../lib/utils";
import { Base, BaseKey } from "./Base";

export abstract class AbstractFreeNovel extends Base {

    tab: UiSelector

    buttonNameList:string[] = [
        '看小视频再领.*'
    ]

    constructor(packageName: string) {
        super()
        this.tab = id(packageName+":id/home_activity_navigation_bar")
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 15 * 60)
        this.lowEffEstimatedTime = 0
        this.lowEffAssmitCount = 2
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.openTreasure()
    }

    @measureExecutionTime
    medEff(): void {
        this.watchAds()
        this.shopping()
        this.luckySpin()
    }

    @measureExecutionTime
    lowEff(time: number): void {
        //每十分钟执行一次
        doFuncAtGivenTime(time / 2, 10 * 60,(perTime: number)=>{
            this.readBook(perTime)
            this.openTreasure()
            return perTime
        })
        let isFirst = true
        doFuncAtGivenTime(time / 2, 10 * 60,(perTime: number)=>{
            if(isFirst){
                this.listenBook()
                isFirst = false
            } else {
                this.continueListen()
            }
            let actualTime = waitRandomTime(perTime)
            this.openTreasure()
            return actualTime
        })
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 2)
        if(findAndClick(text("我的金币"), {bounds: RANGE_FIXED_SCREEN})){
            let tmp = textStartsWith("今日金币").findOnce()
            if(tmp != null) {
                const match = tmp.text().replace(",", "").match(/[0-9]+/)
                if(match){
                    Record.debug(`${this.constructor.name}:${parseInt(match[0])}`)
                    this.store(BaseKey.Weight, parseInt(match[0]))
                }
            }
        }
    }
    
    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        doFuncUntilPopupsGone(this.buttonNameList, {
            func: ()=>{
                this.watch(text("日常福利"))
            },
            ocrRecognizeText: "看小视频再领[0-9]+金币"
        })
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        doFuncUntilPopupsGone(this.buttonNameList, {
            func: ()=>{
                this.watch(text("日常福利"))
            },
            ocrRecognizeText: "看小视频再领[0-9]+金币"
        })
        if (findAndClick(textMatches(merge(['开宝箱得金币', '[0-9]+分[0-9]+秒'])))) {
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: ()=>{
                    this.watch(text("日常福利"))
                },
                ocrRecognizeText: "看小视频再领[0-9]+金币"
            })
        }
    }

    @functionLog("看视频")
    watchAds(): void {
        this.goTo(this.tab, 2)
        if(findAndClick(text("去观看"), {
            bounds: RANGE_FOUR_FIFTHS_SCREEN,
            normalClickOptions: {waitTimes: 10},
            untilGone: true
        })){
            this.watch(text("日常福利"))
            findAndClick(text("领金币"), {
                bounds: RANGE_FOUR_FIFTHS_SCREEN,
                untilGone: true
            })
        }
    }

    @functionLog("逛街")
    shopping(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick(text("去逛逛"), {
                bounds: RANGE_FOUR_FIFTHS_SCREEN,
                normalClickOptions: {waitTimes: 10},
                untilGone: true
            })) {
            this.watch(text("日常福利"))
            findAndClick(text("领金币"), {
                bounds: RANGE_FOUR_FIFTHS_SCREEN,
                untilGone: true
            })
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.openBook()
        this.read(totalTime)        
    }

    @functionLog("听书")
    listenBook(): void {
        this.openBook()
        click(device.width/2, device.height/2)
        waitRandomTime(2)
        if(findAndClick(id(this.packageName+":id/reader_listen_entry"))){
            if(findAndClick(text("去看小视频"))){
                this.watch(text("边听边读"))
            }
            findAndClick(text("边听边读"))
        }
    }

    @functionLog("幸运大转盘")
    luckySpin(): void {
        this.goTo(this.tab, 2)
        if(findAndClick(text("去抽奖"), {bounds: RANGE_FOUR_FIFTHS_SCREEN})){
            for(let i =0; i<5 ;i++){
                normalClick(resizeX(random(475, 610)), resizeY(random(1135, 1280)))
                waitRandomTime(4)
                if(i != 0){
                    this.watch(text("幸运大转盘"))
                }
                waitRandomTime(10)
                findAndClick(text("好的"))
            }
        }
    }

    continueListen(): void {
        if(findAndClick(id(this.packageName+":id/voice_rl"))){
            if(findAndClick(text("去看小视频"))){
                this.watch(text("边听边读"))
            }
            findAndClick(text("边听边读"))
        }
    }

    openBook(): void {
        this.goTo(this.tab, 1)
        if(findAndClick(text("完整榜单"))){
            randomClickChildInList(
                id(this.packageName+":id/right_content_view"),
                random(0, 8)
            )
        }
    }
}