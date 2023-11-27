import { MAX_CLICK_COUNTS, SHOW_CONSOLE, WAIT_TIME_AFTER_CLICK } from "../global"
import { CurrentAppBanned, ExceedMaxNumberOfAttempts } from "../lib/exception"
import { Record } from "../lib/logger"
import { Dialog } from "./enums"
import { Bounds, FindAndClickOptions, NormalClickOptions, RandomClickOptions } from "./interfaces"
import { scrollTo } from "./search"
import { boundsScaling, close, closeByImageMatching, findLargestIndexes, getGrayscaleHistogram, getScreenImage, judgeFuncIsWorkByImg, merge, waitRandomTime } from "./utils"

//通用方法
export function fixedClick(text:string){
    return findAndClick(text, {fixed:true, clickUntilGone:true})
}
//固定、ocr识别、重复点击、区域限定
export function goneClick(text:string){
    return findAndClick(text, {
        fixed:true, 
        ocrRecognize: true, 
        clickUntilGone:true, 
        bounds: {
            bottom: device.height * 4 / 5, 
            top: device.height * 1 / 3,
            left: device.width * 1 / 5,
            right: device.width * 4 / 5
        }})
}
//滑动、遮挡校验、左侧定位（必定存在）、重复点击 （任务列表）
export function scrollClick(text:string, range?:string){
    return findAndClick(text, {leftRange:range, cover:true, check:true})
}
//固定、一定存在、点击改变
export function selectedClick(text: string){
    return findAndClick(text, {fixed:true, waitFor:true, selected:true, check:true})
}
/**
 * @description 随机点击列表子项
 * @param component 列表项
 * @param index 子项下标，推荐使用random(?,?)
 * @param avoid 需要躲避的控件
 */
export function randomClickChildInList(component: UiSelector, index: number){
    const list = component.boundsInside(0, 0, device.width, device.height).findOnce()
    if (list != null) {
        let child = list.child(index)
        if(child != null) {
            randomClick(child.bounds())
        }
    }
}
export function clickDialogOption(options?:Dialog){
    if(options === undefined){//1803  2340 
        options = random(Dialog.Positive, Dialog.Negative)
    }
    if(options === Dialog.Positive){
        goneClick(merge(["继续观看", "抓住奖励机会", "留下看看"]))
    } else if(options === Dialog.Negative) {
        goneClick(merge(["取消", "关闭", "(以后|下次)再说", "退出", "暂不", "离开"]))
    }
}
/**
 * @description 滑动到指定位置并点击
 * @param options 
 * @returns true or false
 */
export function findAndClick(component: string|UiSelector, options?:FindAndClickOptions, times: number = 0){
    if (++times > MAX_CLICK_COUNTS) {
        throw new ExceedMaxNumberOfAttempts("findAndClick")
    } else if(times > MAX_CLICK_COUNTS - 2){
        close(0)
    } else if(times > MAX_CLICK_COUNTS - 4){
        closeByImageMatching()
    }
    const [bounds, name] = scrollTo(component, options)
    if(bounds) {
        if (options?.selected){
            const list = getGrayscaleHistogram(getScreenImage(bounds))
            const index = findLargestIndexes(list, 2)
            Record.debug(`selected index = ${index}`)
            if(index[0] < 50 || index[1] < 50){
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
    const result = threads.disposable();
    if(options?.feedback){
        threads.start(function(){
            // 在新线程中开启一个Toast监听
            events.observeToast();
            events.on("toast", function(toast){
                // 当监听到Toast时，将Toast的内容存储到公共变量中
                result.setAndNotify(toast.getText())
            })
        })
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
        threads.start(function(){
            waitRandomTime(time)
            result.setAndNotify(undefined)
        })
        const str = result.blockedGet()
        Record.debug(str)
        threads.shutDownAll()
        if(str.match("失败|异常")){
            throw new CurrentAppBanned(str)
        }
    } else {
        waitRandomTime(time)
    }
}