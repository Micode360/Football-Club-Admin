import { LogOut } from "./utilsFunctions";
import CogIcon from "@/components/icons/cogIcon";
import PowerIcon from "@/components/icons/powerIcon";

//profile navigation
export const profileNavData = [
  {
    id: 2,
    name: "Settings",
    icon: CogIcon({ property: "outline", style: "mr-2" }),
    type: "link",
    path: "/settings",
  },
  {
    id: 3,
    name: "Log Out",
    icon: PowerIcon({ property: "outline", style: "mr-2 text-red-500" }),
    type: "itemClickCallbacks",
    function: () => LogOut(),
  },
];

// Sign Up
export const signUpInputprops = [
  {
    name: "firstName",
    type: "text",
    label: "First Name",
    placeholder: "First Name",
  },
  {
    name: "lastName",
    type: "text",
    label: "Last Name",
    placeholder: "Last Name",
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Password",
  },
];

export const signUpAnimTextArray = [
  "Get started as an Administrator.",
  "Join The League.",
  "Just a few more words to go",
  "You got this.",
];

// Sign In
export const signInInputprops = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email",
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Password",
  },
];

export const signInLink = {
  path: "/resetpassword",
  text: "Forgot password",
};

export const signInAnimTextArray = [
  "Hi good to see you.",
  "Log into your account.",
  "Come on, let's get this show on the road",
  "You got this.",
];

// reset password
export const resetPasswordInputs = [
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email here",
  },
];

export const resetPasswordLink = {
  path: "/resetpassword",
  text: "Send OTP",
};

export const resetPasswordAnimTextArray = [
  "Reset Password.",
  "Click Send OTP to to get OTP values.",
];

// otp
export const otpInputs = [
  {
    name: "otp",
    type: "text",
    label: "OTP",
    placeholder: "OTP here",
  },
];

export const otpAnimTextArray = ["Reset Password.", "Type in your OTP values."];

// changePassword
export const changePassordInputs = [
  {
    name: "password",
    type: "password",
    label: "New password",
    placeholder: "New password",
  },
  {
    name: "confirmPassword",
    type: "password",
    label: "Confirm Password",
    placeholder: "Confirm new password",
  },
];

export const changePassordAnimTextArray = [
  "Change Password.",
  "Type in your new password.",
];

//table options

export let tableOptionsNavData = [
  {
    id: 1,
    name: "Edit",
    type: "link",
    path: "/news",
    query: {
      tab: "1",
    },
  },
  {
    id: 2,
    name: "Delete",
    type: "itemClickCallbacks",
    function: (): any => "",
  },
];

// News
export const newsInputprops = [
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
        options: [
          {
            label: "Select league",
            value: "select",
          },
          {
            label: "Premier league",
            value: "Premier league",
          },
          {
            label: "Spanish Laliga",
            value: "Spanish Laliga",
          },
        ],
      },
    ],
  },
  {
    type: "grid",
    inputs: [
      {
        name: "category",
        type: "select",
        label: "Category",
        placeholder: "Category",
        options: [
          {
            label: "Select Category",
            value: "select",
          },
          {
            label: "Recent",
            value: "Recent",
          },
          {
            label: "Popular",
            value: "Popular",
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

// League
export const leagueInputprops = [
  {
    name: "name",
    type: "text",
    label: "League Name",
    placeholder: "League",
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
        name: "country",
        type: "selectInput",
        label: "Country",
        placeholder: "Country",
      },
      {
        name: "logo",
        type: "file",
        label: "Logo",
      },
    ],
  },
  {
    name: "website",
    type: "text",
    label: "Website",
    placeholder: "website link",
    notImportant: true,
  },
  {
    type: "grid",
    inputs: [
      {
        name: "facebook",
        type: "text",
        label: "Facebook",
        placeholder: "Link here",
        notImportant: true,
      },
      {
        name: "xlink",
        type: "text",
        label: "Twitter X",
        placeholder: "Link here",
        notImportant: true,
      },
    ],
  },
  {
    type: "grid",
    inputs: [
      {
        name: "instagram",
        type: "text",
        label: "Instagram",
        placeholder: "Link here",
        notImportant: true,
      },
      {
        name: "youtube",
        type: "text",
        label: "Youtube",
        placeholder: "Link here",
        notImportant: true,
      },
    ],
  },
];

export const leagueDropDownData = [
  {
    id: 1,
    name: "Edit",
    type: "link",
    path: "/leagues",
    query: {
      tab: "1",
    },
  },
  {
    id: 2,
    name: "Delete",
    type: "itemClickCallbacks",
    function: (): any => "",
  },
];
