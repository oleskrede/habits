import { XCircleIcon } from '@heroicons/react/24/outline';
import { Habit } from '../types/Types';
import { IconButton } from './IconButton';
import { HabitRow } from './HabitRow';

type Props = {
  habit: Habit
  deleteHabit: (id: string) => void
}

export function DeletableHabitRow({ habit, deleteHabit }: Props) {

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <IconButton
        icon={<XCircleIcon />}
        onClick={() => deleteHabit(habit.id)}
      />
      <HabitRow habit={habit} />
    </div>
  )
}