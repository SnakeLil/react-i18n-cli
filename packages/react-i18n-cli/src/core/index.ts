import config from "../config";
import log from "../utils/log";
import { getAbsolutePath } from "../utils/path";
import fs from "fs-extra";
import path from "path";
import { globSync } from "glob";
import cliProgress from "cli-progress";
import { getChalk } from "../utils/chalk";
import { FileExt } from "../types/file";
import { transformCode } from "./transform";

function isValidInput(input: string): boolean {
  const inputPath = getAbsolutePath(process.cwd(), input);

  if (!fs.existsSync(inputPath)) {
    log.error(`路径${inputPath}不存在,请重新设置input参数`);
    process.exit(1);
  }
  if (!fs.statSync(inputPath).isDirectory()) {
    log.error(`路径${inputPath}不是一个目录,请重新设置input参数`);
    process.exit(1);
  }
  return true;
}

function getSourceFilePaths(input: string, exclude: string[]): string[] {
  if (isValidInput(input)) {
    return globSync(`${input}/**/*.{cjs,mjs,js,ts,tsx,jsx,mts}`, {
      ignore: exclude,
    });
  } else {
    return [];
  }
}
export const executeMain = async () => {
  const {
    exclude,
    input,
    localePath,
    locales,
    output,
    prettier,
    rules,
    skipTranslate,
  } = config;
  const sourceFilePaths = getSourceFilePaths(input, exclude);
  console.log("提取到以下文件:");
  console.log(sourceFilePaths);
  const chalk = await getChalk();
  const progress = new cliProgress.SingleBar(
    {
      format: `${chalk.cyan("Progress:")} [{bar}] {percentage}% {value}/{total}`,
    },
    cliProgress.Presets.shades_classic
  );
  progress.start(sourceFilePaths.length, 0);
  sourceFilePaths.forEach((filePath) => {
    const fileCode = fs.readFileSync(filePath, "utf8");
    if (!fileCode || fileCode.trim() === "") {
      progress.increment(1);
      return;
    }
    // 文件名后缀
    const ext = path.extname(filePath).replace(".", "") as FileExt;
    transformCode(filePath, fileCode, ext);
    progress.increment(1);
    // rules ext filePath fileCode
  });
  progress.stop();
  log.success("文件转换完成");
  process.exit(1);
};
