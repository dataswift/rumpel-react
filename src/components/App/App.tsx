import React, { Suspense } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import thunk from "redux-thunk";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../../redux/reducer/rootReducer";
import { Provider } from 'react-redux';
const HatClaim = React.lazy(() => import('../hat-claim/HatClaim'));

const Home: React.FC = () => {
  return (
      <div>
          <Link to={'/hat/claim/5325423423423423?email=paok@fdfsd.fsd'}>Claim a HAT</Link>
      </div>
  );
};

const store = createStore(rootReducer, applyMiddleware(thunk));


const App = () => (
    <Provider store={store}>
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/hat/claim/:claimToken" component={HatClaim}/>
                </Switch>
            </Suspense>
        </Router>
    </Provider>
);
export default App;
