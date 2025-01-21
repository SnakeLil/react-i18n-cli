import { FileExt } from "../types/file";
import log from "../utils/log";

const transformJsCode = (filePath: string, fileCode: string) => {
  log.info(`检查文件: ${filePath}`);
};
const transformTsCode = (filePath: string, fileCode: string) => {
  log.info(`检查文件: ${filePath}`);
};
export const transformCode = (
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
    throw new Error(`不支持的文件类型: ${ext}`);
  }
  transformFunction(filePath, fileCode);
};
