import React, { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isAuthenticated } from "@/lib/actions/auth.action";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAutheticated = await isAuthenticated();

  if (isUserAutheticated) redirect("/");

  return <div className="auth-layout">{children}</div>;
};

export default AuthLayout;
