
import React, { useState } from 'react';
import { Check, X, Eye, Users, Clock, Shield } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import ProviderDetailsModal from '@/components/ProviderDetailsModal';

const AdminDashboard = () => {
  const { toast } = useToast();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [pendingProviders, setPendingProviders] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@photography.com",
      service: "Photography",
      experience: "5 years",
      status: "pending",
      appliedDate: "2024-01-15",
      portfolio: "/placeholder.svg"
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike@videopro.com",
      service: "Videography",
      experience: "3 years",
      status: "pending",
      appliedDate: "2024-01-14",
      portfolio: "/placeholder.svg"
    },
    {
      id: 3,
      name: "Emily Davis",
      email: "emily@catering.com",
      service: "Catering",
      experience: "7 years",
      status: "pending",
      appliedDate: "2024-01-13",
      portfolio: "/placeholder.svg"
    }
  ]);

  const handleApprove = (providerId: number) => {
    setPendingProviders(prev => 
      prev.map(provider => 
        provider.id === providerId 
          ? { ...provider, status: 'approved' }
          : provider
      )
    );
    setSelectedProvider(null);
    toast({
      title: 'Provider Approved',
      description: 'The service provider has been approved and can now offer services.',
    });
  };

  const handleReject = (providerId: number) => {
    setPendingProviders(prev => 
      prev.map(provider => 
        provider.id === providerId 
          ? { ...provider, status: 'rejected' }
          : provider
      )
    );
    setSelectedProvider(null);
    toast({
      title: 'Provider Rejected',
      description: 'The service provider application has been rejected.',
      variant: 'destructive',
    });
  };

  const handleViewDetails = (provider) => {
    setSelectedProvider(provider);
  };

  const pendingCount = pendingProviders.filter(p => p.status === 'pending').length;
  const approvedCount = pendingProviders.filter(p => p.status === 'approved').length;
  const rejectedCount = pendingProviders.filter(p => p.status === 'rejected').length;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <Shield className="mr-3 h-8 w-8 text-red-600" />
              Admin Dashboard
            </h1>
            <p className="text-gray-600">Manage service provider applications and approvals</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-6 text-center">
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Pending Reviews</h3>
                <p className="text-2xl font-bold">{pendingCount}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
              <CardContent className="p-6 text-center">
                <Check className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Approved Providers</h3>
                <p className="text-2xl font-bold">{approvedCount}</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 mx-auto mb-2" />
                <h3 className="text-lg font-semibold mb-1">Total Applications</h3>
                <p className="text-2xl font-bold">{pendingProviders.length}</p>
              </CardContent>
            </Card>
          </div>

          {/* Provider Applications */}
          <Card>
            <CardHeader>
              <CardTitle>Service Provider Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingProviders.map((provider) => (
                  <div key={provider.id} className="border rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center space-x-4">
                        <img 
                          src={provider.portfolio} 
                          alt={`${provider.name}'s portfolio`}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold">{provider.name}</h3>
                          <p className="text-gray-600">{provider.email}</p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-sm text-gray-500">
                              Service: {provider.service}
                            </span>
                            <span className="text-sm text-gray-500">
                              Experience: {provider.experience}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            Applied: {provider.appliedDate}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Badge 
                          variant={
                            provider.status === 'approved' ? 'default' :
                            provider.status === 'rejected' ? 'destructive' : 
                            'secondary'
                          }
                        >
                          {provider.status}
                        </Badge>
                        
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex items-center"
                          onClick={() => handleViewDetails(provider)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        
                        {provider.status === 'pending' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(provider.id)}
                              className="bg-green-600 hover:bg-green-700 text-white flex items-center"
                            >
                              <Check className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleReject(provider.id)}
                              variant="destructive"
                              className="flex items-center"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />

      {/* Provider Details Modal */}
      <ProviderDetailsModal
        provider={selectedProvider}
        onClose={() => setSelectedProvider(null)}
        onApprove={handleApprove}
        onReject={handleReject}
      />
    </div>
  );
};

export default AdminDashboard;
