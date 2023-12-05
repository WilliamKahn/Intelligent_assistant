import { Image } from "images"
import { clickDialogOption, findAndClick, fixedClick, dialogClick, normalClick, randomClick } from "../../common/click"
import { Dialog } from "../../common/enums"
import { close, closeByImageMatching, convertSecondsToMinutes, doFuncAtGivenTime, findLargestIndexes, getGrayscaleHistogram, getScreenImage, matchAndJudge, merge, resizeX, resizeY, waitRandomTime } from "../../common/utils"
import { BASE_ASSIMT_TIME, MAX_ASSIMT_TIME, MAX_BACK_COUNTS, MAX_CYCLES_COUNTS, MAX_RETRY_COUNTS, STORAGE } from "../../global"
import { startDecorator } from "../../lib/decorators"
import { ExceedMaxNumberOfAttempts } from "../../lib/exception"
import { LOG_STACK, Record } from "../../lib/logger"
import { search } from "../../common/search"

/* 
基础父类
*/
export abstract class Base {

    //app名称包名
    appName: string = ""
    packageName: string = ""

    //导航栏跳转参数 用于防止重复点击
    initialComponent: UiSelector = text("")
    initialNum: number = -1

    randomTab: UiSelector = text("")
    tab: UiSelector = text("")
    depth: number = 0
    preComponent: UiSelector = text("")
    preNum: number = -1

    //观看广告
    exitNum: number = 1

    //执行预估时间
    highEffEstimatedTime: number = BASE_ASSIMT_TIME
    medEffEstimatedTime: number = MAX_ASSIMT_TIME
    lowEffEstimatedTime: number = MAX_ASSIMT_TIME
    //耗时任务数量（涉及到时间分配）
    lowEffAssmitCount = 1

    //高效率 T0 1
    abstract highEff(): void

    //中等效率 T2 2.5
    medEff(): void {}

    //低效率 T3
    lowEff(time: number): void { time }

    //权重
    abstract weight(): void

    @startDecorator
    start(time: number): void {
        if (time > 0 && this.lauchApp()) {
            this.reset()
            Record.info(`${this.appName}预计执行${convertSecondsToMinutes(time)}分钟`)
            this.reSearchTab()
            let flag = false
            if(time >= this.highEffEstimatedTime) {
                const processTime:any = this.highEff()
                time -= processTime
                flag = true
            }
            if(time >= this.medEffEstimatedTime) {
                const processTime:any = this.medEff()
                time -= processTime
            }
            if(time >= this.lowEffEstimatedTime) {
                const processTime:any = this.lowEff(time)
                time -= processTime
            }
            if (flag) {
                Record.info("统计当前app金币")
                this.weight()
            }
        }
    }

    reSearchTab(): void{
        if(this.randomTab.toString() !== text("").toString()){
            let tmp = this.backUntilFind(this.randomTab)
            if(tmp != null){
                this.tab = id(tmp.id())
                this.initialComponent = this.tab
                Record.debug(`${this.tab}`)
            } else {
                throw "id定位失败"
            }
        }
    }

    /**
     * @description 启动app
     * @returns 成功启动app返回true
     */
    lauchApp(): boolean {
        Record.log(`尝试启动${this.appName}`)
        let isLauchApp = launchPackage(this.packageName)
        if(isLauchApp) {
            waitRandomTime(2)
            findAndClick(className("android.widget.Button").textMatches("打开"), {fixed:true})
            Record.log(`${this.appName}已启动`)
            waitRandomTime(13)
        } else {
            Record.log(`${this.appName}应用未安装`)
        }
        return isLauchApp
    }

    /* 
    阅读方法
    */
    /**
     * @description 刷阅读
     * @param totalTime 总时间
     * @todo 防止广告 防止页内跳转
     */
    read(totalTime: number){
        Record.log(`准备看书${convertSecondsToMinutes(totalTime)}分钟`)
        let readTime = 0
        if(text("简介").exists()) {
            normalClick(resizeX(1070), resizeY(2330))
        }
        const img = getScreenImage({bottom:device.height * 1/5})
        const grayHistogram = getGrayscaleHistogram(img)
        const [index] = findLargestIndexes(grayHistogram, 1)
        Record.debug(`read index: ${index}`)
        doFuncAtGivenTime(totalTime, 10, ()=>{
            readTime += waitRandomTime(10)
            this.watch(index)
            //阅读页面弹窗
            fixedClick(merge([".*不再提示", "我知道了", "放弃下载"]))
            normalClick(
                resizeX(random(1070, 1080)),
                resizeY(random(1900, 2000))
            )
        })
    }

    /**
     * @description 基于视觉观看广告，
     * @returns 
     */
    watch(exitSign: UiSelector|number, times:number = 0){
        let flag:boolean = false
        //回调次数
        if(typeof exitSign === "number") {
            const img = getScreenImage({bottom:device.height * 1/5})
            const grayHistogram = getGrayscaleHistogram(img)
            const [index] = findLargestIndexes(grayHistogram, 1)
            Record.debug(`watch index: ${index}`)
            if(index < exitSign + 10 && index > exitSign - 10){
                flag = true
            }
        } else {
            flag = exitSign.exists()
        }
        if(flag){
            Record.debug("watch return")
            return
        }
        //三个方式都无法解决直接异常（每个可执行两遍）
        if(times > 9){
            throw new ExceedMaxNumberOfAttempts("watch")
        }
        if (currentPackage() !== this.packageName) {
            this.lauchApp()
        }
        const [_, name] = search(".*[0-9]+[ ]?[s秒]?.*", {ocrRecognize:true, bounds:{bottom: device.height * 1/5}})
        const waitTime = matchAndJudge(name)
        Record.debug(`watchTimes = ${times}, waitTime = ${waitTime}`)
        if(text("该视频提到的内容是").findOne(waitTime * 1000)){
            back()
            waitRandomTime(1)
            this.watch(exitSign, ++times)
            return
        }
        waitRandomTime(10)
        if(findAndClick(".*跳过.*", {fixed:true, bounds:{left:device.width, bottom:device.height * 1/5}})){
            if(!clickDialogOption(Dialog.Positive)){
                waitRandomTime(1)
                this.watch(exitSign, ++times)
                return
            }
        }
        close(times)
        //坚持退出 检测
        if(times < 5){
            clickDialogOption(Dialog.Positive)
        } else {
            clickDialogOption(Dialog.Negative)
        }
        dialogClick("领取奖励")
        this.watch(exitSign, ++times)
    }

    /**
     * @description 底部导航栏跳转
     * @param component 可以选定整条导航栏或者单个控件
     * @param num -1代表单个控件，大于0后指定component下某个子类
     * @param depth depth代表子类深度,默认为0，列表默认点击子项，
     * @returns void
     */
    goTo(component: UiSelector, num: number){
        if(component.exists()
            && this.preComponent.toString() == component.toString()
            && this.preNum == num) {
            return
        }
        let tmp = this.backUntilFind(component)
        for(let i = 0; i < this.depth; i++) {
            let child = tmp.child(0)
            if(child != null) {
                tmp = child
            }
        }
        if (tmp != null) {
            if(num !== -1){
                tmp = tmp.child(num)
            }
            if(this.preComponent.toString() !== component.toString()
                || this.preNum !== num) {
                randomClick(tmp.bounds(), {check: true})
            }
        }
        this.preComponent = component
        this.preNum = num
        waitRandomTime(4)
    }

    /**
     * @description 持续返回直到找到目标控件 尝试三次返回然后启动视觉识别
     * @param func do方法
     * @param component 查找条件
     */
    backUntilFind(component: UiSelector, times: number = 0): any{
        if(times >= MAX_BACK_COUNTS) {
            throw new ExceedMaxNumberOfAttempts("backUntilFind")
        }
        let tmp = component.findOnce()
        if (tmp == null) {
            if(times >= MAX_BACK_COUNTS - 2){
                Record.warn("尝试矫正")
                closeByImageMatching()
            } else {
                back()
                waitRandomTime(4)
            }
            clickDialogOption(Dialog.Negative)
            //判断是否还在app内
            if (currentPackage() !== this.packageName) {
                this.lauchApp()
            }
            return this.backUntilFind(component, ++times)
        } else {
            return tmp
        }
    }

    watchAdsForCoin(backSign: string){
        let cycleCounts = 0
        const str = "看.*(视频|内容|广告).*(得|领|赚).*([0-9]+金币|更多)"
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && (dialogClick(str))){
            this.watch(textMatches(merge([backSign, str])))
        }
        dialogClick(merge(["开心收下", "我知道了"]))
    }

    /**
     * @description 重置
     */
    reset(){
        LOG_STACK.clear()
        //广告重置
        this.enablewatchAds()
        //跳转留存记录
        this.preComponent = this.initialComponent
        this.preNum = this.initialNum
    }

    /**
     * 
     * @param key 键 取BaseKey中枚举值
     * @param value 值
     */
    store(key:BaseKey, value: Object){
        let object = STORAGE.get(this.constructor.name, {})
        object[key] = value
        STORAGE.put(this.constructor.name, object)
    }

    /**
     * 
     * @param key 键 取BaseKey中枚举值
     * @param defaultValue 默认取值
     * @returns 
     */
    fetch(key:BaseKey, defaultValue?: any){
        let object = STORAGE.get(this.constructor.name, {})
        if(defaultValue != undefined && 
            (object === undefined || object[key] === undefined)){
            return defaultValue
        }
        return object[key]
    }

    //*****************空方法*******************
    beforeRun() {}
    signIn() {}
    openTreasure() {}
    watchAds() {}
    enablewatchAds(){}
    mealSupp() {}
    readBook(totalTime: number) { totalTime }
    swipeVideo(totalTime: number) { totalTime }
    listenBook() {}
    reward() {}
    clickPop() {}
    record() {}
    //*****************空方法*******************
}

export enum BaseKey {
    Weight,
    Executed,
    highEffEstimatedTime,
    medEffEstimatedTime,
    lowEffEstimatedTime,
    Money
}

