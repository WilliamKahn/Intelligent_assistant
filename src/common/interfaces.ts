import { Point } from "images"

export interface Bounds{
    left?: number
    top?: number
    right? :number
    bottom?: number
}

export type FindAndClickOptions = ScrollToOptions & RandomClickOptions & {
    //是否持续点击
    clickUntilGone?: boolean
    //点击阈值(高于阈值不点击)
    selectedThreshold?:number
}

export type RandomClickOptions = NormalClickOptions & {
    //点击是否改变
    check?: boolean,
}

export type ScrollToOptions = SearchOptions & {
    //遮挡范围系数
    coverBoundsScaling?:number
}

export type SearchOptions = SearchByLeftRangeOptions & {
    //是否启动ocr
    ocrRecognize?: boolean
}

export type SearchByLeftRangeOptions = SearchByUiSelectOptions & {
    leftRange?: string|UiSelector
}

export type SearchByUiSelectOptions = SearchByOcrRecognizeOptions & {
    //是否需要滑动
    fixed?:boolean,
    //延迟等待
    waitFor?:boolean
}

export interface SearchByOcrRecognizeOptions{
    //相对位置
    index?:number
    //ocr识别边界
    bounds?:Bounds
}

export interface NormalClickOptions{
    //点击后等待时间
    waitTimes?: number
    //点击反馈文字
    feedback?: boolean
}