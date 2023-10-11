import EyeIcon from "@/components/icons/eye"
import NewsPaperIcon from "@/components/icons/newspaperIcon"
import DashboardLayout from "@/components/layout/DashboardLayout"
import Navbar from "@/components/navbar"
import ShieldIcon from "@/components/shield"
import SideBar from "@/components/sidebar"
import StatsCard from "@/components/statsCard"



export default function Home() {
  return (
    <main className="flex min-h-screen">
        <SideBar/>
        <div className="w-full">
              <Navbar/>
              <DashboardLayout style="min-h-screen py-8 px-6">
                <section className="grid grid-cols-3 gap-4">
                    <StatsCard style="bg-custom_orange" Icon={EyeIcon} text={"People"} count={6002000}/>
                    <StatsCard style="bg-custom_blue" Icon={NewsPaperIcon} text={"New(s)"} count={1002}/>
                    <StatsCard style="bg-custom_red" Icon={ShieldIcon} text={"League(s)"} count={4}/>
                </section>
              </DashboardLayout>
        </div>
    </main>
  )
}
