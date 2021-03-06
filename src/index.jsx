/* ex: set tabstop=2 shiftwidth=2 expandtab: */

React.addons.injectTapEventPlugin();
React.initializeTouchEvents(true);

var ShowList = require('./showlist.jsx'),
  moment = require('moment');

React.renderComponent(
  /*jshint ignore:start */
  <ShowList url={todayStamp()} />,
  /*jshint ignore:end */
  document.getElementById('content')
);

function todayStamp() {
    return 'http://dctn.s3.amazonaws.com/' + moment().format('YYYY-MM-DD') + '.json';
}
