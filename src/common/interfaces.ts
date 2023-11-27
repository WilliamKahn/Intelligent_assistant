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
    //是否点击过
    selected?:boolean
}

export type RandomClickOptions = NormalClickOptions & {
    //点击是否改变
    check?: boolean,
}

export type ScrollToOptions = SearchOptions & {
    //是否需要滑动
    fixed?:boolean,
    //是否需要遮挡校验
    cover?:boolean
}

export type SearchOptions = SearchByLeftRangeOptions & {
    //是否启动ocr
    ocrRecognize?: boolean
}

export type SearchByLeftRangeOptions = SearchByUiSelectOptions & {
    leftRange?: string
}

export type SearchByUiSelectOptions = SearchByOcrRecognizeOptions & {
    //延迟等待
    waitFor?:boolean
}

export interface SearchByOcrRecognizeOptions{
    //相对位置
    position?:number|Point
    //ocr识别边界
    bounds?:Bounds
}

export interface NormalClickOptions{
    //点击后等待时间
    waitTimes?: number
    //点击反馈文字
    feedback?: boolean
}