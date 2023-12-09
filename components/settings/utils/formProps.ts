export const MyProfileInputprops = [
  {
    type: "grid",
    inputs: [
      {
        name: "firstName",
        type: "text",
        label: "First Name",
        placeholder: "First name",
        notImportant: true,
      },
      {
        name: "lastName",
        type: "text",
        label: "Last Name",
        placeholder: "Last name",
        notImportant: true,
      },
    ],
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "Email",
    notImportant: true,
  },
  {
    type: "grid",
    inputs: [
      {
        name: "city",
        type: "text",
        label: "City",
        placeholder: "City",
        notImportant: true,
      },
      {
        name: "country",
        type: "selectInput",
        label: "Country",
        placeholder: "Country",
        notImportant: true,
      },
    ],
  },
  {
    type: "grid",
    inputs: [
      {
        name: "state",
        type: "text",
        label: "State",
        placeholder: "State",
        notImportant: true,
      },
      {
        name: "zipCode",
        type: "text",
        label: "Zip Code",
        placeholder: "Zip Code",
        notImportant: true,
      },
    ],
  },
];

export const updatePasswordInputprops = [
  {
    name: "currentPassword",
    type: "password",
    label: "Current Password",
    placeholder: "Password",
    notImportant: true,
  },
  {
    type: "grid",
    inputs: [
      {
        name: "newPassword",
        type: "password",
        label: "New Password",
        placeholder: "New password",
        notImportant: true,
      },
      {
        name: "confirmPassword",
        type: "password",
        label: "Confim Password",
        placeholder: "Confirm Password",
        notImportant: true,
      },
    ],
  },
];
