import { Image, Point } from "images";
import { DEVICE_HEIGHT, DEVICE_WIDTH, PACKAGE_HAMIBOT } from "../global";
import { Record } from "../lib/logger";
import { findAndClick, fixedClick, normalClick } from './click';
import { Move } from "./enums";
import { Bounds, ComponentBounds } from './interfaces';


//转化坐标
export function resizeX(x: number): number {
    return x * device.width/DEVICE_WIDTH
}
export function resizeY(y: number): number {
    return y * device.height/DEVICE_HEIGHT
}


/**
 * 
 * @param bounds 原边界
 * @param scaling 缩小系数
 * @returns 缩小后边界
 */
export function boundsScaling(bounds: Bounds, scaling: number){
    let left = bounds.left||0
    let right = bounds.right||device.width
    let top = bounds.top||0
    let bottom = bounds.bottom||device.height
    const width  = right - left
    const height = bottom - top
    const newHeight = height * scaling
    const newWidth = width * scaling
    left = left + (width-newWidth)/2 
    top = top + (height - newHeight)/2
    right = right - (width-newWidth)/2
    bottom = bottom - (height - newHeight)/2
    const result = {left:left, top:top, right:right, bottom:bottom}
    boundsCorrection(result)
    return result
}
/**
 * @description 边界矫正
 * @param bounds 
 */
export function boundsCorrection(bounds: ComponentBounds){
    bounds.left = bounds.left < 0 ? 0 : bounds.left
    bounds.top = bounds.top < 0 ? 0 : bounds.top
    bounds.right = bounds.right > device.width ? device.width : bounds.right
    bounds.bottom = bounds.bottom > device.height ? device.height : bounds.bottom
}

export function getScreenImage(bounds?: Bounds){
    const x1 = bounds?.left || 0
    const y1 = bounds?.top || 0
    const x2 = bounds?.right || device.width
    const y2 = bounds?.bottom || device.height
    console.hide()
    sleep(100)
    const img = captureScreen()
    console.show()
    waitRandomTime(1)
    const result = images.clip(img, x1, y1, x2-x1, y2-y1)
    try {
        return result    
    } finally {
        // @ts-ignore
        img.recycle()
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
            if(!findAndClick(idContains("clear"), {
                fixed:true,
                disableCheckBeforeClick:true
            })){
                findAndClick(descContains("清除"), {
                    fixed:true,
                    disableCheckBeforeClick:true
                })
            }
            launchPackage(PACKAGE_HAMIBOT)
            waitRandomTime(4)
        }
    }
}

/**
 * @description 刷视频方法
 * @param totalTime 刷视频总时间
 * @param interval interval间隔时间
 */
export function moveDown(totalTime:number, interval:number): void{
    let watchTime = 0
    while(totalTime > watchTime){
        swipeDown(Move.Fast, 500)
        watchTime += waitRandomTime(interval)
    }
}
export function randomMoveDown(totalTime:number, intervalFrom:number, intervalTo:number): void{
    let watchTime = 0
    while(totalTime > watchTime){
        swipeDown(Move.Fast, 500)
        watchTime += waitRandomTime(random(intervalFrom, intervalTo))
    }
}

export function swipeDown(set: Move, interval: number){
    if(set === Move.Normal){
        gesture(interval, [resizeX(random(580, 620)), resizeY(random(1750, 1850))],
                 [resizeX(random(780, 820)), resizeY(random(1350, 1450))])
    } else if(set === Move.Fast){
        gesture(interval, [resizeX(random(580, 620)), resizeY(random(1750, 1850))], 
                [resizeX(random(780, 820)), resizeY(random(250, 350))])
    }
}
export function swipeUp(set: Move, interval:number){
    if(set === Move.Normal){
        gesture(interval, [resizeX(random(580, 620)), resizeY(random(1350, 1450))],
                 [resizeX(random(780, 820)), resizeY(random(1750, 1850))])
    } else if(set === Move.Fast){
        gesture(interval, [resizeX(random(580, 620)), resizeY(random(950, 1050))], 
                [resizeX(random(780, 820)), resizeY(random(1750, 1850))])
    }
}
export function swipeLeft(y: number, interval:number){
    console.hide()
    sleep(100)
    gesture(interval, [resizeX(random(280, 320)), y], 
        [resizeX(random(780, 820)), y+random(-30, 30)])
    console.show()
}
export function swipeRight(y: number, interval:number){
    console.hide()
    sleep(100)
    gesture(interval, [resizeX(random(780, 820)), y], 
        [resizeX(random(280, 320)), y+random(-30, 30)])
    console.show()
}

/**
 * @description 合并数组用于正则表达式 [1,2,3] => "1|2|3"
 * @param buttonNameList 数组 
 */ 
export function merge(buttonNameList: string[]){
    return buttonNameList.join('|')
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
 * @description 关闭广告方法
 * @param times 1:右上角图标 2:左上角图标 0:图像识别
 */
export function close(){
    const times = random(0,1)
    if(!closeByImageMatching(true)){
        if(!fixedClick(idContains("close"))){
            switch(times){
                case 0:
                    if(!findAndClick(classNameMatches("android\.widget\.(ImageView|Button|FrameLayout)"),
                    {fixed:true, bounds:{left:device.width * 3 / 5, bottom:device.height * 1 / 5}})){
                        back()
                        waitRandomTime(4)
                    }
                    break
                case 1:
                    if(!findAndClick(className("android\.widget\.(Button|ImageView)"),
                    {fixed:true, bounds:{right:device.width * 2 / 5, bottom:device.height * 1 / 5}})){
                        back()
                        waitRandomTime(4)
                    }
                    break
            }
        }
    }
}

/**
 * @description 关闭任意带有叉叉的弹窗,基于视觉处理
 * @returns true: 关闭成功, false: 未发现控件
 */
export function closeByImageMatching(filter?: boolean): boolean {
    const img = getScreenImage()
    const threshold = 0.7
    //需要从网络远程获取
    const tmp = images.read('/sdcard/exit.png')
    if(img != null && tmp != null) {
        //灰度化
        const grayImg = images.cvtColor(img, "BGR2GRAY")
        img.recycle()
        const grayTmp = images.cvtColor(tmp, "BGR2GRAY")
        tmp.recycle()
        //反转 黑色按钮
        const grayWhiteTmp = images.adaptiveThreshold(grayTmp, 255, "GAUSSIAN_C", "BINARY", 9, 0)
        const grayInvTmp = images.adaptiveThreshold(grayTmp, 255, "GAUSSIAN_C", "BINARY_INV", 9, 0)
        grayTmp.recycle()
        //阈值化
        const adaptiveImg = images.adaptiveThreshold(grayImg, 255, "GAUSSIAN_C", "BINARY", 25, 0)
        grayImg.recycle()
        // adaptiveImg.saveTo("/sdcard/result.jpg")
        // app.viewFile("/sdcard/result.jpg")
        
        //验证图片
        let list:Point[] = []        
        for(let i = 50; i>=20; i-=5){
            const white = images.resize(grayWhiteTmp, i)
            const black = images.resize(grayInvTmp, i)
            const match1 = images.matchTemplate(adaptiveImg, white, {
                threshold: threshold,
            })
            white.recycle()
            const match2 = images.matchTemplate(adaptiveImg, black, {
                threshold: threshold,
            })
            black.recycle()
            const combine:Point[] = match1.points.concat(match2.points)
            for(let point of combine){
                point.x += i/2
                point.y += i/2
            }
            list.push(...combine)
        }
        grayInvTmp.recycle()
        grayWhiteTmp.recycle()
        adaptiveImg.recycle()
        if(list != null){
            const point = findPreferredCloseButton(list, filter)
            if(point != null){
                Record.debug(`close(${point.x},${point.y})`)
                normalClick(point.x, point.y)
                return true
            }
        }
    }
    img.recycle()
    return false
}
export function findPreferredCloseButton(list:Point[], filter?:boolean){
    //距离原点排序
    const sortedCoordinates = list.slice().sort((a, b) => {
        const distanceA = calculateDistance(a, {x:0,y:0});
        const distanceB = calculateDistance(b, {x:0,y:0});
        return distanceA - distanceB;
    });
    // for(let t of sortedCoordinates){
    //     log(t)
    // }
    let firstCoordinate = {x:0, y:0}
    for(let i = 0;i<sortedCoordinates.length; i++){
        if(calculateDistance(firstCoordinate, sortedCoordinates[i]) > 3){
            firstCoordinate = sortedCoordinates[i]
            if(filter){
                const component = boundsInside(firstCoordinate.x - 100, firstCoordinate.y - 100, firstCoordinate.x + 100, firstCoordinate.y + 100).findOnce()
                //筛选控件
                if(firstCoordinate.y > device.height / 5
                && !(component != null && component.text() === "")){
                    sortedCoordinates.splice(i)
                    i--
                }
            }
        } else {
            sortedCoordinates.splice(i)
            i--
        }
    }
    sortedCoordinates.sort((a, b) => {
        const {priority: priorityA, distance: distanceA} = calculatePriority(a);
        const {priority: priorityB, distance: distanceB} = calculatePriority(b);
        if (priorityA === priorityB) {
            return distanceA - distanceB;
        }
        return priorityA - priorityB;
    })
    return sortedCoordinates.length > 0 ? sortedCoordinates[0] : null;
}
// 辅助函数，用于计算两点之间的距离
export function calculateDistance(pointA: Point, pointB: Point): number {
    const xDiff = pointA.x - pointB.x;
    const yDiff = pointA.y - pointB.y;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
}
// 辅助函数，用于计算匹配项的优先级
export function calculatePriority(point: Point) {
    const centerX = device.width/2
    const centerY = device.height/2
    const leftPriority = random(1,2)
    const rightPriority = 3 - leftPriority
    if(point.x < centerX && point.y < centerY){
        return {priority:leftPriority, distance:calculateDistance(point, {x:0, y:0})}
    } else if(point.x > centerX && point.y < centerY){
        return {priority:rightPriority, distance:calculateDistance(point, {x:centerX, y:centerY})}
    } else{
        return {priority:3, distance:Math.abs(point.x - centerX)}
    }
}

/**
 * @description 将时间分片执行
 * @param totalTime 总时间
 * @param func 执行流程
 */
export function doFuncAtGivenTime(totalTime: number, maxTime: number, func:(perTime: number) => void): void {
    // let extraTime = 0
    while(totalTime >= 0) {
        const startTime = new Date()
        let timeParameter = Math.min(maxTime, totalTime)
        // func(timeParameter - extraTime > 0 ? timeParameter - extraTime : 0)
        func(timeParameter)
        const endTime = new Date()
        const executeTime = (endTime.getTime() - startTime.getTime())/1000
        totalTime -= executeTime
        // extraTime = executeTime - timeParameter
    }
}

export function doFuncAtGivenTimeByEstimate(totalTime: number, func:() => void){
    while(totalTime >= 0){
        const startTime = new Date();
        func()
        const endTime = new Date();
        const executeTime = (endTime.getTime() - startTime.getTime())/1000
        //执行时间小于10秒直接退出
        if(executeTime < 10){
            break
        }
        totalTime -= executeTime
    }
}

export function matchAndJudge(str: string|undefined){
    Record.debug(`${str}`)
    if(str){
        str = str.replace(/\d+:\d+/, "x")
        //匹配14，14秒，14s
        const time = str.match(/[0-9]+[s秒]?/)
        const swipe = str.match(/(滑动)?浏览/)
        if(time) {
            let totalTime = parseInt(time[0], 10)
            if(totalTime > 50 || totalTime < 1){
                totalTime = 1
            }
            if(swipe){
                Record.log("滑动浏览广告")
                moveDown(totalTime, 4)
            } else {
                return totalTime
            }
        }
    }
    return 1
}

/**
 * @description 基于视觉识别 判断方法前后页面是否变化
 * @returns true:图片不一致, 代表操作成功, false:图片一致代表操作失败
 */
export function judgeFuncIsWorkByImg(func: ()=>void, bounds:Bounds){
    const before = getScreenImage(bounds)
    func()
    const after = getScreenImage(bounds)
    const compare = findImage(before, after, {
        threshold: 1
    });
    before.recycle()
    after.recycle()
    if (compare) {
        Record.debug("操作失效")
        return false
    } else {
        Record.debug("操作生效")
        return true
    }
}

export function randomExecute(methods:(()=> void)[]){
    // 随机打乱数组顺序
    for (let i = methods.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [methods[i], methods[j]] = [methods[j], methods[i]];
    }

    // 依次执行打乱后的方法
    methods.forEach((method) => {
        method();
    });
}

export function getGrayscaleHistogram(img:Image, rate:number = 4){
    var grayHistogram:number[] = [];
    for (var i = 0; i < 256; i++) {
        grayHistogram[i] = 0;
    }
    for (var y = 0; y < img.getHeight(); y+=rate) {
        for (var x = 0; x < img.getWidth(); x+=rate) {
            // 获取当前像素的颜色值
            var color = img.pixel(x, y);
            // 计算灰度值
            var grayValue = (colors.red(color) + colors.green(color) + colors.blue(color)) / 3;
            // 更新灰度直方图
            grayHistogram[Math.floor(grayValue)]++;
        }
    }
    img.recycle()
    return grayHistogram
}

export function findLargestIndexes(arr: number[], count: number): number[] {
    if (count <= 0) {
        throw new Error("返回长度必须大于等于1");
    }

    if (count > arr.length) {
        throw new Error("返回长度不能大于数组长度");
    }

    const indexes: number[] = [];

    for (let i = 0; i < count; i++) {
        let maxIndex = 0;
        for (let j = 1; j < arr.length; j++) {
            if (arr[j] > arr[maxIndex]) {
                maxIndex = j;
            }
        }
        indexes.push(maxIndex);
        arr[maxIndex] = Number.MIN_SAFE_INTEGER; // 将已找到的最大值标记为最小值，避免重复找到
    }

    return indexes;
}

export function myBoundsContains(mainBounds: Bounds, testBounds: Bounds){
    // 默认值
    const {
        left: mainLeft = 0,
        top: mainTop = 0,
        right: mainRight = device.width,
        bottom: mainBottom = device.height,
    } = mainBounds;

    const {
        left: testLeft = 0,
        top: testTop = 0,
        right: testRight = device.width,
        bottom: testBottom = device.height,
    } = testBounds;
    // 判断 testBounds 是否在 mainBounds 内部
    return (
        testLeft >= mainLeft &&
        testTop >= mainTop &&
        testRight <= mainRight &&
        testBottom <= mainBottom
    );
}

export function mergeHistogram(hist: number[]): number[] {
    const mergedHistogram: number[] = [];
    for (let i = 0; i < hist.length; i += 16) {
        // 计算当前区间的累加和
        const sum = hist.slice(i, i + 16).reduce((acc, val) => acc + val, 0);        

        // 将累加和放在下标为7的位置上
        for (let j = 0; j < 7; j++) {
            mergedHistogram.push(0);
        }
        mergedHistogram.push(sum);
        for (let j = 0; j < 8; j++) {
            mergedHistogram.push(0);
        }
    }

    return mergedHistogram;
}

export function levenshteinDistance(str1: string, str2: string): number {
    const len1 = str1.length;
    const len2 = str2.length;

    const dp: number[][] = [];

    for (let i = 0; i <= len1; i++) {
        dp[i] = [];
        for (let j = 0; j <= len2; j++) {
            if (i === 0) {
                dp[i][j] = j;
            } else if (j === 0) {
                dp[i][j] = i;
            } else {
                const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
                dp[i][j] = Math.min(
                    dp[i - 1][j] + 1, // Deletion
                    dp[i][j - 1] + 1, // Insertion
                    dp[i - 1][j - 1] + cost // Substitution
                );
            }
        }
    }

    const maxLen = Math.max(len1, len2);
    return 1 - dp[len1][len2] / maxLen; // Normalizing the distance to similarity
}

export function recognizeTextByLeftToRight(img: Image){
    const res = ocr.recognize(img)
    img.recycle()
    const list = res.results.sort((a, b)=>
        a.bounds.left - b.bounds.left
    )
    return list.map(obj => obj.text).join("")
}

export function getNumFromComponent(str:string){
    const match = str.match("[0-9]+")
    if(match){
        const time = parseInt(match[0])
        return time
    }
    return 0
}

export function executeDynamicLoop(loopCount: number, loopBody: () => void): void {
    for (let i = 0; i < loopCount; i++) {
      loopBody();
    }
}

export function getGrayscale(img:Image, rate:number = 4){
    let sum = 0
    let gray = 0
    for (var y = 0; y < img.getHeight(); y+=rate) {
        for (var x = 0; x < img.getWidth(); x+=rate) {
            // 获取当前像素的颜色值
            var color = img.pixel(x, y);
            if(isGray(colors.red(color), colors.green(color), colors.blue(color))){
                gray++
            }
            sum++
        }
    }
    img.recycle()
    Record.debug(`灰度值${(gray/sum).toFixed(2)}`)
    return gray/sum
}

function isGray(r: number, g: number, b: number): boolean {
    
    const brightnessThreshold = 150; // 亮度阈值，根据实际情况调整
    const contrastThreshold = 150;   // 对比度阈值，根据实际情况调整

    const brightness = (r + g + b) / 3;
    const contrast = Math.max(r, g, b) - Math.min(r, g, b);

    return brightness <= brightnessThreshold && contrast <= contrastThreshold;
}