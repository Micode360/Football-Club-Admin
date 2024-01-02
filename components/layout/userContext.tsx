"use client";
import React, { ReactNode, createContext, useState, useEffect } from "react";
import { useQuery, useSubscription  } from "@apollo/client";
import { USER_INFO, USERS_INFO } from "@/graphQL/queries";
//import { USER_UPDATED } from "@/graphQL/subscriptions";


interface mainLayoutProperties {
  children: ReactNode;
}

interface MyContextProps {
  myData: any;
  setMyData: (data: any) => void;
}

const initialData: MyContextProps = {
  myData: {
    profile: {},
    admins: [],
    league: [],
    news: [],
  },
  setMyData: (data: any) => {}
};

export const MyContext = createContext<MyContextProps>(initialData);

export default function UserContext({ children }: mainLayoutProperties) {
  const { loading: profileLoading, data: profile } = useQuery(USER_INFO);
  const { loading: adminsLoading, data:admins } = useQuery(USERS_INFO);
  //const { loading: loadingProfileUpdate, data: profileUpdate } = useSubscription(USER_UPDATED)

  const [myData, setMyData] = useState<any>(initialData.myData);



useEffect(() => {
  if (!profileLoading && profile) {
    setMyData((prevData:any) => ({ ...prevData, profile: profile.user }));
  }
}, [setMyData, profileLoading, profile]);

useEffect(() => {
  if (!adminsLoading && admins) {
    setMyData((prevData:any) => ({ ...prevData, admins: admins.users }));
  }
}, [setMyData, adminsLoading, admins]);

// useEffect(()=>{
//   if (!loadingProfileUpdate && profileUpdate) setMyData({...myData, profile:profileUpdate.user});
// },[setMyData, profileLoading, profile])



  return (
        <MyContext.Provider value={{ myData, setMyData }}>
          {children}
        </MyContext.Provider>
  );
}
