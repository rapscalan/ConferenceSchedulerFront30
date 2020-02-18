import React from 'react';
import ConferenceContainer from '../containers/ConferenceContainer';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ConferenceContainer} />
      </Switch>
    </Router>
  );
}
