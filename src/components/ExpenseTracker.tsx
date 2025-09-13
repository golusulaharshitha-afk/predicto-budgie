import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar, CreditCard, Tag, TrendingDown } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const ExpenseTracker = () => {
  const { toast } = useToast();
  const [expenses, setExpenses] = useState([
    { id: 1, description: 'Lunch at cafeteria', amount: 12.50, category: 'Food', date: '2024-01-15', predicted: false },
    { id: 2, description: 'Bus ticket', amount: 2.75, category: 'Transportation', date: '2024-01-15', predicted: false },
    { id: 3, description: 'Coffee with friends', amount: 8.90, category: 'Entertainment', date: '2024-01-14', predicted: false },
    { id: 4, description: 'Textbook rental', amount: 45.00, category: 'Books', date: '2024-01-14', predicted: false },
    { id: 5, description: 'Movie tickets', amount: 25.00, category: 'Entertainment', date: '2024-01-13', predicted: false },
  ]);

  const [newExpense, setNewExpense] = useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = ['Food', 'Transportation', 'Entertainment', 'Books', 'Health', 'Other'];
  
  const categoryColors = {
    'Food': 'bg-orange-bright text-white',
    'Transportation': 'bg-blue-electric text-white',
    'Entertainment': 'bg-pink-vibrant text-white',
    'Books': 'bg-green-neon text-white',
    'Health': 'bg-red-coral text-white',
    'Other': 'bg-purple-vibrant text-white'
  };

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount || !newExpense.category) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const expense = {
      id: expenses.length + 1,
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: newExpense.date,
      predicted: false
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0]
    });

    toast({
      title: "Expense Added",
      description: `Successfully added $${expense.amount} expense for ${expense.category}`,
    });
  };

  const predictCategory = (description: string) => {
    const keywords = {
      'Food': ['lunch', 'dinner', 'breakfast', 'food', 'restaurant', 'cafe', 'pizza', 'burger'],
      'Transportation': ['bus', 'train', 'uber', 'taxi', 'gas', 'parking', 'metro'],
      'Entertainment': ['movie', 'game', 'concert', 'party', 'streaming', 'music'],
      'Books': ['book', 'textbook', 'amazon', 'study', 'notes', 'supplies'],
      'Health': ['pharmacy', 'doctor', 'medicine', 'gym', 'health'],
    };

    const desc = description.toLowerCase();
    for (const [category, words] of Object.entries(keywords)) {
      if (words.some(word => desc.includes(word))) {
        return category;
      }
    }
    return 'Other';
  };

  const handleDescriptionChange = (value: string) => {
    setNewExpense({ ...newExpense, description: value });
    if (value.length > 3 && !newExpense.category) {
      const predicted = predictCategory(value);
      setNewExpense(prev => ({ ...prev, category: predicted }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Expense Tracker</h1>
          <p className="text-muted-foreground">Track and categorize your spending with AI assistance</p>
        </div>

        {/* Add New Expense */}
        <Card className="bg-gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5 text-primary" />
              Add New Expense
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Input
                  placeholder="What did you spend on?"
                  value={newExpense.description}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <Select value={newExpense.category} onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                />
              </div>
            </div>
            
            <Button onClick={addExpense} className="mt-4 bg-gradient-rainbow hover:shadow-glow transition-all duration-300 text-white font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </CardContent>
        </Card>

        {/* Expenses List */}
        <Card className="bg-gradient-card border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingDown className="h-5 w-5 text-primary" />
              Recent Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-4 bg-background/50 rounded-lg border border-border/50">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{expense.description}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{expense.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge className={categoryColors[expense.category as keyof typeof categoryColors]}>
                      <Tag className="h-3 w-3 mr-1" />
                      {expense.category}
                    </Badge>
                    <span className="font-bold text-lg">${expense.amount.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpenseTracker;