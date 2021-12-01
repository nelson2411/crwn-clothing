import HomePage from "./pages/homepage/homepage.component";
import { Switch, Route } from "react-router-dom";
import Shop from "./pages/shop/Shop";

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop" component={Shop} />
      </Switch>
    </div>
  );
}

export default App;
