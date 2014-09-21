/* ex: set tabstop=2 shiftwidth=2 expandtab: */
/** @jsx React.DOM */

var moment = require('moment');

module.exports = React.createClass({
  render() {
    var formatted = '?';
    if (this.props.times && this.props.times.length) {
      var firstTime = this.props.times[0];
      var t = moment(firstTime.stamp).zone(0);
      formatted = t.minutes() ? t.format('h:mm') : t.format('h');
    }
    /*jshint ignore:start */
    return (
      <span className='time-block'>
        {formatted}
      </span>
    );
    /*jshint ignore:end */
  }
});
