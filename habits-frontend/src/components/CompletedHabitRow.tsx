import styled from 'styled-components';
import { Habit } from '../types/Types';
import { HabitRow } from './HabitRow';

type Props = {
  habit: Habit
}

export function CompletedHabitRow({ habit }: Props) {

  return (
    <CompletedHabitRowWrapper>
      <HabitRow habit={habit}/>
    </CompletedHabitRowWrapper>
  )
}

const CompletedHabitRowWrapper = styled.div`
  margin-left: .5rem;
`