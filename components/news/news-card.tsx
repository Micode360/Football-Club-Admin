import Image from "next/image";
import Link from "next/link";
import { toDate } from "@/utils/utilsFunctions";

interface NewsCardProps {
  header: string;
}

export default function NewsCard({ header }:NewsCardProps) {
  let arr = [
    {
      title: "Newcastle vs Arsenal",
      image_path: "/newcastle.jpg",
      date: Date.now(),
    },
    {
      title: "It's going to be a great reunion.",
      image_path: "/mp.webp",
      date: Date.now(),
    },
    {
      title: "Newcastle vs Arsenal",
      image_path: "/newcastle.jpg",
      date: Date.now(),
    },
    {
      title: "It's going to be a great reunion.",
      image_path: "/mp.webp",
      date: Date.now(),
    }
  ];

  return (
    <div className="shadow-lg p-4 h-full flex flex-col justify-between">
      <div>
        <h3 className="font-[700] text-[1.2rem] text-gray-600 mb-4"> { header } </h3>
        {arr.map(({ title, image_path, date }, id) => (
          <div className="grid grid-cols-3 mb-4" key={id}>
            <div className="col-span-2 text-custom_gray">
              <h3 className="text-[0.9rem]">{title}</h3>
              <span className="text-xs">{toDate(date)}</span>
            </div>
            <div className="flex items-center justify-end">
              <Image
                src={image_path}
                width={50}
                height={50}
                className="w-[3.5rem] h-[3.5rem] object-cover object-center rounded"
                alt="profile pic"
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center">
            <Link className="py-1 px-6 shadow-lg mt-2 rounded bg-custom_orange text-white" href="/">View More</Link>
        </div>
    </div>
  );
}
