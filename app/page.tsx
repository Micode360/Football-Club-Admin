import DashboardLayout from "@/components/layout/DashboardLayout"
import Navbar from "@/components/navbar"
import SideBar from "@/components/sidebar"


export default function Home() {
  return (
    <main className="flex min-h-screen">
        <SideBar/>
        <div className="w-full">
              <Navbar/>
              <DashboardLayout style="min-h-screen">
                Layout
              </DashboardLayout>
        </div>
    </main>
  )
}
