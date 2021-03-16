import {useEffect} from "react";
import { Redirect, Route, Switch } from 'react-router'
import {useDispatch} from "react-redux";

import Glossary from './pages/glossary'
import Train from './pages/train';
import Navbar from './components/UI/Navbar/Navbar'
import {TrainManager} from "./components/Train/TrainManager/TrainManager";

import {fetchGlossary} from "./store/glossary/actions";


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchGlossary())
  }, [dispatch])

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/train/:mode" component={TrainManager} />
        <Route path="/train" exact component={Train} />,;L
        <Route path="/" exact component={Glossary} />
        <Redirect from="/" to="/glossary" />
      </Switch>
    </div>
  );
}

export default App;
