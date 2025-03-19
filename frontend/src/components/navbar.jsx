"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = ({ user }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5001/api/users/logout", {
        method: "POST",
        credentials: "include",
      });
      router.push("/login"); 
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  return (
    <div className="bg-black text-white flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold">Task Management</h1>
      <div className="flex items-center space-x-4">
        <span className=" uppercase">{user.username}</span>

        <Button variant="ghost" className="flex items-center gap-2 hover:bg-red-500 cursor-pointer"
        onClick={handleLogout}>
          <LogOut className="w-5 h-5" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
