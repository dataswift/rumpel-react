export const flattenObject = (ob: any) => {
  let toReturn = {};

  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;

    if (typeof ob[i] == 'object' && ob[i] !== null) {
      let flatObject = flattenObject(ob[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        // @ts-ignore
        toReturn[i + ':' + x] = flatObject[x];
      }
    } else {
      // @ts-ignore
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
};
