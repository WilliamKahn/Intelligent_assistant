import { EVENT, MAX_CLICK_COUNTS, SHOW_CONSOLE, WAIT_TIME_AFTER_CLICK } from "../global"
import { CurrentAppBanned, ExceedMaxNumberOfAttempts } from "../lib/exception"
import { Record } from "../lib/logger"
import { Dialog } from "./enums"
import { Bounds, FindAndClickOptions, NormalClickOptions, RandomClickOptions } from "./interfaces"
import { scrollTo } from "./search"
import { boundsScaling, close, closeByImageMatching, findLargestIndexes, getGrayscaleHistogram, getScreenImage, judgeFuncIsWorkByImg, merge, mergeHistogram, waitRandomTime } from "./utils"

//通用方法
export function fixedClick(component:string|UiSelector){
    return findAndClick(component, {fixed:true})
}
export function ocrClick(text:string){
    return findAndClick(text, {fixed:true, ocrRecognize:true})
}
export function goneClick(text: string){
    return findAndClick(text, {fixed:true, clickUntilGone:true})
}
//固定、ocr识别、重复点击、区域限定
export function dialogClick(text:string){
    return findAndClick(text, {
        fixed:true, 
        ocrRecognize: true, 
        clickUntilGone:true, 
        bounds: {
            bottom: device.height * 4 / 5, 
            top: device.height * 1 / 3,
            left: device.width * 1 / 5,
            right: device.width * 4 / 5
        }
    })
}
export function readClick(selector: UiSelector, index: number){
    return findAndClick(selector, {
        index: index,
        clickUntilGone: true,
        coverBoundsScaling: 1
    })
}
//滑动、遮挡校验、左侧定位（必定存在）、重复点击 （任务列表）
export function scrollClick(text:string, range?:string){
    return findAndClick(text, {leftRange:range, coverBoundsScaling:1, check:true})
}
//固定、一定存在、点击改变
export function selectedClick(text: string, threshold: number){
    return findAndClick(text, {fixed:true, waitFor:true, selectedThreshold: threshold, check:true})
}
export function clickDialogOption(options?:Dialog){
    if(options === undefined){
        options = random(Dialog.Positive, Dialog.Negative)
    }
    if(options === Dialog.Positive){//
        return fixedClick(merge(["继续观看", "抓住奖励机会", "留下看看", "关闭", "领取奖励"]))
    } else if(options === Dialog.Negative) {
        return fixedClick(merge(["取消", "关闭", "(以后|下次)再说", "(直接|坚持|仍要)?退出(阅读)?", "暂不(加入|添加)", "(残忍)离开", "放弃奖励", "(我)?知道了"]))
    }
}
/**
 * @description 滑动到指定位置并点击
 * @param options 
 * @returns true or false
 */
export function findAndClick(component: string|UiSelector, options?:FindAndClickOptions, times: number = 0){
    if (++times > MAX_CLICK_COUNTS) {
        Record.debug("findAndClick error")
        throw new ExceedMaxNumberOfAttempts("超过最大限制次数")
    } else if(times > MAX_CLICK_COUNTS - 2){
        closeByImageMatching()
        clickDialogOption(Dialog.Negative)
    } else if(times > MAX_CLICK_COUNTS - 4){
        closeByImageMatching()
    }
    const [bounds, name] = scrollTo(component, options)
    if(bounds) {
        if (options?.selectedThreshold){
            const img = getScreenImage(bounds)
            const list = getGrayscaleHistogram(img)
            img.recycle()
            const mergeList = mergeHistogram(list)
            const index = findLargestIndexes(mergeList, 2)
            Record.debug(`selected index = ${index}`)
            if(Math.abs(index[0] - index[1]) > options.selectedThreshold){
                return true
            }
        }
        if(name && name !== "" && !/^[0-9]+$/.test(name)){
            Record.log(name)
        }
        randomClick(bounds, options)
        if (options?.clickUntilGone) {
            options.waitFor = false
            findAndClick(component, options, times)
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
            events.once("toast", function(toast){
                if(toast){
                    result.setAndNotify(toast.getText())    
                } else {
                    result.setAndNotify(toast)
                }
            })
        })
        thread.waitFor()
    }
    if(SHOW_CONSOLE){
        console.hide()
        sleep(100)
        click(x, y)
        console.show()
    } else {
        click(x, y)
    }
    if(options?.feedback){
        const thread = threads.start(function(){
            waitRandomTime(time)
            events.emit("toast")
        })
        thread.waitFor()
        const str = result.blockedGet()
        threads.shutDownAll()
        Record.debug(str)
        if(str.match("失败|异常|领取过奖励")){
            throw new CurrentAppBanned(str)
        }
    } else {
        waitRandomTime(time)
    }
}