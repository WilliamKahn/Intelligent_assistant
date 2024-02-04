import { ExceedMaxNumberOfAttempts } from "../lib/exception"
import { Record } from "../lib/logger"
import { closeDialogifExist } from "./click"
import { Move } from "./enums"
import { Bounds, ScrollToOptions, SearchByUiSelectOptions } from "./interfaces"
import { closeByImageMatching, coverCheck } from "./ocr"
import { boundsScreenInsideCheck, myBoundsContains, swipeDown, swipeLeft, swipeRight, swipeUp, waitRandomTime } from "./utils"

/**
 * todo 躲避遮挡目标时会触发关闭按钮
 * @description 滑动至目标处
 * @param sign 目标
 * @param range 滚动点击范围，默认为全屏幕点击，遮挡住会造成点击失败
 * @param prePy 自身递归所用，为上次查找控件的位置，与当前的位置进行比较
 * @param times 自身递归所用，当无法移动时且尝试三次返回无效后则退出当前app
 * @returns void
*/
export function scrollTo(selector: string|UiSelector, 
    options?: ScrollToOptions, range?: Bounds, prePx?:number, prePy?: number, scrollTimes: number = 0, avoidTimes: number = 0) :UiObject|null {
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
        // Record.debug("scrollTo")
        let tmpTop = component.bounds().top
        let tmpBottom = component.bounds().bottom
        let tmpRight = component.bounds().right
        let tmpLeft = component.bounds().left
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
                if(!options?.disableCoverCheck && coverCheck(component, options)){
                    Record.debug("按钮被遮挡")
                    if(!range) range = {}
                    if(pointY > device.height/3 && pointY < device.height*2/3){
                        if(tmpRight > device.width - 70){
                            range.right = tmpLeft
                            range.left = undefined
                        } else {
                            if(tmpBottom > device.height / 2){
                                range.top = undefined
                                range.bottom = tmpTop
                            } else {
                                range.bottom = undefined
                                range.top = tmpBottom
                            }    
                        }
                    } else {
                        if(tmpBottom > device.height / 2){
                            range.top = undefined
                            range.bottom = tmpTop
                        } else {
                            range.bottom = undefined
                            range.top = tmpBottom
                        }
                    }
                    return scrollTo(selector, options, range, undefined, undefined, scrollTimes, avoidTimes)
                }
            }
        }
    }
    return component
}

export function search(selector:string|UiSelector, options?:SearchByUiSelectOptions):UiObject|null{
    let result: UiObject|null = null

    if(typeof selector === "string"){
        result = searchByUiSelect(textMatches(selector), options)
            ||searchByUiSelect(descMatches(selector), options)
    } else {
        result = searchByUiSelect(selector, options)
    }
    return result
}

export function searchByUiSelect(selector:UiSelector, options?:SearchByUiSelectOptions):UiObject|null{
    let result: UiObject|null = null
    const waitTime = options?.waitFor || 6
    if(waitTime !== -1 && !selector.findOne(waitTime * 1000)){
        if(options?.throwErrIfNotExist){
            let find = false
            for(let i = 0; i < 3; i++){
                closeByImageMatching()
                closeDialogifExist()
                if(selector.findOne(5 * 1000)){
                    find = true
                    break
                }
            }
            if(!find){
                Record.debug(selector.toString())
                throw "控件不存在"
            }
        }
    }
    if(options?.method){
        options.method(selector)
    }
    let list:any = selector.find()
    if(list.nonEmpty()){
        if(options?.fixed){
            list = list.filter(
                element => boundsScreenInsideCheck(element.bounds()))
        }
        if(options?.bounds){
            list = list.filter(element => {
                const bounds = element.bounds()
                if(options.bounds)
                return myBoundsContains(options.bounds, bounds)
            })
        }
        let first = 0
        for(let i=0;i<list.length;i++){
            const item = list[i]
            if(boundsScreenInsideCheck(item.bounds())){
                first = i
                break
            }
        }
        // for(const tmp of list){
        //     log(tmp.bounds())
        // }
        const index = options?.index ? options.index:first
        const tmp = list[index]
        if(tmp){
            result = tmp
        }
    }
    return result
}

