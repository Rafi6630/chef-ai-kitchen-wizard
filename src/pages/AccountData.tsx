
import { useState } from "react";
import { Button } from "@/components/ui/button";
import AppLayout from "@/components/layout/AppLayout";
import { ArrowLeft, Download, Trash2, Database, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function AccountData() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const { toast } = useToast();
  
  const handleDownloadData = () => {
    setIsDownloading(true);
    
    // In a real app, this would trigger an API call to generate and download the data
    setTimeout(() => {
      setIsDownloading(false);
      toast({
        title: "Data Export Initiated",
        description: "Your data export has been initiated. You will receive an email with download instructions shortly."
      });
    }, 2000);
  };
  
  const handleDeleteRequest = () => {
    setIsDeleting(true);
    
    // In a real app, this would trigger an API call to delete the account
    setTimeout(() => {
      setIsDeleting(false);
      setConfirmDialogOpen(false);
      toast({
        title: "Account Deletion Requested",
        description: "Your account deletion has been requested. You will receive a confirmation email with further instructions."
      });
    }, 2000);
  };
  
  return (
    <AppLayout>
      <header className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center mb-1">
          <Link to="/settings" className="mr-3">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft size={20} />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Manage Your Data</h1>
        </div>
        <p className="text-gray-600 text-sm">Download or delete your account data</p>
      </header>
      
      <main className="p-6">
        <div className="space-y-6">
          {/* Download Data */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-blue-100 p-3">
                <Download size={24} className="text-blue-500" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-lg">Download Your Data</h2>
                <p className="text-gray-600 mt-1 mb-4">
                  Get a copy of all the data Chef AI has stored about you, including your profile information,
                  saved recipes, cooking history, and preferences.
                </p>
                <Button 
                  onClick={handleDownloadData}
                  disabled={isDownloading}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {isDownloading ? "Processing..." : "Request Data Download"}
                </Button>
              </div>
            </div>
          </div>
          
          {/* Delete Account */}
          <div className="bg-white rounded-xl p-5 shadow-sm">
            <div className="flex items-start space-x-4">
              <div className="rounded-full bg-red-100 p-3">
                <Trash2 size={24} className="text-red-500" />
              </div>
              <div className="flex-1">
                <h2 className="font-semibold text-lg">Delete Your Account</h2>
                <p className="text-gray-600 mt-1 mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                
                <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="destructive">
                      Request Account Deletion
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <AlertCircle size={18} className="text-red-500" />
                        Confirm Account Deletion
                      </DialogTitle>
                      <DialogDescription>
                        This action is permanent and cannot be undone. All your data, including profile information,
                        saved recipes, and cooking history will be permanently deleted.
                      </DialogDescription>
                    </DialogHeader>
                    
                    <div className="space-y-4 py-2">
                      <p className="text-sm text-gray-600">
                        To confirm, please type "DELETE MY ACCOUNT" in the field below:
                      </p>
                      <Input
                        value={deleteConfirmation}
                        onChange={(e) => setDeleteConfirmation(e.target.value)}
                        placeholder="Type DELETE MY ACCOUNT"
                      />
                    </div>
                    
                    <DialogFooter>
                      <Button 
                        variant="ghost" 
                        onClick={() => setConfirmDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        variant="destructive"
                        disabled={deleteConfirmation !== "DELETE MY ACCOUNT" || isDeleting}
                        onClick={handleDeleteRequest}
                      >
                        {isDeleting ? "Processing..." : "Permanently Delete Account"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          
          {/* Data Storage Info */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <div className="flex items-start space-x-3">
              <Database size={20} className="text-gray-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium">How We Store Your Data</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Your data is securely stored and processed in accordance with our
                  <Link to="/privacy" className="text-chef-primary"> Privacy Policy</Link>. 
                  We use industry-standard encryption and security measures to protect your personal information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </AppLayout>
  );
}
