import { search } from "../common/search";
import { NAME_READ_ARTICLE, PACKAGE_READ_ARTICLE } from "../global";
import { AbstractArticle } from "./abstract/AbstractArticle";

export class Article extends AbstractArticle{

    constructor(){
        super(PACKAGE_READ_ARTICLE)
        this.appName = NAME_READ_ARTICLE
    }

    goToTask(): void {
        this.goTo(this.tab, 2)
    }

    getCoinStr(): string {
        const component = search("恭喜你获得[0-9]+金币")
        return component?.text || ""
    }
}