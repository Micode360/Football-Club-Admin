import React from "react";
import MessageSideBar from "@/components/messages/sidebar";
import ChatRoom from "@/components/messages/chat";

export default function LargeDevices() {
  return (
    <section className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 h-[82vh]">
      <MessageSideBar />
      <ChatRoom />
    </section>
  );
}
