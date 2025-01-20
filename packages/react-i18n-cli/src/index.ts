import { program } from "commander";
import log from "./utils/log";
import { defaultConfigPath, writeDefaultConfig } from "./config";
import fs from "fs-extra";
import { getChalk } from "./utils/chalk";
import { executeMain } from "./core";
// program
//   .version(`${process.env.PACKAGE_NAME} ${process.env.PACKAGE_VERSION}`)
//   .usage('[command] [options]')
// program.parse(process.argv)

program.command("init").action(async () => {
  log.warning("start init config file...");
  await writeDefaultConfig();
  process.exit(1);
});

program.action(async (options) => {
  if (!fs.existsSync(defaultConfigPath)) {
    const chalk = await getChalk();
    console.log(
      `${chalk.cyan("没有查询到配置文件,请执行")} ${chalk.bgWhite.red("react-i18n-cli init")} ${chalk.cyan("来创建配置文件")}`
    );
    process.exit(1);
  } else {
    console.log("开始扫描文件");
    executeMain();
  }
  // execCommand(options)
});

program.parse(process.argv);
