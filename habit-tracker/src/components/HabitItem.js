import React from 'react';
import styled from 'styled-components';
import { FaCheckCircle, FaFire } from 'react-icons/fa';

const Item = styled.div`
  padding: 10px;
  margin: 5px;
  background: ${({ checked }) => (checked ? '#8bc34a' : '#eee')};
  border-radius: 5px;
  cursor: pointer;
`;

const HabitItem = ({ habit, onToggle }) => {
  return (
    <Item checked={habit.completed} onClick={onToggle}>
      {habit.completed && <FaCheckCircle style={{ marginRight: '5px', color: '#2e7d32' }} />}
      {habit.name} — <FaFire style={{ marginRight: '5px', color: 'orange' }} /> Streak: {habit.streak}
    </Item>
  );
};

export default HabitItem;
