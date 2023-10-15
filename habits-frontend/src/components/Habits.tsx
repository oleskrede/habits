import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from "preact/hooks";
import { Page } from '../types/Types';
import { fetchPage } from '../utils/rest';
import { IconButton } from './IconButton';
import { Loader } from './Loader';
import { HabitRow } from './HabitRow';

type Props = {
  id: string
}

export function Habits({ id }: Props) {
  const [page, setPage] = useState<Page | undefined>(undefined)

  useEffect(() => {
    fetchPage(id)
      .then((data: Page) => {
        setPage(data);
      })
      .catch((error) => {
        // TODO show error to user, and try to log the incident
        console.error('Error fetching user data:', error);
      });
  }, []);

  if (!page) {
    return <Loader />
  }

  return (
    <div>
      {page.habits.map((habit, index) => (
        <div key={index} style={{ display: "flex" }}>
          <HabitRow name={habit.name} />
        </div>
      ))}
    </div>
  )
}