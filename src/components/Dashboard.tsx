import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, TrendingDown, Target, AlertTriangle, DollarSign, PiggyBank } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  // Mock data for demonstration
  const expenseData = [
    { name: 'Food', value: 35, amount: 420 },
    { name: 'Transportation', value: 20, amount: 240 },
    { name: 'Entertainment', value: 15, amount: 180 },
    { name: 'Books', value: 10, amount: 120 },
    { name: 'Other', value: 20, amount: 240 },
  ];

  const monthlySpending = [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1100 },
    { month: 'Mar', amount: 1300 },
    { month: 'Apr', amount: 1200 },
    { month: 'May', amount: 1400 },
    { month: 'Jun', amount: 1200 },
  ];

  const predictionData = [
    { month: 'Jul', amount: 1250 },
    { month: 'Aug', amount: 1300 },
    { month: 'Sep', amount: 1200 },
  ];

  const goals = [
    { name: 'Emergency Fund', target: 2000, current: 800, progress: 40 },
    { name: 'New Laptop', target: 1200, current: 600, progress: 50 },
    { name: 'Spring Break', target: 800, current: 200, progress: 25 },
  ];

  const COLORS = ['hsl(var(--purple-vibrant))', 'hsl(var(--blue-electric))', 'hsl(var(--green-neon))', 'hsl(var(--orange-bright))', 'hsl(var(--pink-vibrant))'];

  return (
    <div className="min-h-screen bg-gradient-background p-4 md:p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-instagram bg-clip-text text-transparent animate-bounce-in">
            Student Finance Manager
          </h1>
          <p className="text-lg text-gray-700 font-medium animate-scale-in">✨ AI-powered financial insights for students ✨</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gradient-blue rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-3xl animate-scale-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/90 font-medium">Monthly Budget</p>
                <p className="text-3xl font-bold text-white mt-2">$1,500</p>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-orange rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-3xl animate-scale-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/90 font-medium">Spent This Month</p>
                <p className="text-3xl font-bold text-white mt-2">$1,200</p>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl">
                <TrendingDown className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-purple rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-3xl animate-scale-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/90 font-medium">Total Savings</p>
                <p className="text-3xl font-bold text-white mt-2">$1,600</p>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl">
                <PiggyBank className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-instagram rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300 hover:shadow-3xl animate-scale-in">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-white/90 font-medium">Budget Remaining</p>
                <p className="text-3xl font-bold text-white mt-2">$300</p>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Expense Categories */}
          <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <CardHeader className="bg-gradient-instagram text-white p-8">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="w-4 h-4 rounded-full bg-white animate-pulse-slow"></div>
                Expense Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={8}
                    dataKey="value"
                  >
                    {expenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-3 mt-6">
                {expenseData.map((item, index) => (
                  <div key={item.name} className="flex items-center gap-3 p-3 bg-gradient-to-r from-white to-gray-50 rounded-2xl shadow-sm">
                    <div 
                      className="w-4 h-4 rounded-full shadow-md" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Spending Trend */}
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-gradient-primary"></div>
                Spending Trend & Predictions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[...monthlySpending, ...predictionData]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Amount']} />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="hsl(var(--purple-vibrant))" 
                    strokeWidth={3}
                    dot={{ fill: 'hsl(var(--purple-vibrant))', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Goals and Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Goals Tracking */}
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" />
                Financial Goals
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.name} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{goal.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ${goal.current} / ${goal.target}
                    </span>
                  </div>
                  <Progress value={goal.progress} className="h-2" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{goal.progress}% complete</span>
                    <span className="text-success">${goal.target - goal.current} to go</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Budget Alerts */}
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                Budget Alerts & Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />
                  <div>
                    <p className="font-medium text-warning">High Entertainment Spending</p>
                    <p className="text-sm text-muted-foreground">
                      You've spent 20% more on entertainment this month compared to last month.
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                <div className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-success mt-0.5" />
                  <div>
                    <p className="font-medium text-success">Great Savings Progress!</p>
                    <p className="text-sm text-muted-foreground">
                      You're on track to save $200 this month. Keep it up!
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-info/10 rounded-lg border border-info/20">
                <div className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-info mt-0.5" />
                  <div>
                    <p className="font-medium text-info">AI Prediction</p>
                    <p className="text-sm text-muted-foreground">
                      Based on your spending pattern, you'll likely spend $1,250 next month.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;