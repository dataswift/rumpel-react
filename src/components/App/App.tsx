import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Root from "./Root";
const HatClaim = React.lazy(() => import('../hat-claim/HatClaim'));

const App = () => (
    <Root>
        <Router>
            <Suspense fallback={<div>Loading...</div>}>
                <Switch>
                    <Route path="/hat/claim/:claimToken" component={HatClaim}/>
                </Switch>
            </Suspense>
        </Router>
    </Root>
);
export default App;
