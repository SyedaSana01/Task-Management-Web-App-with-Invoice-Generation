import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskList } from './components/TaskList';
import { CreateTask } from './components/CreateTask';
import { UserProfile } from './components/UserProfile';
import { Reports } from './components/Reports';
import { Navigation } from './components/Navigation';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<TaskList />} />
              <Route path="/create" element={<CreateTask />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/reports" element={<Reports />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;