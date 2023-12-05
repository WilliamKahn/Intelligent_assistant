import { findAndClick, dialogClick, normalClick, scrollClick, selectedClick } from "../common/click";
import { closeByImageMatching, doFuncAtGivenTime, randomExecute, waitRandomTime } from "../common/utils";
import { MAX_CYCLES_COUNTS, NAME_READ_SEVEN_CATS_FREE, PACKAGE_READ_SEVEN_CATS_FREE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { AbstractFreeNovel } from "./abstract/AbstractFreeNovel";
import { Base, BaseKey } from "./abstract/Base";

export class SevenCatsFree extends AbstractFreeNovel{

    constructor(){
        super(PACKAGE_READ_SEVEN_CATS_FREE)
        this.appName = NAME_READ_SEVEN_CATS_FREE
        this.packageName = PACKAGE_READ_SEVEN_CATS_FREE
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 2)
        let tmp = textMatches(".*今日金币.*").findOnce()
        if(tmp != null){
            const match = tmp.text().match(/[0-9]+今日金币/)
            if(match){
                const weight = parseInt(match[0])
                this.store(BaseKey.Weight, weight)
                this.store(BaseKey.Money, (weight/10000).toFixed(2))
            }
        }
    }

    @functionLog("签到")
    signIn(): void {
        this.goTo(this.tab, 2)
        dialogClick("立即签到.+")
        this.watchAdsForCoin("日常福利")
    }
}