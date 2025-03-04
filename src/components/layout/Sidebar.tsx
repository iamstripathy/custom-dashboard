
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home, ShoppingCart, FileText, Users, Settings, Package, Clock, BarChart, MessageSquare } from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: ShoppingCart, label: "Purchase Requests", path: "/requests" },
    { icon: MessageSquare, label: "Negotiations", path: "/negotiations" },
    { icon: FileText, label: "Purchase Orders", path: "/orders" },
    { icon: Users, label: "Suppliers", path: "/suppliers" },
    { icon: Clock, label: "Order Tracking", path: "/tracking" },
    { icon: Package, label: "Inventory", path: "/inventory" },
    { icon: BarChart, label: "Reports", path: "/reports" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <SidebarComponent>
      <SidebarHeader className="p-4 flex items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center text-primary-foreground font-medium">
            P
          </div>
          <div className="font-medium text-lg">ProcureFlow</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.path}
                      className={({ isActive }) => 
                        isActive ? "text-primary" : "text-sidebar-foreground hover:text-primary transition-colors"
                      }
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
            <Users size={14} />
          </div>
          <div className="text-sm">
            <div className="font-medium">John Doe</div>
            <div className="text-xs text-muted-foreground">Procurement Manager</div>
          </div>
        </div>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
