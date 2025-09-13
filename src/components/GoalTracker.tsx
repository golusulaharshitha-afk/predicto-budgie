import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Target, Plus, TrendingUp, Calendar, DollarSign, Star } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const GoalTracker = () => {
  const { toast } = useToast();
  const [goals, setGoals] = useState([
    { 
      id: 1, 
      name: 'Emergency Fund', 
      target: 2000, 
      current: 800, 
      deadline: '2024-06-30',
      category: 'Savings',
      priority: 'High'
    },
    { 
      id: 2, 
      name: 'New Laptop', 
      target: 1200, 
      current: 600, 
      deadline: '2024-05-15',
      category: 'Technology',
      priority: 'Medium'
    },
    { 
      id: 3, 
      name: 'Spring Break Trip', 
      target: 800, 
      current: 200, 
      deadline: '2024-03-01',
      category: 'Travel',
      priority: 'Low'
    },
    { 
      id: 4, 
      name: 'Course Certification', 
      target: 300, 
      current: 150, 
      deadline: '2024-04-20',
      category: 'Education',
      priority: 'High'
    }
  ]);

  const [newGoal, setNewGoal] = useState({
    name: '',
    target: '',
    deadline: '',
    category: 'Savings',
    priority: 'Medium'
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const categories = ['Savings', 'Technology', 'Travel', 'Education', 'Health', 'Other'];
  const priorities = ['High', 'Medium', 'Low'];

  const priorityColors = {
    'High': 'bg-destructive text-destructive-foreground',
    'Medium': 'bg-warning text-warning-foreground',
    'Low': 'bg-success text-success-foreground'
  };

  const categoryColors = {
    'Savings': 'bg-primary text-primary-foreground',
    'Technology': 'bg-info text-info-foreground',
    'Travel': 'bg-warning text-warning-foreground',
    'Education': 'bg-success text-success-foreground',
    'Health': 'bg-destructive text-destructive-foreground',
    'Other': 'bg-muted text-muted-foreground'
  };

  const addGoal = () => {
    if (!newGoal.name || !newGoal.target || !newGoal.deadline) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const goal = {
      id: goals.length + 1,
      name: newGoal.name,
      target: parseFloat(newGoal.target),
      current: 0,
      deadline: newGoal.deadline,
      category: newGoal.category,
      priority: newGoal.priority
    };

    setGoals([...goals, goal]);
    setNewGoal({
      name: '',
      target: '',
      deadline: '',
      category: 'Savings',
      priority: 'Medium'
    });
    setShowAddForm(false);

    toast({
      title: "Goal Added",
      description: `Successfully created goal: ${goal.name}`,
    });
  };

  const addContribution = (goalId: number, amount: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, current: Math.min(goal.current + amount, goal.target) }
        : goal
    ));

    toast({
      title: "Contribution Added",
      description: `Added $${amount} to your goal!`,
    });
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.round((current / target) * 100);
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Goal Tracker</h1>
          <p className="text-muted-foreground">Set and track your financial goals with smart insights</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Goals</p>
                  <p className="text-2xl font-bold">{goals.length}</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Target Amount</p>
                  <p className="text-2xl font-bold">${goals.reduce((sum, goal) => sum + goal.target, 0)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Saved So Far</p>
                  <p className="text-2xl font-bold text-success">${goals.reduce((sum, goal) => sum + goal.current, 0)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-success">
                    {goals.filter(goal => goal.current >= goal.target).length}
                  </p>
                </div>
                <Star className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add New Goal Button */}
        <div className="flex justify-center">
          <Button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Goal
          </Button>
        </div>

        {/* Add Goal Form */}
        {showAddForm && (
          <Card className="bg-gradient-card border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Create New Goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Goal Name</label>
                  <Input
                    placeholder="e.g., New iPhone"
                    value={newGoal.name}
                    onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Amount ($)</label>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="1000.00"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({ ...newGoal, target: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Deadline</label>
                  <Input
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                  >
                    {priorities.map(priority => (
                      <option key={priority} value={priority}>{priority}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button onClick={addGoal} className="bg-gradient-primary">
                  Create Goal
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const progress = calculateProgress(goal.current, goal.target);
            const daysRemaining = getDaysRemaining(goal.deadline);
            const isCompleted = goal.current >= goal.target;

            return (
              <Card key={goal.id} className="bg-gradient-card border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{goal.name}</CardTitle>
                    <div className="flex gap-2">
                      <Badge className={priorityColors[goal.priority as keyof typeof priorityColors]}>
                        {goal.priority}
                      </Badge>
                      <Badge className={categoryColors[goal.category as keyof typeof categoryColors]}>
                        {goal.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">
                      ${goal.current.toFixed(2)}
                    </span>
                    <span className="text-muted-foreground">
                      / ${goal.target.toFixed(2)}
                    </span>
                  </div>
                  
                  <Progress value={progress} className="h-3" />
                  
                  <div className="flex justify-between text-sm">
                    <span className={`font-medium ${isCompleted ? 'text-success' : 'text-muted-foreground'}`}>
                      {progress}% complete
                    </span>
                    {!isCompleted && (
                      <span className="text-muted-foreground">
                        ${(goal.target - goal.current).toFixed(2)} to go
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {daysRemaining > 0 ? `${daysRemaining} days left` : 'Deadline passed'}
                      </span>
                    </div>
                    
                    {!isCompleted && (
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => addContribution(goal.id, 25)}
                        >
                          +$25
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => addContribution(goal.id, 50)}
                        >
                          +$50
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {isCompleted && (
                    <div className="p-3 bg-success/10 rounded-lg border border-success/20">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-success" />
                        <span className="text-success font-medium">Goal Completed! 🎉</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GoalTracker;