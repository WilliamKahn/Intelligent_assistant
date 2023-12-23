import { dialogClick, findAndClick, fixedClick, scrollClick } from "../common/click";
import { scrollTo, search } from "../common/search";
import { closeByImageMatching, moveDown, randomExecute, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_ARTICLE_LITE, PACKAGE_READ_ARTICLE_LITE, tikTokLite } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { AbstractArticle } from "./abstract/AbstractArticle";
import { BaseKey } from "./abstract/Base";

export class ArticleLite extends AbstractArticle{

    constructor(){
        super(PACKAGE_READ_ARTICLE_LITE)
        this.appName = NAME_READ_ARTICLE_LITE
    }

    @measureExecutionTime
    highEff(): void {
        this.signIn()
        randomExecute([
            ()=>{this.openTreasure()},
            ()=>{this.doubleEarn()},
            ()=>{this.watchAds()},
            ()=>{this.toSearch()},
            ()=>{this.randomSearch()},
        ])
        this.reward2()
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 2)
        scrollTo("现金收益")
        const [_,name] = search("[0-9]+金币")
        if(name !== undefined){
            const weight = parseInt(name)
            Record.debug(`${weight}`)
            this.store(BaseKey.Weight, weight)
        }
    }

    goToTask(): void {
        this.goTo(this.tab, 2)
    }

    getCoinStr(): string {
        const [bounds, _] = search("恭喜获得宝箱奖励")
        const [__, name] = search("\\+[0-9]+金币", {bounds: {top: bounds.bottom}})
        return name
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        if(dialogClick("额外再领")){
            this.watch(text("日常任务"))
            closeByImageMatching()
        }
    }

    @functionLog("搜一搜赚钱")
    toSearch():void{
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && text("搜一搜赚钱").exists()){
            if(scrollClick("去搜索", "搜一搜赚钱") 
            && fixedClick("搜索")){
                moveDown(15, 4)
                this.backUntilFind(text("日常任务"))    
            }
        }
    }

    @functionLog("随机搜赚钱")
    randomSearch():void{
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && text("随机搜赚钱").exists()){
            if(scrollClick("随机搜", "随机搜赚钱")){
                moveDown(15, 4)
                this.backUntilFind(text("日常任务"))
            }
        }
    }

    @functionLog("看视频奖励领取")
    reward(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick("点击领取",{coverBoundsScaling:1})){
            this.watchAdsForCoin("日常任务")
        }
    }

    @functionLog("领取挑战奖励")
    reward2(): void {
        this.goTo(this.tab, 2)
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && findAndClick("领取",{coverBoundsScaling:1})){
            this.watchAdsForCoin("日常任务")
        }
    }

    @functionLog("看视频")
    swipeVideo(totalTime: number): void {
        this.goTo(this.tab, 2)
        if(scrollClick("看视频", "看文章或视频赚金币")){
            moveDown(totalTime, 10)
        }
    }

}