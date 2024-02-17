import { closeDialogifExist, continueWatch, dialogClick, findAndClick, normalClick, randomClick, watchAgain } from "../../common/click"
import { Bounds } from "../../common/interfaces"
import { closeByImageMatching, getGrayscaleHistogram, getScreenImage } from "../../common/ocr"
import { search } from "../../common/search"
import { close, convertSecondsToMinutes, doFuncAtGivenTime, executeDynamicLoop, executeDynamicLoop2, findLargestIndexes, matchAndJudge, merge, resizeX, resizeY, waitRandomTime } from "../../common/utils"
import { INCOME_THRESHOLD, MAX_CYCLES_COUNTS, NORMAL_WAIT_TIME, STORAGE, funcNameMap } from "../../global"
import { startDecorator } from "../../lib/decorators"
import { ConfigInvalidException, ExceedMaxNumberOfAttempts } from "../../lib/exception"
import { LOG_STACK, Record } from "../../lib/logger"

/* 
基础父类
*/
export abstract class Base {

    //app名称
    appName: string = ""
    //app包名
    packageName: string = ""

    //导航栏跳转参数 用于防止重复点击
    initialComponent: UiSelector = text("")
    initialNum: number = -1

    //上一次跳转的记录
    first: boolean = true
    preComponent: UiSelector = text("")
    preNum: number = -1

    //随机id导航栏
    randomTab: UiSelector = text("")
    //导航栏
    tab: UiSelector = text("")
    //导航栏深度
    depth: number = 0

    //兑换汇率
    exchangeRate: number = 10000

    dialogBounds: Bounds|undefined = undefined

    //是否可执行
    executable: boolean = true

    //签到时间
    startTime: Date = new Date()
    lastSignInTime: Date = new Date()
    canSign:boolean = false
    terminalAfterSign:boolean = false

    dialogCheck:boolean = true

    //高效率 T0 1
    abstract highEff(): void

    //中等效率 T2 2.5
    medEff(): void {}

    //低效率 T3
    lowEff1(time: number): void { time }
    lowEff2(time: number): void { time }
    lowEff3(time: number): void { time }

    //是否执行
    medEffFlag: boolean = false
    lowEff1Flag: boolean = false
    lowEff2Flag: boolean = false
    lowEff3Flag: boolean = false

    //是否继承
    medEffInheritance: boolean = false
    lowEff1Inheritance: boolean = false
    lowEff2Inheritance: boolean = false
    lowEff3Inheritance: boolean = false

    lowEff1Start: number = 0
    lowEff2Start: number = 0
    lowEff3Start: number = 0

    //阅读收益最大index
    //1 10 2 30 3 60 4 120 5 180 6 240
    lowEff1Index: number = 6
    lowEff2Index: number = 6
    lowEff3Index: number = 6

    //分均收益
    highEffIncomePerMinute: number = this.fetch(BaseKey.HighEffIncomePerMinute, 0)
    medEffIncomePerMinute: number = this.fetch(BaseKey.MedEffIncomePerMinute, 0)
    lowEff1IncomePerMinute: number = this.fetch(BaseKey.LowEff1IncomePerMinute, 0)
    lowEff2IncomePerMinute: number = this.fetch(BaseKey.LowEff2IncomePerMinute, 0)
    lowEff3IncomePerMinute: number = this.fetch(BaseKey.LowEff3IncomePerMinute, 0)

    //权重
    abstract weight(): void

    @startDecorator
    start1(): void{
        if(this.lauchApp()){
            this.startReset()
            const processTime:any = this.highEff()
            this.weight()
            const weight = this.fetch(BaseKey.Weight)
            const income = weight / convertSecondsToMinutes(processTime) / this.exchangeRate
            this.highEffIncomePerMinute = income > 1 || processTime < 60 ? 0 : income
            Record.debug(`highEff金币: ${weight},时间: ${convertSecondsToMinutes(processTime)}分钟, 分均: ${this.highEffIncomePerMinute.toFixed(4)}`)
            if(this.medEffFlag){
                const processTime:any = this.medEff()
                const tmp = this.fetch(BaseKey.Weight)
                this.weight()
                const weight = this.fetch(BaseKey.Weight) - tmp
                const income = weight / convertSecondsToMinutes(processTime) / this.exchangeRate
                this.medEffIncomePerMinute = income > 1 || processTime < 60 ? 0 : income
                Record.debug(`medEff金币: ${weight},时间: ${convertSecondsToMinutes(processTime)}分钟, 分均: ${this.medEffIncomePerMinute.toFixed(4)}`)
            }
            for(let i = 1; i<=3; i++){
                if(this[`lowEff${i}Flag`]){
                    const index = this[`lowEff${i}Start`]
                    let length = this[`lowEff${i}Index`]
                    for(let j = index; j < length;j++){
                        let param:number
                        if(j < 3){
                            param = j+1
                        } else {
                            param = 6
                        }
                        const time = (param * 10 + j) * 60
                        const processTime:any = this[`lowEff${i}`].call(this, time)
                        const tmp = this.fetch(BaseKey.Weight)
                        this.weight()
                        const weight = this.fetch(BaseKey.Weight) - tmp
                        const lowIncomePerMinute = 
                            weight / convertSecondsToMinutes(processTime) / this.exchangeRate
                        Record.debug(`lowEff${i}金币: ${weight},时间: ${convertSecondsToMinutes(processTime)}分钟, 分均: ${lowIncomePerMinute.toFixed(4)}`)                        
                        this[`lowEff${i}Start`] = j + 1
                        if(lowIncomePerMinute < INCOME_THRESHOLD){
                            break
                        }
                        this[`lowEff${i}IncomePerMinute`] = lowIncomePerMinute
                    }
                }
            }
        } else {
            this.executable = false
        }
    }
    @startDecorator
    startContinue(funcName: string): void{
        const start = this[`${funcName}Start`]
        const length = this[`${funcName}Index`]
        if(start < length && this.lauchApp()){
            this.reset()
            this.beforeDoTask()
            this.reSearchTab()
            for(let i = start;i < length;i++){
                let param:number
                if(i < 3){
                    param = i+1
                } else {
                    param = 6
                }
                const time = (param * 10 + i)* 60
                this[`${funcName}`].call(this, time)
                this.weight()
            }
        }
    }

    @startDecorator
    start2(): void{
        const runCode = hamibot.env[this.constructor.name]
        if (runCode !== "" && this.lauchApp()){
            this.startReset()
            this.executeRichText(runCode)
            this.weight()
        }
    }

    executeRichText(richText: string|string[]){
        const lines = typeof richText === "string" ?
            richText.replace(/(\n?)\{(\n?)/g, '\n{\n')
            .replace(/(\n?)\}(\n?)/g, '\n}\n')
            .replace(/(\n)(\n)/, '\n').split('\n'):richText
        for(let i = 0; i< lines.length; i++){
            let line = lines[i]
            const tokens = line.trim().split(/\(|\)/)

            const command = funcNameMap[tokens[0]]
            const params = tokens[1] ? tokens[1].split(',') : []

            if(command != null){
                const method = this[command]
                if (typeof method === 'function') {
                    const time = parseInt(params[0], 10) * 60
                    method.call(this, time)
                  } else {
                    throw new ConfigInvalidException(`${tokens[0]} 方法不存在`)
                }
            } else if (tokens[0] === "循环") {
                const stack = ["{"]
                if(lines[i+1] !== "{"){
                    throw new ConfigInvalidException("语法错误")
                }
                let index = -1
                for(let j = i + 2; j < lines.length; j++){
                    if(lines[j] === "}"){
                        stack.pop()
                    } else if(lines[j] === "{"){
                        stack.push("{")
                    } else {
                        continue
                    }
                    if(stack.length === 0){
                        index = j
                        break
                    }
                }
                if(index === -1){
                    throw new ConfigInvalidException("语法错误")
                }
                const loopBody = () => {
                    this.executeRichText(lines.slice(i+2, index))
                }
                if(params[0] === "看广告"){
                    executeDynamicLoop2(()=>this.watchAds() as any, loopBody)
                } else {
                    const loopCount = parseInt(params[0], 10);
                    executeDynamicLoop(loopCount, loopBody)
                }
                i = index
            } else if (tokens[0] === "等待") {
                const sleepTime = parseInt(params[0], 10);
                sleep(sleepTime * 1000)
            }
        }
    }

    reSearchTab(): void{
        if(this.randomTab.toString() !== text("").toString()){
            const component = search(this.randomTab, {
                throwErrIfNotExist:true
            })
            //let tmp:any = this.randomTab.findOnce()
            // let tmp = this.backUntilFind(this.randomTab)
            if(component){
                this.tab = id(component.id()||"")
                this.initialComponent = this.tab
                Record.debug(`${this.tab}`)
            } else {
                throw "id定位失败"
            }
        }
    }

    lauchApp(): boolean {
        Record.log(`尝试启动${this.appName}`)
        const isLauchApp = launchPackage(this.packageName)
        if(isLauchApp) {
            findAndClick(className("android.widget.Button").textMatches("打开"), {
                fixed:true,
                disableCoverCheck:true,
                disableGrayCheck:true,
                waitFor:2
            })
            findAndClick("跳过", {
                fixed:true,
                disableCoverCheck:true,
                disableGrayCheck:true
            })
            Record.log(`${this.appName}已启动`)
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
        waitRandomTime(NORMAL_WAIT_TIME)
        Record.log(`准备看书${convertSecondsToMinutes(totalTime)}分钟`)
        let readTime = 0
        if(text("简介").exists()) {
            normalClick(resizeX(1070), resizeY(2330))
        }
        const img = getScreenImage({bottom:device.height / 6})
        const grayHistogram = getGrayscaleHistogram(img)
        img.recycle()
        const [index] = findLargestIndexes(grayHistogram, 1)
        Record.debug(`read index: ${index}`)
        doFuncAtGivenTime(totalTime, 6, (perTime: number)=>{
            normalClick(
                resizeX(random(1070, 1080)),
                resizeY(random(1900, 2000))
            )
            readTime += waitRandomTime(perTime)
            findAndClick(merge([".*不再提示", "我知道了", "放弃下载"]),{
                fixed:true,
                waitFor:-1
            })
            this.watch(index)
        })
    }

    /**
     * @description 基于视觉观看广告，
     * @returns 
     */
    watch(exitSign: UiSelector|number, times:number = 0, waitTimes:number = 0){
        let flag:boolean = false
        //回调次数
        if(typeof exitSign === "number") {
            const img = getScreenImage({bottom:device.height / 6})
            const grayHistogram = getGrayscaleHistogram(img)
            img.recycle()
            const [index] = findLargestIndexes(grayHistogram, 1)
            if(index < exitSign + 20 && index > exitSign - 20){
                flag = true
            } else {
                Record.debug(`watch index: ${index}`)
            }
        } else {
            if(search(exitSign, {waitFor:2})){
                flag = true
            }
        }
        if(flag){
            Record.debug("watch return")
            return
        }
        //三个方式都无法解决直接异常（每个可执行两遍）
        if(times > 9){
            Record.debug("watch error")
            throw new ExceedMaxNumberOfAttempts("超过最大限制次数")
        }
        if (currentPackage() !== this.packageName) {
            launchPackage(this.packageName)
        }
        let str:string|undefined = undefined
        const first = search("浏览页面[0-9]+s 领取奖励", {
            waitFor:-1
        })
        if(first){
            str = first.text()
        } else {
            const second = search(".*[0-9]+[ ]?[s秒]?.*", {
                // ocrRecognize:true, 
                waitFor:-1,
                bounds:{bottom: device.height / 4
            }})
            if(second){
                str = second.text()
            } else {
                const com = search("[0-9]+秒", {
                    waitFor:-1,
                    bounds:{
                        left:device.width*2/3,
                        top:device.height*2/3
                }})
                if(com){
                    str = `滑动浏览${com.text()}`
                }
            }
        }
        const waitTime = matchAndJudge(str)
        waitTimes += waitTime
        Record.debug(`watchTimes = ${times}, waitTime = ${waitTime}`)
        if(search("该视频提到的内容是", {waitFor:waitTime})){
            back()
            waitRandomTime(1)
            this.watch(exitSign, ++times, waitTimes)
            return
        }
        waitRandomTime(4)
        if(!findAndClick(".*跳过.*",{
            waitFor:-1,
            fixed:true, 
            bounds:{left:device.width * 2 / 3, bottom:device.height / 5}})){
            close()
        }
        waitRandomTime(1)
        if(waitTimes > 60 * 2 || times >= 4){
            closeDialogifExist()
        } else {
            if(!continueWatch()){
                if(!watchAgain()){
                    closeDialogifExist()
                }
            }
        }
        this.watch(exitSign, ++times, waitTimes)
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
            if(child) {
                tmp = child
            }
        }
        if (tmp != null) {
            if(num !== -1){
                tmp = tmp.child(num) as any
            }
            if(this.preComponent.toString() !== component.toString()
                || this.preNum !== num) {
                randomClick(tmp.bounds())
            }
        }
        this.preComponent = component
        this.preNum = num
        // waitRandomTime(4)
    }

    /**
     * @description 持续返回直到找到目标控件 尝试三次返回然后启动视觉识别
     * @param func do方法
     * @param component 查找条件
     */
    backUntilFind(component: UiSelector, times: number = 0): UiObject{
        if(times > 4) {
            Record.debug("backUntilFind error")
            throw new ExceedMaxNumberOfAttempts("超过最大尝试次数")
        }
        const tmp = search(component, {fixed:true})
        if (tmp) {
            return tmp
        } else {
            if(times > 2){
                Record.warn("尝试矫正")
                closeByImageMatching()
                back()
            } else {
                back()
            }
            if(this.dialogCheck){
                waitRandomTime(2)
                closeDialogifExist()
            }
            //判断是否还在app内
            if (currentPackage() !== this.packageName) {
                launchPackage(this.packageName)
            }
            return this.backUntilFind(component, ++times)
        }
    }

    watchAdsForCoin(backSign: string, sign:string = ""){
        const str = "(观)?看.*(视频|内容|广告).*(得|领|赚|收取).*([0-9]+金币|更多|火苗)"+sign
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS 
            && dialogClick(str, this.dialogBounds)){
            waitRandomTime(NORMAL_WAIT_TIME)
            this.watch(textMatches(merge([backSign, str])))
        }
        dialogClick(merge(["(开心|立即)收下", "(我)?知道了"]), this.dialogBounds)
    }

    /**
     * @description 执行任务前置操作
     */
    beforeDoTask(): void{}

    /**
     * @description 启动初始化
     */
    startReset(){
        //参数初始化
        //start初始化
        this.startTime = new Date()
        this.lowEff1Start = 0
        this.lowEff2Start = 0
        this.lowEff3Start = 0
        //启动初始化
        this.reset()
        //前置操作
        this.beforeDoTask()
        this.reSearchTab()
    }

    /**
     * @description 重置
     */
    reset(){
        LOG_STACK.clear()
        //广告重置
        //跳转留存记录
        this.preComponent = this.initialComponent
        this.preNum = this.initialNum
        this.first = true
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
    mealSupp() {}
    readBook(totalTime: number) { totalTime }
    swipeVideo(totalTime: number) { totalTime }
    listenBook() {}
    watchLive() {}
    shopping() {}
    reward() {}
    clickPop() {}
    record() {}
    //*****************空方法*******************
}

export enum BaseKey {
    Weight,
    Executed,
    HighEffEstimatedTime,
    MedEffEstimatedTime,
    LowEffEstimatedTime,
    HighEffIncomePerMinute,
    MedEffIncomePerMinute,
    LowEff1IncomePerMinute,
    LowEff2IncomePerMinute,
    LowEff3IncomePerMinute,
    lowEff1Index,
    lowEff2Index,
    lowEff3Index
}

