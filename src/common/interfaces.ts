import { Point } from "images"

export interface Bounds{
    left?: number
    top?: number
    right? :number
    bottom?: number
}

export interface ComponentBounds{
    left: number
    top: number
    right :number
    bottom: number
}

export type FontCharacterMap = {
    [correctCharacter: string]: string[];
}

export interface ClosePoint{
    point: Point
    grayScale: number
}

export interface FuncIncome{
    index: string,
    funcName: string,
    income: number
}
export interface Priority{
    middle: number,
    right: number,
    left: number
}

export interface Component{
    text: string,
    bounds: ComponentBounds
}
export type FindByOcrAndClickOptions = SearchByOcrRecognizeOptions & RandomClickOptions

export type FindAndClickOptions = ScrollToOptions & RandomClickOptions

export type RandomClickOptions = NormalClickOptions & {
    //点击阈值(高于阈值不点击)
    selectedThreshold?:number
    //灰度判断比例
    grayscaleRatio?:number
    disableGrayCheck?:boolean
}

export type ScrollToOptions = SearchByUiSelectOptions & CoverCheckOptions & {
    disableCoverCheck?:boolean
}

export interface CoverCheckOptions {
    //遮挡范围系数
    coverBoundsScaling?: number
    leftToRight?: boolean
    threshold?: number
}

export type SearchByUiSelectOptions = SearchByOcrRecognizeOptions & {
    //是否需要滑动
    fixed?:boolean,
    method?:(selector:UiSelector) => void
}

export interface SearchByOcrRecognizeOptions{
    //延迟等待
    waitFor?:number,
    throwErrIfNotExist?:boolean
    //相对位置
    index?:number
    //ocr识别边界
    bounds?:Bounds
}

export interface NormalClickOptions{
    tips?: string
    //点击后等待时间
    waitTimes?: number
    //点击反馈文字
    feedback?: boolean
}