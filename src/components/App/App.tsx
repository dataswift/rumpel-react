import React, { Suspense } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import Root from "./Root";
const HatClaim = React.lazy(() => import('../hat-claim/HatClaim'));

const Home: React.FC = () => {
  return (
      <div>
          <Link to={'/hat/claim/5325423423423423?email=testing@test.co.uk'}>Claim a HAT</Link>
      </div>
  );
};

const App = () => (
    <Root>
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/hat/claim/:claimToken" component={HatClaim}/>
                </Switch>
            </Suspense>
        </Router>
    </Root>
);
export default App;
