import { ParseResult } from "@babel/core";
import { Rule } from "./rules";

export interface transformOptions {
  rule: Rule;
  parse: (code: string) => ParseResult;
  isJsInVue?: boolean;
  filePath?: string;
}
