import styled from "styled-components";
import { HabitsData } from '../types/Types';
import { sendHabitCompleted } from '../utils/rest';
import { CompletedHabitRow } from "../components/CompletedHabitRow";
import { UncompletedHabitRow } from '../components/UncompletedHabitRow';
import { StateUpdater } from "preact/hooks";

type Props = {
  habitsData: HabitsData
  setHabitsData: StateUpdater<HabitsData>
}

export function Habits({ habitsData, setHabitsData }: Props) {

  const completed = habitsData.habits.filter(habit => habit.completedToday)
  const uncompleted = habitsData.habits.filter(habit => !habit.completedToday)

  const completeHabit = async (habitId: string) => {
    console.log('completed habit', habitId)

    // Optimistically complete the habit for responsiveness. Later update with truth from response
    setHabitsData((prev) => ({
      ...prev,
      habits: prev.habits.map(habit => {
        if (habit.id === habitId) {
          habit.completedToday = true
          habit.currentStreak = habit.currentStreak + 1
          return habit
        }
        return habit
      })
    }))

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
      {habitsData.habits.length === 0 && (
        <p>Click 'Edit' to add your first habit.</p>
      )}
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