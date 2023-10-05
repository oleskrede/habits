import { Habits } from './components/Habits';
import { Loader } from './components/Loader';
import { getIdFromUrlPath, randomId } from './utils/utils';


export function App() {

  const id = getIdFromUrlPath()
  if (id === "") {
    window.location.href = `/${randomId()}`
    return <Loader />
  }

  return <Habits id={id} />

}
