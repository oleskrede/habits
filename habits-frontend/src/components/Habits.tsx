import { CheckCircleIcon, Cog6ToothIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from "preact/hooks";
import { Page } from '../types/Types';
import { fetchPage } from '../utils/rest';
import Icon from './Icon';
import { Loader } from './Loader';

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
      <div style={{ margin: "1rem 1rem" }}>__________ Day picker goes here __________</div>

      {page.habits.map((habit, index) => (
        <div key={index} style={{ display: "flex" }}>
          <button><Icon><CheckCircleIcon /></Icon></button><p>{habit.name}</p>
        </div>
      ))}
    </div>
  )
}