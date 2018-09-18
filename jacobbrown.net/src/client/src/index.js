import React from 'react';
import ReactDOM from 'react-dom';

const title = 'My Minimal React Webpack Babel Setup';

ReactDOM.render(
  <div>
    Hello World
  </div>,
  document.getElementById("container")
);

module.hot.accept();