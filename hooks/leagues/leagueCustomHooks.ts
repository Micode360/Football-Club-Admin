import { useContext } from "react";
import { useMutation } from "@apollo/client";
import { usePathname ,useRouter } from 'next/navigation';
import { MyContext } from "@/components/layout/userContext";
import { useGlobalFunctions } from "../global/globalHooks";
import { DELETE_LEAGUE } from "@/graphQL/mutations/leagues/index";

export default function leagueHooksAndProps() {
  const router = useRouter();
  const pathname = usePathname();
  const {
    isModal,
    setIsModal,
    modalValue,
    setModalValue,
    response,
    setResponse,
    modalDescription
  }:any = useGlobalFunctions();

  const [deleteLeague] = useMutation(DELETE_LEAGUE);
  
  const {
    myData: { profile, leagues },
    setMyData
  } = useContext(MyContext);

  const leagueDropDownData = (id: string, imgId:any) => {
    return [
      {
        id: 1,
        name: "Edit",
        type: "link",
        path: "/leagues",
        query: {
          tab: "1",
          edit: id,
        },
      },
      {
        id: 2,
        name: "Delete",
        type: "itemClickCallbacks",
        function: (): any => {
          setModalValue({
            type: "delete",
            id,
            imgId,
            object: 'league'
          });
          setIsModal(true);
        },
      },
    ];
  };



  const handleLeagueDelete = async (modalvalue:any) => {
    const { id, imgId } = modalvalue;
    setIsModal(false);
    setResponse({ ...response, status: "pending" });

    try {
      const { data } = await deleteLeague({
        variables: {
          input: {
            type: "league",
            authorId: profile.id,
            thisId: id,
            imgId: imgId ? imgId : "",
          },
        },
      });


      if (data.DeleteLeague.status === 200) {
        setResponse({
          status: true,
          message: `${data.DeleteLeague.message.toLowerCase()}`,
          color: "green",
        });

        const filteredLeague = [...leagues].filter((data) => data.id !== id);
        setMyData((prevData: any) => ({ ...prevData, leagues: filteredLeague }));


        if (pathname?.startsWith('/leagues/details/')) {
          router.push('/leagues');
        }
      } else
        setResponse({
          status: true,
          message: data.DeleteLeague.message,
          color: "red",
        });
    } catch (error: any) {
      setResponse({ status: true, message: error.message, color: "red" });
    }
  } 

  return {
    leagueDropDownData,
    isModal,
    setIsModal,
    modalValue,
    setModalValue,
    response,
    setResponse,
    modalDescription,
    handleLeagueDelete
  };
}
