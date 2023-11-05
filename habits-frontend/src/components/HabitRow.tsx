import { CheckCircleIcon } from '@heroicons/react/24/outline';
import styled from 'styled-components';
import { Habit } from '../types/Types';
import { IconButton } from './IconButton';

const HabitDescription = styled.p`
  margin-left: .5rem;
`

const HabitStreak = styled.span`
  color: grey;
  font-size: 0.75rem;
`

type Props = {
  habit: Habit
  completeHabit: (id: string) => void
}

export function HabitRow({ habit, completeHabit }: Props) {

  const streak = habit.currentStreak > 0 ? ` (${habit.currentStreak})` : ''

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton
        icon={<CheckCircleIcon />}
        onClick={() => completeHabit(habit.id)}
      />
      <HabitDescription>
        {habit.name} <HabitStreak>{streak}</HabitStreak>
      </HabitDescription>

    </div>
  )
}