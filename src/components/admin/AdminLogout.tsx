"use client";

import { useRouter } from "next/navigation";

export default function AdminLogout() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button onClick={handleLogout} className="text-red-600 hover:text-red-800 font-medium">
      Logout
    </button>
  );
}
