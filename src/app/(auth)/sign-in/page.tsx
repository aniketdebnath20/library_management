"use client";

import AuthForm from "@/src/components/authForm";
import { signInWithCredentials } from "@/src/lib/action/auth";
import { signInSchema } from "@/src/lib/validation";
import React from "react";

const page = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signInWithCredentials}
    />
  );
};

export default page;
