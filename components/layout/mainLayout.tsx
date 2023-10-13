"use client"
import React from "react";
import { ApolloProvider } from '@apollo/client';
import { client } from '../../graphQL/clientSetUp';


interface mainLayoutProperties {
 children: React.ReactNode;
}


export default function MainLayout({ children }:mainLayoutProperties) {
    return (
        <>
            <ApolloProvider client={client}>
                { children }
            </ApolloProvider>
           
        </>
    )
}