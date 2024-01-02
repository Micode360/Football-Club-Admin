import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { AUTHORIZED_ACCESS } from "@/graphQL/queries";
import Logo from "../icons/logo";
import { getToken, removeToken } from "@/utils/utilsFunctions";

interface alignProperties {
  children: React.ReactNode;
}

export default function VerifyUser({ children }: alignProperties) {
  const { error, loading, data } = useQuery(AUTHORIZED_ACCESS);
  const router = useRouter();

  useEffect(() => {
    if (data && data.authorizedAccess === false) {
      router.push("/signin");
    }
  }, [data, router]);

  if (data && data.authorizedAccess === true) {
    return <>{children}</>;
  } else {
    return (
      <div className="bg-white fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Logo width={100} height={100} style="mb-2 !w-[100] h-auto fade-in" />
          <p className="text-xs md:text-[1.5rem] text-[#0f0f33] font-[400] fade-in-out-infinite">
            Please wait...
          </p>
        </div>
      </div>
    );
  }
}
