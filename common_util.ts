export const log = (arg: any) => {
  console.dir(arg, { depth: null });
  //   console.log(args)
};
export const start = async (title: string, func: () => void) => {
  console.log();
  console.log("###", title, "###");
  try {
    await func();
  } catch (err) {
    log(err);
  }
};
