import React, { useState, useEffect, useMemo } from 'react';
import { Check, Plus, X, Search, Calendar, Tag, Flag, Trash2, Edit2, Moon, Sun, Filter, CheckCircle2, Circle, Clock, AlertCircle } from 'lucide-react';

const TodoApp = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Welcome to your new To-Do app! 🎉', completed: false, priority: 'medium', category: 'personal', dueDate: '', createdAt: new Date().toISOString() },
    { id: 2, text: 'Try adding a new task with priority', completed: false, priority: 'high', category: 'work', dueDate: '', createdAt: new Date().toISOString() },
    { id: 3, text: 'Click the moon icon for dark mode', completed: false, priority: 'low', category: 'personal', dueDate: '', createdAt: new Date().toISOString() }
  ]);
  const [newTask, setNewTask] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');
  const [darkMode, setDarkMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [taskPriority, setTaskPriority] = useState('medium');
  const [taskCategory, setTaskCategory] = useState('personal');
  const [taskDueDate, setTaskDueDate] = useState('');

  const categories = ['personal', 'work', 'shopping', 'health', 'study'];
  const priorities = ['low', 'medium', 'high'];
  
  const priorityColors = {
    low: 'bg-blue-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  };

  const categoryColors = {
    personal: 'bg-purple-500',
    work: 'bg-indigo-500',
    shopping: 'bg-green-500',
    health: 'bg-pink-500',
    study: 'bg-orange-500'
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.text.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
      const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;
      return matchesSearch && matchesCategory && matchesPriority;
    });
  }, [tasks, searchTerm, selectedCategory, selectedPriority]);

  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const highPriority = tasks.filter(t => t.priority === 'high' && !t.completed).length;
    return { total, completed, pending, highPriority };
  }, [tasks]);

  const addTask = (e) => {
    if (e) e.preventDefault();
    if (newTask.trim()) {
      const newTaskObj = {
        id: Date.now(),
        text: newTask,
        completed: false,
        priority: taskPriority,
        category: taskCategory,
        dueDate: taskDueDate,
        createdAt: new Date().toISOString()
      };
      setTasks([newTaskObj, ...tasks]);
      setNewTask('');
      setTaskDueDate('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    if (editText.trim()) {
      setTasks(tasks.map(task =>
        task.id === editingId ? { ...task, text: editText } : task
      ));
    }
    setEditingId(null);
    setEditText('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50'}`}>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center relative">
          <h1 className={`text-5xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse`}>
            ✨ Todo Master
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Organize your life, one task at a time</p>
          
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`absolute top-0 right-0 p-3 rounded-full transition-all duration-300 ${
              darkMode ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' : 'bg-white text-gray-800 hover:bg-gray-100'
            } shadow-lg`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transform hover:scale-105 transition-all duration-300`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stats.total}</p>
              </div>
              <Circle className="text-blue-500" size={32} />
            </div>
          </div>
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transform hover:scale-105 transition-all duration-300`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Completed</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stats.completed}</p>
              </div>
              <CheckCircle2 className="text-green-500" size={32} />
            </div>
          </div>
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transform hover:scale-105 transition-all duration-300`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stats.pending}</p>
              </div>
              <Clock className="text-yellow-500" size={32} />
            </div>
          </div>
          <div className={`p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transform hover:scale-105 transition-all duration-300`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>High Priority</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>{stats.highPriority}</p>
              </div>
              <AlertCircle className="text-red-500" size={32} />
            </div>
          </div>
        </div>

        {/* Add Task Form */}
        <div className={`mb-6 p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTask(e)}
                placeholder="What needs to be done?"
                className={`flex-1 px-4 py-3 rounded-lg border-2 transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500' 
                    : 'bg-gray-50 border-gray-200 focus:border-purple-500 focus:bg-white'
                } outline-none`}
              />
              <button
                onClick={addTask}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <Plus size={20} />
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3">
              <select
                value={taskPriority}
                onChange={(e) => setTaskPriority(e.target.value)}
                className={`px-4 py-2 rounded-lg border-2 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200'
                } outline-none focus:border-purple-500`}
              >
                {priorities.map(p => (
                  <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)} Priority</option>
                ))}
              </select>
              
              <select
                value={taskCategory}
                onChange={(e) => setTaskCategory(e.target.value)}
                className={`px-4 py-2 rounded-lg border-2 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200'
                } outline-none focus:border-purple-500`}
              >
                {categories.map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
              
              <input
                type="date"
                value={taskDueDate}
                onChange={(e) => setTaskDueDate(e.target.value)}
                className={`px-4 py-2 rounded-lg border-2 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200'
                } outline-none focus:border-purple-500`}
              />
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className={`mb-6 p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className={`absolute left-3 top-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tasks..."
                className={`w-full pl-10 pr-4 py-3 rounded-lg border-2 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-gray-50 border-gray-200'
                } outline-none focus:border-purple-500`}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-lg border-2 ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-600' 
                  : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
              } transition-all duration-300 flex items-center gap-2`}
            >
              <Filter size={20} />
              Filters
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 flex flex-wrap gap-3">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`px-4 py-2 rounded-lg border-2 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200'
                } outline-none`}
              >
                <option value="all">All Categories</option>
                {categories.map(c => (
                  <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>
                ))}
              </select>
              
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value)}
                className={`px-4 py-2 rounded-lg border-2 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-gray-50 border-gray-200'
                } outline-none`}
              >
                <option value="all">All Priorities</option>
                {priorities.map(p => (
                  <option key={p} value={p}>{p.charAt(0).toUpperCase() + p.slice(1)}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Task List */}
        <div className="space-y-3">
          {filteredTasks.length === 0 ? (
            <div className={`text-center py-12 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
              <p className={`text-xl ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {searchTerm || selectedCategory !== 'all' || selectedPriority !== 'all' 
                  ? 'No tasks found with current filters' 
                  : 'No tasks yet. Add one above!'}
              </p>
            </div>
          ) : (
            filteredTasks.map((task, index) => (
              <div
                key={task.id}
                className={`group p-4 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${
                  task.completed ? 'opacity-75' : ''
                }`}
                style={{
                  animation: `slideIn 0.3s ease-out ${index * 0.05}s both`
                }}
              >
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      task.completed 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 border-green-500' 
                        : darkMode ? 'border-gray-600 hover:border-purple-500' : 'border-gray-300 hover:border-purple-500'
                    }`}
                  >
                    {task.completed && <Check size={16} className="text-white" />}
                  </button>
                  
                  <div className="flex-1">
                    {editingId === task.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editText}
                          onChange={(e) => setEditText(e.target.value)}
                          className={`flex-1 px-3 py-1 rounded border-2 ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-gray-50 border-gray-200'
                          } outline-none focus:border-purple-500`}
                          autoFocus
                        />
                        <button
                          onClick={saveEdit}
                          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          onClick={cancelEdit}
                          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <p className={`text-lg ${task.completed ? 'line-through' : ''} ${
                          darkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {task.text}
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <span className={`px-2 py-1 rounded-full text-xs text-white ${priorityColors[task.priority]}`}>
                            {task.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs text-white ${categoryColors[task.category]}`}>
                            {task.category}
                          </span>
                          {task.dueDate && (
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                            }`}>
                              <Calendar size={12} className="inline mr-1" />
                              {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {editingId !== task.id && (
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={() => startEdit(task.id, task.text)}
                        className={`p-2 rounded-lg ${
                          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                        } transition-colors duration-300`}
                      >
                        <Edit2 size={18} className={darkMode ? 'text-gray-400' : 'text-gray-600'} />
                      </button>
                      <button
                        onClick={() => deleteTask(task.id)}
                        className={`p-2 rounded-lg ${
                          darkMode ? 'hover:bg-red-900' : 'hover:bg-red-50'
                        } transition-colors duration-300`}
                      >
                        <Trash2 size={18} className="text-red-500" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default TodoApp;