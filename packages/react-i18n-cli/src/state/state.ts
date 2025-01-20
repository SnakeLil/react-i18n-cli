// 全局Storage状态管理

import { defaultConfigName } from "../config";

class Storage {
  private configFileName: string = defaultConfigName;

  constructor() {}
  private updateConfigFileName(name) {
    this.configFileName = name;
  }
  public setConfigFileName(name) {
    if (!name) {
      throw new Error("please provide a configFileName");
    }
    this.updateConfigFileName(name);
  }
  public getConfigFileName() {
    return this.configFileName;
  }
}

const storage = new Storage();
export default storage;
