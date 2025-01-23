export type CustomizeKey = (key: string, path?: string) => string;
export type StringObject = {
  [key: string]: string | StringObject;
};

export type AdjustKeyMap = (
  allKeyValue: StringObject,
  currentPathKeyValue: Record<string, string>,
  path
) => StringObject;
