import { useState } from "preact/hooks"
import { HabitsData } from "../types/Types"
import { TargetedEvent } from "preact/compat"
import { sendCreateHabit, sendDeleteHabit } from "../utils/rest"
import { DeletableHabitRow } from "../components/DeletableHabitRow"

type Props = {
  habitsData: HabitsData
  setHabitsData: (habitsData: HabitsData) => void
}

export function Edit({ habitsData, setHabitsData }: Props) {

  const [newHabit, setNewHabit] = useState('')

  const handleInputChange = (event: any) => {
    setNewHabit(event.target.value)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    console.log('submitted with data:', newHabit)
    sendCreateHabit(habitsData.id, newHabit)
      .then((data: HabitsData) => {
        console.log('habitsdata', data)
        setHabitsData(data);
      })
      .catch((error) => {
        // TODO show a proper error to user, and try to log the incident
        console.error('Error fetching user data:', error);
        alert("An error occured. The incident has been reported to the police.")
      });

    setNewHabit('')
  }

  const deleteHabit = async (habitId: string) => {
    console.log('deleted habit', habitId)
    sendDeleteHabit(habitsData.id, habitId)
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
      <form style={{ display: 'flex', flexDirection: 'column', marginBottom: '2rem' }} onSubmit={handleSubmit}>
        <label for="newHabit">Add habit:</label>
        <input type="text" id="newHabit" name="newHabit" value={newHabit} onChange={handleInputChange} />
      </form>

      {habitsData.habits.map((habit, index) => (
            <div key={index}>
              <DeletableHabitRow habit={habit} deleteHabit={deleteHabit} />
            </div>
          ))}
    </div>
  )
}