"use client";
import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import VerifyUser from "../../components/verifyUser";
import Navbar from "../../components/navbar";
import SideBar from "../../components/sidebar";



export default function Messages() {
  return (
    <VerifyUser>
      <main className="flex flex-col md:flex-row min-h-screen">
        <SideBar />
        <div className="w-full">
          <Navbar />
          <DashboardLayout style="py-16 mt-[3rem] ml-0 md:ml-[5rem] px-6">
            messages
          </DashboardLayout>
        </div>
      </main>
    </VerifyUser>
  );
}
