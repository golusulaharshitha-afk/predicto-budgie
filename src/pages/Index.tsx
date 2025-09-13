import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Dashboard from '@/components/Dashboard';
import ExpenseTracker from '@/components/ExpenseTracker';
import GoalTracker from '@/components/GoalTracker';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings as SettingsIcon, User, Bell, Lock, Database } from 'lucide-react';

const Settings = () => (
  <div className="min-h-screen bg-gradient-background p-6">
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              For full backend functionality including user authentication, data storage, and AI features, connect your project to Supabase using our native integration.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Budget alerts and spending insights will be available once backend integration is set up.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Secure authentication and data encryption will be enabled with Supabase integration.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-primary" />
              Data & AI Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Advanced AI categorization, predictive analytics, and data persistence require backend setup.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
);

const Index = () => {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'expenses':
        return <ExpenseTracker />;
      case 'goals':
        return <GoalTracker />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      
      {/* Main Content */}
      <div className="md:ml-80">
        <div className="md:pt-0 pt-16">
          {renderCurrentPage()}
        </div>
      </div>
    </div>
  );
};

export default Index;