import { Image, Point } from "images"
import { Bounds, ClosePoint, Component, ComponentBounds, CoverCheckOptions, Priority, SearchByOcrRecognizeOptions } from "./interfaces"
import { boundsScaling, distincList, findPreferredCloseButton, levenshteinDistance, removeNonChineseCharsFromEdges, replaceCharacters, waitRandomTime } from "./utils"
import { Record } from "../lib/logger"
import { normalClick } from "./click"
import { OcrResultDetail } from "ocr"
import { NORMAL_WAIT_TIME } from "../global"

export function searchByOcrRecognize(str: string, options?:SearchByOcrRecognizeOptions):Component|undefined{
    const waitTimes = options?.waitFor || NORMAL_WAIT_TIME
    waitRandomTime(waitTimes)
    const img = getScreenImage(options?.bounds)
    const grayImg = images.cvtColor(img, "BGR2GRAY")
    img.recycle()
    const adaptiveImg = images.adaptiveThreshold(grayImg, 255, "GAUSSIAN_C", "BINARY", 25, 0)
    grayImg.recycle()
    const res = ocr.recognize(adaptiveImg)
    // adaptiveImg.saveTo("/sdcard/exit-big.png")
    // app.viewFile("/sdcard/exit-big.png")
    adaptiveImg.recycle()
    let list:OcrResultDetail[] = []
    // log(res)
    for(let item of res.results){
        // log(item.text)
        if(RegExp("^"+replaceCharacters(str)+"$").test(
            removeNonChineseCharsFromEdges(item.text))){
            list.push(item)
        }
    }
    Record.debug(`list length: ${list.length}`)
    let result: Component|undefined = undefined
    if(list.length > 0){
        const index = options?.index? options.index:0
        // log(index)
        const tmp = list[index]
        if(tmp){
            if(options?.bounds){
                const x = options.bounds.left||0
                const y = options.bounds.top||0
                tmp.bounds.left += x
                tmp.bounds.right += x
                tmp.bounds.top += y
                tmp.bounds.bottom += y
            }
            result = {text: removeNonChineseCharsFromEdges(tmp.text),
                bounds: tmp.bounds
            }
        }
    }
    if(options?.throwErrIfNotExist && !result){
        throw "控件不存在"
    }
    return result
}

/**
 * @description
 * @returns true if the text equal result of ocr, or false
 */
export function coverCheck(component:UiObject, options?:CoverCheckOptions){
    Record.debug("遮挡校验")
    if(component.text() === ""){
        return false
    }
    const scale = options?.coverBoundsScaling || 1.3
    const threshold = options?.threshold || 0.6
    Record.debug(`text :${component.text()}`)
    // log(component.bounds)
    const img = getScreenImage(boundsScaling(component.bounds(), scale))
    const textHeight = component.bounds().bottom - component.bounds().top
    const bigScale = textHeight > 50 ? 1 : 50 / textHeight
    const bigImg = images.scale(img, bigScale, bigScale)
    img.recycle()
    const grayImg = images.cvtColor(bigImg, "BGR2GRAY")
    bigImg.recycle()
    const adaptiveImg = images.adaptiveThreshold(grayImg, 255, "GAUSSIAN_C", "BINARY", 25, 0)
    grayImg.recycle()
    const str = options?.leftToRight?
        recognizeTextByLeftToRight(adaptiveImg)
        :ocr.recognizeText(adaptiveImg)
    // adaptiveImg.saveTo("/sdcard/result.jpg")
    // app.viewFile("/sdcard/result.jpg")
    adaptiveImg.recycle()
    Record.debug(`ocr str:${str}`)
    // return str.search(component.text()) == -1 && 
    return !RegExp(replaceCharacters(component.text())).test(str) && levenshteinDistance(component.text(), str) < threshold
}

export function getScreenImage(bounds?: Bounds){
    const left = bounds?.left || 0
    const top = bounds?.top || 0
    const right = bounds?.right || device.width
    const bottom = bounds?.bottom || device.height

    const x1 = left > 0 ? left : 0
    const y1 = top > 0 ? top : 0
    const x2 = right < device.width ? right : device.width
    const y2 = bottom < device.height ? bottom : device.height

    console.hide()
    sleep(100)
    const img = captureScreen()
    console.show()
    waitRandomTime(1)
    const result = images.clip(img, x1, y1, x2-x1, y2-y1)
    try {
        return result
    } finally {
        // @ts-ignore
        img.recycle()
    }
}
//无用
export function judgeFuncIsWorkByImg(func: ()=>void, bounds:Bounds){
    const before = getScreenImage(bounds)
    func()
    const after = getScreenImage(bounds)
    const compare = findImage(before, after, {
        threshold: 1
    })
    before.recycle()
    after.recycle()
    if (compare) {
        Record.debug("操作失效")
        return false
    } else {
        Record.debug("操作生效")
        return true
    }
}

export function closeByImageMatching(filter?: boolean): boolean {
    const img = getScreenImage()
    const threshold = 0.7
    //需要从网络远程获取
    const tmp = images.read('/sdcard/exit.png')
    if(img != null && tmp != null) {
        //灰度化
        const grayImg = images.cvtColor(img, "BGR2GRAY")
        const grayTmp = images.cvtColor(tmp, "BGR2GRAY")
        tmp.recycle()
        //反转 黑色按钮
        const grayWhiteTmp = images.adaptiveThreshold(grayTmp, 255, "GAUSSIAN_C", "BINARY", 9, 0)
        const grayInvTmp = images.adaptiveThreshold(grayTmp, 255, "GAUSSIAN_C", "BINARY_INV", 9, 0)
        grayTmp.recycle()
        //阈值化
        const adaptiveImg = images.adaptiveThreshold(grayImg, 255, "GAUSSIAN_C", "BINARY", 25, 0)
        grayImg.recycle()
        // adaptiveImg.saveTo("/sdcard/result.jpg")
        // app.viewFile("/sdcard/result.jpg")
        
        //验证图片
        let list:Point[] = []        
        for(let i = 50; i>=20; i-=5){
            const white = images.resize(grayWhiteTmp, i)
            const black = images.resize(grayInvTmp, i)
            const match1 = images.matchTemplate(adaptiveImg, white, {
                threshold: threshold,
            })
            white.recycle()
            const match2 = images.matchTemplate(adaptiveImg, black, {
                threshold: threshold,
            })
            black.recycle()
            const combine:Point[] = match1.points.concat(match2.points)
            for(let point of combine){
                point.x += i/2
                point.y += i/2
            }
            list.push(...combine)
        }
        grayInvTmp.recycle()
        grayWhiteTmp.recycle()
        adaptiveImg.recycle()
        if(list != null){
            //去重复坐标
            distincList(list, filter)
            const closeList = getClosePointGrayScale(img, list)
            img.recycle()
            const point = findPreferredCloseButton(closeList)
            if(point != null){
                Record.debug(`close(${point.x},${point.y})`)
                normalClick(point.x, point.y)
                return true
            }
        }
    }
    img.recycle()
    return false
}

export function getGrayscaleHistogram(img:Image, rate:number = 4){
    var grayHistogram:number[] = [];
    for (var i = 0; i < 256; i++) {
        grayHistogram[i] = 0;
    }
    for (var y = 0; y < img.getHeight(); y+=rate) {
        for (var x = 0; x < img.getWidth(); x+=rate) {
            // 获取当前像素的颜色值
            var color = img.pixel(x, y);
            // 计算灰度值
            var grayValue = (colors.red(color) + colors.green(color) + colors.blue(color)) / 3;
            // 更新灰度直方图
            grayHistogram[Math.floor(grayValue)]++;
        }
    }
    img.recycle()
    return grayHistogram
}

export function recognizeTextByLeftToRight(img: Image){
    const res = ocr.recognize(img)
    img.recycle()
    const list = res.results.sort((a, b)=>
        a.bounds.left - b.bounds.left
    )
    return list.map(obj => obj.text).join("")
}

export function getClosePointGrayScale(img:Image, list:Point[]):ClosePoint[]{
    const result:ClosePoint[] = []
    for(const point of list){
        let sum = 0
        let gray = 0
        const yFrom = point.y - 50 > 0 ? point.y - 50 : 0
        const yEnd = point.y + 50 < device.height ? point.y + 50 : device.height
        const xFrom = point.x - 50 > 0 ? point.x - 50 : 0
        const xEnd = point.x + 50 < device.width ? point.x + 50 : device.width
        for(let y = yFrom;y<yEnd+50;y++){
            for(let x = xFrom;x<xEnd;x++){
                let color = img.pixel(x,y)
                if(isGray(colors.red(color), colors.green(color), colors.blue(color))){
                    gray++
                }
                sum++
            }
        }
        Record.debug(`point: ${point},gray: ${(gray/sum).toFixed(2)}`)
        result.push({
            point:point,
            grayScale:gray/sum
        })
    }
    img.recycle()
    return result
}

export function getGrayscale(img:Image, rate:number = 4){
    let sum = 0
    let gray = 0
    for (var y = 0; y < img.getHeight(); y+=rate) {
        for (var x = 0; x < img.getWidth(); x+=rate) {
            // 获取当前像素的颜色值
            var color = img.pixel(x, y);
            if(isGray(colors.red(color), colors.green(color), colors.blue(color))){
                gray++
            }
            sum++
        }
    }
    img.recycle()
    Record.debug(`灰度值${(gray/sum).toFixed(2)}`)
    return gray/sum
}

function isGray(r: number, g: number, b: number): boolean {
    
    const brightnessThreshold = 150 // 亮度阈值，根据实际情况调整
    const contrastThreshold = 150;  // 对比度阈值，根据实际情况调整

    const brightness = (r + g + b) / 3;
    const contrast = Math.max(r, g, b) - Math.min(r, g, b);

    return brightness <= brightnessThreshold && contrast <= contrastThreshold;
}

export function overDetection(detectionBounds:ComponentBounds, slideBounds:ComponentBounds, offset:number): void{
    const scalBounds = boundsScaling(detectionBounds, 0.4)
    const img = getScreenImage(scalBounds)
    const bimg = getScreenImage({
        left:detectionBounds.right,
        top: detectionBounds.top,
        bottom:detectionBounds.bottom,
        right: device.width-detectionBounds.right
    })
    const p = findImage(bimg, img, {threshold:0.7})
    img.recycle()
    bimg.recycle()
    if(p){
        const index = detectionBounds.right - scalBounds.left + p.x
        const centerX = (slideBounds.left+slideBounds.right)/2
        const centerY = (slideBounds.top+slideBounds.bottom)/2
        gesture(500, [centerX, centerY], [centerX + index - offset, centerY + random(-50, 50)])
    } else {
        throw "无法识别的验证码"
    }
}