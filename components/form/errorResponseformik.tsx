"use client";
import React from "react";

interface ErrorProperties {
  formik: any;
  name: string;
}

export default function FormikErrorResponse({ formik, name }: ErrorProperties) {
  return (
    <>
      {formik.touched[name] && formik.errors[name] && (
        <div className="text-[#9e3818] text-xs mb-1">
          {formik.errors[name].toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase())}
        </div>
      )}
    </>
  );
}
