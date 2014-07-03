/* ex: set tabstop=2 shiftwidth=2 expandtab: */

React.addons.injectTapEventPlugin();
React.initializeTouchEvents(true);

var ShowList = require('./showlist.jsx'),
  Header = require('./header.jsx'),
  moment = require('moment');

React.renderComponent(
  /*jshint ignore:start */
  <div className='wrapper'>
    <Header />
    <ShowList url={todayStamp()} />
  </div>,
  /*jshint ignore:end */
  document.getElementById('content')
);

function todayStamp() {
    return 'http://dctn.s3.amazonaws.com/' + moment().format('YYYY-MM-DD') + '.json';
}
