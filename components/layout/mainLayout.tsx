"use client";
import React, { ReactNode, createContext, useState } from "react";
import { ApolloProvider } from "@apollo/client";
import { client } from "../../graphQL/clientSetUp";
import UserContext from "./userContext";

interface mainLayoutProperties {
  children: ReactNode;
}



export default function MainLayout({ children }: mainLayoutProperties) {

  return (
    <>
      <ApolloProvider client={client}>
        <UserContext>
            {children}
        </UserContext>
      </ApolloProvider>
    </>
  );
}
