import { NORMAL_WAIT_TIME, WAIT_TIME_UNTIL_CLICK } from "../global"
import { CurrentAppBanned } from "../lib/exception"
import { Record } from "../lib/logger"
import { Bounds, FindAndClickOptions, FindByOcrAndClickOptions, NormalClickOptions, RandomClickOptions, SearchByOcrRecognizeOptions } from "./interfaces"
import { closeByImageMatching, coverCheck, getGrayscale, getGrayscaleHistogram, getScreenImage, searchByOcrRecognize } from "./ocr"
import { scrollTo, search } from "./search"
import { boundsScaling, convertMinutesToSeconds, findLargestIndexes, merge, mergeHistogram, waitRandomTime } from "./utils"

export function continueWatch(){
    return findAndClick(merge([
        "继续观看", "再看[0-9]+秒(可)?(领取)?奖励", 
        "抓住奖励机会", "留下看看"]), {
        fixed:true,
        disableCoverCheck:true,
        disableGrayCheck:true,
        waitFor: -1,
        bounds: {
            bottom: device.height * 4 / 5,
            top: device.height / 3,
        }
    })
}
export function watchAgain(){ //再看一个获取最高88个金币
    return findAndClick(merge([
        "领取奖励", 
        "再看一个(获取最高|领取)[0-9]+(个)?金币", 
        "看视频再得[0-9]+金币"]),{
        fixed:true,
        waitFor: -1,
        disableCoverCheck:true,
        disableGrayCheck:true,
        bounds: {
            bottom: device.height * 4 / 5,
            top: device.height / 3,
        }
    })
}
export function closeDialogifExist(){
    return findAndClick(merge([
        "取消", "(残忍)?关闭", "(以后|下次)再说", 
        "(直接|坚持|仍要)?退出(阅读|直播间)?", "暂不(加入|添加|升级)", 
        "(残忍)离开", "放弃奖励", "(我)?知道了", "(开心|立即)收下","不(同意|允许)"]),{
        fixed:true,
        waitFor: -1,
        disableCoverCheck:true,
        disableGrayCheck:true
    })
}

//通用方法
export function fixedClick(component:string|UiSelector){
    return findAndClick(component, {fixed:true})
}
export function ocrClick(text:string, options?:SearchByOcrRecognizeOptions){
    const component = searchByOcrRecognize(text, options)
    if(component){
        randomClick(component.bounds)
        return true
    }
    return false
}
//固定、ocr识别、重复点击、区域限定 206 874   1080  216 864
export function dialogClick(text:string, bounds?:Bounds){
    const boundss = bounds || {
        left: device.width / 5,
        top: device.height / 3,
        right: device.width * 4 / 5,
        bottom: device.height * 4 / 5,
    }
    if(findAndClick(text, {
        waitFor: 2,
        fixed:true,
        disableCoverCheck:true,
        disableGrayCheck:true,
        bounds: boundss
    })){
        return true
    } else {
        return findByOcrAndClick(text, {
            waitFor: 2,
            disableGrayCheck:true,
            bounds: boundss
        })
    }
}
//阅读一定存在
export function readClick(selector: UiSelector, index: number){
    return findAndClick(selector, {
        waitFor: NORMAL_WAIT_TIME,
        disableCoverCheck:true,
        throwErrIfNotExist: true,
        index: index
    })
}
export function scrollClick(selector:string|UiSelector, range:string|UiSelector, options:FindAndClickOptions = {}){
    options.method = (selector:UiSelector) => {
        const component = search(range, {
            throwErrIfNotExist: true
        })
        if(component){
            let top = component.bounds().top - 30
            let bottom = component.bounds().bottom + 80
            let left = component.bounds().right
            if(bottom <= top){
                bottom = top + 200
            }
            selector.boundsInside(left, top, device.width, bottom)
        }
    }
    return findAndClick(selector, options)
}
//等待后点击
export function waitClick(selector:string|UiSelector, range:string|UiSelector, options:FindAndClickOptions = {}){
    options.method = (selector:UiSelector) => {
        const component = search(range, {
            throwErrIfNotExist: true
        })
        if(component){
            let top = component.bounds().top - 30
            let bottom = component.bounds().bottom + 80
            let left = component.bounds().right
            if(bottom <= top){
                bottom = top + 200
            }
            const time = search("([0-9]+:)?[0-9]+:[0-9]+", {
                waitFor: -1,
                bounds:{
                    top: top,
                    bottom: bottom
                }
            })
            if(time){
                const wait = convertMinutesToSeconds(time.text())+2
                Record.log(`等待${wait}秒`)
                sleep(wait * 1000)
            }
            selector.boundsInside(left, top, device.width, bottom)
        }
    }
    return findAndClick(selector, options)
}
//固定、一定存在、点击改变
export function selectedClick(text: string, threshold: number){
    return findAndClick(text, {
        waitFor: NORMAL_WAIT_TIME,
        throwErrIfNotExist:true, 
        selectedThreshold: threshold,
    })
}

export function findByOcrAndClick(selector: string, options:FindByOcrAndClickOptions = {}){
    const component = searchByOcrRecognize(selector, options)
    if(component) {
        options.tips = component.text
        randomClick(component.bounds, options)
        return true
    }
    return false
}
export function findAndClick(selector: string|UiSelector, options:FindAndClickOptions = {}){
    const component = scrollTo(selector, options)
    if(component) {
        if(options?.fixed && !options.disableCoverCheck){
            if(coverCheck(component, options)){
                closeByImageMatching()
                closeDialogifExist()
            }
        }
        options.tips = component.text()
        randomClick(component.bounds(), options)
        return true
    }
    return false
}

/**
 * @description 根据控件随机点击范围位置
 * @param component 目标控件
 * @param avoid 避免误触到上方遮挡物
 * @param comfirm 用于确定点击是否起作用
 */
export function randomClick(bounds: Bounds, options?: RandomClickOptions) {
    const componnetBounds = boundsScaling(bounds, 0.5)
    const left = componnetBounds.left > 0 ? componnetBounds.left : 0
    const top = componnetBounds.top > 0 ? componnetBounds.top : 0
    const right = componnetBounds.right < device.width ? componnetBounds.right : device.width
    const bottom = componnetBounds.bottom < device.height ? componnetBounds.bottom : device.height
    
    let randomX = random(left, right)
    let randomY = random(top, bottom)
    Record.debug(`click(${randomX}, ${randomY})`)
    if (options?.selectedThreshold){
        const img = getScreenImage(bounds)
        const list = getGrayscaleHistogram(img)
        img.recycle()
        const mergeList = mergeHistogram(list)
        const index = findLargestIndexes(mergeList, 2)
        Record.debug(`selected index = ${index}`)
        if(Math.abs(index[0] - index[1]) > options.selectedThreshold){
            return
        }
    }
    if(!options?.disableGrayCheck) {
        const img = getScreenImage(bounds)
        const ratio = options?.grayscaleRatio || 1
        if(getGrayscale(img, 1) >= ratio){
            closeByImageMatching()
            closeDialogifExist()
        }
        img.recycle()
    }
    normalClick(randomX, randomY, options)
}

/**
 * @description 根据分辨率点击
 * @param x 横坐标
 * @param y 纵坐标
 */
export function normalClick(x: number, y: number, options?: NormalClickOptions){
    const time = options?.waitTimes || WAIT_TIME_UNTIL_CLICK
    const result = threads.disposable()
    if(options?.feedback){
        const thread = threads.start(function(){
            // 在新线程中开启一个Toast监听
            events.observeToast();
            events.once("toast", function(toast:any){
                if(toast){
                    result.setAndNotify(toast.getText())    
                } else {
                    result.setAndNotify(toast)
                }
            })
        })
        thread.waitFor()
    }
    waitRandomTime(time)
    console.hide()
    sleep(100)
    if(options?.tips){
        Record.log(options.tips)
    }
    click(x, y)
    console.show()
    if(options?.feedback){
        const thread = threads.start(function(){
            waitRandomTime(2)
            events.emit("toast")
            events.removeAllListeners("toast")
        })
        thread.waitFor()
        const str = result.blockedGet()
        // threads.shutDownAll()
        Record.debug(str)
        if(str.match("失败|异常|领取过奖励|金币溜走|后可继续观看")){
            throw new CurrentAppBanned(str)
        }
    }
}