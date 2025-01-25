import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { MyContext } from "@/components/layout/userContext";
import { useGlobalFunctions } from "../global/globalHooks";
import { HEADLINES_NEWS } from "@/graphQL/mutations/news/index";


type DeleteProps = {
  id: string;
  imgId: string;
};

export default function newsHeadlineHooksAndProps() {
  const {
    response,
    setResponse
  }: any = useGlobalFunctions();

  const [headlineNews] = useMutation(HEADLINES_NEWS);

  const {
    myData: { profile, headlines },
    setMyData,
  } = useContext(MyContext);


  const myheadlines = headlines.headlines ? headlines.headlines.map((data:any) => ({
    id: data?.id,
    coverImage: {
      publicId: data?.coverImage?.publicId,
      imgUrl: data?.coverImage?.imgUrl
    },
    description: data?.description,
    league: data?.league,
    sn: data?.sn,
    title: data?.title,
    categories: data?.categories
  })): [];


  const updateNewsHeadline = async (news:any) => {
    console.log(news,"Add");
    try {
      const { data } = await headlineNews({
        variables: {
          input: {
            type: "update",
            userId: profile.id,
            headlineId: headlines && headlines.id? headlines.id: "",
            headlines: news
          },
        },
      });

      if (data.UpdateNewsHeadlines.status === 200) {
        setResponse({
          status: true,
          message: `${data.UpdateNewsHeadlines.message.toLowerCase()}`,
          color: "green",
        });


        setMyData((prevData: any) => ({
          ...prevData,
          headlines: {id: headlines.id, headlines: news },
        }));
      } else
        setResponse({
          status: true,
          message: data.UpdateNewsHeadlines.message,
          color: "red",
        });
    } catch (error: any) {
      setResponse({ status: true, message: error.message, color: "red" });
    }
  }


  return {
    myheadlines,
    response,
    setResponse,
    updateNewsHeadline
  };
}
