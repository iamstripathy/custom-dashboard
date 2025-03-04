
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { ArrowLeft, Plus, Trash2, FileText, UploadCloud, Info, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RequestForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("details");
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    justification: "",
    requestType: "",
    priority: "medium",
    dueDate: "",
  });
  
  // Items state - would be more complex in a real app
  const [items, setItems] = useState<any[]>([]);
  const [newItem, setNewItem] = useState({
    description: "",
    quantity: "",
    unitPrice: "",
    total: "",
  });
  
  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  
  // Add a new item to the list
  const handleAddItem = () => {
    // Calculate total
    const quantity = parseFloat(newItem.quantity) || 0;
    const unitPrice = parseFloat(newItem.unitPrice) || 0;
    const total = (quantity * unitPrice).toFixed(2);
    
    // Validate
    if (!newItem.description || !newItem.quantity || !newItem.unitPrice) {
      toast({
        title: "Missing information",
        description: "Please fill in all item fields before adding.",
        variant: "destructive",
      });
      return;
    }
    
    // Add to items list
    setItems([
      ...items,
      {
        ...newItem,
        total,
        id: Date.now(),
      },
    ]);
    
    // Reset the new item form
    setNewItem({
      description: "",
      quantity: "",
      unitPrice: "",
      total: "",
    });
  };
  
  // Remove an item from the list
  const handleRemoveItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  // Calculate total amount
  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2);
  };
  
  // Handle form submission
  const handleSubmit = (asDraft = false) => {
    // Validate form
    if (!asDraft && (!formData.title || !formData.department || !formData.requestType)) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    if (!asDraft && items.length === 0) {
      toast({
        title: "No items added",
        description: "Please add at least one item to your request.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, this would send the data to your API
    toast({
      title: asDraft ? "Draft saved" : "Request submitted",
      description: asDraft 
        ? "Your purchase request has been saved as a draft."
        : "Your purchase request has been submitted for approval.",
      variant: "default",
    });
    
    // Navigate back to the requests list
    navigate("/requests");
  };
  
  return (
    <PageLayout>
      <PageHeader
        heading="New Purchase Request"
        subheading="Create a request for procurement items"
        actions={
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        }
      />
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full animate-fade-in">
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="details">Request Details</TabsTrigger>
          <TabsTrigger value="items">Items & Pricing</TabsTrigger>
          <TabsTrigger value="attachments">Attachments & Notes</TabsTrigger>
        </TabsList>
        
        {/* Request Details Tab */}
        <TabsContent value="details" className="animate-fade-in space-y-6">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the core details about your procurement request
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="title">Request Title <span className="text-destructive">*</span></Label>
                  <Input 
                    id="title" 
                    placeholder="Enter a descriptive title" 
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department <span className="text-destructive">*</span></Label>
                  <Select 
                    value={formData.department} 
                    onValueChange={(value) => handleInputChange("department", value)}
                  >
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
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
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="justification">Business Justification</Label>
                <Textarea 
                  id="justification" 
                  placeholder="Explain why this purchase is needed..." 
                  className="min-h-[100px]"
                  value={formData.justification}
                  onChange={(e) => handleInputChange("justification", e.target.value)}
                />
              </div>
              
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="requestType">Request Type <span className="text-destructive">*</span></Label>
                  <Select 
                    value={formData.requestType} 
                    onValueChange={(value) => handleInputChange("requestType", value)}
                  >
                    <SelectTrigger id="requestType">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="goods">Goods</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                      <SelectItem value="hardware">Hardware</SelectItem>
                      <SelectItem value="subscription">Subscription</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select 
                    value={formData.priority} 
                    onValueChange={(value) => handleInputChange("priority", value)}
                  >
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Required By Date</Label>
                  <Input 
                    id="dueDate" 
                    type="date" 
                    value={formData.dueDate}
                    onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => handleSubmit(true)}>
                Save as Draft
              </Button>
              <Button onClick={() => setActiveTab("items")}>
                Continue to Items
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Items & Pricing Tab */}
        <TabsContent value="items" className="animate-fade-in space-y-6">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Items & Pricing</CardTitle>
              <CardDescription>
                Add the items you need to procure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add new item form */}
              <div className="grid gap-4 md:grid-cols-12 items-end border-b pb-4">
                <div className="md:col-span-5 space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Input 
                    id="description" 
                    placeholder="Item description" 
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input 
                    id="quantity" 
                    placeholder="Qty" 
                    type="number"
                    min="1"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="unitPrice">Unit Price</Label>
                  <Input 
                    id="unitPrice" 
                    placeholder="0.00" 
                    type="number"
                    min="0.01" 
                    step="0.01"
                    value={newItem.unitPrice}
                    onChange={(e) => setNewItem({...newItem, unitPrice: e.target.value})}
                  />
                </div>
                <div className="md:col-span-3 pt-2">
                  <Button onClick={handleAddItem} className="w-full">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Item
                  </Button>
                </div>
              </div>
              
              {/* Items list */}
              {items.length > 0 ? (
                <div>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Description</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.unitPrice}</TableCell>
                          <TableCell>${item.total}</TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow>
                        <TableCell colSpan={3} className="text-right font-medium">Total Amount</TableCell>
                        <TableCell className="font-medium">${calculateTotal()}</TableCell>
                        <TableCell></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground border border-dashed rounded-md">
                  <FileText className="mx-auto h-10 w-10 mb-3 text-muted-foreground/60" />
                  <h3 className="text-lg font-medium mb-1">No items added yet</h3>
                  <p>Add the items you wish to purchase above</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("details")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("attachments")}>
                Continue
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Attachments & Notes Tab */}
        <TabsContent value="attachments" className="animate-fade-in space-y-6">
          <Card className="hover-lift">
            <CardHeader>
              <CardTitle>Attachments & Additional Notes</CardTitle>
              <CardDescription>
                Add supporting documents and any special requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Attachments</Label>
                <div className="border border-dashed rounded-md p-8 text-center">
                  <UploadCloud className="mx-auto h-10 w-10 mb-3 text-muted-foreground/60" />
                  <h3 className="text-lg font-medium mb-1">Upload Files</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Drag & drop files or click to browse
                  </p>
                  <Button variant="secondary" size="sm">
                    Choose Files
                  </Button>
                  <input 
                    type="file" 
                    className="hidden" 
                    multiple 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea 
                  id="notes" 
                  placeholder="Any special requirements or additional information..." 
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="bg-muted/40 p-4 rounded-md flex items-start gap-3">
                <Info className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium mb-1">Next Steps</h4>
                  <p className="text-sm text-muted-foreground">
                    Once submitted, your request will be reviewed by your department head and the procurement team. 
                    You'll receive notifications about the status of your request.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("items")}>
                Back
              </Button>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => handleSubmit(true)}>
                  Save as Draft
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button>Submit Request</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Submit Purchase Request?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will send your request for review and approval. You won't be able to make changes after submission unless it's rejected or returned for clarification.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => handleSubmit(false)}>
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        Submit
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </PageLayout>
  );
};

export default RequestForm;
