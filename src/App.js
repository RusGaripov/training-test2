import "./App.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Week } from "./components/Week/Week";
import { Seeker } from "./components/Seeker/Seeker";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Week} />
        <Route path="/enquiry" component={Seeker} />
      </Switch>
    </div>
  );
}

export default App;
