import { Options } from "prettier"
import { Rule } from "./rules"

export type PrettierConfig = Options | boolean

export type StringObject = {
    [key: string]: string | StringObject
  }
  

export type Config = {
    input: string
    output: string
    localePath: string
    localeFileType: string
    locales: string[]
    exclude: string[]
    rules: {
      js: Rule
      ts: Rule
      cjs: Rule
      mjs: Rule
      tsx: Rule & {
        functionSnippets: string
      }
      jsx: Rule & {
        functionSnippets: string
      }
    }
    prettier: PrettierConfig
    skipExtract: boolean
    skipTranslate: boolean
    incremental: boolean
    excelPath: string
    exportExcel: boolean
  } 