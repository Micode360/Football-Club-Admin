import React from "react";
import MyProfile from "./myprofile";
import UpdatePassword from "./updatePassword";

export default function GeneralInformation() {
  return (
    <div className="bg-white shadow-lg rounded-md my-4 p-4">
      <section className="grid md:grid-cols-3 lg:grid-cols-4 py-4">
        <div>
          <h2 className="font-[700] mb-2">Personal Information</h2>
          <p className="text-xs">My personal information</p>
        </div>
        <MyProfile />
      </section>
      <section className="grid md:grid-cols-3 lg:grid-cols-4 py-4 my-4">
        <div>
          <h2 className="font-[700] mb-2">Change Password</h2>
          <p className="text-xs">Update your password.</p>
        </div>
        <UpdatePassword />
      </section>
    </div>
  );
}
