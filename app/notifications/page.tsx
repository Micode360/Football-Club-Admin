"use client";
import React, { useContext, useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import VerifyUser from "../../components/verifyUser";
import Navbar from "../../components/navbar";
import SideBar from "../../components/sidebar";
import MessageContainer from "../../components/notifications";
import { MyContext } from "@/components/layout/userContext";
import notificationHooksAndProps from "@/hooks/notifications/notificationHooks";
import ReactPaginate from "react-paginate";
import ArrowIcon from "@/components/icons/arrow";

export default function Notifications() {
  const {
    myData: { notifications },
  } = useContext(MyContext);
  const { markNotificationAsRead, deleteNotificationFunc } =
    notificationHooksAndProps();

  const itemsPerPage: number = 10;
  const pageCount: number = Math.ceil(
    notifications &&
      notifications.list &&
      notifications?.list.length / itemsPerPage
  );
  const [currentPage, setCurrentPage] = useState<number>(0);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const currentData: any =
    notifications &&
    notifications.list &&
    notifications?.list.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
    );

  return (
    <VerifyUser>
      <main className="flex flex-col md:flex-row min-h-screen">
        <SideBar />
        <div className="w-full">
          <Navbar />
          <DashboardLayout style="py-16 mt-[3rem] ml-0 md:ml-[5rem] px-6">
            <section className="bg-white shadow-lg flex justify-between my-4 py-3 px-4 rounded">
              <div className="flex items-center">
                <button
                  onClick={() => markNotificationAsRead("", "all")}
                  className="bg-custom_orange text-white shadow-md py-2 px-4 rounded"
                >
                  Mark all as read
                </button>
              </div>

              <div>
                <button
                  onClick={() => deleteNotificationFunc("", "all")}
                  className="bg-custom_blue text-white shadow-md py-2 px-4 rounded"
                >
                  Clear all
                </button>
              </div>
            </section>
            <div className="bg-white shadow-lg my-4 rounded">
              {currentData &&
                currentData.map(
                  (
                    {
                      id,
                      message,
                      sender,
                      senderProfilePic,
                      action,
                      type,
                      createdAt,
                      isRead,
                    }: any,
                    index: any
                  ) => (
                    <div key={index}>
                      <MessageContainer
                        type={type}
                        listId={id}
                        sender={sender}
                        message={message}
                        time={createdAt}
                        read={isRead}
                        action={action}
                        profilePic={senderProfilePic}
                      />
                    </div>
                  )
                )}
            </div>
            <ReactPaginate
              previousLabel={
                <ArrowIcon direction="left" style="text-xs md:text-base" />
              }
              nextLabel={
                <ArrowIcon direction="right" style="text-xs md:text-base" />
              }
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </DashboardLayout>
        </div>
      </main>
    </VerifyUser>
  );
}
