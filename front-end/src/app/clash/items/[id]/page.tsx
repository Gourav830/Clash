import React from "react";
import NavBar from "../../../../components/base/navBar";
import { fetchClase } from "@/fetch/clashFetch";
import AddClashItems from "../../../../components/clash/addClashItems";
import {
  authOptions,
  customSession,
} from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import ViewClash from "@/components/clash/viewClash";

const Page = async ({ params }: { params: any }) => {
  const clash: ClashType | null = await fetchClase(params.id);
  const session: customSession | null = await getServerSession(authOptions);

  return (
    <div className="container">
      <NavBar />
      <div className="mt-4">
        <h1 className="text-2xl lg:text-4xl font-extrabold">{clash?.title}</h1>
        <p className="text-lg lg:text-xl font-semibold">{clash?.description}</p>
        {clash?.ClashItems && clash.ClashItems.length > 0 ? (
          <ViewClash clash={clash} />
        ) : (
          <AddClashItems token={session?.user?.token!} clashId={params?.id!} />
        )}
      </div>
    </div>
  );
};

export default Page;
