"use client";
import React, {
  ReactNode,
  createContext,
  useState,
  useEffect,
  useMemo,
} from "react";
import _ from "lodash";
import { useQuery, useSubscription } from "@apollo/client";
import {
  USER_INFO,
  USERS_INFO,
  GET_NEWS,
  LEAGUES,
  HEADLINES,
  NOTIFICATIONS,
} from "@/graphQL/queries";
import {
  NEW_NOTIFICATION,
  NEWS_SUBCRIPTION_UPDATE,
} from "@/graphQL/subscriptions";

interface mainLayoutProperties {
  children: ReactNode;
}

interface MyContextProps {
  myData: any;
  setMyData: (data: any) => void;
}

const initialData: MyContextProps = {
  myData: {
    role: "",
    profile: {},
    admins: [],
    leagues: [],
    news: [],
    headlines: [],
    notifications: {},
  },
  setMyData: (data: any) => {},
};

export const MyContext = createContext<MyContextProps>(initialData);

const firstLoad = true;

export default function UserContext({ children }: mainLayoutProperties) {
  const { loading: profileLoading, data: profile } = useQuery(USER_INFO);
  const { loading: adminsLoading, data: admins } = useQuery(USERS_INFO);
  const { loading: leaguesLoading, data: leaguesData } = useQuery(LEAGUES);
  const { loading: newsLoading, data: newsData } = useQuery(GET_NEWS, {
    variables: firstLoad ? {} : { limit: 10 },
    pollInterval: 10000, // Poll every 10 seconds
  });
  const { loading: headlinesLoading, data: headlines } = useQuery(HEADLINES);
  const { loading: notificationsLoading, data: notifications } =
    useQuery(NOTIFICATIONS);
  const { loading: loadingNotification, data: newNotification } =
    useSubscription(NEW_NOTIFICATION);
  const { loading: loadingNewsSub, data: newNewsSubscription } =
    useSubscription(NEWS_SUBCRIPTION_UPDATE);

  const [myData, setMyData] = useState<any>(initialData.myData);

      
  useEffect(() => {
    if (
      profile &&
      !profileLoading &&
      admins &&
      !adminsLoading &&
      leaguesData &&
      !leaguesLoading &&
      newsData &&
      !newsLoading &&
      headlines &&
      !headlinesLoading &&
      notifications &&
      !notificationsLoading
    ) {
      const deepCopiedProfile = _.cloneDeep(profile?.user);
      const deepCopiedAdmins = _.cloneDeep(admins?.users);
      const deepCopiedLeagues = _.cloneDeep(leaguesData?.leagues);
      const deepCopiedNews = _.cloneDeep(newsData?.news);
      const deepCopiedNewsHeadlines = _.cloneDeep(headlines?.newsHeadlines);
      const deepCopiedNotifications = _.cloneDeep(notifications?.notifications);
      setMyData({
        ...myData,
        role: profile?.user?.role,
        profile: deepCopiedProfile,
        admins: deepCopiedAdmins,
        leagues: deepCopiedLeagues,
        news: deepCopiedNews,
        headlines: deepCopiedNewsHeadlines,
        notifications: deepCopiedNotifications,
      });
    }
  }, [
    profile,
    profileLoading,
    admins,
    adminsLoading,
    leaguesData,
    leaguesLoading,
    newsData,
    newsLoading,
    headlines,
    headlinesLoading,
    notifications,
    notificationsLoading,
  ]);

  useEffect(() => {
    if (newNotification && newNotification.newNotification) {
      const updatedNotificationList = [
        newNotification.newNotification,
        ...myData.notifications.list,
      ];
      setMyData((prevData: any) => ({
        ...prevData,
        notifications: {
          ...prevData.notifications,
          list: updatedNotificationList,
        },
      }));
    }
  }, [newNotification]);

  useEffect(() => {
    if (newNewsSubscription && newNewsSubscription.newsUpdate) {
      let incomingNewsObject = newNewsSubscription.newsUpdate;

      let newsUpdate = myData.news.map((obj: any) => {
        if (obj.id === incomingNewsObject.id) {
          return { ...obj, ...incomingNewsObject };
        } else {
          return obj;
        }
      });

      setMyData((prevData: any) => ({
        ...prevData,
        news: {
          ...prevData.news,
          newsUpdate,
        },
      }));
    }
  }, [newNotification]);

  return (
    <MyContext.Provider value={{ myData, setMyData }}>
      {children}
    </MyContext.Provider>
  );
}
