"use client";
import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import VerifyUser from "../../components/verifyUser";
import Navbar from "../../components/navbar";
import SideBar from "../../components/sidebar";
import MessageContainer from "../../components/notifications";

const notificationMessages = [
  {
    id: 1,
    message: "James Card created a new Article for the Premier League",
    time: "2 days ago",
    read: true,
  },
  {
    id: 2,
    message: "John Doe published a review for the Champions League",
    time: "3 days ago",
    read: true,
  },
  {
    id: 3,
    message: "Emily Smith shared a video in the Europa League group",
    time: "4 days ago",
    read: true,
  },
  {
    id: 4,
    message: "Mark Johnson commented on your post in the La Liga discussion",
    time: "5 days ago",
    read: true,
  },
  {
    id: 5,
    message: "Samantha White liked your photo in the Serie A community",
    time: "6 days ago",
    read: true,
  },
];

export default function Notifications() {
  return (
    <VerifyUser>
      <main className="flex flex-col md:flex-row min-h-screen">
        <SideBar />
        <div className="w-full">
          <Navbar />
          <DashboardLayout style="py-16 mt-[3rem] ml-0 md:ml-[5rem] px-6">
          <div className="bg-white shadow-lg flex justify-start my-4 py-3 px-4 rounded">
            <button
              className="bg-custom_orange text-white shadow-md py-2 px-4 rounded"
            >
              Mark all as Read
            </button>
        </div>
            <div className="bg-white shadow-lg my-4 rounded">
              {notificationMessages.map(({ id, message, time }) => (
                <MessageContainer
                  key={id}
                  message={message}
                  time={time}
                  read={false}
                />
              ))}
            </div>
          </DashboardLayout>
        </div>
      </main>
    </VerifyUser>
  );
}
