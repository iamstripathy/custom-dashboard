
import React from "react";
import PageLayout from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, FileText, Clock, CheckCircle, XCircle, DollarSign, Users as UsersIcon } from "lucide-react";

// Sample data for charts
const procurementData = [
  { month: "Jan", requests: 14, approved: 12, rejected: 2 },
  { month: "Feb", requests: 19, approved: 15, rejected: 4 },
  { month: "Mar", requests: 23, approved: 20, rejected: 3 },
  { month: "Apr", requests: 18, approved: 14, rejected: 4 },
  { month: "May", requests: 25, approved: 22, rejected: 3 },
  { month: "Jun", requests: 28, approved: 24, rejected: 4 },
];

// Sample data for top vendors
const topVendors = [
  { name: "Acme Supplies Inc.", spend: "$45,280", category: "Office Supplies" },
  { name: "TechPro Solutions", spend: "$38,750", category: "IT Hardware" },
  { name: "Global Software Ltd", spend: "$32,400", category: "Software" },
  { name: "Meridian Services", spend: "$28,900", category: "Consulting" },
  { name: "Prime Logistics", spend: "$26,340", category: "Shipping" },
];

// Sample data for recent requests
const recentRequests = [
  { id: "RFQ-2023-1287", title: "Office Supplies Bulk Order", requester: "Jane Cooper", date: "2023-06-15", status: "approved", amount: "$1,250" },
  { id: "RFQ-2023-1286", title: "IT Hardware Procurement", requester: "Wade Warren", date: "2023-06-14", status: "pending", amount: "$12,750" },
  { id: "RFQ-2023-1285", title: "Software Licenses Renewal", requester: "Esther Howard", date: "2023-06-13", status: "draft", amount: "$8,500" },
  { id: "RFQ-2023-1284", title: "Marketing Materials", requester: "Cameron Williamson", date: "2023-06-12", status: "rejected", amount: "$3,200" },
];

const Dashboard = () => {
  return (
    <PageLayout>
      <PageHeader
        heading="Dashboard"
        subheading="Overview of procurement activities and metrics"
        actions={
          <Button asChild>
            <Link to="/requests/new">
              <FileText className="mr-2 h-4 w-4" />
              New Request
            </Link>
          </Button>
        }
      />
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6 animate-slide-in-bottom [animation-delay:400ms]">
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">127</div>
            <p className="text-xs text-muted-foreground">
              +18% from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approval</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              5 awaiting your review
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$284,543</div>
            <p className="text-xs text-muted-foreground">
              +12% from last quarter
            </p>
          </CardContent>
        </Card>
        
        <Card className="hover-lift">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38</div>
            <p className="text-xs text-muted-foreground">
              3 new this month
            </p>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs for different views */}
      <Tabs defaultValue="overview" className="space-y-4 animate-slide-in-bottom [animation-delay:450ms]">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="requests">Requests</TabsTrigger>
          <TabsTrigger value="spend">Spend Analysis</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Procurement Activity Chart */}
            <Card className="hover-lift col-span-2">
              <CardHeader>
                <CardTitle>Procurement Activity</CardTitle>
                <CardDescription>
                  Monthly procurement requests and approval rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={procurementData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="requests" name="Total Requests" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="approved" name="Approved" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="rejected" name="Rejected" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            {/* Top Vendors */}
            <Card className="hover-lift">
              <CardHeader>
                <CardTitle>Top Vendors</CardTitle>
                <CardDescription>
                  Vendors with highest spend this quarter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topVendors.map((vendor) => (
                    <div key={vendor.name} className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {vendor.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {vendor.category}
                        </p>
                      </div>
                      <div className="text-sm font-medium">{vendor.spend}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Recent Requests */}
            <Card className="hover-lift">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Requests</CardTitle>
                  <CardDescription>
                    Latest procurement requests
                  </CardDescription>
                </div>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/requests">
                    View All
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentRequests.map((request) => (
                    <div key={request.id} className="flex items-center">
                      {request.status === "approved" && (
                        <CheckCircle className="h-4 w-4 text-emerald-500 mr-2 flex-shrink-0" />
                      )}
                      {request.status === "pending" && (
                        <Clock className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                      )}
                      {request.status === "rejected" && (
                        <XCircle className="h-4 w-4 text-rose-500 mr-2 flex-shrink-0" />
                      )}
                      {request.status === "draft" && (
                        <FileText className="h-4 w-4 text-slate-500 mr-2 flex-shrink-0" />
                      )}
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {request.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {request.id} • {request.date}
                        </p>
                      </div>
                      <div className="text-sm font-medium">{request.amount}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Request Analytics</CardTitle>
              <CardDescription>
                Analyze procurement requests by department and category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Detailed request analytics would go here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Spend Analysis Tab */}
        <TabsContent value="spend" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Spend Analysis</CardTitle>
              <CardDescription>
                Analysis of procurement spend by category and time period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center py-8 text-muted-foreground">
                Spend analysis charts would go here
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default Dashboard;
