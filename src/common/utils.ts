import { Point } from "images";
import { DEVICE_HEIGHT, DEVICE_WIDTH, MAX_CYCLES_COUNTS, NORMAL_WAIT_TIME, PACKAGE_HAMIBOT, characterMapping } from "../global";
import { Record } from "../lib/logger";
import { findAndClick } from './click';
import { Move } from "./enums";
import { Bounds, ClosePoint, Priority } from './interfaces';
import { closeByImageMatching } from "./ocr";

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
    return result
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
        waitRandomTime(NORMAL_WAIT_TIME)
        if(recents()){
            waitRandomTime(NORMAL_WAIT_TIME)
            if(!findAndClick(idContains("clear"), {
                fixed:true,
                disableCoverCheck:true,
                disableGrayCheck:true
            })){
                findAndClick(descContains("清除"), {
                    fixed:true,
                    disableCoverCheck:true,
                    disableGrayCheck:true
                })
            }
            waitRandomTime(NORMAL_WAIT_TIME)
            launchPackage(PACKAGE_HAMIBOT)
            waitRandomTime(NORMAL_WAIT_TIME)
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
    const minutes = Math.ceil(seconds / 60); // 使用 Math.floor() 函数向下取整
    return minutes
}

/**
 * @description 关闭广告方法
 * @param times 1:右上角图标 2:左上角图标 0:图像识别
 */
export function close(){
    const times = random(0,1)
    if(!closeByImageMatching(true)){
        if(!findAndClick(idContains("close"), {
            disableCoverCheck:true,
            bounds:{bottom:device.height/5},
            fixed:true,
            waitFor:-1})){
            switch(times){
                case 0://|FrameLayout
                    if(!findAndClick(classNameMatches("android\.widget\.(ImageView|Button)"),{
                        waitFor: -1,
                        fixed:true, 
                        bounds:{left:device.width * 3 / 5, bottom:device.height / 5},
                        disableCoverCheck:true,
                        disableGrayCheck:true
                    })){
                        back()
                    }
                    break
                case 1:
                    if(!findAndClick(className("android\.widget\.(Button|ImageView)"),{
                        waitFor: -1,
                        fixed:true, 
                        bounds:{right:device.width * 2 / 5, bottom:device.height / 5},
                        disableCoverCheck:true,
                        disableGrayCheck:true
                    })){
                        back()
                    }
                    break
            }
        }
    }
}

export function distincList(list:Point[], filter?:boolean){
    //距离原点排序
    list.slice().sort((a, b) => {
        const distanceA = calculateDistance(a, {x:0,y:0});
        const distanceB = calculateDistance(b, {x:0,y:0});
        return distanceA - distanceB;
    })
    // for(let t of sortedCoordinates){
    //     log(t)
    // }
    let firstCoordinate = {x:0, y:0}
    for(let i = 0;i<list.length; i++){
        if(calculateDistance(firstCoordinate, list[i]) > 3){
            firstCoordinate = list[i]
            if(filter){
                const component = boundsInside(firstCoordinate.x - 100, firstCoordinate.y - 100, firstCoordinate.x + 100, firstCoordinate.y + 100).findOnce()
                //筛选控件
                if(firstCoordinate.y > device.height / 5
                && !(component != null && component.text() === "")){
                    list.splice(i)
                    i--
                }
            }
        } else {
            list.splice(i)
            i--
        }
    }
}

export function findPreferredCloseButton(list:ClosePoint[]){
    list.sort((a, b) => {
        if(Math.abs(a.grayScale - b.grayScale) < 0.01){
            const {priority: priorityA, distance: distanceA} = calculatePriority(a.point);
            const {priority: priorityB, distance: distanceB} = calculatePriority(b.point);
            if (priorityA === priorityB) {
                return distanceA - distanceB;
            }
            return priorityA - priorityB;
        }
        return a.grayScale - b.grayScale
    })
    return list.length > 0 ? list[0].point : null;
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
    const rightPriority = 3
    const middlePriority = 3 - leftPriority
    if(point.x < centerX && point.y < centerY){
        return {priority:leftPriority, distance:calculateDistance(point, {x:0, y:0})}
    } else if(point.x > centerX && point.y < centerY){
        return {priority:rightPriority, distance:calculateDistance(point, {x:centerX, y:centerY})}
    } else{
        return {priority:middlePriority, distance:Math.abs(point.x - centerX)}
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
export function executeDynamicLoop2(loopCondition: ()=>boolean, loopBody:()=>void){
    let cycleCounts = 0
    while(++cycleCounts < MAX_CYCLES_COUNTS
        && loopCondition()
        ){
        loopBody()
    }
}

export function padZero(num: number): string {
    return num < 10 ? `0${num}` : num.toString();
}

export function convertMinutesToSeconds(str:string){
    const time = str.split(":")
    let result:number
    if(time.length === 3){
        result = parseInt(time[0])*60*60+parseInt(time[1])*60+parseInt(time[2])
    } else {
        result = parseInt(time[0])*60+parseInt(time[1])
    }
    if(result > 3 * 60){
        return 0
    }
    return result
}

export function replaceCharacters(input: string): string {
    let result = input
  
    for (const correctCharacter in characterMapping) {
      if (characterMapping.hasOwnProperty(correctCharacter)) {
        const errorCharacters = characterMapping[correctCharacter].join('|');
        const pattern = new RegExp(correctCharacter, 'g');
        result = result.replace(pattern, `(${errorCharacters})`);
      }
    }
    return result;
}

export function removeNonChineseCharsFromEdges(input: string): string {
    // 匹配首尾非汉字字符的正则表达式
    // const nonChineseEdgesRegex = /^([^\u4e00-\u9fa5]+)(.*?)([^\u4e00-\u9fa5]+)$/;
  
    // // 去除首尾非汉字字符
    // const result = input.replace(nonChineseEdgesRegex, '$2');
    // 进一步去除中文符号
    const chineseSymbolRegex = /[，。、；‘’：“”【】『』《》（）！？]/g;
    return input.replace(chineseSymbolRegex, '');
}

export function boundsScreenInsideCheck(bounds:Rect){
    if(bounds.height() > 1 && bounds.width() > 1 
    && bounds.left >= 0 && bounds.left <= device.width
    && bounds.right >= 0 && bounds.right <= device.width
    && bounds.top >= 0 && bounds.top <= device.height
    && bounds.bottom >= 0 && bounds.bottom <= device.height
    ){
        return true
    }
    return false
}