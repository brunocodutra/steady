export const pretty = (x: number, d = 3): string => {
  const f = d - 1 - Math.min(Math.max(Math.floor(Math.log10(Math.abs(x))), 0), d - 1);
  const k = ((x < 0) ? -1 : 1) * 10 ** f;
  return (Math.floor(x * k) / k).toFixed(f);
};
