import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "../searchBar";
import ChatPreviewContainer from "./chatPreview";

export default function MessageSideBar() {
  const [searchValue, setSearchValue] = useState("");
  const messages = [
    {
      id: 1,
      name: "James Card",
      image: "/mp.webp",
      text: "Hi, Miracle. Great article! Your insights and writing style are truly impressive. Keep up the excellent work!",
      time: "11:20",
    },
    {
      id: 2,
      name: "John Doe",
      image: "/mp.webp",
      text: "Hey there! I enjoyed reading your latest blog post. Your ideas are thought-provoking and well-articulated.",
      time: "12:45",
    },
    {
      id: 3,
      name: "Jane Smith",
      image: "/mp.webp",
      text: "Hello! Your writing has a unique flair that captivates readers. Looking forward to more from you!",
      time: "14:30",
    },
    {
      id: 4,
      name: "Alice Johnson",
      image: "/mp.webp",
      text: "Hi, Miracle! Your articles are a breath of fresh air. I appreciate the depth of your analysis.",
      time: "16:10",
    },
    {
      id: 5,
      name: "Bob Anderson",
      image: "/mp.webp",
      text: "Greetings! Your insights are spot-on. I'm eager to see what topics you'll explore next.",
      time: "18:00",
    },
    {
      id: 6,
      name: "Eva Brown",
      image: "/mp.webp",
      text: "Hi there! Your writing style is captivating, and your perspectives are enlightening.",
      time: "20:15",
    },
  ];

  return (
    <section className="bg-white shadow-lg rounded h-full">
      <SearchBar setState={setSearchValue} />
      {messages
        .filter((message: any) =>
          searchValue === ""
            ? message
            : message.name.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map(({ id, name, image, text, time }: any) => (
          <div key={id}>
            <Link
              href={{
                pathname: "/messages",
                query: {
                  tab: `1`,
                },
              }}
            >
              <ChatPreviewContainer
                name={name}
                image={image}
                text={text}
                time={time}
                searchValue={searchValue}
              />
            </Link>
          </div>
        ))}
    </section>
  );
}
