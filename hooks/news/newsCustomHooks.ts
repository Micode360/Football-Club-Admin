import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";
import { MyContext } from "@/components/layout/userContext";
import { useGlobalFunctions } from "../global/globalHooks";
import {
  DELETE_NEWS,
  EDIT_NEWS,
  HANDLE_ACCESS,
  REMOVE_AUTHOR,
} from "@/graphQL/mutations/news/index";
import notificationHooksAndProps from "../notifications/notificationHooks";
import { Console } from "console";

type OptionProps = {
  id: string;
  imgId: string;
  item?: any;
};

export default function newsHooksAndProps() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isModal,
    setIsModal,
    modalValue,
    setModalValue,
    response,
    setResponse,
    modalDescription,
  }: any = useGlobalFunctions();
  const { newNotification } = notificationHooksAndProps();

  const [deleteNews] = useMutation(DELETE_NEWS);
  const [handleAccess] = useMutation(HANDLE_ACCESS);
  const [removeThisAuthor] = useMutation(REMOVE_AUTHOR);
  const [searchValue, setSearchValue] = useState("");
  const [editNews] = useMutation(EDIT_NEWS);

  const {
    myData: { profile, leagues, news, headlines },
    setMyData,
  } = useContext(MyContext);

  const isAuthor: any = (thisNews: string) => {
    let result: boolean = false;
    news.forEach((news: any) => {
      if (news.id === thisNews) {
        news.authorIds.forEach((author: any) => {
          if (author.id === profile.id) return (result = true);
        });
      }
    });
    return result;
  };

  let league = leagues.map(({ name }: any) => ({
    label: name,
    value: name,
  }));

  const newsInputprops: any = () => {
    league.unshift({
      label: "Select Category",
      value: "select",
    });

    league.push({
      label: "Secondary Tournaments",
      value: "secondary tournaments",
    });

    return [
      {
        name: "title",
        type: "text",
        label: "Title",
        placeholder: "Add your title",
      },
      {
        name: "description",
        type: "text",
        label: "Description",
        placeholder: "Description",
      },
      {
        type: "grid",
        inputs: [
          {
            name: "author",
            type: "text",
            label: "Author",
            placeholder: "Author",
          },
          {
            name: "league",
            type: "select",
            label: "League",
            placeholder: "League",
            options: league,
          },
        ],
      },
      {
        type: "grid",
        inputs: [
          {
            name: "categories",
            type: "selectCheckbox",
            label: "Category",
            placeholder: "Category",
            options: [
              {
                label: "Select Category",
                value: "select",
              },
              {
                label: "Top News",
                value: "top news",
              },
              {
                label: "Popular",
                value: "popular",
              },
              {
                label: "Transfers",
                value: "transfers",
              },
              {
                label: "Bussiness",
                value: "bussiness",
              },
            ],
          },

          {
            name: "coverimage",
            type: "file",
            label: "Cover Image",
          },
        ],
      },
    ];
  };

  let tableOptionsNavData = ({ id, imgId, item }: OptionProps) => {
    if (isAuthor(id) || (!isAuthor(id) && profile.role === "Super Admin")) {
      return [
        {
          id: 2,
          name: "View",
          type: "link",
          path: `/news/view/${id}`,
        },
        {
          id: 3,
          name: "Edit",
          type: "link",
          path: "/news",
          query: {
            tab: "1",
            edit: id,
          },
        },
        {
          id: 4,
          name: "Delete",
          type: "itemClickCallbacks",
          function: (): any => {
            setIsModal(true);
            setModalValue({
              type: "delete",
              id,
              imgId,
            });
          },
        },
      ].filter((option) => option !== null);
    } else {
      return [
        {
          id: 1,
          name: "Request Access",
          type: "itemClickCallbacks",
          function: (): any => {
            newNotification({
              recipient: item?.authorIds[0]?.id,
              description: "is requesting access to the news",
              type: "request",
              path: `/news/view/${item.id}`,
              item,
            }).then(() =>
              setResponse({
                status: true,
                message: "request sent",
                color: "green",
              })
            );
          },
        },
        {
          id: 2,
          name: "View",
          type: "link",
          path: `/news/view/${id}`,
        },
      ].filter((option) => option !== null);
    }
  };

  const handleDeleteMultipleNews = (arr: Array<OptionProps>) => {
    setModalValue({
      type: "delete_multiple",
      arr: arr,
    });
  };

  const handleNewsDelete = async () => {
    const { id, imgId } = modalValue;
    setIsModal(false);
    setResponse({ ...response, status: "pending" });

    try {
      const { data } = await deleteNews({
        variables: {
          input: {
            type: "news",
            authorId: profile.id,
            thisId: id,
            arrIds: modalValue.type === "delete_multiple" ? modalValue.arr : [],
            imgId: imgId ? imgId : "",
            headLineId: headlines && headlines.id ? headlines.id : "",
          },
        },
      });

      if (data.DeleteNews.status === 200) {
        setResponse({
          status: true,
          message: `${data.DeleteNews.message.toLowerCase()}`,
          color: "green",
        });

        const filteredNews =
          modalValue.type === "delete"
            ? [...news].filter((data) => data.id !== id)
            : news.filter(
                (data: any) =>
                  !modalValue.arr.some(
                    (idObj: OptionProps) => idObj.id === data.id
                  )
              );

        const filteredHeadlineNews =
          modalValue.type === "delete"
            ? headlines.headlines &&
              headlines.headlines.filter((data: any) => data.id !== id)
            : headlines.headlines &&
              headlines.headlines.filter(
                (data: any) =>
                  !modalValue.arr.some(
                    (idObj: OptionProps) => idObj.id === data.id
                  )
              );

        setMyData((prevData: any) => ({
          ...prevData,
          news: filteredNews,
          headlines: { id: headlines.id, headlines: filteredHeadlineNews },
        }));
      } else
        setResponse({
          status: true,
          message: data.DeleteNews.message,
          color: "red",
        });
    } catch (error: any) {
      setResponse({ status: true, message: error.message, color: "red" });
    }
  };

  const grantNewsAuthorization = async ({ type, id, userId }: any) => {
    setIsModal(false);
    setResponse({ ...response, status: "pending" });
    if (type === "reject") {
      newNotification({
        recipient: userId,
        description: "has rejected your access to the news",
        type: "request",
        path: `/news/view/${id}`,
      });
      return;
    }

    try {
      const { data } = await handleAccess({
        variables: {
          input: {
            type,
            id,
            authorId: profile.id,
            userId,
          },
        },
      });

      if (data.HandleAccess.status === 200) {
        setResponse({
          status: true,
          message: `${data.HandleAccess.message.toLowerCase()}`,
          color: "green",
        });

        newNotification({
          recipient: userId,
          description: "has granted you access to the news",
          type: "user-type",
          path: `/news/view/${id}`,
        });

        // const filteredNews =
        //   modalValue.type === "delete"
        //     ? [...news].filter((data) => data.id !== id)
        //     : news.filter(
        //         (data: any) =>
        //           !modalValue.arr.some(
        //             (idObj: OptionProps) => idObj.id === data.id
        //           )
        //       );

        // setMyData((prevData: any) => ({
        //   ...prevData,
        //   news: filteredNews,
        // }));
      } else
        setResponse({
          status: true,
          message: data.HandleAccess.message,
          color: "red",
        });
    } catch (error: any) {
      setResponse({ status: true, message: error.message, color: "red" });
    }
  };

  const removeAuthor = async (newsId: string, authorId: string) => {
    setIsModal(false);
    setResponse({ ...response, status: "pending" });

    try {
      const { data } = await removeThisAuthor({
        variables: {
          input: {
            authorId,
            thisId: newsId,
          },
        },
      });

      if (data.RemoveAuthor.status === 200) {
        setResponse({
          status: true,
          message: `${data.RemoveAuthor.message.toLowerCase()}`,
          color: "green",
        });

        newNotification({
          recipient: authorId,
          description: "has removed your access to this news",
          type: "request",
          path: `/news/view/${newsId}`,
        });
      } else
        setResponse({
          status: true,
          message: data.RemoveAuthor.message,
          color: "red",
        });
    } catch (error: any) {
      setResponse({ status: true, message: error.message, color: "red" });
    }
  };

  const updateNews = async (news: any) => {
    try {
      const { data } = await editNews({
        variables: {
          input: news,        
        },
      });
      console.log(data, "news update: published")

      if (data?.EditNews?.status === 200) {
        setResponse({
          status: true,
          message: "News published successfully.",
          color: "green",
        });
      }
    } catch (error: any) {
      setResponse({ status: true, message: error.message, color: "red" });
    }
  };

  return {
    isAuthor,
    newsInputprops,
    tableOptionsNavData,
    isModal,
    setIsModal,
    modalValue,
    setModalValue,
    response,
    setResponse,
    searchValue,
    setSearchValue,
    removeAuthor,
    modalDescription,
    updateNews,
    handleNewsDelete,
    grantNewsAuthorization,
    handleDeleteMultipleNews,
  };
}
