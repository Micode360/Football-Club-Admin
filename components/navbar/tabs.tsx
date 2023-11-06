import React, { useState } from "react";

interface TabsProperties {
  headers: Array<string>;
  components: Array<React.ReactNode>;
}

export default function Tabs({ headers, components }: TabsProperties) {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <section>
      <div className="border-b-2 border-[#E6E6E6] pb-2">
        {headers.map((header, id) => (
          <span
            onClick={() => setTabIndex(id)}
            key={id}
            className={`${
              tabIndex === id &&
              "border-b-4 border-custom_orange rounded-b-sm text-base leading-6"
            } pb-2 px-5 cursor-pointer`}
          >
            {header}
          </span>
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
