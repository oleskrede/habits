import styled from 'styled-components';
import { Habit } from '../types/Types';

type Props = {
  habit: Habit
}

export function CompletedHabitRow({ habit }: Props) {

  return (
    <CompletedHabitDescription>
      {`${habit.name} (${habit.currentStreak})`}
    </CompletedHabitDescription>
  )
}

const CompletedHabitDescription = styled.p`
  margin-left: 1rem;
`