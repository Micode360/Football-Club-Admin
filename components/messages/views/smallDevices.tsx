import React from "react";
import Link from "next/link";
import Tabs from "@/components/navbar/tabs";
import ArrowIcon from "@/components/icons/arrow";
import { useSearchParams } from "next/navigation";
import MessageSideBar from "@/components/messages/sidebar";
import ChatRoom from "@/components/messages/chat";

export default function SmallDevices() {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "";
  const components = [<MessageSideBar />, <ChatRoom />];
  return (
    <section className="md:hidden">
      {tab === "1" && (
        <Link
          className="flex items-center mb-4"
          href={{
            pathname: "/messages",
            query: {
              tab: `0`,
            },
          }}
        >
          <div className="flex items-center justify-center rounded shadow-lg bg-white text-black mr-2 p-2 hover:bg-custom_orange active:bg-custom_blue hover:text-white active:text-white">
            <ArrowIcon
              direction="left"
              style="text-xs text-black md:text-base hover:text-white active:text-white"
            />
          </div>
          Back
        </Link>
      )}
      <Tabs components={components} tab={tab} />
    </section>
  );
}
