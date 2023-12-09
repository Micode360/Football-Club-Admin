"use client";
import { useSearchParams } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import VerifyUser from "@/components/verifyUser";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import Tabs from "@/components/navbar/tabs";
import GeneralInformation from "@/components/settings/generalInformation";
import Admins from "@/components/settings/admins";


export default function Settings() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "";
  const headers = ["General Settings", "Admins"];
  const components = [<GeneralInformation/>, <Admins/>];

  return (
    <VerifyUser>
      <main className="flex flex-col md:flex-row min-h-screen">
        <SideBar />
        <div className="w-full">
          <Navbar />
          <DashboardLayout style="py-16 mt-[3rem] ml-0 md:ml-[5rem] px-6">
            <Tabs headers={headers} components={components} tab={tab} />
          </DashboardLayout>
        </div>
      </main>
    </VerifyUser>
  );
}
