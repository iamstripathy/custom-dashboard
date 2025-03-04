
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { Plus, ChevronRight, BarChart3, Clock, ShoppingCart, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  // Dashboard stats data (would come from an API in a real app)
  const stats = [
    { label: "Open Requests", value: "18", icon: ShoppingCart, color: "bg-blue-50 dark:bg-blue-900/30" },
    { label: "Pending Approvals", value: "7", icon: Clock, color: "bg-amber-50 dark:bg-amber-900/30" },
    { label: "Active POs", value: "12", icon: FileText, color: "bg-emerald-50 dark:bg-emerald-900/30" },
    { label: "Monthly Savings", value: "$24,500", icon: BarChart3, color: "bg-violet-50 dark:bg-violet-900/30" },
  ];
  
  // Recent requests data (would come from an API in a real app)
  const recentRequests = [
    { id: "RFQ-2023-1287", title: "Office Supplies Bulk Order", status: "approved", date: "2023-06-15", amount: "$1,250" },
    { id: "RFQ-2023-1286", title: "IT Hardware Procurement", status: "pending", date: "2023-06-14", amount: "$12,750" },
    { id: "RFQ-2023-1285", title: "Software Licenses Renewal", status: "draft", date: "2023-06-13", amount: "$8,500" },
    { id: "RFQ-2023-1284", title: "Marketing Materials", status: "rejected", date: "2023-06-12", amount: "$3,200" },
    { id: "RFQ-2023-1283", title: "Staff Training Services", status: "completed", date: "2023-06-10", amount: "$5,800" },
  ];

  return (
    <PageLayout>
      <PageHeader
        heading="Dashboard"
        subheading="Overview of your procurement activities"
        actions={
          <Button onClick={() => navigate("/requests/new")}>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        }
      />
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 animate-slide-in-bottom [animation-delay:400ms]">
        {stats.map((stat, index) => (
          <Card key={index} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-semibold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-full ${stat.color}`}>
                  <stat.icon className="h-5 w-5 text-foreground opacity-80" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Recent Requests */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-slide-in-bottom [animation-delay:500ms]">
        <Card className="lg:col-span-2 hover-lift">
          <CardHeader className="pb-3">
            <CardTitle>Recent Requests</CardTitle>
            <CardDescription>Your latest procurement requests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-3 rounded-lg border bg-card/50 hover:bg-card/80 transition-colors cursor-pointer"
                  onClick={() => navigate(`/requests/${request.id}`)}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{request.id}</span>
                      <StatusBadge variant={request.status as any} />
                    </div>
                    <p className="text-sm mt-1">{request.title}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{request.amount}</div>
                    <div className="text-sm text-muted-foreground">{request.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={() => navigate("/requests")}
            >
              View All Requests
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        {/* Quick Actions Card */}
        <Card className="hover-lift">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common procurement tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/requests/new")}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create Purchase Request
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/suppliers")}
            >
              <Users className="mr-2 h-4 w-4" />
              Manage Suppliers
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/orders")}
            >
              <FileText className="mr-2 h-4 w-4" />
              View Purchase Orders
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start"
              onClick={() => navigate("/reports")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Generate Reports
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
