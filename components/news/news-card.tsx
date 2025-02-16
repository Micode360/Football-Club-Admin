import Image from "next/image";
import Link from "next/link";
import { toDate } from "@/utils/utilsFunctions";

interface NewsCardProps {
  header: string;
  news: Array<any>;
  newsLink?: string;
}

export default function NewsCard({ header, news, newsLink  }: NewsCardProps) {
  return (
    <div className="bg-white shadow-lg p-4 h-full flex flex-col justify-between">
      <div>
        <h3 className="font-[600] text-[1rem] text-gray-600 mb-4">
          {" "}
          {header}{" "}
        </h3>
        {news && news.map(({ id, title, coverImage, createdAt }) => (
          <div className="grid grid-cols-3 mb-4" key={id}>
            <div className="col-span-2 text-custom_gray">
              <h3 className="text-[0.9rem]">{title.slice(0, 20) + "..."}</h3>
              <span className="text-xs">{toDate(parseInt(createdAt,10))}</span>
            </div>
            <div className="flex items-center justify-end">
              <Image
                src={coverImage.imgUrl}
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
        {
         newsLink && newsLink !== "" && 
          (
            <Link
              className="py-1 px-6 shadow-lg mt-2 rounded bg-custom_orange text-white"
              href={newsLink || ""}
            >
              View More
            </Link>
          )
        }
      </div>
    </div>
  );
}
