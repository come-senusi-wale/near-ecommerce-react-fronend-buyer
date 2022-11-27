

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { Nav } from "./component/nav";


// page :::::::::::::::::
import { Products } from "./component/page/product";
import { Cart } from "./component/page/cart";



function App() {
  return (
    <Router>
    <Nav></Nav>

    
    <Switch>

      <Route exact path='/'>
        <Products></Products>
      </Route>

      <Route exact path='/cart'>
        <Cart></Cart>
      </Route>

    </Switch>

    

  </Router>
  );
}

export default App;
