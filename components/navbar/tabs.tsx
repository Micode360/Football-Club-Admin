import React, { useState, useEffect } from "react";
import Link from "next/link";

interface TabsProperties {
  headers: Array<string>;
  components: Array<React.ReactNode>;
  tab?: string;
}

export default function Tabs({ headers, components, tab }: TabsProperties) {
  let tabIndex = Number(tab);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.pathname.split("/")[1]);
  }, []);


  return (
    <section>
      <div className="border-b-2 border-[#E6E6E6] pb-2">
        {headers.map((header, id) => (
          <Link
            href={{
              pathname: `/${url}`,
              query: {
                tab: `${id}`,
              },
            }}
            key={id}
            className={`${
              tabIndex === id &&
              "border-b-4 border-custom_orange rounded-b-sm text-base leading-6"
            } pb-2 px-5 cursor-pointer`}
          >
            {header}
          </Link>
        ))}
      </div>
      <div>
        {components.map((component, id) => (
          <div key={id}>{tabIndex === id && component}</div>
        ))}
      </div>
    </section>
  );
}
