// config/sidebarItems.js
import { 
  LayoutDashboard, Book, User, Package, BarChart, 
  Bell, Mail, Settings, LifeBuoy 
} from "lucide-react";

export const sidebarItems = {
  ADMIN: [
    { icon: <LayoutDashboard size={20} />, text: "Dashboard", path: "/private/dashboard" },
    { icon: <Book size={20} />, text: "Books Management", path: "/private/books" },
    { icon: <User size={20} />, text: "Users", path: "/private/users" },
    { icon: <Package size={20} />, text: "Exemplaires", path: "/private/orders" },
    { icon: <BarChart size={20} />, text: "Analytics", path: "/private/analytics" },
    { icon: <Bell size={20} />, text: "Book Detail", path: "/private/notifications", alert: true },
    { icon: <Mail size={20} />, text: "Messages", path: "/private/messages" },
    { divider: true },
    { icon: <Settings size={20} />, text: "Settings", path: "/private/settings" },
    { icon: <LifeBuoy size={20} />, text: "Help", path: "/private/help" }
  ],

  LIBRARIAN: [
    { icon: <LayoutDashboard size={20} />, text: "Dashboard", path: "/private/librarian-dashboard" },
    { icon: <Book size={20} />, text: "Books", path: "/private/books" },
    { icon: <Package size={20} />, text: "Orders", path: "/private/orders" },
    { divider: true },
    { icon: <Bell size={20} />, text: "Notifications", path: "/private/notifications" },
  ],

  MEMBER: [
    { icon: <Book size={20} />, text: "UserView", path: "/private/user-view" },
    { icon: <Package size={20} />, text: "Mes emprunts", path: "/private/my-borrows" },
    { divider: true },
    { icon: <User size={20} />, text: "UserProfil", path: "/private/current-profile" },
  ]
};
