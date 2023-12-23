import { dialogClick, findAndClick } from "../common/click";
import { search } from "../common/search";
import { NAME_VEDIO_YOUSHI, PACKAGE_VEDIO_YOUSHI } from "../global";
import { functionLog } from "../lib/decorators";
import { AbstractArticle } from "./abstract/AbstractArticle";

export class YouShi extends AbstractArticle{

    constructor() {
        super(PACKAGE_VEDIO_YOUSHI)
        this.appName = NAME_VEDIO_YOUSHI
    }

    goToTask(): void {
        this.goTo(this.tab, 3)
    }
    getCoinStr(): string {
        const [bounds, _] = search("恭喜获得宝箱奖励")
        const [__, name] = search("\\+[0-9]+金币", {bounds: {top: bounds.bottom}})
        return name
    }

    @functionLog("签到")
    signIn(): void{
        this.goToTask()
        if(dialogClick("签到领金币")){
            this.watchAdsForCoin("日常任务")
        } else {//"签到失败"
            if(findAndClick("立即签到", {feedback:true})){
                this.watchAdsForCoin("日常任务")
            }
        }
    }
    
}
