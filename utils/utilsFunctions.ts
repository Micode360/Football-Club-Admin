import Cookies from "universal-cookie";
let cookies = new Cookies();

export const formattedNumber = (num: number): string => {
  if (Math.abs(num) >= 1e6) {
    return `${(Math.sign(num) * (Math.abs(num) / 1e6)).toFixed(1)}M`;
  } else if (Math.abs(num) >= 1e3) {
    return `${(Math.sign(num) * (Math.abs(num) / 1e3)).toFixed(1)}k`;
  } else {
    return num.toString();
  }
};

export const storeToken = (name: string, token: string, maxAge: number) => {
  return cookies.set(name, token, {
    maxAge,
  });
};

export const getToken = (name: string) => cookies.get(name);

export const removeToken = (name: string) => cookies.remove(name);



