import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { Habit } from '../types/Types';
import { IconButton } from './IconButton';
import { HabitRow } from './HabitRow';

type Props = {
  habit: Habit
  completeHabit: (id: string) => void
}

export function UncompletedHabitRow({ habit, completeHabit }: Props) {

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton
        icon={<CheckCircleIcon />}
        onClick={() => completeHabit(habit.id)}
      />
      <HabitRow habit={habit}/>

    </div>
  )
}