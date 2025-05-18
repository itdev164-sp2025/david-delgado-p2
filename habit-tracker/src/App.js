import React, { useState, useEffect } from 'react';
import HabitList from './components/HabitList';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { lightTheme, darkTheme } from './theme';
import { format, isYesterday } from 'date-fns';
import { FaPlus, FaMoon, FaSun } from 'react-icons/fa';

function App() {
  const [habits, setHabits] = useState([
    {
      name: 'Drink Water',
      completed: false,
      streak: 0,
      lastCompleted: null
    },
    {
      name: 'Exercise',
      completed: false,
      streak: 0,
      lastCompleted: null
    }
  ]);

  const [newHabit, setNewHabit] = useState('');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('habits');
    if (stored) setHabits(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);

  useEffect(() => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const resetHabits = habits.map(habit => {
      if (habit.lastCompleted !== today) {
        return { ...habit, completed: false };
      }
      return habit;
    });
    setHabits(resetHabits);
  }, []);

  const addHabit = () => {
    if (newHabit.trim() === '') return;
    setHabits([
      ...habits,
      {
        name: newHabit,
        completed: false,
        streak: 0,
        lastCompleted: null
      }
    ]);
    setNewHabit('');
  };

  const toggleHabit = (index) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    const newHabits = [...habits];
    const habit = newHabits[index];

    if (habit.completed) {
      habit.completed = false;
    } else {
      habit.completed = true;

      if (habit.lastCompleted === today) {
       
      } else if (isYesterday(new Date(habit.lastCompleted))) {
        habit.streak += 1;
      } else {
        habit.streak = 1;
      }

      habit.lastCompleted = today;
    }

    setHabits(newHabits);
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <div style={{ padding: '20px' }}>
        <h1>Daily Habit Tracker</h1>
        <h1 style={{ fontSize: '2.5rem' }}>Daily Habit Tracker</h1>


        <button onClick={() => setIsDark(!isDark)}>
          {isDark ? <FaSun style={{ marginRight: '5px' }} /> : <FaMoon style={{ marginRight: '5px' }} />}
          Toggle Theme
        </button>
        <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>

          <input
            type="text"
            placeholder="Enter a new habit"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
          />
          <button onClick={addHabit}>
            <FaPlus style={{ marginRight: '5px' }} />
            Add Habit
          </button>
        </div>

        <HabitList habits={habits} toggleHabit={toggleHabit} />
      </div>
    </ThemeProvider>
  );
}

export default App;
