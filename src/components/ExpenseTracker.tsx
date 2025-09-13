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
    <div className="min-h-screen bg-gradient-background p-4 md:p-6 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-instagram bg-clip-text text-transparent animate-bounce-in">Expense Tracker</h1>
          <p className="text-lg text-gray-700 font-medium animate-scale-in">🎯 Track and categorize your spending with AI assistance 🎯</p>
        </div>

        {/* Add New Expense */}
        <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden transform hover:scale-[1.01] transition-all duration-300">
          <CardHeader className="bg-gradient-instagram text-white p-8">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Plus className="h-6 w-6 text-white" />
              Add New Expense
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Description</label>
                <Input
                  placeholder="What did you spend on?"
                  value={newExpense.description}
                  onChange={(e) => handleDescriptionChange(e.target.value)}
                  className="rounded-2xl border-2 border-gray-200 focus:border-purple-400 transition-all duration-300"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Amount ($)</label>
                <Input
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="rounded-2xl border-2 border-gray-200 focus:border-purple-400 transition-all duration-300"
                />
              </div>
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Category</label>
                <Select value={newExpense.category} onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}>
                  <SelectTrigger className="rounded-2xl border-2 border-gray-200">
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
              
              <div className="space-y-3">
                <label className="text-sm font-semibold text-gray-700">Date</label>
                <Input
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  className="rounded-2xl border-2 border-gray-200 focus:border-purple-400 transition-all duration-300"
                />
              </div>
            </div>
            
            <Button onClick={addExpense} className="mt-8 bg-gradient-instagram hover:shadow-2xl transition-all duration-300 text-white font-semibold text-lg px-8 py-4 rounded-2xl transform hover:scale-105">
              <Plus className="h-5 w-5 mr-2" />
              Add Expense
            </Button>
          </CardContent>
        </Card>

        {/* Expenses List */}
        <Card className="bg-white/90 backdrop-blur-lg border-0 shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="bg-gradient-purple text-white p-8">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <TrendingDown className="h-6 w-6 text-white" />
              Recent Expenses
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-4">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-6 bg-gradient-to-r from-white to-gray-50 rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transform hover:scale-[1.01] transition-all duration-300">
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-xl">
                          <CreditCard className="h-5 w-5 text-white" />
                        </div>
                        <span className="font-semibold text-lg text-gray-800">{expense.description}</span>
                      </div>
                      <div className="flex items-center gap-3 mt-2">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-600 font-medium">{expense.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Badge className={`${categoryColors[expense.category as keyof typeof categoryColors]} px-4 py-2 rounded-2xl text-sm font-semibold shadow-lg`}>
                      <Tag className="h-3 w-3 mr-2" />
                      {expense.category}
                    </Badge>
                    <span className="font-bold text-2xl text-gray-800">${expense.amount.toFixed(2)}</span>
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