import { APP_TOKEN, DEVICE_HEIGHT, DEVICE_WIDTH, MAX_CLICK_COUNTS, MAX_CYCLES_COUNTS, ROBOT_ID, STORAGE_WEIGHT_CONTAINER, WAIT_TIME_AFTER_CLICK, WX_PUSHER_URL, _TOKEN } from "../global"
import { BaseKey } from "../scripts/abstract/Base"
import { CurrentAppBanned, ExceedMaxNumberOfAttempts } from "./exception"
import { LOG_STACK, LogLevel, Record } from "./logger"


export interface Bounds{
    left?: number
    top?: number
    right? :number
    bottom?: number
}

interface ScrollToOptions{
    bounds?: Bounds,
    searchByLeftRangeOption?: UiSelector
}
interface RandomClickOptions{
    avoid?: UiObject|null,
    check?: boolean,
    normalClickOptions?: NormalClickOptions
}
interface NormalClickOptions{
    waitTimes?: number
    errorMsg?: string
}
type FindAndClickOptions = ScrollToOptions & RandomClickOptions
type ClickUntilGoneOptions = RandomClickOptions
type DoFuncUntilPopupsGone = ClickUntilGoneOptions & {
    func?: ()=> void
}


export function resizeX(x: number): number {
    return x * device.width/DEVICE_WIDTH
}

export function resizeY(y: number): number {
    return y * device.height/DEVICE_HEIGHT
}

/**
 * @description 根据分辨率点击
 * @param x 横坐标
 * @param y 纵坐标
 */
export function normalClick(x: number, y: number, options?: NormalClickOptions){
    const time = options?.waitTimes || WAIT_TIME_AFTER_CLICK
    console.hide()
    sleep(100)
    click(x, y)
    console.show()
    if(options?.errorMsg){
        waitRandomTime(1)
        const str = getStrByOcrRecognizeLimitBounds()
        Record.debug(`${str}`)
        const match = str.match(options.errorMsg)
        if(match) {
            throw new CurrentAppBanned("")
        }
    }
    waitRandomTime(time)
}

/**
 * @description 根据控件随机点击范围位置
 * @param component 目标控件
 * @param avoid 避免误触到上方遮挡物
 * @param comfirm 用于确定点击是否起作用
 */
export function randomClick(component: UiObject, options?: RandomClickOptions) {
    const left = component.bounds().left
    const right = component.bounds().right
    const top = component.bounds().top
    const bottom = component.bounds().bottom
    if(component.text() !== ""){
        Record.log(component.text())
    }
    let randomX = random(left, right)
    let randomY = random(top, bottom)
    if(options?.avoid) {
        while(randomX > options.avoid.bounds().left 
        && randomX < options.avoid.bounds().right 
        && randomY > options.avoid.bounds().top
        && randomY < options.avoid.bounds().bottom){
            randomX = random(component.bounds().left, component.bounds().right)
            randomY = random(component.bounds().top, component.bounds().bottom)
        }
    }
    if(options?.check){
        Record.debug("check click")
        while(!judgeFuncIsWorkByImg(()=>{
            normalClick(randomX, randomY, options.normalClickOptions)
        }, left, top, right, bottom)){
            Record.debug("continue")
            close(0)
        }
    } else {
        Record.debug("normal click")
        normalClick(randomX, randomY, options?.normalClickOptions)
    }
}


/**
 * @description 滑动到指定位置并点击
 * @param component 目标
 * @param range 滚动点击范围，默认为全屏幕点击，遮挡住会造成点击失败
 * @param avoid 点击时防止误触到其他控件
 * @returns true or false
 */
export function findAndClick(component: UiSelector, options?:FindAndClickOptions){
    let tmp = component
    if(options?.searchByLeftRangeOption) {
        tmp = searchByLeftRange(component, options?.searchByLeftRangeOption)
    }
    if(tmp.exists()) {
        let obj = scrollTo(component, options)
        //boundsInside(0, 0, resizeX(1080), resizeY(2340)).
        if (obj != null) {
            randomClick(obj, options)
        }
        return true
    } else {
        return false
    }
}

/**
 * @description 滑动至目标处
 * @param sign 目标
 * @param range 滚动点击范围，默认为全屏幕点击，遮挡住会造成点击失败
 * @param prePy 自身递归所用，为上次查找控件的位置，与当前的位置进行比较
 * @param times 自身递归所用，当无法移动时且尝试三次返回无效后则退出当前app
 * @returns void
*/
export function scrollTo(sign: UiSelector, options?: ScrollToOptions,prePy?: number, times?: number){
    const top = options?.bounds?.top || 0
    const bottom = options?.bounds?.bottom || device.height
    //返回超过三次则异常
    if (times && times >= 3) {
        throw new ExceedMaxNumberOfAttempts("scrollTo")
    }
    let nSign = sign
    if(options?.searchByLeftRangeOption) {
        nSign = searchByLeftRange(sign, options.searchByLeftRangeOption)
    }
    let tmp = nSign.findOnce()
    if(tmp != null) {
        let pointY = tmp.bounds().centerY()
        //上一次位置，如果未移动尝试返回，记录次数
        if(prePy) {
            if(pointY == prePy) {
                close(0)
                if(times) {
                    times++
                } else {
                    times = 1
                }
            }
        }
        if(pointY < top) {
            //向下滑动
            if(pointY < top - bottom * 0.5) {
                //快速移动
                gesture(1000, [resizeX(random(580, 620)), resizeY(random(950, 1050))], 
                [resizeX(random(780, 820)), resizeY(random(1750, 1850))])
            } else {
                //慢速移动
                gesture(1000, [resizeX(random(580, 620)), resizeY(random(1350, 1450))],
                 [resizeX(random(780, 820)), resizeY(random(1750, 1850))])
            }
            //滑动等待
            waitRandomTime(2)
            return scrollTo(sign, options, pointY, times)
        } else if (pointY > bottom) {
            //向上滑动
            if(pointY > bottom * 1.5) {
                //快速移动
                gesture(1000, [resizeX(random(580, 620)), resizeY(random(1750, 1850))], 
                [resizeX(random(780, 820)), resizeY(random(250, 350))])
            } else {
                //慢速移动
                gesture(1000, [resizeX(random(580, 620)), resizeY(random(1750, 1850))],
                 [resizeX(random(780, 820)), resizeY(random(1350, 1450))])
            }
            //滑动等待
            waitRandomTime(2)
            return scrollTo(sign, options, pointY, times)
        } else {
            //确定位置等待
            waitRandomTime(2)
            return tmp
        }
    }
}

/**
 * @description 查找button控件是否在给定区域内
 * @param button 控件
 * @param range 左侧文字范围
 * @returns reg存在返回限制区域，不存在返回原控件 不要跟上面的重写
 */
function searchByLeftRange(button: UiSelector, range: UiSelector, times?: number): UiSelector {
    if(times && times > 3) {
        throw new ExceedMaxNumberOfAttempts("searchInRange")
    } else {
        times = 1
    }
    let tmp = range.findOnce()
    if (tmp == null) {
        close(0)
        return searchByLeftRange(button, range, ++times)
    } else {
        let result = eval(button.toString())
        return result.boundsInside(0, tmp.bounds().top - 60, resizeX(1080), tmp.bounds().bottom + 60)
    }
}

/**
 * @description 持续点击,直到目标消失在屏幕 
 * @param component 控件
 * @returns 第一次查找未发现控件则返回false
 */
export function clickUntilGone(component: UiSelector, options?: ClickUntilGoneOptions){
    let button = component.findOnce()
    if (button) {
        untilGone(component, 0, options)
        return true
    } else {
        return false
    }
}
function untilGone(component: UiSelector, times: number, options?: RandomClickOptions){
    if(times >= MAX_CLICK_COUNTS) {
        throw new ExceedMaxNumberOfAttempts("untilGone")
    }
    let button = component.findOnce()
    if (button) {
        randomClick(button, options)
        untilGone(component, ++times, options)
    }
}

/**
 * @description 随机等待一定时间
 * @param waitTime 大概时间
 * @returns 具体等待时间(根据大概时间上下波动)
 */
export function waitRandomTime(waitTime:number){
    let time = waitTime + random(-waitTime * 0.2,waitTime * 0.2)
    sleep(time * 1000)
    return time
}

/**
 * @description 清空后台 目前适配：华为
 */
export function clearBackground(){
    if(home()){
        waitRandomTime(4)
        if(recents()){
            waitRandomTime(4)
            if(findAndClick(idContains("clearbox"))){
                waitRandomTime(4)
            }
        }
    }
}

/**
 * @description 刷视频方法
 * @param totalTime 刷视频总时间
 * @param interval interval间隔时间
 */
export function moveDown(totalTime:number, interval:number): void{
    Record.log(`准备刷视频${convertSecondsToMinutes(totalTime)}分钟`)
    let watchTime = 0
    while(totalTime > watchTime){
        gesture(200, [resizeX(random(580, 620)), resizeY(random(1750, 1850))], 
        [resizeX(random(780, 820)), resizeY(random(250, 350))])
        watchTime += waitRandomTime(interval)
    }
}

/**
 * @description 利用正则表达式匹配buttonNameList上的控件并点击直至消失
 * @param buttonNameList 正则表达式列表
 * @param func 点击后的处理方法 
 * ？：0或1次 *：0或无数次 +：1次或无数次
 */
export function doFuncUntilPopupsGone(buttonNameList: string[], options?: DoFuncUntilPopupsGone): void {
    // const regex = new RegExp(buttonNameList.map(item => '.*' +item + '.*').join('|'));
    const regex = merge(buttonNameList)
    let cycleCounts = 0
    while(++cycleCounts < MAX_CYCLES_COUNTS && 
        (clickUntilGone(textMatches(regex), options) || clickUntilGone(descMatches(regex), options))) {
        if(options?.func) {
            options.func()
        }
    }
}

/**
 * @description 合并数组用于正则表达式 [1,2,3] => "1|2|3"
 * @param buttonNameList 数组 
 */ 
export function merge(buttonNameList: string[]){
    return new RegExp(buttonNameList.join('|'))
}

/**
 * @description 将秒转化为分钟
 * @param seconds 秒钟
 */
export function convertSecondsToMinutes(seconds: number) {
    var minutes = Math.floor(seconds / 60); // 使用 Math.floor() 函数向下取整
    return minutes;
}
/**
 * @description 随机点击列表子项
 * @param component 列表项
 * @param index 子项下标，推荐使用random(?,?)
 * @param avoid 需要躲避的控件
 */
export function randomClickChildInList(component: UiSelector, index: number, avoid?: UiObject|null){
    const list = component.boundsInside(0, 0, device.width, device.height).findOnce()
    if (list != null) {
        let child = list.child(index)
        if(child != null) {
            randomClick(child, {avoid: avoid})
        }
    }
}

/**
 * @description 关闭广告方法
 * @param times 1:右上角图标 2:左上角图标 0:图像识别
 */
export function close(times: number){
    times = times % 3
    switch(times){
        case 0:
            if(!closeByImageMatching()){
                back()
                waitRandomTime(4)
            }
            break
        case 1:
            if(!findAndClick(className("android.widget.ImageView")
            .boundsInside(resizeX(945), 0, resizeX(DEVICE_WIDTH), resizeY(309)))){
                back()
                waitRandomTime(4)
            }
            break
        case 2:
            if(!findAndClick(className("android.widget.ImageView")
            .boundsInside(0, 0, resizeX(132), resizeY(273)))){
                back()
                waitRandomTime(4)
            }
            break
    }
    findAndClick(text("跳过"))
    //坚持退出 检测
    doFuncUntilPopupsGone(['继续观看', '关闭', '抓住奖励机会', '(以后|下次)再说', '留下看看', '放弃奖励'])
}


/**
 * @description 用于计算图片灰度，判断滑块
 */
export function isGrayColor(red:number, green:number, blue:number): number {
    // 计算RGB通道值的标准差
    if((red+green+blue)>200 && (red+green+blue)< 500) {
        return Math.sqrt((Math.pow(red - green, 2) + Math.pow(red - blue, 2) + Math.pow(green - blue, 2)) / 3);
    } else {
        return 100
    }
}

/**
 * @description 关闭任意带有叉叉的弹窗,基于视觉处理
 * @returns true: 关闭成功, false: 未发现控件
 */
export function closeByImageMatching(): boolean {
    console.hide()
    sleep(100)
    let img = captureScreen()
    console.show()
    let threshold = 0.7
    //需要从网络远程获取
    let close = images.read('/sdcard/exit-white.jpg')
    if(img != null && close != null) {
        //灰度化
        img = images.cvtColor(img, "BGR2GRAY")
        
        //验证图片
        let closeWhite = images.cvtColor(close, "BGR2GRAY")
        let closeBlack = images.threshold(closeWhite, 100, 255, "BINARY_INV")

        for (let i = 80;i< 255; i+=50){//80
            let nimg = images.threshold(img, i, 255, "BINARY")
            // nimg.saveTo("/sdcard/Pictures/Screenshots/result.jpg")
            // app.viewFile("/sdcard/Pictures/Screenshots/result.jpg")
            let p1 = findImage(nimg, closeWhite, {
                threshold: threshold
            })
            let p2 = findImage(nimg, closeBlack, {
                threshold: threshold
            })
            if (p1 || p2) {
                if(p1){
                    normalClick(p1.x, p1.y)
                } else if(p2){
                    normalClick(p2.x, p2.y)
                }
                //页面加载等待
                waitRandomTime(4)
                return true
            }
        }
    }
    return false
}

/**
 * @description 将时间分片执行
 * @param totalTime 总时间
 * @param func 执行流程
 */
export function doFuncAtGivenTime(totalTime: number, maxTime: number, func:(perTime: number) => void): void {
    while(totalTime >= 0) {
        const startTime = new Date();
        let timeParameter = Math.min(maxTime, totalTime)
        func(timeParameter)
        const endTime = new Date();
        totalTime -= (endTime.getTime() - startTime.getTime())/1000
    }
}

export function getStrByOcrRecognizeLimitBounds(options?: Bounds){
    const top = options?.top || 0
    const bottom = options?.bottom || device.height
    console.hide()
    sleep(100)
    let img = captureScreen()
    console.show()
    img = images.clip(img, 0, top, device.width, bottom)
    return ocr.recognizeText(img)
}

export function matchAndJudge(str: string){
    //匹配14，14秒，14s
    const time = str.match(/[0-9]+[s秒]?/)
    const swipe = str.match(/(滑动)?浏览/)
    if(time) {
        Record.debug(time[0])
        let totalTime = parseInt(time[0])
        if(totalTime > 50 || totalTime < 3){
            totalTime = 3
        }
        if(swipe){
            moveDown(totalTime, 4)
        } else {
            Record.debug(`等待${totalTime}秒`)
            sleep(totalTime * 1000)
            waitRandomTime(10)
        }
    }
}

export function sendIncomeMessageToWxPuher(str: string){
    if (_TOKEN && _TOKEN !== "") {
        let res = http.postJson(WX_PUSHER_URL, {
            "appToken":APP_TOKEN,
            "content":str,
            "summary":"智能助手日收益推送",
            "contentType":3,
            "uids":[
                _TOKEN
            ],
            "verifyPay":false
        })
        return res.statusCode === 200;        
    }
}

export function toShowString(list: any[]){
    let stack: string[] = [`id: ${ROBOT_ID}\n`]

    let sum = 0
    for (let app of list) {
        let weight = app.fetch(BaseKey.Weight, 0)
        Record.debug(`${app.appName}: ${weight}`)
        sum += weight
        stack.push(`${app.appName}: ${weight}`)
    }
    stack.push(`\n今日总收益: ${sum}金币`)
    return stack.join('\n')
}

export function sendErrorMessage(){
    let collection = LOG_STACK.filter((frame) => {
        return frame.getLevel() >= LogLevel.Info;
    });
    const img = captureScreen()
    hamibot.postMessage(Date.now().toString(), {
        telemetry: true,
        data: {
          title: 'error',
          attachments: [
            // 支持 text, json, image 三种类型，根据实际需要选择使用
            {
              type: 'text',
              data: collection.toString(),
            },
            {
              type: 'image',
              data: images.toBase64(img), // base64
            },
          ],
        },
      });
}

/**
 * @description 基于视觉识别 判断方法前后页面是否变化
 * @returns true:图片不一致, 代表操作成功, false:图片一致代表操作失败
 */
export function judgeFuncIsWorkByImg(func: ()=>void, left: number, top: number, right: number, bottom: number){
    console.hide()
    sleep(100)
    let before = captureScreen()
    before = images.clip(before, left, top, right-left, bottom-top)
    console.show()
    func()
    console.hide()
    sleep(100)
    let after = captureScreen()
    after = images.clip(after, left, top, right-left, bottom-top)
    console.show()
    const compare = findImage(before, after, {
        threshold: 1
    });
    if (compare) {
        Record.debug("图片一致")
        return false
    } else {
        Record.debug("图片不一致")
        return true
    }
}




