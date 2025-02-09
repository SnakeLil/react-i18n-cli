module.exports = {
  input: 'src',
  output: '',
  exclude: ['**/node_modules/**/*'],
  rules: {
    js: {
      caller: '',
      functionName: 't',
      customizeKey: (key, path) => key,
      customSlot: (slotValue) => `{{${slotValue}}}`,
      importDeclaration: 'import { t } from "i18n"',
    },
    ts: {
      caller: '',
      functionName: 't',
      customizeKey: (key, path) => key,
      customSlot: (slotValue) => `{{${slotValue}}}`,
      importDeclaration: 'import { t } from "i18n"',
    },
    cjs: {
      caller: '',
      functionName: 't',
      customizeKey: (key, path) => key,
      customSlot: (slotValue) => `{{${slotValue}}}`,
      importDeclaration: 'import { t } from "i18n"',
    },
    mjs: {
      caller: '',
      functionName: 't',
      customizeKey: (key, path) => key,
      customSlot: (slotValue) => `{{${slotValue}}}`,
      importDeclaration: 'import { t } from "i18n"',
    },
    jsx: {
      caller: '',
      functionName: 't',
      customizeKey: (key, path) => key,
      customSlot: (slotValue) => `{{${slotValue}}}`,
      importDeclaration: 'import { t } from "i18n"',
      functionSnippets: '',
    },
    tsx: {
      caller: '',
      functionName: 't',
      customizeKey: (key, path) => key,
      customSlot: (slotValue) => `{{${slotValue}}}`,
      importDeclaration: 'import { t } from "i18n"',
      functionSnippets: '',
    },
  },
  prettier: { semi: false, singleQuote: true },
  incremental: true,
  skipExtract: false,
  localePath: './locales/zh-CN.json',
  localeFileType: 'json',
  excelPath: './locales.xlsx',
  exportExcel: false,
  skipTranslate: false,
  locales: ['en-US'],
}
