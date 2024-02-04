import { NAME_READ_EGG_FLOWER, PACKAGE_READ_EGG_FLOWER } from "../global";
import { AbstractNewFreeNovel } from "./abstract/AbstractNewFreeNovel";



export class EggFlower extends AbstractNewFreeNovel {
    constructor() {
        super()
        this.appName = NAME_READ_EGG_FLOWER
        this.packageName = PACKAGE_READ_EGG_FLOWER
    }
}