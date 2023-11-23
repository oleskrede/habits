import { useEffect, useState } from 'preact/hooks';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { getIdFromUrlPath, randomId } from './utils/utils';
import { Page, HabitsData } from './types/Types';
import { PageSwitcher } from './pages/ContentSwitcher';
import { fetchPage } from './utils/rest';


export function App() {

  const [content, setContent] = useState(Page.MAIN)

  const id = getIdFromUrlPath()
  if (id === "") {
    window.location.href = `/${randomId()}`
    return <Loader />
  }

  const [habitsData, setHabitsData] = useState<HabitsData>({ id, habits: [] })
  const [isFetchingData, setIsFetchingData] = useState(false)

  useEffect(() => {
    setIsFetchingData(true)
    fetchPage(id)
      .then((data: HabitsData) => {
        setHabitsData(data);
      })
      .catch((error) => {
        // TODO show error to user, and try to log the incident
        console.error('Error fetching user data:', error);
      })
      .finally(() => {
        setIsFetchingData(false)
      });
  }, []);

  if (isFetchingData) {
    return <Loader />
  }

  return (
    <div>
      <Navbar setContent={setContent} />
      <PageSwitcher habitsData={habitsData} setHabitsData={setHabitsData} page={content} />
    </div>
  )

}
