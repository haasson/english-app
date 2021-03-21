import {useEffect} from "react";
import {useDispatch} from "react-redux";
import firebase from "firebase";
import {fetchGlossary, useFetchGlossary} from "./store/glossary/actions";

import Navbar from './components/UI/Navbar/Navbar'
import {AppRouter} from "./components/App/AppRouter";
import {useAuthentication} from "./hooks/app/useAuthentication";
import {useList, useListKeys, useListVals, useObject} from "react-firebase-hooks/database";


function App() {
  const dispatch = useDispatch()
  const [user, loading] = useAuthentication()

  useEffect(() => {
    dispatch(fetchGlossary())
  }, [dispatch, user])

  // useFetchGlossary()


  if (loading) {
    return <div>App loading..........</div>
  }

  return (
    <div className="App">
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
