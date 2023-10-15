import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { IconButton } from './IconButton';

type Props = {
  name: string
}

export function HabitRow({ name }: Props) {

  return (
    <>
      <IconButton icon={<CheckCircleIcon />} /><p>{name}</p>
    </>
  )
}