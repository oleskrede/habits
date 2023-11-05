import { useEffect, useState } from "preact/hooks";
import { Habit, Page } from '../types/Types';
import { fetchPage, sendHabitCompleted } from '../utils/rest';
import { HabitRow } from './HabitRow';
import { Loader } from './Loader';
import { CompletedHabitRow } from "./CompletedHabitRow";
import styled from "styled-components";

type Props = {
  id: string
}

export function Habits({ id }: Props) {
  const [page, setPage] = useState<Page | undefined>(undefined)
  const [completedHabits, setCompletedHabits] = useState<Habit[]>([])
  const [uncompletedHabits, setUncompletedHabits] = useState<Habit[]>([])

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

  useEffect(() => {
    if (page) {
      const completed = page.habits.filter(habit => habit.completedToday)
      const uncompleted = page.habits.filter(habit => !habit.completedToday)
      setCompletedHabits(completed);
      setUncompletedHabits(uncompleted);
    }
  }, [page])

  if (!page) {
    return <Loader />
  }

  const completeHabit = async (habitId: string) => {
    console.log('completed habit', habitId)
    sendHabitCompleted(id, habitId)
      .then((data: Page) => {
        setPage(data);
      })
      .catch((error) => {
        // TODO show a proper error to user, and try to log the incident
        console.error('Error fetching user data:', error);
        alert("An error occured. The incident has been reported to the police.")
      });
  }

  return (
    <div>
      {uncompletedHabits.map((habit, index) => (
        <div key={index}>
          <HabitRow habit={habit} completeHabit={completeHabit} />
        </div>
      ))}
      <CompletedLabel>Completed today:</CompletedLabel>
      {completedHabits.map((habit, index) => (
        <div key={index}>
          <CompletedHabitRow habit={habit} />
        </div>
      ))}
    </div>
  )
}

const CompletedLabel = styled.p`
  margin-top: 2rem;
  color: grey;
`