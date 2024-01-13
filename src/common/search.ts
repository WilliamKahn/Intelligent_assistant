import { OcrResultDetail } from "ocr"
import { ExceedMaxNumberOfAttempts } from "../lib/exception"
import { Record } from "../lib/logger"
import { Move } from "./enums"
import { Bounds, Component, CoverCheckOptions, ScrollToOptions, SearchByOcrRecognizeOptions, SearchByUiSelectOptions, SearchOptions } from "./interfaces"
import { boundsScaling, closeByImageMatching, getScreenImage, levenshteinDistance, myBoundsContains, recognizeTextByLeftToRight, swipeDown, swipeLeft, swipeRight, swipeUp, waitRandomTime } from "./utils"
import { closeDialogifExist } from "./click"

/**
 * todo 躲避遮挡目标时会触发关闭按钮
 * @description 滑动至目标处
 * @param sign 目标
 * @param range 滚动点击范围，默认为全屏幕点击，遮挡住会造成点击失败
 * @param prePy 自身递归所用，为上次查找控件的位置，与当前的位置进行比较
 * @param times 自身递归所用，当无法移动时且尝试三次返回无效后则退出当前app
 * @returns void
*/
export function scrollTo(selector: string|UiSelector, options?: ScrollToOptions, range?: Bounds, prePx?:number, prePy?: number, scrollTimes: number = 0, avoidTimes: number = 0) :Component|undefined {
    const top = options?.fixed? 0: range?.top || 0
    const bottom = options?.fixed? device.height: range?.bottom || device.height
    const left = options?.fixed? 0: range?.left || 0
    const right = options?.fixed? device.width: range?.right || device.width
    //返回超过三次则异常
    if (scrollTimes > 2) {
        Record.debug("scrollTo error")
        throw new ExceedMaxNumberOfAttempts("超过最大限制次数")
    }
    const component = search(selector, options)
    // Record.debug(`${component?.bounds}`)
    if(component && !options?.fixed) {
        let tmpTop = component.bounds.top
        let tmpBottom = component.bounds.bottom
        let tmpRight = component.bounds.right
        let tmpLeft = component.bounds.left
        const pointY = (tmpTop+tmpBottom)/2
        const pointX = (tmpRight+tmpLeft)/2
        if(tmpBottom <= tmpTop){
            if(tmpBottom > 0){
                tmpBottom = bottom + 1
            } else {
                tmpTop = top - 1
            }
        } else if (tmpRight <= tmpLeft){
            if(tmpRight > 0){
                tmpRight = right + 1
            } else {
                tmpLeft = left - 1
            }
        }
        //上一次位置，如果未移动尝试返回，记录次数
        if(prePy || prePx) {
            if(prePy && pointY == prePy) {
                closeByImageMatching()
                closeDialogifExist()
                scrollTimes++
            }
            if(prePx && pointX == prePx) {
                closeByImageMatching()
                closeDialogifExist()
                scrollTimes++
            }
        }
        if(tmpTop < top) {
            if(tmpTop < top - bottom * 0.5) {
                swipeUp(Move.Fast, 1000)
            } else {
                swipeUp(Move.Normal, 1000)
            }
            //滑动等待
            waitRandomTime(1)
            return scrollTo(selector, options, range, undefined, pointY, scrollTimes, avoidTimes)
        } else if (tmpBottom > bottom) {
            if(tmpBottom > bottom * 1.5) {
                swipeDown(Move.Fast, 1000)
            } else {
                swipeDown(Move.Normal, 1000)
            }
            //滑动等待
            waitRandomTime(1)
            return scrollTo(selector, options, range, undefined, pointY, scrollTimes, avoidTimes)
        } else if (tmpLeft < left) {
            swipeLeft(pointY+random(-5, 5), 1000)
            waitRandomTime(1)
            return scrollTo(selector, options, range, pointX, undefined, scrollTimes, avoidTimes)
        } else if (tmpRight > right) {
            swipeRight(pointY+random(-5, 5), 1000)
            waitRandomTime(1)
            return scrollTo(selector, options, range, pointX, undefined, scrollTimes, avoidTimes)
        } else {
            //确定位置等待
            waitRandomTime(1)
            //列表项才需要ocr识别
            if(++avoidTimes < 3){
                if(coverCheck(component, options)){
                    Record.debug("按钮被遮挡")
                    if(!range) range = {}
                    if(tmpBottom > device.height/2){
                        range.top = undefined
                        range.bottom = tmpTop
                    } else {
                        range.bottom = undefined
                        range.top = tmpBottom
                    }
                    return scrollTo(selector, options, range, undefined, undefined, scrollTimes, avoidTimes)
                }
            }
        }
    }
    return component
}

export function coverCheck(component:Component, options?:CoverCheckOptions){
    Record.debug("遮挡校验")
    if(component.text === ""){
        return false
    }
    const scale = options?.coverBoundsScaling || 1.3
    const threshold = options?.threshold || 0.6
    Record.debug(`text :${component.text}`)
    const img = getScreenImage(boundsScaling(component.bounds, scale))
    const textHeight = component.bounds.bottom - component.bounds.top
    const bigScale = textHeight > 50 ? 1 : 50 / textHeight
    const bigImg = images.scale(img, bigScale, bigScale)
    const grayImg = images.cvtColor(bigImg, "BGR2GRAY")
    const adaptiveImg = images.adaptiveThreshold(grayImg, 255, "GAUSSIAN_C", "BINARY", 25, 0)
    const str = options?.leftToRight?
        recognizeTextByLeftToRight(adaptiveImg)
        :ocr.recognizeText(adaptiveImg)
    // grayImg.saveTo("/sdcard/result.jpg")
    // app.viewFile("/sdcard/result.jpg")
    img.recycle()
    bigImg.recycle()
    grayImg.recycle()
    adaptiveImg.recycle()
    Record.debug(`ocr str:${str}`)
    return str.search(component.text) == -1 && levenshteinDistance(component.text, str) < threshold
}

export function search(selector:string|UiSelector, options?:SearchOptions):Component|undefined{
    let result: Component|undefined = undefined

    if(typeof selector === "string"){
        result = searchByUiSelect(textMatches(selector), options)
            ||searchByUiSelect(descMatches(selector), options)
        if(result === undefined && options?.ocrRecognize){
            result = searchByOcrRecognize(selector, options)
        }
    } else {
        result = searchByUiSelect(selector, options)
    }
    if(result === undefined && options?.waitFor){
        Record.debug(selector.toString())
        throw "控件不存在"
    }
    return result
}

export function searchByOcrRecognize(str: string, options?:SearchByOcrRecognizeOptions):Component|undefined{
    const img = getScreenImage(options?.bounds)
    const grayImg = images.cvtColor(img, "BGR2GRAY")
    const adaptiveImg = images.adaptiveThreshold(grayImg, 255, "GAUSSIAN_C", "BINARY", 25, 0)
    // const adaptiveImg = images.adaptiveThreshold(grayImg, 255, "GAUSSIAN_C", "BINARY", 9, 0)
    // adaptiveImg.saveTo("/sdcard/exit-big.png")
    // app.viewFile("/sdcard/exit-big.png")
    const res = ocr.recognize(adaptiveImg)
    img.recycle()
    grayImg.recycle()
    adaptiveImg.recycle()
    let list:OcrResultDetail[] = []
    // log(res)
    for(let item of res.results){
        // log(item.text)
        if(RegExp("^"+str+"$").test(item.text)){
            list.push(item)
        }
    }
    Record.debug(`list length: ${list.length}`)
    let result: Component|undefined = undefined
    if(list.length > 0){
        const index = options?.index? options.index:0
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
            result = {text: tmp.text,
                bounds: tmp.bounds
            }
        }
    }
    return result
}


export function searchByUiSelect(selector:UiSelector, options?:SearchByUiSelectOptions):Component|undefined{
    let result: Component|undefined = undefined
    if(options?.waitFor){
        if(!selector.findOne(10 * 1000)){
            for(let i = 0; i < 3; i++){
                closeByImageMatching()
                closeDialogifExist()
                if(selector.findOne(5 * 1000)){
                    break
                }
            }
        }
    }
    if(options?.method){
        options.method(selector)
    }
    let list:any = selector.find()
    if(list.nonEmpty()){
        if(options?.fixed){
            list = list.filter(element => {
                const bounds = element.bounds()
                return bounds.height() > 0 && bounds.width() > 0
            })
        }
        if(options?.bounds){
            list = list.filter(element => {
                const bounds = element.bounds()
                if(options.bounds)
                return myBoundsContains(options.bounds, bounds)
            })
        }
        list.sort(function(elementA:any, elementB:any){
            const boundsA = elementA.bounds()
            const boundsB = elementB.bounds()
            const validA = boundsA.width() > 0 && boundsA.height() > 0
            const validB = boundsB.width() > 0 && boundsB.height() > 0
            if(validA && !validB){
                return -1
            } else if (!validA && validB){
                return 1
            } else {
                return boundsA.centerY() - boundsB.centerY()
            }
        })
        const index = options?.index ? options.index:0
        const tmp = list[index]
        if(tmp !== undefined){
            result = {
                text: tmp.text(), 
                bounds: tmp.bounds()
            }
        }
    }
    return result
}

