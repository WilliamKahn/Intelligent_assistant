import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_READ_KUAISHOU_FREE, PACKAGE_READ_KUAISHOU_FREE, RANGE_FOUR_FIFTHS_SCREEN } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { findAndClick, closeByImageMatching, doFuncAtGivenTime, doFuncUntilPopupsGone, randomClickChildInList } from "../lib/utils";
import { Base, BaseKey } from "./abstract/Base";

export class KuaiShouFree extends Base{

    buttonNameList:string[] = [
        '看视频赚更多',
        '看广告赚更多'
    ]

    coin: number = 0

    constructor(){
        super()
        this.appName = NAME_READ_KUAISHOU_FREE
        this.packageName = PACKAGE_READ_KUAISHOU_FREE
        this.tab = id(this.packageName+":id/home_bottom_bar")
        this.exitNum = 2
        this.highEffEstimatedTime = this.fetch(BaseKey.highEffEstimatedTime, BASE_ASSIMT_TIME)
        this.medEffEstimatedTime = this.fetch(BaseKey.medEffEstimatedTime, 15 * 60)
        this.lowEffEstimatedTime = 0
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        this.coin = this.record()
        this.openTreasure()
    }
    @measureExecutionTime
    medEff(): void {
        this.watchAds()
    }
    @measureExecutionTime
    lowEff(time: number): void {
        time -= 5 * 60
        //每十分钟执行一次
        doFuncAtGivenTime(time, 10 * 60, (perTime: number) =>{
            this.readBook(perTime)
            this.openTreasure()
        })
        this.reward()
    }
    @measureExecutionTime
    weight(): void {
        let cCoin = this.record()
        this.store(BaseKey.Weight, (cCoin -this.coin)*10000)
    }
    
    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        if(findAndClick(text("立即签到"))){
            closeByImageMatching()
        }
    }

    @functionLog("看视频")
    watchAds(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick(text("去赚钱"), {bounds: RANGE_FOUR_FIFTHS_SCREEN})){
            this.watch(text("日常任务"))
        }
    }

    @functionLog("开宝箱")
    openTreasure(): void {
        this.goTo(this.tab, 2)
        if (findAndClick(textMatches("点击领[0-9]+金币"))) {
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: ()=>{
                    this.watch(text("日常任务"))
                }
            })
        }
    }

    @functionLog("阅读")
    readBook(totalTime: number): void {
        this.goTo(this.tab, 1)
        findAndClick(textMatches("领[0-9]+金币"))
        if(findAndClick(text("完整榜单"), {bounds: RANGE_FOUR_FIFTHS_SCREEN})){
            randomClickChildInList(
                id(PACKAGE_READ_KUAISHOU_FREE+":id/recycler_view"),
                random(0, 7)
            )
            this.read(totalTime)
        }
    }

    @functionLog("领取所有奖励")
    reward(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick(text(""), {
                searchByLeftRangeOption: text("认真阅读小说额外奖励")
            })) {
            doFuncUntilPopupsGone(this.buttonNameList, {
                func: ()=> {
                    this.watch(text("日常任务"))
                }
            })
        }
    }

    record(): number{
        this.goTo(this.tab, 2)
        let tmp = textMatches("约[0-9]+.[0-9]+元").findOnce()
        if(tmp != null) {
            const match = tmp.text().match(/[0-9]+.[0-9]+/)
            if(match){
                return parseInt(match[0])
            }
        }
        return 0    
    }

}