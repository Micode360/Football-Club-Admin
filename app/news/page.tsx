"use client"
import DashboardLayout from "@/components/layout/DashboardLayout";
import VerifyUser from "@/components/verifyUser";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import ShieldIcon from "@/components/icons/shield";
import Tabs from "@/components/navbar/tabs";
import Table from "@/components/table";



const Comp1 = () => (
  <div className="p-4">AddNews</div>
)


export default function News () {
  const headers = ["News", "Add News"];
  const components = [<Table/>, <Comp1/>];
  
    return (
        <VerifyUser>
        <main className="flex flex-col md:flex-row min-h-screen">
          <SideBar />
          <div className="w-full">
            <Navbar />
            <DashboardLayout style="py-16 mt-[3rem] ml-0 md:ml-[5rem] px-6">
            <Tabs headers={headers} components={components}/>
            </DashboardLayout>
          </div>
        </main>
      </VerifyUser>
    );
}