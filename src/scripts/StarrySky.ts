import { NAME_READ_STARRY_SKY, PACKAGE_READ_STARRY_SKY } from "../global";
import { AbstractFreeNovel } from "./abstract/AbstractFreeNovel";

export class StarrySky extends AbstractFreeNovel{

    constructor() {
        super(PACKAGE_READ_STARRY_SKY)
        this.appName = NAME_READ_STARRY_SKY
        this.packageName = PACKAGE_READ_STARRY_SKY
    }
}