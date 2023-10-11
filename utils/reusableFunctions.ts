

export const formattedNumber = (num: number): string => {
    if (Math.abs(num) >= 1e6) {
      return `${(Math.sign(num) * (Math.abs(num) / 1e6)).toFixed(1)}M`;
    } else if (Math.abs(num) >= 1e3) {
      return `${(Math.sign(num) * (Math.abs(num) / 1e3)).toFixed(1)}k`;
    } else {
      return num.toString();
    }
  };