"use client";
import { useAuthContext } from "@/context/AuthContext";
import AdminDashboard from "./dashboard/Dashboard";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = useAuthContext();
  const router = useRouter();
  useEffect(() => {
    if (user == null) {
      router.push("/signin");
      return;
    }
  }, [user]);

  return <AdminDashboard />;
}
