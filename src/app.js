import React from 'react';
import ReactDOM from 'react-dom';
import { Route, HashRouter } from 'react-router-dom';
import './styles/normalize.css';
import './styles/global.less';
import routes from './routes';

ReactDOM.render(
  <HashRouter>
    <div className="view-container">
      {
        routes.map((v) => {
          return (
            <Route exact={ v.exact } path={ v.path } component={ v.component } key={ v.path }/>
          )
        })
      }
    </div>
  </HashRouter>,
  document.getElementById('app')
)