import { NAME_READ_PANDA_BRAIN, PACKAGE_READ_PANDA_BRAIN } from "../global";
import { AbstractFreeNovel } from "./abstract/AbstractFreeNovel";

export class PandaBrain extends AbstractFreeNovel {

    constructor() {
        super(PACKAGE_READ_PANDA_BRAIN)
        this.appName = NAME_READ_PANDA_BRAIN
        this.packageName = PACKAGE_READ_PANDA_BRAIN
    }
    
}