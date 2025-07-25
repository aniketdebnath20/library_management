"use client";

import AuthForm from "@/src/components/authForm";
import { signUp } from "@/src/lib/action/auth";
import { signUpSchema } from "@/src/lib/validation";
import React from "react";

const page = () => {

  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={signUp}
    />
  );
};

export default page;
