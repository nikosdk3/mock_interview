import Image from "next/image";
import Link from "next/link";

import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

const RootLayout = async ({ children }: { children: ReactNode }) => {
  const isUserAutheticated = await isAuthenticated();

  if (!isUserAutheticated) redirect("/sign-in");
  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="logo" width={38} height={32} />
          <h2 className="text-primary-100">PrepAI</h2>
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default RootLayout;
