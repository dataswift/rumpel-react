export const unixTimeToEndOfDay = (unxTime: number | string): number => {
  let unxTimeVal = ((typeof unxTime === 'string') ? parseInt(unxTime) : unxTime) * 1000;
  return new Date(unxTimeVal).setHours(23, 59, 59, 1000) / 1000;
};