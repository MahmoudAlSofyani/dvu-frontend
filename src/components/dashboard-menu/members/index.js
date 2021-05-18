import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiOutlineHome, AiOutlineLock } from "react-icons/ai";
import { MdForum, MdAnnouncement } from "react-icons/md";
import { BsCalendar, BsGear } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { RiAdvertisementLine } from "react-icons/ri";
const MemberDashboardMenu = () => {
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem("isAdmin"));

  const router = useRouter();

  // useEffect(() => {
  //   try {
  //     axios
  //       .post("/members/role", { id: currentUser.id, role: "Admin" })
  //       .then((_response) => {
  //         if (_response.status === 200) {
  //           const { _isRoleExist } = _response.data;

  //           if (_isRoleExist) setIsAdmin(true);
  //           else setIsAdmin(false);
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, [setIsAdmin, currentUser.id]);

  return (
    <div className="fixed right-0 left-0 bottom-0 flex items-center justify-between p-3 bg-darkGray">
      <Link href="/dashboard/members/forums">
        <MdForum
          className={`cursor-pointer ${
            router.pathname === "/dashboard/members/forums"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </Link>
      <Link href="/dashboard/members/events">
        <BsCalendar
          className={`cursor-pointer ${
            router.pathname === "/dashboard/members/events"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </Link>
      <Link href="/dashboard/members/announcements">
        <MdAnnouncement
          className={`cursor-pointer ${
            router.pathname === "/dashboard/members/announcements"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </Link>
      <Link href="/dashboard/members">
        <AiOutlineHome
          className={`cursor-pointer ${
            router.pathname === "/dashboard/members"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </Link>
      <Link href="/dashboard/members/settings">
        <BsGear
          className={`cursor-pointer ${
            router.pathname === "/dashboard/members/settings"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </Link>
      <Link href="/dashboard/members/profile">
        <CgProfile
          className={`cursor-pointer ${
            router.pathname === "/dashboard/members/profile"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </Link>
      <Link href="/dashboard/members/advertisements">
        <RiAdvertisementLine
          className={`cursor-pointer ${
            router.pathname === "/dashboard/members/advertisements"
              ? "text-white text-4xl"
              : "text-red text-3xl"
          }`}
        />
      </Link>
      {isAdmin ? (
        <Link href="/dashboard/members/admin">
          <AiOutlineLock
            className={`cursor-pointer ${
              router.pathname === "/dashboard/members/admin"
                ? "text-white text-4xl"
                : "text-red text-3xl"
            }`}
          />
        </Link>
      ) : null}
    </div>
  );
};

export default MemberDashboardMenu;
