import { BASE_ASSIMT_TIME, MAX_ASSIMT_TIME, MAX_BACK_COUNTS, STORAGE, STORAGE_WEIGHT_CONTAINER, WEIGHT_ASSIMT_TIME } from "../../global"
import { startDecorator } from "../../lib/decorators"
import { clearBackground, close, convertSecondsToMinutes, doFuncUntilPopupsGone, findAndClick, getStrByOcrRecognizeLimitBounds, getTextBoundsByOcrRecognize, matchAndJudge, merge, normalClick, randomClick, resizeX, resizeY, waitRandomTime, } from "../../lib/utils"
import { Record } from "../../lib/logger"
import { ExceedMaxNumberOfAttempts } from "../../lib/exception"

/* 
基础父类
*/
export abstract class Base {

    //app名称包名
    appName: string = ""
    packageName: string = ""

    //导航栏跳转参数 用于防止重复点击
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
    //阅读
    verify: boolean = true


    //高效率 T0 1
    abstract highEff(): void

    //中等效率 T2 2.5
    medEff(): void {}

    //低效率 T3
    lowEff(time: number): void { time }

    //权重
    abstract weight(): void

    //启动APP => 签到 => 提现 => 看广告 => 听书(优先听书，边听边看) => 看小说
    @startDecorator
    start(time: number): void {
        Record.info(`${this.appName}预计执行${convertSecondsToMinutes(time)}分钟`)
        if (this.lauchApp()) {
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
                let processTime:any = this.lowEff(time)
                time -= processTime
            }
            if (flag) {
                Record.info("统计当前app金币")
                this.weight()
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
            waitRandomTime(5)
            findAndClick(text("打开"), {
                ocrRecognizeText: "打开"
            })
            Record.log(`${this.appName}已启动`)
            waitRandomTime(10)

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
        while(totalTime > readTime) {
            readTime += waitRandomTime(10)
            //防止app内广告
            if(this.verify){
                this.backUntilFind(textMatches(merge(["菜单", ".*[0-9]*[金]?币"])))
            } else {
                let waitSign = ['.*后可领奖励','.*后可领取奖励', '.*后领取观看奖励']
                if(textMatches(merge(waitSign)).exists()){
                    this.watch(textMatches("第[0-9]+章.*"))
                }
            }
            //阅读页面弹窗
            findAndClick(textMatches(merge([".*不再提示", "我知道了", "放弃下载"])))
            normalClick(
                resizeX(random(1070, 1080)),
                resizeY(random(1900, 2000))
            )
        }
        waitRandomTime(5)
        back()
        waitRandomTime(5)
        doFuncUntilPopupsGone(["直接退出", "退出阅读", "暂不加入", "下次再说", "取消", "暂不添加"])
        waitRandomTime(5)
    }

    /**
     * @description 基于视觉观看广告，
     * @returns 
     */
    watch(exitSign: UiSelector, times:number = this.exitNum){
        //回调次数
        if(exitSign.exists()){
            //记录上次退出时按钮
            if(times != this.exitNum){
                //取最小值
                this.exitNum = --times % 3
            }
            return
        }
        //三个方式都无法解决直接异常（每个可执行两遍）
        if(times > 5){
            throw new ExceedMaxNumberOfAttempts("watch")
        }
        if (currentPackage() !== this.packageName) {
            this.lauchApp()
        }
        let tmp = textMatches(".*[0-9]+[ ]?[s秒]?.*").findOnce()
        if(tmp != null) {
            matchAndJudge(tmp.text())
        } else {
            //识别屏幕三分之一以上区域
            const str = getStrByOcrRecognizeLimitBounds({bottom: device.height * 1 / 3})
            //正则表达式替换掉时间减少干扰
            matchAndJudge(str.replace(/\d+:\d+/, "x"))
        }
        if(text("该视频所提到的内容是").exists()){
            back()
            this.watch(exitSign, ++times)
            return
        }
        close(times)
        if(findAndClick(text("领取奖励"))){
            times = this.exitNum
        }
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
            if(this.preComponent.toString() == component.toString()
                && this.preNum == num) {
                randomClick(tmp.bounds())
            } else {
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
    backUntilFind(component: UiSelector, times?: number): any{
        if(times == undefined) times = 0
        if(times >= MAX_BACK_COUNTS) {
            throw new ExceedMaxNumberOfAttempts("backUntilFind")
        }
        let tmp = component.findOnce()
        if (tmp == null) {
            if(times >= MAX_BACK_COUNTS - 2){
                Record.warn("尝试矫正")
                close(0)
            } else {
                back()
                waitRandomTime(4)
            }
            //判断是否还在app内
            if (currentPackage() !== this.packageName) {
                this.lauchApp()
            }
            return this.backUntilFind(component, ++times)
        } else {
            return tmp
        }
    }

    /**
     * @description 重置留存记录
     */
    clear(){
        this.preComponent = text("")
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
    signIn() {}
    openTreasure() {}
    watchAds() {}
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
    highEffEstimatedTime,
    medEffEstimatedTime,
    lowEffEstimatedTime
}

