/* ex: set tabstop=2 shiftwidth=2 expandtab: */
/** @jsx React.DOM */

var TimeBlock = require('./timeblock.jsx'),
  moment = require('moment');

module.exports = React.createClass({
  buyTickets: function() {
    window.open(this.props.show.tickets);
  },
  onTouchTap: function(event) {
    event.stopPropagation();
    // this.props.ontap(this.props.show);
  },
  render: function() {
    var show = this.props.show;
    var inlineStyle = {
      backgroundColor: show.venue.properties.color
    };
    /*jshint ignore:start */
    var times = show.times.map(function(time) {
      var text = moment.utc(time.stamp).format('h:mma') + '/' + time.label;
      return <h4 key={text}>{text}</h4>;
    });
    if (show.minage !== null) {
      var minage = <h2>{show.minage === 0 ? 'all ages' : show.minage + '+' }</h2>;
    } else {
      minage = '';
    }
    return (
      <div
        style={inlineStyle}
        onTouchTap={this.onTouchTap}
        className='show'>
        <div className='right-content pad1'>
          <h2>
            {show.title}
          </h2>
          {times}
          <h2>
            { show.tickets ? <button onTouchTap={this.buyTickets}>buy tickets</button> : '' }
          </h2>
          {minage}
          <div className='pad0y minor'>
            {show.venue.properties.name}
          </div>
        </div>
      </div>
    );
    /*jshint ignore:end */
  }
});
