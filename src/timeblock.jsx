/* ex: set tabstop=2 shiftwidth=2 expandtab: */

var moment = require('moment');

/** @jsx React.DOM */

module.exports = React.createClass({
  render: function() {
    var formatted = '?';
    if (this.props.times && this.props.times.length) {
      var firstTime = this.props.times[0];
      var t = moment(firstTime.stamp);
      formatted = t.minutes() ? t.format('h:mm') : t.format('h');
    }
    /*jshint ignore:start */
    return (
      <span className='time-block'>
        {formatted}
      </span>
    );
  }
});
