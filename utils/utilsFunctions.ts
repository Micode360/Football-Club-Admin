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
  return (window.location.href = "/signin");
};

export const toDate = (timestamp: number) => {
  const isoTimestamp = timestamp;
  const date = new Date(isoTimestamp);
  const params: any = { day: "numeric", month: "long", year: "numeric" };
  const dateFormat = date
    .toLocaleDateString("en-US", params)
    .replace(/\b(\d{1,2})(th|nd|rd|st)\b/g, "$1");
  return dateFormat;
};

export function DaysAgo(date: string) {
  const currentDate = new Date();
  const desiredDate = new Date(date);

  currentDate.setHours(0, 0, 0, 0);
  desiredDate.setHours(0, 0, 0, 0);

  const timeDiff = Math.abs(currentDate.getTime() - desiredDate.getTime());

  const daysAgo = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const weeksAgo = Math.floor(daysAgo / 7);
  const monthsAgo = Math.floor(daysAgo / 30);
  const yearsAgo = Math.floor(daysAgo / 365);

  if (yearsAgo > 0) {
    return `${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago.`;
  } else if (monthsAgo > 0) {
    return `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago.`;
  } else if (weeksAgo > 0) {
    return `${weeksAgo} ${weeksAgo === 1 ? "week" : "weeks"} ago.`;
  } else {
    return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago.`;
  }
}

export const fetchCountry = (setState: any) => {
  fetch("https://restcountries.com/v3.1/all?fields=name,flags")
    .then((response) => response.json())
    .then((data) => {
      let mappingCountry = data.map((item: any) => ({
        imagePath: item.flags.png,
        value: item.name.common,
      }));
      setState(mappingCountry);
    });
};
