export type LiteralUnion<T extends U, U=string> = T | (U & {neverKey?:never}) // 单词枚举联合类型,如果是u&{}，我的编辑器会把后者识别成string,导致整体识别成string
export type SizeType = "small" | "middle" | "large" | undefined
export type InputStatus = "" | "warning" | "error"