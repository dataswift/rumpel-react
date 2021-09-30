export const flattenObject = (ob: any) => {
  const toReturn = {};

  for (const i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] === 'object' && ob[i] !== null) {
      const flatObject = flattenObject(ob[i]);
      for (const x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        // @ts-ignore
        toReturn[`${i}:${x}`] = flatObject[x];
      }
    } else {
      // @ts-ignore
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};
