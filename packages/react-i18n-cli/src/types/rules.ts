import { Config } from "./config";

export type CustomizeKey = (key: string, path?: string) => string;

export type GetCustomSlot = (slotValue: string) => string;

export interface Rule {
  caller: string;
  functionName?: string;
  importDeclaration: string;
  customizeKey: CustomizeKey;
  customSlot: GetCustomSlot;
  // TODO: 可优化成根据范型动态生成规则
  functionSnippets?: string;
  forceImport?: boolean;
  functionNameInTemplate?: string;
  functionNameInScript?: string;
}

export type Rules = {
    [k in keyof Config['rules']]: Config['rules'][k]
  }