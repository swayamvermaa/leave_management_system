import {
  FaHome,
  FaFileAlt,
  FaHistory,
  FaUsers,
  FaUserPlus,
  FaUserCircle,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { FaCog } from "react-icons/fa";

export const sidebarMenus = {
  student: [
    {
      name: "Dashboard",
      path: "/student-dashboard",
      icon: FaHome,
    },
    {
      name: "Apply Leave",
      path: "/apply-leave",
      icon: FaFileAlt,
    },
    {
      name: "Leave History",
      path: "/leave-history",
      icon: FaHistory,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: FaUsers,
    },
    {
      name: "Approved Leaves",
      path: "/approved-leaves",
      icon: FaCheckCircle,
    },
    {
        name: "Settings",
        path: "/settings",
        icon: FaCog,
    },
  ],

  admin: [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: FaHome,
    },
    {
      name: "Manage Users",
      path: "/manage-users",
      icon: FaUsers,
    },
    {
      name: "Create User",
      path: "/create-user",
      icon: FaUsers,
    },
    {
      name: "Manage Events",
      path: "/admin/events",
      icon: FaCalendarAlt,
    },
    {
      name: "My Profile",
      path: "/admin-profile",
      icon: FaUserCircle,
    },
        {
        name: "Settings",
        path: "/settings",
        icon: FaCog,
    },
  ],

  organizer: [
    {
      name: "Dashboard",
      path: "/organizer-dashboard",
      icon: FaHome,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: FaUsers,
    },
    {
    name: "Settings",
    path: "/settings",
    icon: FaCog,
},
  ],

  mentor: [
    {
      name: "Dashboard",
      path: "/mentor-dashboard",
      icon: FaHome,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: FaUsers,
    },
    {
    name: "Settings",
    path: "/settings",
    icon: FaCog,
},
  ],

  hod: [
    {
      name: "Dashboard",
      path: "/hod-dashboard",
      icon: FaHome,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: FaUsers,
    },
    {
        name: "Settings",
        path: "/settings",
        icon: FaCog,
    },
  ],
};