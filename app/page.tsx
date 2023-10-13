"use client"
import EyeIcon from "@/components/icons/eye"
import NewsPaperIcon from "@/components/icons/newspaperIcon"
import DashboardLayout from "@/components/layout/DashboardLayout"
import Navbar from "@/components/navbar"
import ShieldIcon from "@/components/shield"
import SideBar from "@/components/sidebar"
import StatsCard from "@/components/statsCard"
import { gql } from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';

const GET_SOME_DATA = gql`
query ExampleQuery {
  users {
    firstName
    id
    lastName
    email
  }
}
`;



console.log("port: ",process.env.API_PORT)

export default function Home() {
  const { loading, error, data } = useQuery(GET_SOME_DATA);
 // const [createUser] = useMutation(CREATE_USER);
  console.log({ loading, error, data }, "graphic ql");


  return (
    <main className="flex min-h-screen">
        <SideBar/>
        <div className="w-full">
              <Navbar/>
              <DashboardLayout style="min-h-screen py-16 px-6">
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
