export const pretty = (x: number, d = 3): string => {
  switch (x) {
    case Infinity:
      return '∞';

    case -Infinity:
      return '-∞';

    default:
      const f = d - 1 - Math.min(Math.max(Math.floor(Math.log10(Math.abs(x))), 0), d - 1);
      const k = ((x < 0) ? -1 : 1) * 10 ** f;
      return (Math.floor(x * k) / k).toFixed(f);
  }
};

export const parse = (s: string): number => {
  const trimmed = s.trim();

  if (
    trimmed.endsWith('e') || trimmed.endsWith('E') ||
    trimmed.endsWith('+') || trimmed.endsWith('-')
  ) {
    return +`${trimmed}0`;
  } else {
    return +trimmed;
  }
};
