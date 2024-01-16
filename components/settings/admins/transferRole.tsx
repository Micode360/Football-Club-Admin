import React, { useState } from "react";
import SearchBar from "@/components/searchBar";

interface TransferRoleProperties {
  data: any;
  profile: any;
  setIsModal:any;
  setModalValue: any;
  setTransferRoleModal:any;
}

export default function TransferRole({
  data,
  profile,
  setIsModal,
  setModalValue,
  setTransferRoleModal,
}: TransferRoleProperties) {
  const [searchValue, setSearchValue] = useState("");
  const filteredAdmins = searchValue
    ? data.filter((admin: any) =>
        `${admin.firstName.toLowerCase()} ${admin.lastName.toLowerCase()}`.includes(
          searchValue.toLowerCase()
        )
      )
    : [];


    const handleAssign = (id:string, firstName:string, lastName:string) => {
      setModalValue({
        type:"assign",
        id,
        username: `${firstName} ${lastName}` 
      })
      setTransferRoleModal(false)
      setTimeout(() => {
        setIsModal(true)
      }, 3000);
    }


  return (
    <div className="relative flex-col  justify-center text-left">
      <div className="bg-white flex justify-between my-4 py-3 px-4 border-t border-b mb-1">
        <SearchBar
          placeholder="Search for the right admin..."
          setState={setSearchValue}
          style={"!py-0 !px-0 w-full"}
        />
      </div>

      <div className="max-h-[10rem] overflow-y-auto">
      {filteredAdmins.map((admin: any) => {
        return (
          <div
            className="flex items-center justify-between cursor-pointer border-b py-3 px-4"
            key={admin.id}
          >
            <div className="flex items-center cursor-pointer">
              <img
                src={
                  admin.profilePic.imgUrl
                    ? admin.profilePic?.imgUrl
                    : "/234567891.svg"
                }
                className="rounded-full object-cover object-center w-12 h-12"
                alt="profile photo"
              />

              <div className="ml-2">
                <h4 className="lg-[text-[1rem]] font-[600] mb-1">
                  {admin.firstName} {admin.lastName}
                </h4>
              </div>
            </div>

            <div className="flex flex-col items-end h-full">
              {
              admin.role !== "Super Admin" && (
                <button
                  type="button"
                  onClick={()=>handleAssign(admin.id, admin.firstName ,admin.lastName)}
                  className="bg-custom_blue text-white text-xs shadow-md border border-custom_blue py-2 px-4 rounded cursor-pointer"
                >
                  Assign
                </button>
              )}
            </div>
          </div>
        );
      })}
      </div>

      <div className="md:h-4"></div>
    </div>
  );
}
