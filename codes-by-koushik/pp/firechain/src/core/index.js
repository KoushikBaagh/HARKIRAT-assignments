import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

  Router,
  browserHistory,
} from 'react-router';

import App from './app';
import {
  HomeView,
} from '../components/views';
import React from 'react';
import {render}             from 'react-dom';

function run() {
  render(
    (
    <Router history={browserHistory}>
      <Route component={App}>
        <Route path="/" component={HomeView} />
      </Route>
    </Router>
    ),
    document.getElementById('app')
  );
}

const loadedStates = ['complete', 'loaded', 'interactive'];
if (loadedStates.includes(document.readyState) && document.body) {
  run();
} else {
  window.addEventListener('DOMContentLoaded', run, false);
}
