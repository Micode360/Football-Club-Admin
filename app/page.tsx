"use client";
import React, { useContext, useEffect } from "react";
import EyeIcon from "@/components/icons/eye";
import NewsPaperIcon from "@/components/icons/newspaperIcon";
import DashboardLayout from "@/components/layout/DashboardLayout";
import VerifyUser from "@/components/verifyUser";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import ShieldIcon from "@/components/icons/shield";
import StatsCard from "@/components/statsCard";
import { gql } from "graphql-tag";
import { useQuery, useMutation } from "@apollo/client";
import { MyContext } from "@/components/layout/mainLayout";
import NewsCarousel from "@/components/newsCarousel";
import NewsCard from "@/components/news/news-card";

const GET_SOME_DATA = gql`
  query ExampleQuery {
    user {
      id
      firstName
      lastName
      email
    }
  }
`;

const AUTHORIZED_ACCESS = gql`
  query Query {
    authorizedAccess
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(GET_SOME_DATA);
  const authorized = useQuery(AUTHORIZED_ACCESS);
  // const [createUser] = useMutation(CREATE_USER);
  const { myData, updateData } = useContext(MyContext);

  const handleUpdateData = () => {
    updateData("New data from OtherComponent");
  };

  useEffect(() => {
    updateData("newdata updated");
  }, []);

  console.log({ loading, error, data }, "graphic ql");

  console.log(myData, "MyContext");

  return (
    <VerifyUser>
      <main className="flex flex-col md:flex-row min-h-screen">
        <SideBar />
        <div className="w-full">
          <Navbar />
          <DashboardLayout style="py-16 mt-[4.5%] ml-0 md:ml-[5rem] px-6">
            <section className="grid md:grid-cols-3 gap-4">
              <StatsCard
                style="bg-custom_orange"
                Icon={EyeIcon}
                text={"People"}
                count={6002000}
              />
              <StatsCard
                style="bg-custom_blue"
                Icon={NewsPaperIcon}
                text={"New(s)"}
                count={1002}
              />
              <StatsCard
                style="bg-custom_red"
                Icon={ShieldIcon}
                text={"League(s)"}
                count={4}
              />
            </section>
            <section className="md:grid md:grid-cols-3 py-8 gap-4 overflow-hidden pad_layout">
              <div className="bg-white shadow-lg rounded md:col-span-2">
                <NewsCarousel />
              </div>
              <div className="mt-8 md:mt-0">
                <NewsCard header={"Recent News"} />
              </div>
              <div className="mt-8 md:mt-0">
                <NewsCard header={"Most visited"} />
              </div>
            </section>
          </DashboardLayout>
        </div>
      </main>
    </VerifyUser>
  );
}
