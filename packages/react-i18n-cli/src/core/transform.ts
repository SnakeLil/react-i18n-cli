import { FileExt } from "../types/file";
import log from "../utils/log";
import * as babel from "@babel/core";
import presetEnv from "@babel/preset-env";
import presetReact from "@babel/preset-react";
import presetTypescript from "@babel/preset-typescript";
import path from "path";
const transformJsCode = (filePath: string, fileCode: string) => {
  log.info(`检查文件: ${filePath}`);
};
const transformTsCode = async (filePath: string, fileCode: string) => {
  console.log(path.basename(filePath))
  const result = await babel.transformAsync(fileCode, {
    filename: path.basename(filePath),
    ast: true,
    presets: [presetEnv, presetReact, presetTypescript],
  });
  if (result) {
    // console.log(result.ast);
  }
};
export const transformCode = async (
  filePath: string,
  fileCode: string,
  ext: FileExt
) => {
  const transformFunctionMap = {
    [FileExt.JS]: transformJsCode,
    [FileExt.TS]: transformTsCode,
  };
  const transformFunction = transformFunctionMap[ext];
  if (!transformFunction) {
    return;
  }
  await transformFunction(filePath, fileCode);
};
