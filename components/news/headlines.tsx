import React, { useState } from "react";
import NewsHeadlineCard from "./newsCard";


interface HeadlineProps {
    data: any;
}
//bg-white shadow-lg

export default function Headlines ({ data }:HeadlineProps) {
    return (
        <section className="grid md:grid-cols-3 items-center gap-4 my-4 py-6 px-6 rounded">      
                   <NewsHeadlineCard/>
        </section>
    );
}