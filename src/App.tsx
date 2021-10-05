import {useEffect} from 'react';
import {Route, Switch, Redirect} from 'react-router';
import {useHistory, useLocation, BrowserRouter} from 'react-router-dom';

import LeafletMap from './containers/LeafletMap/LeafletMap';

const App: React.FC = () => {
  const {action} = useHistory();
  const {hash, pathname} = useLocation();

  useEffect(() => {
    if (!hash || action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [action, hash, pathname]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <LeafletMap />
        </Route>
        {/* todo: <Route path="/user/:userId"><User /></Route> */}
        {/* todo: <Redirect from="/user/profile/:userId" to="/user/:userId" /> */}
        <Redirect push to="/" />
      </Switch>
    </BrowserRouter>
  );
};
export default App;
