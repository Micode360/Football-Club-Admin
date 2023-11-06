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

export const LogOut = () => {
  console.log("Log out function keeps running");
  cookies.remove("asstkn");
  return window.location.href = "/signin";
}


export const toDate = (timestamp:number) => {
    const isoTimestamp = timestamp;
    const date = new Date(isoTimestamp);
    const params:any = { day: 'numeric', month: 'long', year: 'numeric' };
    const  dateFormat = date.toLocaleDateString('en-US', params).replace(/\b(\d{1,2})(th|nd|rd|st)\b/g, '$1');
    return dateFormat;
}



