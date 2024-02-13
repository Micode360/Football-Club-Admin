import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";
import { MyContext } from "@/components/layout/userContext";
import { useGlobalFunctions } from "../global/globalHooks";
import { DELETE_NEWS } from "@/graphQL/mutations/news/index";

type DeleteProps = {
  id: string;
  imgId: string;
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

  const [deleteNews] = useMutation(DELETE_NEWS);
  const [searchValue, setSearchValue] = useState("");

  const {
    myData: { profile, leagues, news },
    setMyData,
  } = useContext(MyContext);

  let league = leagues.map(({ name }: any) => ({
    label: name,
    value: name,
  }));

  const newsInputprops:any = () => {
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

  let tableOptionsNavData = ({ id, imgId }: DeleteProps) => [
    {
      id: 1,
      name: "View",
      type: "link",
      path: `/news/view/${id}`,
    },
    {
      id: 2,
      name: "Edit",
      type: "link",
      path: "/news",
      query: {
        tab: "1",
        edit: id,
      },
    },
    {
      id: 3,
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
  ];

  const handleDeleteMultipleNews = (arr: Array<DeleteProps>) => {
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
          },
        },
      });

      if (data.DeleteNews.status === 200) {
        setResponse({
          status: true,
          message: `${data.DeleteNews.message.toLowerCase()}`,
          color: "green",
        });

        const filteredNews = [...news].filter((data) => data.id !== id);
        const filteredMultipleNews = news.filter(
          (data: any) =>
            !modalValue.arr.some((idObj: DeleteProps) => idObj.id === data.id)
        );

        setMyData((prevData: any) => ({
          ...prevData,
          news: modalValue.arr ? filteredMultipleNews : filteredNews,
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


  return {
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
    modalDescription,
    handleNewsDelete,
    handleDeleteMultipleNews
  };
}
