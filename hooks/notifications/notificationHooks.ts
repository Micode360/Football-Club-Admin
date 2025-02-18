import { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { MyContext } from "@/components/layout/userContext";
import { useGlobalFunctions } from "../global/globalHooks";
import {
  SEND_NOTIFICATION,
  MARK_NOTIFICATION,
  DELETE_NOTIFICATION,
} from "@/graphQL/mutations/notifications/index";

export default function notificationHooksAndProps() {
  const { response, setResponse }: any = useGlobalFunctions();

  const [sendNotification] = useMutation(SEND_NOTIFICATION);
  const [markNotification] = useMutation(MARK_NOTIFICATION);
  const [deleteNotification] = useMutation(DELETE_NOTIFICATION);

  const {
    myData: { profile, notifications },
    setMyData,
  } = useContext(MyContext);

  const notificationDropdownData = (id: any, type: string) => [
    {
      id: 1,
      name: type === "single" ? "Delete" : type === "all" ? "Delete all" : "",
      type: "itemClickCallbacks",
      function: () => deleteNotificationFunc(id, type),
    },
  ];

  const newNotification = async ({ recipient, type, description, path, item }: any) => {
    try {
      const { data } = await sendNotification({
        variables: {
          input: {
            type,
            recipient,
            sender: profile.id,
            description,
            action: {
              path,
            },
          },
        },
      });

      if (data.SendNotification.status === 200) {
        setResponse({
          status: true,
          message: `Request made`,
          color: "green",
        });
        return true;
      } else
        setResponse({
          status: true,
          message: data.SendNotification.message,
          color: "red",
        });
    } catch (error: any) {
      setResponse({ status: true, message: error.message, color: "red" });
    }
  };

  const markNotificationAsRead = async (id: String, type: string) => {
    try {
      const { data } = await markNotification({
        variables: {
          input: {
            type,
            recipient: profile.id,
            listId: type === "single" ? id : type === "all" ? "" : "",
          },
        },
      });
      if (data.MarkNotificationAsRead.status === 200) {
        let updatedNotificationList = notifications.list.filter(
          (notice: any) => {
            if (notice.id === id) {
              notice.isRead = true;
            }
            return notice;
          }
        );

        setMyData((prevData: any) => ({
          ...prevData,
          notifications: {
            ...prevData.notifications,
            list: updatedNotificationList,
          },
        }));
      }
    } catch (error: any) {
      setResponse({ status: true, message: error.message, color: "red" });
    }
  };

  const deleteNotificationFunc = async (id: String, type: string) => {
        try {
      const { data } = await deleteNotification({
        variables: {
          input: {
            type,
            recipient: profile.id,
            listId: type === "single" ? id : type === "all" ? "" : "",
          },
        },
      });
            if (data.DeleteNotification.status === 200) {
        let updatedDeleteNotificationList:any;
        
        if (type === "single") {
          updatedDeleteNotificationList = notifications.list.filter(
            (notice: any) => notice.id !== id
          );
        } else if (type === "all") {
          updatedDeleteNotificationList = [];
        } else {
          updatedDeleteNotificationList = notifications.list;
        }
        
        setMyData((prevData: any) => ({
          ...prevData,
          notifications: {
            ...prevData.notifications,
            list: updatedDeleteNotificationList,
          },
        }));
      }
    } catch (error: any) {
      setResponse({ status: true, message: error.message, color: "red" });
    }
  };

  return {
    response,
    setResponse,
    newNotification,
    markNotificationAsRead,
    deleteNotificationFunc,
    notificationDropdownData,
  };
}
