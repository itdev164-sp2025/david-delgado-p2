import React from 'react';
import HabitItem from './HabitItem';

const HabitList = ({ habits, toggleHabit }) => {
  return (
    <div>
      {habits.map((habit, index) => (
        <HabitItem
          key={index}
          habit={habit}
          onToggle={() => toggleHabit(index)}
        />
      ))}
    </div>
  );
};

export default HabitList;