import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BarChart3, Target, CreditCard, Settings, Home, Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation = ({ currentPage, onPageChange }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'expenses', label: 'Expenses', icon: CreditCard },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:block fixed left-6 top-6 bottom-6 w-64 z-40">
        <Card className="h-full bg-gradient-card border-0 shadow-xl p-6">
          <div className="space-y-6">
            {/* Logo */}
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto">
                <Home className="h-6 w-6 text-white" />
              </div>
              <h2 className="font-bold text-lg">Finance AI</h2>
              <p className="text-sm text-muted-foreground">Student Edition</p>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 h-12 ${
                      currentPage === item.id 
                        ? 'bg-gradient-primary shadow-glow' 
                        : 'hover:bg-accent/50'
                    }`}
                    onClick={() => onPageChange(item.id)}
                  >
                    <Icon className="h-5 w-5" />
                    {item.label}
                  </Button>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="p-4 bg-gradient-primary/10 rounded-lg border border-primary/20">
                <p className="text-sm text-center text-muted-foreground">
                  AI-powered insights for smarter spending
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-card border-b shadow-lg">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Home className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold">Finance AI</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMobileMenu}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileMenuOpen(false)} />
            <div className="fixed top-16 left-0 right-0 bg-gradient-card border-b shadow-xl p-4">
              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={currentPage === item.id ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 h-12 ${
                        currentPage === item.id 
                          ? 'bg-gradient-primary shadow-glow' 
                          : 'hover:bg-accent/50'
                      }`}
                      onClick={() => {
                        onPageChange(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      <Icon className="h-5 w-5" />
                      {item.label}
                    </Button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navigation;