import { OcrResultDetail } from "ocr"
import { ExceedMaxNumberOfAttempts } from "../lib/exception"
import { Record } from "../lib/logger"
import { clickDialogOption } from "./click"
import { Dialog } from "./enums"
import { Bounds, ScrollToOptions, SearchByLeftRangeOptions, SearchByOcrRecognizeOptions, SearchByUiSelectOptions, SearchOptions } from "./interfaces"
import { close, closeByImageMatching, compareStr, getScreenImage, myBoundsContains, resizeX, resizeY, waitRandomTime } from "./utils"

/**
 * todo 躲避遮挡目标时会触发关闭按钮
 * @description 滑动至目标处
 * @param sign 目标
 * @param range 滚动点击范围，默认为全屏幕点击，遮挡住会造成点击失败
 * @param prePy 自身递归所用，为上次查找控件的位置，与当前的位置进行比较
 * @param times 自身递归所用，当无法移动时且尝试三次返回无效后则退出当前app
 * @returns void
*/
export function scrollTo(component: string|UiSelector, options?: ScrollToOptions, range?: Bounds,prePy?: number, scrollTimes: number = 0, avoidTimes: number = 0){
    const top = options?.fixed? 0: range?.top || 0
    const bottom = options?.fixed? device.height: range?.bottom || device.height
    //返回超过三次则异常
    if (scrollTimes > 2) {
        throw new ExceedMaxNumberOfAttempts("超过最大限制次数")
    }
    const [bounds, text] = search(component, options)
    if(bounds && !options?.fixed) {
        // Record.debug(`${bounds}`)
        let tmpTop = bounds.top
        let tmpBottom = bounds.bottom
        const pointY = (tmpTop+tmpBottom)/2
        if(tmpBottom <= tmpTop){
            if(tmpBottom > 0){
                tmpBottom = bottom + 1
            } else {
                tmpTop = top - 1
            }
        } 
        //上一次位置，如果未移动尝试返回，记录次数
        if(prePy) {
            if(pointY == prePy) {
                closeByImageMatching()
                scrollTimes++
            }
        }
        if(tmpTop < top) {
            //向下滑动
            if(tmpTop < top - bottom * 0.5) {
                //快速移动
                gesture(1000, [resizeX(random(580, 620)), resizeY(random(950, 1050))], 
                [resizeX(random(780, 820)), resizeY(random(1750, 1850))])
            } else {
                //慢速移动
                gesture(1000, [resizeX(random(580, 620)), resizeY(random(1350, 1450))],
                 [resizeX(random(780, 820)), resizeY(random(1750, 1850))])
            }
            //滑动等待
            waitRandomTime(1)
            return scrollTo(component, options, range, pointY, scrollTimes, avoidTimes)
        } else if (tmpBottom > bottom) {
            //向上滑动
            if(tmpBottom > bottom * 1.5) {
                //快速移动
                gesture(1000, [resizeX(random(580, 620)), resizeY(random(1750, 1850))], 
                [resizeX(random(780, 820)), resizeY(random(250, 350))])
            } else {
                //慢速移动
                gesture(1000, [resizeX(random(580, 620)), resizeY(random(1750, 1850))],
                 [resizeX(random(780, 820)), resizeY(random(1350, 1450))])
            }
            //滑动等待
            waitRandomTime(1)
            return scrollTo(component, options, range, pointY, scrollTimes, avoidTimes)
        } else {
            //确定位置等待
            waitRandomTime(1)
            //列表项才需要ocr识别
            if(options?.cover && text !== "" && ++avoidTimes < 3){
                Record.debug("滑动遮挡校验")
                Record.debug(`text :${text}`)
                Record.debug(`bounds :${bounds}`)
                const img = getScreenImage(bounds)
                const bigImg = images.scale(img, 3, 3)
                const grayImg = images.cvtColor(bigImg, "BGR2GRAY")
                const str = ocr.recognizeText(grayImg)
                // grayImg.saveTo("/sdcard/result.jpg")
                // app.viewFile("/sdcard/result.jpg")
                img.recycle()
                bigImg.recycle()
                grayImg.recycle()
                Record.debug(`ocr str:${str}`)
                if(str.search(text) == -1 && !compareStr(text, str)){
                    Record.debug("按钮被遮挡")
                    if(!range) range = {}
                    if(tmpBottom > device.height/2){
                        range.bottom = tmpTop
                    } else {
                        range.top = tmpBottom
                    }
                    return scrollTo(component, options, range, undefined, scrollTimes, avoidTimes)
                }
            }
        }
    }
    return [bounds, text]
}



export function search(component:string|UiSelector, options?:SearchOptions){
    let bounds: any
    let object: any
    let name:any
    if(options?.leftRange){
        object = searchByLeftRange(component, options)
    } else {
        if(typeof component === "string"){
            object = searchByUiSelect(textMatches(component), options)
                ||searchByUiSelect(descMatches(component), options)
            if(object == null && options?.ocrRecognize){
                [bounds, name] = searchByOcrRecognize(component, options)
            }
        } else {
            object = searchByUiSelect(component, options)
        }
    }
    if(object != null){
        bounds = object.bounds()
        name = object.text()
    }
    if(bounds===undefined && options?.waitFor){
        Record.debug(component.toString())
        throw "控件不存在"
    }
    return [bounds, name]
}

/**
 * @description 查找button控件是否在给定区域内
 * @param button 控件
 * @param range 左侧文字范围
 * @returns reg存在返回限制区域，不存在返回原控件 不要跟上面的重写
 */
export function searchByLeftRange(button: string|UiSelector, options:SearchByLeftRangeOptions, times: number = 0) {
    if(times > 3) {
        throw new ExceedMaxNumberOfAttempts("超过最大限制次数")
    }
    let tmp:UiObject|null
    if(options.leftRange){
        if(typeof options.leftRange === "string"){
            tmp = searchByUiSelect(textMatches(options.leftRange))
            || searchByUiSelect(descMatches(options.leftRange))
        } else {
            tmp = searchByUiSelect(options.leftRange)
        }
        if (tmp == null) {
            close(0)
            return searchByLeftRange(button, options, ++times)
        } else {
            //let result = eval(button.toString())
            let top = tmp.bounds().top - 10
            let bottom = tmp.bounds().bottom + 80
            let left = tmp.bounds().right
            if(bottom <= top){
                bottom = top + 200
            }
            if(typeof button === "string"){
                return searchByUiSelect(textMatches(button).boundsInside(left, top, device.width, bottom), options)
            || searchByUiSelect(descMatches(button).boundsInside(left, top, device.width, bottom))
            } else {
                return searchByUiSelect(button.boundsInside(left, top, device.width, bottom), options)
            }
        }
    }
}


export function searchByOcrRecognize(str: string, options?:SearchByOcrRecognizeOptions){
    const img = getScreenImage(options?.bounds)
    const grayImg = images.cvtColor(img, "BGR2GRAY")
    // const adaptiveImg = images.adaptiveThreshold(grayImg, 255, "GAUSSIAN_C", "BINARY", 9, 0)
    // adaptiveImg.saveTo("/sdcard/exit-big.png")
    // app.viewFile("/sdcard/exit-big.png")
    const res = ocr.recognize(grayImg)
    img.recycle()
    grayImg.recycle()
    let list:OcrResultDetail[] = []
    for(let item of res.results){
        if(RegExp("^"+str+"$").test(item.text)){
            list.push(item)
        }
    }
    Record.debug(`list length: ${list.length}`)
    if(list.length > 0){
        let result:OcrResultDetail|null = null
        if(options?.index){
            result = list[options.index]
        } else {
            result = list[0]
        }
        if(result){
            if(options?.bounds){
                const x = options.bounds.left||0
                const y = options.bounds.top||0
                result.bounds.left += x
                result.bounds.right += x
                result.bounds.top += y
                result.bounds.bottom += y
            }
            return [result.bounds, result.text]
        }
    }
    return [undefined, undefined]
}


export function searchByUiSelect(component:UiSelector, options?:SearchByUiSelectOptions) {
    let result: UiObject|null = null
    //延迟等待
    if(options?.waitFor){
        result = component.findOne(10 * 1000)
        if(result == null){
            for(let i = 0; i < 3; i++){
                closeByImageMatching()
                clickDialogOption(Dialog.Negative)
                result = component.findOne(5 * 1000)
                if(result){
                    break
                }
            }
        }
        waitRandomTime(2)
    }
    let list:any = component.find()
    if(list.nonEmpty()){
        list = list.filter(element => {
            const bounds = element.bounds()
            return bounds.width() > 0
        })
        if(options?.bounds){
            list = list.filter(element => {
                const bounds = element.bounds()
                if(options.bounds)
                return myBoundsContains(options.bounds, bounds)
            })
        }
        if(options?.index){
            result = list[options.index]
        } else {
            result = list[0]
        }
    }
    return result
}

