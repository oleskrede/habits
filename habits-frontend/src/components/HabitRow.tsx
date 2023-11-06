import styled from 'styled-components';
import { Habit } from '../types/Types';

const HabitDescription = styled.p`
  margin-left: .5rem;
`

const HabitStreak = styled.span`
  color: grey;
  font-size: 0.75rem;
`

type Props = {
  habit: Habit
}

export function HabitRow({ habit }: Props) {
  const streak = habit.currentStreak > 0 ? ` (${habit.currentStreak})` : ''

  return (
    <HabitDescription>
      {habit.name} <HabitStreak>{streak}</HabitStreak>
    </HabitDescription>
  )
}