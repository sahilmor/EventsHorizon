"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../ui/sidebar";
import {
  IconCategory,
  IconHome,
  IconTicket,
  IconUsers,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/context/UserContext";

type MainWrapperProps = {
  children: ReactNode;
};


const MainWrapper = ({ children } : MainWrapperProps) => {

  const { user } = useUser();
  
  const links = [
    {
      label: "Home",
      href: "/",
      icon: (
        <IconHome className="text-white h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Events",
      href: "/events",
      icon: (
        <IconTicket className="text-white h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Artists",
      href: "/artists",
      icon: (
        <IconUsers className="text-white h-5 w-5 shrink-0" />
      ),
    },
    {
      label: "Categories",
      href: "/categories",
      icon: (
        <IconCategory className="text-white h-5 w-5 shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "flex flex-col md:flex-row bg-[#111111] w-full flex-1 p-4 overflow-hidden",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: user?.full_name || "User Profile",
                href: "/profile",
                icon: (
                  <div className="h-7 w-7 shrink-0 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center">
                    {user && user.avatar_url ? (
                      <div className="relative h-7 w-7">
                        <Image
                          src="/default-avatar.svg"
                          className="h-7 w-7 shrink-0 rounded-full object-cover"
                          width={50}
                          height={50}
                          alt="Default Avatar"
                        />
                        <Image
                          src={user.avatar_url}
                          className="absolute inset-0 h-7 w-7 shrink-0 rounded-full object-cover opacity-0"
                          width={50}
                          height={50}
                          alt="User Avatar"
                          onLoad={(e) => {
                            // If the image loads successfully, make it visible
                            e.currentTarget.classList.remove('opacity-0');
                          }}
                          onError={(e) => {
                            // If the image fails to load, keep the default avatar visible
                            console.log('Avatar image failed to load, using default');
                          }}
                        />
                      </div>
                    ) : (
                      <Image
                        src="/default-avatar.svg"
                        className="h-7 w-7 shrink-0 rounded-full object-cover"
                        width={50}
                        height={50}
                        alt="Default Avatar"
                      />
                    )}
                  </div>
                ),
                className: "text-red-500",
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <main className="flex-1 p-4 overflow-y-auto custom-scrollbar">{children}</main>
    </div>
  );
}

export default MainWrapper;

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      {/* <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" /> */}
      <div className="text-2xl font-bold text-white relative">
        <span className="relative -top-1 left-0">E</span>
        <span className="text-red-500 relative top-1 left-0">H</span>
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black-primary"
      >
        Event <span className="text-red-500">Horizon</span>
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-white py-1 relative z-20"
    >
      <div className="text-2xl font-bold text-white relative">
        <span className="relative -top-1 left-0">E</span>
        <span className="text-red-500 relative top-1 left-0">H</span>
      </div>
      {/* <div className="h-5 w-6 bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm shrink-0" /> */}
    </Link>
  );
};
