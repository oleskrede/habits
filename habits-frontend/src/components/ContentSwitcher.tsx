import { Page, HabitsData } from '../types/Types';
import { Habits } from './Habits';

type Props = {
  habitsData: HabitsData
  setHabitsData: (habitsData: HabitsData) => void
  page: Page
}

export function PageSwitcher({ habitsData, setHabitsData, page }: Props) {

  if (page == Page.EDIT) {
    return <p>EDIT</p>
  }

  return <Habits habitsData={habitsData} setHabitsData={setHabitsData} />
}
