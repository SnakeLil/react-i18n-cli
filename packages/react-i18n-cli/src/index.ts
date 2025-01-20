import { program } from "commander";
import log from "./utils/log";
import { writeDefaultConfig } from "./config";
import storage from "./state/state";
import fs from "fs-extra";
import { getChalk } from "./utils/chalk";
// program
//   .version(`${process.env.PACKAGE_NAME} ${process.env.PACKAGE_VERSION}`)
//   .usage('[command] [options]')
// program.parse(process.argv)

program.command("init").action(async () => {
  log.warning("start init config file...");
  await writeDefaultConfig();
});

program.action(async (options) => {
  const configFileName = storage.getConfigFileName();
  if (!fs.existsSync(configFileName)) {
    const chalk = await getChalk();
    console.log(
      `${chalk.cyan("没有查询到配置文件,是否执行")} ${chalk.bgCyan.red("react-i18n-cli init")} ${chalk.cyan("来创建配置文件")}`
    );
  }
  // execCommand(options)
});

program.parse(process.argv);
