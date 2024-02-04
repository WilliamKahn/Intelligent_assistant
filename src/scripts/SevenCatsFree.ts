import { dialogClick } from "../common/click";
import { search } from "../common/search";
import { NAME_READ_SEVEN_CATS_FREE, PACKAGE_READ_SEVEN_CATS_FREE } from "../global";
import { functionLog, measureExecutionTime } from "../lib/decorators";
import { AbstractFreeNovel } from "./abstract/AbstractFreeNovel";
import { BaseKey } from "./abstract/Base";

export class SevenCatsFree extends AbstractFreeNovel{

    constructor(){
        super(PACKAGE_READ_SEVEN_CATS_FREE)
        this.appName = NAME_READ_SEVEN_CATS_FREE
        this.packageName = PACKAGE_READ_SEVEN_CATS_FREE
    }

    @measureExecutionTime
    weight(): void {
        this.goTo(this.tab, 2)
        const tmp = search(".*今日金币.*")
        if(tmp){
            const match = tmp.text().match(/[0-9]+今日金币/)
            if(match){
                const weight = parseInt(match[0])
                this.store(BaseKey.Weight, weight)
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