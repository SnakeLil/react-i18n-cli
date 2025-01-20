import { Config } from "../types/config";
import { Rule } from "../types/rules";
import fs from "fs-extra";
import path from "path";
import prettier from "prettier";
import { getAbsolutePath } from "../utils/path";
import inquirer from "inquirer";
import storage from "../state/state";
import log from "../utils/log";
import { serializeCode } from "../utils/serializeCode";

export const defaultConfigName = "i18n-cli.config.js";
export const defaultConfigPath = getAbsolutePath(
  path.resolve(process.cwd(), defaultConfigName)
);

const writeDefaultConfigFile = async (path?: string) => {
  const serializeConfig = await serializeCode(config);
  const formattedConfig = await prettier.format(serializeConfig, {
    semi: false,
    singleQuote: true,
    parser: "babel",
  });
  const filePath = path || defaultConfigPath;
  fs.ensureFileSync(filePath);
  fs.writeFileSync(filePath, formattedConfig);
  if (fs.existsSync(path || defaultConfigPath)) {
    log.success(`配置文件创建成功`);
  }
};
export const writeDefaultConfig = async () => {
  if (fs.existsSync(defaultConfigPath)) {
    const answers = await inquirer.prompt([
      {
        type: "confirm",
        name: "deleteOriginal",
        message: `检测到文件夹中包含 ${defaultConfigName} 文件，是否删除原始文件`,
        default: false,
      },
    ]);
    if (answers.deleteOriginal) {
      // 删除源文件并替代
      fs.rmSync(defaultConfigPath)
      storage.setConfigFileName(defaultConfigName);
      writeDefaultConfigFile();
    } else {
      // const answers = await inquirer.prompt([
      //   {
      //     type: "input",
      //     name: "configName",
      //     message: `不删除原始文件，请输入新的配置文件名`,
      //     default: `new.${defaultConfigName}`,
      //     required: true,
      //     validate(configName) {
      //       const filePath = getAbsolutePath(
      //         path.resolve(process.cwd(), configName)
      //       );
      //       if (!filePath.endsWith("js")) {
      //         return "必须是js文件";
      //       }
      //       if (fs.existsSync(filePath)) {
      //         return "文件已经存在，请重新输入";
      //       }
      //       return true;
      //     },
      //   },
      // ]);
      // writeDefaultConfigFile(answers.configName);
      // storage.setConfigFileName(answers.configName);
    }
  } else {
    writeDefaultConfigFile();
  }
};

function getCommonRule(): Rule {
  return {
    caller: "",
    functionName: "t",
    customizeKey: (key, path) => key,
    customSlot: (slotValue) => `{{${slotValue}}}`,
    importDeclaration: 'import { t } from "i18n"',
  };
}

const config: Config = {
  input: "src",
  output: "",
  exclude: ["**/node_modules/**/*"],
  rules: {
    js: getCommonRule(),
    ts: getCommonRule(),
    cjs: getCommonRule(),
    mjs: getCommonRule(),
    jsx: {
      ...getCommonRule(),
      functionSnippets: "",
    },
    tsx: {
      ...getCommonRule(),
      functionSnippets: "",
    },
  },
  prettier: {
    semi: false,
    singleQuote: true,
  },
  incremental: true,
  skipExtract: false,
  localePath: "./locales/zh-CN.json",
  localeFileType: "json",
  excelPath: "./locales.xlsx",
  exportExcel: false,
  skipTranslate: false,
  locales: ["en-US"],
};

export default config;
