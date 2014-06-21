/* ex: set tabstop=2 shiftwidth=2 expandtab: */

React.addons.injectTapEventPlugin();
React.initializeTouchEvents(true);

var ShowList = require('./showlist.jsx');

React.renderComponent(
  /*jshint ignore:start */
  <ShowList url='example.json' />,
  /*jshint ignore:end */
  document.getElementById('content')
);
