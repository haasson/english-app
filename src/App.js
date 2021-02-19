import { Redirect, Route, Switch } from 'react-router'
import Navbar from './components/UI/Navbar/Navbar'
import Glossary from './pages/glossary'
import Train from './pages/train';


function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/train" exact component={Train} />
        <Route path="/" exact component={Glossary} />
        <Redirect from="/" to="/glossary" />
      </Switch>
    </div>
  );
}

export default App;
