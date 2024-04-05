"use client";
import React, { ReactNode, createContext, useState, useEffect, useMemo } from "react";
import _ from 'lodash';
import { useQuery, useSubscription  } from "@apollo/client";
import { USER_INFO, USERS_INFO, GET_NEWS, LEAGUES, HEADLINES, NOTIFICATIONS } from "@/graphQL/queries";
import { NEW_NOTIFICATION } from "@/graphQL/subscriptions";


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
    notifications: {}
  },
  setMyData: (data: any) => {}
};

export const MyContext = createContext<MyContextProps>(initialData);

export default function UserContext({ children }: mainLayoutProperties) {
  const { loading: profileLoading, data: profile } = useQuery(USER_INFO);
  const { loading: adminsLoading, data:admins } = useQuery(USERS_INFO);
  const { loading:leaguesLoading, data:leaguesData } = useQuery(LEAGUES);
  const { loading:newsLoading, data:newsData } = useQuery(GET_NEWS);
  const { loading:headlinesLoading, data:headlines } = useQuery(HEADLINES);
  const { loading:notificationsLoading, data:notifications } = useQuery(NOTIFICATIONS);
  const { loading: loadingNotification, data: newNotification } = useSubscription(NEW_NOTIFICATION)

  const [myData, setMyData] = useState<any>(initialData.myData);

console.log(notifications, "majorLoad")
console.log(newNotification?.newNotification, "new notfication subscription")

useEffect(() => {
  if (profile && !profileLoading && admins && !adminsLoading && leaguesData && !leaguesLoading &&
    newsData && !newsLoading && headlines && !headlinesLoading && notifications && !notificationsLoading) {
    const deepCopiedProfile = _.cloneDeep(profile?.user);
    const deepCopiedAdmins = _.cloneDeep(admins?.users);
    const deepCopiedLeagues = _.cloneDeep(leaguesData?.leagues);
    const deepCopiedNews = _.cloneDeep(newsData?.news);
    const deepCopiedNewsHeadlines = _.cloneDeep(headlines?.newsHeadlines);
    const deepCopiedNotifications = _.cloneDeep(notifications?.notifications);
    setMyData({
      ...myData,
      profile: deepCopiedProfile,
      admins: deepCopiedAdmins,
      leagues: deepCopiedLeagues,
      news: deepCopiedNews,
      headlines: deepCopiedNewsHeadlines,
      notifications: deepCopiedNotifications
    });
  }
}, [profile, profileLoading, admins, adminsLoading, leaguesData, leaguesLoading,
    newsData, newsLoading, headlines, headlinesLoading, notifications, notificationsLoading]);

useEffect(() => {
  if (newNotification && newNotification.newNotification) {
    const updatedNotificationList = [newNotification.newNotification, ...myData.notifications.list];
    setMyData((prevData:any) => ({
      ...prevData,
      notifications: {
        ...prevData.notifications,
        list: updatedNotificationList
      }
    }));
  }
}, [newNotification]);

  return (
        <MyContext.Provider value={{ myData, setMyData }}>
          {children}
        </MyContext.Provider>
  );
}
