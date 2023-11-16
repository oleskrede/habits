import styled from "styled-components";
import { HabitsData } from '../types/Types';
import { sendHabitCompleted } from '../utils/rest';
import { CompletedHabitRow } from "../components/CompletedHabitRow";
import { UncompletedHabitRow } from '../components/UncompletedHabitRow';

type Props = {
  habitsData: HabitsData
  setHabitsData: (habitsData: HabitsData) => void
}

export function Habits({ habitsData, setHabitsData }: Props) {

  const completed = habitsData.habits.filter(habit => habit.completedToday)
  const uncompleted = habitsData.habits.filter(habit => !habit.completedToday)

  const completeHabit = async (habitId: string) => {
    console.log('completed habit', habitId)
    sendHabitCompleted(habitsData.id, habitId)
      .then((data: HabitsData) => {
        console.log('habitsdata', data)
        setHabitsData(data);
      })
      .catch((error) => {
        // TODO show a proper error to user, and try to log the incident
        console.error('Error fetching user data:', error);
        alert("An error occured. The incident has been reported to the police.")
      });
  }

  return (
    <div>
      {uncompleted.map((habit, index) => (
        <div key={index}>
          <UncompletedHabitRow habit={habit} completeHabit={completeHabit} />
        </div>
      ))}
      {completed.length > 0 && (
        <>
          <CompletedLabel>Completed today:</CompletedLabel>
          {completed.map((habit, index) => (
            <div key={index}>
              <CompletedHabitRow habit={habit} />
            </div>
          ))}
        </>
      )}
    </div>
  )
}

const CompletedLabel = styled.p`
  margin-top: 3rem;
`