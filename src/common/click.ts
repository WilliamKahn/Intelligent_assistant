import { MAX_CLICK_COUNTS, WAIT_TIME_AFTER_CLICK } from "../global"
import { CurrentAppBanned, ExceedMaxNumberOfAttempts } from "../lib/exception"
import { Record } from "../lib/logger"
import { Bounds, Component, FindAndClickOptions, NormalClickOptions, RandomClickOptions, ScrollAndClickOptions } from "./interfaces"
import { coverCheck, scrollTo, search, searchByOcrRecognize } from "./search"
import { boundsCorrection, boundsScaling, closeByImageMatching, convertMinutesToSeconds, findLargestIndexes, getGrayscale, getGrayscaleHistogram, getScreenImage, judgeFuncIsWorkByImg, merge, mergeHistogram, waitRandomTime } from "./utils"

export function continueWatch(){
    return findAndClick(merge([
        "继续观看", "再看[0-9]+秒(可)?(领取)?奖励", 
        "抓住奖励机会", "留下看看"]), {
        fixed:true,
        disableCheckBeforeClick:true,
        bounds: {
            bottom: device.height * 4 / 5,
            top: device.height / 3,
        }
    })
}
export function watchAgain(){ 
    return findAndClick(merge([
        "领取奖励", 
        "再看一个领取[0-9]+金币", 
        "看视频再得[0-9]+金币"]),{
        fixed:true,
        disableCheckBeforeClick:true,
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
        disableCheckBeforeClick:true
    })
}

//通用方法
export function fixedClick(component:string|UiSelector){
    return findAndClick(component, {fixed:true})
}
export function ocrClick(text:string){
    return findAndClick(text, {fixed:true,ocrRecognize:true})
}
export function goneClick(text: string){
    return findAndClick(text, {clickUntilGone:true})
}
//固定、ocr识别、重复点击、区域限定 206 874   1080  216 864
export function dialogClick(text:string, bounds?:Bounds){
    const boundss = bounds || {
        bottom: device.height * 4 / 5, 
        top: device.height * 1 / 3,
        left: device.width * 1 / 5,
        right: device.width * 4 / 5
    }
    return findAndClick(text, {
        fixed:true,
        ocrRecognize: true,
        clickUntilGone:true,
        disableCheckBeforeClick:true,
        bounds: boundss
    })
}
export function readClick(selector: UiSelector, index: number){
    return findAndClick(selector, {
        waitFor:true,
        index: index,
        clickUntilGone: true
    })
}
export function scrollClick(selector:string|UiSelector, range:string|UiSelector, options:FindAndClickOptions={clickUntilGone:true}){
    let first = true
    options.method = (selector:UiSelector) => {
        const component = search(range, {
            waitFor: first
        })
        if(first){
            first = false
        }
        if(component !== undefined){
            let top = component.bounds.top - 30
            let bottom = component.bounds.bottom + 80
            let left = component.bounds.right
            if(bottom <= top){
                bottom = top + 200
            }
            selector.boundsInside(left, top, device.width, bottom)
        }
    }
    return findAndClick(selector, options)
}
//等待后点击
export function waitClick(selector:string|UiSelector, range:string|UiSelector){
    let first = true
    return findAndClick(selector, {
        method : (selector:UiSelector) => {
            const component = search(range, {
                waitFor: first
            })
            if(first){
                first = false
            }
            if(component !== undefined){
                let top = component.bounds.top - 30
                let bottom = component.bounds.bottom + 80
                let left = component.bounds.right
                if(bottom <= top){
                    bottom = top + 200
                }
                const time = search("[0-9]+:[0-9]+", {
                    bounds:{
                        top: top,
                        bottom: bottom
                    }
                })
                if(time !== undefined){
                    sleep((convertMinutesToSeconds(time.text)+2) * 1000)
                }
                selector.boundsInside(left, top, device.width, bottom)
            }
        },
        clickUntilGone:true
    })
}
//固定、一定存在、点击改变
export function selectedClick(text: string, threshold: number){
    return findAndClick(text, {waitFor:true, selectedThreshold: threshold, check:true})
}

/**
 * @description 滑动到指定位置并点击
 * @param options 
 * @returns true or false
 */
export function findAndClick(selector: string|UiSelector, options?:FindAndClickOptions, times: number = 0){
    if (++times > MAX_CLICK_COUNTS) {
        Record.debug("findAndClick error")
        throw new ExceedMaxNumberOfAttempts("超过最大限制次数")
    } else if(times > MAX_CLICK_COUNTS - 2){
        closeByImageMatching()
        closeDialogifExist()
    } else if(times > MAX_CLICK_COUNTS - 4){
        closeByImageMatching()
    }
    const component = scrollTo(selector, options)
    if(component) {
        //边界矫正
        boundsCorrection(component.bounds)
        if (options?.selectedThreshold){
            const img = getScreenImage(component.bounds)
            const list = getGrayscaleHistogram(img)
            img.recycle()
            const mergeList = mergeHistogram(list)
            const index = findLargestIndexes(mergeList, 2)
            Record.debug(`selected index = ${index}`)
            if(Math.abs(index[0] - index[1]) > options.selectedThreshold){
                return true
            }
        }
        if(options?.waitFor){
            waitRandomTime(2)
        }
        if(options?.fixed && !options.disableCheckBeforeClick){
            if(coverCheck(component, options)){
                closeByImageMatching()
                closeDialogifExist()
            } else if(!options.disableGrayCheck) {
                const img = getScreenImage(component.bounds)
                const ratio = options.grayscaleRatio || 1
                if(getGrayscale(img, 1) >= ratio){
                    closeByImageMatching()
                    closeDialogifExist()
                }
                img.recycle()
            }
        }
        if(component.text && component.text !== "" && !/^[0-9]+$/.test(component.text)){
            Record.log(component.text)
        }
        randomClick(component.bounds, options)
        if (options?.clickUntilGone) {
            options.waitFor = false
            findAndClick(selector, options, times)
        }
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
    const sbounds = boundsScaling(bounds, 0.5)
    
    let randomX = random(sbounds.left, sbounds.right)
    let randomY = random(sbounds.top, sbounds.bottom)
    Record.debug(`click(${randomX}, ${randomY})`)
    if (options?.check) {
        let cycleCounts = 0
        while(++cycleCounts < 3 && !judgeFuncIsWorkByImg(()=>{
            normalClick(randomX, randomY, options)
            randomX = random(sbounds.left, sbounds.right)
            randomY = random(sbounds.top, sbounds.bottom)
        }, sbounds)){
            closeByImageMatching()
        }
    } else {
        normalClick(randomX, randomY, options)
    }
}

/**
 * @description 根据分辨率点击
 * @param x 横坐标
 * @param y 纵坐标
 */
export function normalClick(x: number, y: number, options?: NormalClickOptions){
    const time = options?.waitTimes || WAIT_TIME_AFTER_CLICK
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
    console.hide()
    sleep(100)
    click(x, y)
    console.show()
    if(options?.feedback){
        const thread = threads.start(function(){
            waitRandomTime(time)
            events.emit("toast")
            events.removeAllListeners("toast")
        })
        thread.waitFor()
        const str = result.blockedGet()
        // threads.shutDownAll()
        Record.debug(str)
        if(str.match("失败|异常|领取过奖励|金币溜走")){
            throw new CurrentAppBanned(str)
        }
    } else {
        waitRandomTime(time)
    }
}