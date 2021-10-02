import * as React from 'react';
import {BrowserRouter, Switch, Redirect, Route} from 'react-router-dom';

import LeafletMap from '../containers/LeafletMap/LeafletMap';

const Router: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={LeafletMap} />
      <Redirect to="/" />
    </Switch>
  </BrowserRouter>
);

export default Router;
