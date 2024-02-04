import { NAME_READ_CHANG_READ_FREE, PACKAGE_READ_CHANG_READ_FREE } from "../global";
import { AbstractNewFreeNovel } from "./abstract/AbstractNewFreeNovel";



export class ChangReadFree extends AbstractNewFreeNovel {
    constructor() {
        super()
        this.appName = NAME_READ_CHANG_READ_FREE
        this.packageName = PACKAGE_READ_CHANG_READ_FREE
    }
}