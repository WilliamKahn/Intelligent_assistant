import { closeDialogifExist, continueWatch, dialogClick, findAndClick, fixedClick, normalClick, randomClick, watchAgain } from "../../common/click"
import { Bounds } from "../../common/interfaces"
import { search } from "../../common/search"
import { close, closeByImageMatching, convertSecondsToMinutes, doFuncAtGivenTime, executeDynamicLoop, findLargestIndexes, getGrayscaleHistogram, getScreenImage, matchAndJudge, merge, resizeX, resizeY, waitRandomTime } from "../../common/utils"
import { BASE_ASSIMT_TIME, MAX_ASSIMT_TIME, MAX_BACK_COUNTS, MAX_CYCLES_COUNTS, STORAGE } from "../../global"
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

    //签到时间
    lastSignInTime: Date = new Date()
    canSign:boolean = false

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
        if (this.lauchApp()) {
            Record.info(`${this.appName}预计执行${convertSecondsToMinutes(time)}分钟`)
            this.reset()
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
            if(time > this.lowEffEstimatedTime) {
                const processTime:any = this.lowEff(time - 5 * 60)
                time -= processTime
            }
            if (flag) {
                Record.info("统计当前app金币")
                this.weight()
            }
        }
    }

    @startDecorator
    start2(): void{
        const runCode = hamibot.env[this.constructor.name]
        if (runCode !== "" && this.lauchApp()){
            this.reset()
            this.reSearchTab()
            this.executeRichText(runCode)
            this.weight()
        }
    }

    executeRichText(richText: string|string[]){
        const lines = typeof richText === "string" ?
            richText.replace(/(\n?)\{(\n?)/g, '\n{\n')
            .replace(/(\n?)\}(\n?)/g, '\n}\n')
            .replace(/(\n)(\n)/, '\n').split('\n'):richText
        const signFlag = this.findMethodName("签到") !== null ? true:false
        for(let i = 0; i< lines.length; i++){
            let line = lines[i]
            const tokens = line.trim().split(/\(|\)/);

            const command = this.findMethodName(tokens[0]);
            const params = tokens[1] ? tokens[1].split(',') : [];

            if(command != null){
                const method = this[command]
                if (typeof method === 'function') {
                    if(signFlag){
                        if(command === "signIn"){
                            this.lastSignInTime = new Date()
                            this.canSign = true
                        } else if(this.canSign){
                            const now = new Date()
                            if(now.getDay() !== this.lastSignInTime.getDay()){
                                this.lastSignInTime = now
                                this.signIn()
                            }
                        }
                    }
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
                const loopCount = parseInt(params[0], 10);
                const loopBody = () => {
                    this.executeRichText(lines.slice(i+2, index))
                }
                executeDynamicLoop(loopCount, loopBody)
                i = index
            } else if (tokens[0] === "等待") {
                const sleepTime = parseInt(params[0], 10);
                sleep(sleepTime * 1000)
            }
        }
    }

    reSearchTab(): void{
        if(this.randomTab.toString() !== text("").toString()){
            search(this.randomTab, {waitFor:true})
            let tmp:any = this.randomTab.findOnce()
            if(tmp != null){
                this.tab = id(tmp.id())
                this.initialComponent = this.tab
                Record.debug(`${this.tab}`)
            } else {
                throw "id定位失败"
            }
        }
    }

    beforeDoTask(): void{}

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
            fixedClick(merge([".*不再提示", "我知道了", "放弃下载"]))
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
            Record.debug(`watch index: ${index}`)
            if(index < exitSign + 20 && index > exitSign - 20){
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
            Record.debug("watch error")
            throw new ExceedMaxNumberOfAttempts("超过最大限制次数")
        }
        if (currentPackage() !== this.packageName) {
            this.lauchApp()
        }
        let str:string|undefined = undefined
        const component = search(".*[0-9]+[ ]?[s秒]?.*", {ocrRecognize:true, bounds:{bottom: device.height / 4}})
        if(component !== undefined){
            str = component.text
        }
        const waitTime = matchAndJudge(str)
        waitTimes += waitTime
        Record.debug(`watchTimes = ${times}, waitTime = ${waitTime}`)
        if(text("该视频提到的内容是").findOne(waitTime * 1000)){
            back()
            waitRandomTime(1)
            this.watch(exitSign, ++times, waitTimes)
            return
        }
        waitRandomTime(10)
        if(!findAndClick(".*跳过.*",
        {fixed:true, bounds:{left:device.width * 2 / 3, bottom:device.height / 5}})){
            close()
        }
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
            closeDialogifExist()
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
        const str = "(观)?看.*(视频|内容|广告).*(得|领|赚|收取).*([0-9]+金币|更多|火苗)"
        let cycleCounts = 0
        while(++cycleCounts < MAX_CYCLES_COUNTS
            && (dialogClick(str, this.dialogBounds))){
            this.watch(textMatches(merge([backSign, str])))
        }
        dialogClick(merge(["(开心|立即)收下", "(我)?知道了"]))
    }

    /**
     * @description 重置
     */
    reset(){
        this.beforeDoTask()
        LOG_STACK.clear()
        //广告重置
        this.enablewatchAds()
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

    findMethodName(chineseName:string) {
        const list:string[] = hamibot.env[this.constructor.name+"Func"]
        for (let i = 0; i < list.length; i++) {
          const parts = list[i].split("|");
          if (parts[1] === chineseName) {
            return parts[0];
          }
        }
        return null;// 如果没有找到匹配的方法名称
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
}

