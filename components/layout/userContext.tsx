"use client";
import React, { ReactNode, createContext, useState, useEffect } from "react";
import _ from 'lodash';
import { useQuery, useSubscription  } from "@apollo/client";
import { USER_INFO, USERS_INFO } from "@/graphQL/queries";
import { LEAGUES } from "@/graphQL/queries/index";
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
    role: "",
    profile: {},
    admins: [],
    leagues: [],
    news: [],
  },
  setMyData: (data: any) => {}
};

export const MyContext = createContext<MyContextProps>(initialData);

export default function UserContext({ children }: mainLayoutProperties) {
  const { loading: profileLoading, data: profile } = useQuery(USER_INFO);
  const { loading: adminsLoading, data:admins } = useQuery(USERS_INFO);
  const { loading:leaguesLoading, data:leaguesData } = useQuery(LEAGUES);
  //const { loading: loadingProfileUpdate, data: profileUpdate } = useSubscription(USER_UPDATED)

  const [myData, setMyData] = useState<any>(initialData.myData);



useEffect(() => {
  if (!profileLoading && profile) {
    const deepCopiedProfile = _.cloneDeep(profile?.user);
    setMyData((prevData:any) => ({ ...prevData, profile: deepCopiedProfile, role: deepCopiedProfile.role }));
  }
}, [setMyData, profileLoading, profile]);

useEffect(() => {
  if (!adminsLoading && admins) {
    const deepCopiedAdmins = _.cloneDeep(admins?.users);
    setMyData((prevData:any) => ({ ...prevData, admins: deepCopiedAdmins}));
  }
}, [setMyData, adminsLoading, admins]);

useEffect(()=>{
  const deepCopiedLeagues = _.cloneDeep(leaguesData?.leagues);
  if (!leaguesLoading && leaguesData) setMyData((prevData:any) => ({...prevData, leagues: deepCopiedLeagues}));
},[setMyData, leaguesLoading, leaguesData])

console.log(myData, "myData")


  return (
        <MyContext.Provider value={{ myData, setMyData }}>
          {children}
        </MyContext.Provider>
  );
}
