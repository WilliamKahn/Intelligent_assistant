import { NAME_READ_EGGPLANT_FREE, PACKAGE_EGGPLANT_FREE } from "../global";
import { AbstractFreeNovel } from "./abstract/AbstractFreeNovel";

export class EggplantFree extends AbstractFreeNovel {

    constructor() {
        super(PACKAGE_EGGPLANT_FREE)
        this.appName = NAME_READ_EGGPLANT_FREE
        this.packageName = PACKAGE_EGGPLANT_FREE
    }
 
}