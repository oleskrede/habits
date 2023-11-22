import { StateUpdater } from 'preact/hooks';
import { Page, HabitsData } from '../types/Types';
import { Edit } from './Edit';
import { Habits } from './Habits';

type Props = {
  habitsData: HabitsData
  setHabitsData: StateUpdater<HabitsData>
  page: Page
}

export function PageSwitcher({ habitsData, setHabitsData, page }: Props) {

  if (page == Page.EDIT) {
    return <Edit habitsData={habitsData} setHabitsData={setHabitsData} />
  }

  return <Habits habitsData={habitsData} setHabitsData={setHabitsData} />
}
