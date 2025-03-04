
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="max-w-md w-full p-8 text-center">
        <div className="rounded-full bg-muted/50 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
          <span className="text-4xl font-light">404</span>
        </div>
        <h1 className="text-3xl font-medium mb-3">Page not found</h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button onClick={() => navigate("/")} className="gap-2">
          <Home size={16} />
          Return to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
