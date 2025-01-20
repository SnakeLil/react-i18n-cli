import config from "../config";
import log from "../utils/log";
import { getAbsolutePath } from "../utils/path";
import fs from "fs-extra";
import path from "path";
import { globSync } from "glob";
import cliProgress from "cli-progress";
import { getChalk } from "../utils/chalk";
import { FileExt } from "../types/file";

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
    if(!fileCode || fileCode.trim() === '') {
        progress.increment()
        return
    }
    // 文件名后缀
    const ext = path.extname(filePath).replace(".", "") as FileExt;
    console.log(`提取转换文件: ${filePath}`);
    // rules ext filePath fileCode
  });
};
