import { getChalk } from "./chalk";


const log = {
  info: async (msg: string) => {
    const chalk = await getChalk();
    console.log('\n' + chalk.cyan(msg));
  },
  warning: async (msg: string) => {
    const chalk = await getChalk();
    console.log('\n' + chalk.yellow(msg));
  },
  success: async (msg: string) => {
    const chalk = await getChalk();
    console.log('\n' + chalk.green(msg));
  },
  error: async (msg1: unknown, msg2: unknown = '') => {
    const chalk = await getChalk();
    console.log('\n' + chalk.red(msg1), chalk.red(msg2));
  },
  verbose: async (label: string, msg: unknown = '') => {
    if (process.env.CLI_VERBOSE) {
      const chalk = await getChalk();
      console.log('\n' + chalk.gray(label), msg);
    }
  },
  debug: async (label: string, msg: unknown = '') => {
    if (process.env.CLI_DEBUG) {
      const chalk = await getChalk();
      console.log('\n' + chalk.magenta(label), msg);
    }
  },
};

export default log;

// ... existing code ...