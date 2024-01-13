import { findAndClick, fixedClick } from "../common/click";
import { getScreenImage, resizeX, resizeY, waitRandomTime } from "../common/utils";
import { BASE_ASSIMT_TIME, MAX_CYCLES_COUNTS, NAME_READ_WANCHAO, PACKAGE_READ_WANCHAO } from "../global";
import { measureExecutionTime } from "../lib/decorators";
import { Record } from "../lib/logger";
import { Base, BaseKey } from "./abstract/Base";

export class WanChao extends Base {

    constructor() {
        super()
        this.appName = NAME_READ_WANCHAO
        this.packageName = PACKAGE_READ_WANCHAO
        this.highEffEstimatedTime = this.fetch(BaseKey.HighEffEstimatedTime, BASE_ASSIMT_TIME)
    }

    @measureExecutionTime
    highEff(): void {
        this.readForMoney()
    }

    weight(): void {
        this.store(BaseKey.Weight, 0)
    }

    //阅读有礼
    readForMoney(): void {
        if (findAndClick("阅读有礼")) {
            let cycleCounts = 0
            while (++cycleCounts < MAX_CYCLES_COUNTS && text("请完成安全验证").exists()) {
                this.overDetection()
                waitRandomTime(4)
            }
            while(++cycleCounts < MAX_CYCLES_COUNTS 
                && findAndClick("待完成", {waitTimes:10, coverBoundsScaling:1})) {
                back()
                waitRandomTime(4)
            }
            if(fixedClick("抽奖")){
                let box = idContains('nc_1_n1z').findOnce()
                if(box != null) {
                    swipe(box.bounds().centerX(), box.bounds().centerY(), device.width,box.bounds().centerY()+random(-25,0), 100)
                    waitRandomTime(3)
                }
                if(findAndClick("抽奖", {ocrRecognize:true, bounds:{top:200}})){
                    let money = textMatches("[0-9]+\.[0-9]+元")
                    .boundsInside(resizeX(108),resizeY(1140),resizeX(972),resizeY(1323)).findOnce()
                    if(money != null) {
                        Record.log(`中奖${money.text()}`)
                        this.store(BaseKey.Weight, parseFloat(money.text()) * this.exchangeRate)
                    }
                }
            }
        }
    }

    //过滑块验证
    overDetection(): void{
        let detection = id("tf-verify-canvas").findOnce()
        let from = resizeX(123)
        let end = resizeX(957)
        let top = resizeY(1065)
        let region = 120
        let relatPicDis = 150
        if(detection != null) {
            from = detection.bounds().left
            end = detection.bounds().right
            top = detection.bounds().top
        }
        //var img = images.read('/sdcard/Pictures/Screenshots/test1.jpg')
        const img = getScreenImage()
        let min = 10000
        let index = 0
        for (let x = from; x < end; x++) {
            let t = 0
            for (let dx =x; dx<x+region;dx++){
                let color = images.pixel(img, dx,top + relatPicDis)
                let red = colors.red(color)
                let green = colors.green(color);
                let blue = colors.blue(color)
                t += this.isGrayColor(red, green, blue)
            }
            //记录区域范围内最小值
            if(t<min){
                min = t
                index = x
            }
        }
        let slideBox = className("android.view.View").depth(14).drawingOrder(0).boundsInside(100, 1400, 300, 1600).findOnce()
        if(slideBox!=null) {
            let centerX = (slideBox.bounds().left + slideBox.bounds().right)/2
            let centerY = (slideBox.bounds().top + slideBox.bounds().bottom)/2
            //149
            gesture(2000, [centerX, centerY], [centerX + index - 149, centerY + random(-50, 50)])
        }
        img.recycle()
    }

    
    isGrayColor(red:number, green:number, blue:number): number {
    // 计算RGB通道值的标准差
    if((red+green+blue)>200 && (red+green+blue)< 500) {
        return Math.sqrt((Math.pow(red - green, 2) + Math.pow(red - blue, 2) + Math.pow(green - blue, 2)) / 3);
    } else {
        return 100
    }
}
}
