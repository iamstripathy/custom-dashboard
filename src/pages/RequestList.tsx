
import React, { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { StatusBadge } from "@/components/ui/status-badge";
import { Plus, Search, Filter, Download } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample data - would come from API in real app
const requests = [
  { id: "RFQ-2023-1287", title: "Office Supplies Bulk Order", requester: "Jane Cooper", department: "Administration", date: "2023-06-15", status: "approved", amount: "$1,250" },
  { id: "RFQ-2023-1286", title: "IT Hardware Procurement", requester: "Wade Warren", department: "IT", date: "2023-06-14", status: "pending", amount: "$12,750" },
  { id: "RFQ-2023-1285", title: "Software Licenses Renewal", requester: "Esther Howard", department: "IT", date: "2023-06-13", status: "draft", amount: "$8,500" },
  { id: "RFQ-2023-1284", title: "Marketing Materials", requester: "Cameron Williamson", department: "Marketing", date: "2023-06-12", status: "rejected", amount: "$3,200" },
  { id: "RFQ-2023-1283", title: "Staff Training Services", requester: "Brooklyn Simmons", department: "HR", date: "2023-06-10", status: "completed", amount: "$5,800" },
  { id: "RFQ-2023-1282", title: "Conference Equipment Rental", requester: "Leslie Alexander", department: "Sales", date: "2023-06-08", status: "approved", amount: "$2,350" },
  { id: "RFQ-2023-1281", title: "Building Maintenance Services", requester: "Jacob Jones", department: "Facilities", date: "2023-06-07", status: "completed", amount: "$15,700" },
  { id: "RFQ-2023-1280", title: "Research Database Subscription", requester: "Devon Lane", department: "Research", date: "2023-06-05", status: "pending", amount: "$7,900" },
  { id: "RFQ-2023-1279", title: "Travel Arrangements", requester: "Courtney Henry", department: "Executive", date: "2023-06-03", status: "approved", amount: "$4,250" },
  { id: "RFQ-2023-1278", title: "Legal Consultation Services", requester: "Theresa Webb", department: "Legal", date: "2023-06-01", status: "pending", amount: "$10,800" },
];

const RequestList = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  
  // Filter the requests based on search query and filters
  const filteredRequests = requests.filter(request => {
    // Search query filter
    const matchesSearch = 
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.requester.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    
    // Department filter
    const matchesDepartment = 
      departmentFilter === "all" || 
      request.department.toLowerCase() === departmentFilter.toLowerCase();
    
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  return (
    <PageLayout>
      <PageHeader
        heading="Purchase Requests"
        subheading="Manage and track all procurement requests"
        actions={
          <Button onClick={() => navigate("/requests/new")}>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        }
      />
      
      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6 animate-slide-in-bottom [animation-delay:400ms]">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search requests..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex flex-1 gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="administration">Administration</SelectItem>
              <SelectItem value="it">IT</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="hr">HR</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
              <SelectItem value="facilities">Facilities</SelectItem>
              <SelectItem value="research">Research</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
              <SelectItem value="legal">Legal</SelectItem>
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
                setDepartmentFilter("all");
              }}>
                Clear Filters
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {}}>
                <Download className="mr-2 h-4 w-4" />
                Export
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      
      {/* Requests table */}
      <div className="rounded-md border animate-slide-in-bottom [animation-delay:500ms]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Request ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Requester</TableHead>
              <TableHead className="hidden lg:table-cell">Department</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRequests.map((request) => (
              <TableRow 
                key={request.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => navigate(`/requests/${request.id}`)}
              >
                <TableCell className="font-medium">{request.id}</TableCell>
                <TableCell>{request.title}</TableCell>
                <TableCell className="hidden md:table-cell">{request.requester}</TableCell>
                <TableCell className="hidden lg:table-cell">{request.department}</TableCell>
                <TableCell className="hidden md:table-cell">{request.date}</TableCell>
                <TableCell>
                  <StatusBadge variant={request.status as any} />
                </TableCell>
                <TableCell className="text-right">{request.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {filteredRequests.length === 0 && (
        <div className="bg-muted/40 border rounded-lg p-8 text-center my-6 animate-fade-in">
          <h3 className="text-lg font-medium mb-2">No requests found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search or filters, or create a new request.
          </p>
          <Button onClick={() => navigate("/requests/new")}>
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Button>
        </div>
      )}
    </PageLayout>
  );
};

export default RequestList;
