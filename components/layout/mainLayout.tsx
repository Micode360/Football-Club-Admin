"use client";
import React, { ReactNode, createContext, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../graphQL/clientSetUp";

interface mainLayoutProperties {
  children: ReactNode;
}

interface MyContextProps {
  myData: string;
  updateData: (newData: string) => void;
}

const initialData:MyContextProps = {
    myData: "",
    updateData: () => ""
};

export const MyContext = createContext<MyContextProps>(initialData);

export default function MainLayout({ children }: mainLayoutProperties) {
  const [myData, setMyData] = useState("Some default data");

  const updateData = (newData: string) => {
    setMyData(newData);
  };
  return (
    <>
      <MyContext.Provider value={{ myData, updateData }}>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </MyContext.Provider>
    </>
  );
}



