export async function getChalk() {
  const chalkModule = await import("chalk");
  return chalkModule.default;
}
