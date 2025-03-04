
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Building, 
  Calendar, 
  FileText, 
  MessageSquare, 
  CheckCircle, 
  XCircle 
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

// Mock data for a request - would come from API in real app
const REQUEST_DATA = {
  id: "RFQ-2023-1286",
  title: "IT Hardware Procurement",
  requester: "Wade Warren",
  department: "IT",
  date: "2023-06-14",
  dueDate: "2023-07-10",
  status: "pending",
  amount: "$12,750.00",
  justification: "Our current workstations are 5+ years old and causing productivity issues due to slow performance. New equipment is needed for the engineering team to effectively run CAD software and development environments.",
  requestType: "Hardware",
  priority: "Medium",
  items: [
    { id: 1, description: "Dell XPS 15 Laptop (i7, 32GB RAM, 1TB SSD)", quantity: 5, unitPrice: "1,800.00", total: "9,000.00" },
    { id: 2, description: "27\" 4K Monitor", quantity: 5, unitPrice: "450.00", total: "2,250.00" },
    { id: 3, description: "Wireless Keyboard and Mouse Bundle", quantity: 5, unitPrice: "120.00", total: "600.00" },
    { id: 4, description: "Laptop Docking Station", quantity: 5, unitPrice: "180.00", total: "900.00" },
  ],
  attachments: [
    { id: 1, name: "Vendor_Quote.pdf", size: "2.3 MB", date: "2023-06-14" },
    { id: 2, name: "Technical_Specifications.xlsx", size: "1.1 MB", date: "2023-06-14" },
  ],
  timeline: [
    { id: 1, date: "2023-06-14 10:25", user: "Wade Warren", action: "Created request", comment: "Initial submission" },
    { id: 2, date: "2023-06-14 14:30", user: "System", action: "Sent for departmental approval", comment: null },
    { id: 3, date: "2023-06-15 09:15", user: "Esther Howard", action: "Requested clarification", comment: "Please provide more details on why we need the 4K monitors instead of standard displays." },
    { id: 4, date: "2023-06-15 11:45", user: "Wade Warren", action: "Provided clarification", comment: "The 4K monitors are needed for the design team to accurately work with high-resolution graphics and UI designs." },
    { id: 5, date: "2023-06-16 10:20", user: "Esther Howard", action: "Approved", comment: "Approved after clarification." },
    { id: 6, date: "2023-06-16 10:30", user: "System", action: "Sent for procurement approval", comment: null },
  ],
  approvers: [
    { id: 1, name: "Esther Howard", role: "IT Department Head", status: "approved", date: "2023-06-16" },
    { id: 2, name: "Cameron Williamson", role: "Procurement Manager", status: "pending", date: null },
    { id: 3, name: "Brooklyn Simmons", role: "Finance Director", status: "waiting", date: null },
  ]
};

const RequestDetail = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams<{ id: string }>();
  const [comment, setComment] = useState("");
  
  // In a real app, fetch the request data based on the ID
  const request = REQUEST_DATA; // mock data, would be fetched from API
  
  const handleApprove = () => {
    toast({
      title: "Request approved",
      description: "The request has been approved and moved to the next stage.",
    });
    navigate("/requests");
  };
  
  const handleReject = () => {
    toast({
      title: "Request rejected",
      description: "The request has been rejected and returned to the requester.",
      variant: "destructive",
    });
    navigate("/requests");
  };
  
  const handleComment = () => {
    if (!comment.trim()) {
      toast({
        title: "Empty comment",
        description: "Please enter a comment before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Comment added",
      description: "Your comment has been added to the request.",
    });
    
    setComment("");
  };

  return (
    <PageLayout>
      <PageHeader
        heading={request.title}
        subheading={`Request ID: ${request.id}`}
        actions={
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              onClick={() => navigate("/requests")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to List
            </Button>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Reject this request?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will return the request to the requester. Please provide a reason for rejection.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Textarea 
                  placeholder="Reason for rejection..."
                  className="min-h-[100px] my-4"
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleReject}>
                    Reject Request
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button>
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Approve this request?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will move the request to the next approval stage.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <Textarea 
                  placeholder="Optional comments..." 
                  className="min-h-[100px] my-4"
                />
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleApprove}>
                    Approve Request
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        }
      />
      
      {/* Status Banner */}
      <div className="mb-6 animate-slide-in-bottom [animation-delay:400ms]">
        <Alert className="bg-muted/50">
          <Clock className="h-4 w-4" />
          <AlertTitle>This request requires your action</AlertTitle>
          <AlertDescription>
            Please review and approve or reject this purchase request.
          </AlertDescription>
        </Alert>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Request Information */}
        <div className="lg:col-span-2 space-y-6 animate-slide-in-bottom [animation-delay:450ms]">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Request Information</CardTitle>
              <CardDescription>
                Details about this purchase request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 text-sm mb-6">
                <div>
                  <div className="text-muted-foreground mb-1 flex items-center">
                    <User className="mr-1 h-3.5 w-3.5" />
                    Requester
                  </div>
                  <div className="font-medium">{request.requester}</div>
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-1 flex items-center">
                    <Building className="mr-1 h-3.5 w-3.5" />
                    Department
                  </div>
                  <div className="font-medium">{request.department}</div>
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-1 flex items-center">
                    <Calendar className="mr-1 h-3.5 w-3.5" />
                    Submission Date
                  </div>
                  <div className="font-medium">{request.date}</div>
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-1 flex items-center">
                    <Calendar className="mr-1 h-3.5 w-3.5" />
                    Required By
                  </div>
                  <div className="font-medium">{request.dueDate}</div>
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-1 flex items-center">
                    <FileText className="mr-1 h-3.5 w-3.5" />
                    Request Type
                  </div>
                  <div className="font-medium">{request.requestType}</div>
                </div>
                
                <div>
                  <div className="text-muted-foreground mb-1">Status</div>
                  <StatusBadge variant={request.status as any} />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Business Justification</h3>
                  <div className="text-sm bg-muted/30 p-3 rounded-md">
                    {request.justification}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Items & Pricing</CardTitle>
              <CardDescription>
                Items requested for procurement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {request.items.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right">{item.quantity}</TableCell>
                      <TableCell className="text-right">${item.unitPrice}</TableCell>
                      <TableCell className="text-right">${item.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <tfoot>
                  <tr>
                    <td colSpan={3} className="px-4 py-2 text-right font-medium">Total Amount</td>
                    <td className="px-4 py-2 text-right font-medium">{request.amount}</td>
                  </tr>
                </tfoot>
              </Table>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Attachments</CardTitle>
              <CardDescription>
                Supporting documents for this request
              </CardDescription>
            </CardHeader>
            <CardContent>
              {request.attachments.length > 0 ? (
                <ul className="space-y-2">
                  {request.attachments.map((attachment) => (
                    <li 
                      key={attachment.id} 
                      className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/30 cursor-pointer"
                    >
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{attachment.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {attachment.size}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  No attachments for this request
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Sidebar Info */}
        <div className="space-y-6 animate-slide-in-bottom [animation-delay:500ms]">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Approval Status</CardTitle>
              <CardDescription>
                Current approval workflow status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {request.approvers.map((approver) => (
                  <li 
                    key={approver.id} 
                    className="flex items-start justify-between p-3 border rounded-md"
                  >
                    <div>
                      <div className="font-medium">{approver.name}</div>
                      <div className="text-sm text-muted-foreground">{approver.role}</div>
                    </div>
                    <div>
                      {approver.status === "approved" && (
                        <StatusBadge variant="approved">Approved</StatusBadge>
                      )}
                      {approver.status === "rejected" && (
                        <StatusBadge variant="rejected">Rejected</StatusBadge>
                      )}
                      {approver.status === "pending" && (
                        <StatusBadge variant="pending">Pending</StatusBadge>
                      )}
                      {approver.status === "waiting" && (
                        <StatusBadge variant="draft">Waiting</StatusBadge>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Add Comment</CardTitle>
              <CardDescription>
                Leave a note or ask for clarification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                placeholder="Type your comment here..." 
                className="min-h-[100px]"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button 
                className="w-full" 
                variant="outline"
                onClick={handleComment}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Add Comment
              </Button>
            </CardContent>
          </Card>
          
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>
                Recent activity on this request
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative pl-6 space-y-6">
                <div className="absolute left-2 top-0 bottom-0 w-px bg-border">
                </div>
                
                {request.timeline.slice(0, 3).map((event, i) => (
                  <div key={event.id} className="relative">
                    <div className="absolute -left-[20.5px] top-0 h-4 w-4 rounded-full bg-background border-2 border-primary"></div>
                    <div className="text-sm">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{event.action}</span>
                        <span className="text-xs text-muted-foreground">{event.date}</span>
                      </div>
                      <div className="text-muted-foreground">{event.user}</div>
                      {event.comment && (
                        <div className="mt-1 bg-muted/30 p-2 rounded-md text-xs">
                          {event.comment}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                
                {request.timeline.length > 3 && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-xs w-full mt-2"
                  >
                    View Full History
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default RequestDetail;
