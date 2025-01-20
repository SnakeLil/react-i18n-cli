import prettier, { Options } from "prettier";
import serialize from "serialize-javascript";

export async function serializeCode(
  source: unknown,
  prettierConfig?: Options,
  isESModule?: boolean
) {
  const exportStatement = isESModule ? "export default" : "module.exports =";
  const code = `${exportStatement} ${serialize(source, {
    unsafe: true,
  })}
  `;
  const stylizedCode = await prettier.format(
    code,
    prettierConfig || {
      semi: false,
      singleQuote: true,
      parser: "babel",
    }
  );
  return stylizedCode;
}
