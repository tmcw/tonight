/* ex: set tabstop=2 shiftwidth=2 expandtab: */
/** @jsx React.DOM */

var TimeBlock = require('./timeblock.jsx'),
  moment = require('moment');

module.exports = React.createClass({
  buyTickets: function() {
    window.open(this.props.show.tickets);
  },
  showPage: function() {
    window.open(this.props.show.url);
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
      return <h3 key={text}>{text}</h3>;
    });
    var support = (show.supporters || []).map(function(supporter) {
      return <h3 key={supporter}>{supporter}</h3>;
    });
    if (show.minage !== null) {
      var minage = <h3>{show.minage === 0 ? 'all ages' : show.minage + '+' }</h3>;
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
          { show.url ? <button onTouchTap={this.showPage}>venue page</button> : '' }
          {support}
          {times}
          { show.tickets ? <button onTouchTap={this.buyTickets}>buy tickets</button> : '' }
          {minage}
          <h3>
            {show.venue.properties.name}
          </h3>
        </div>
      </div>
    );
    /*jshint ignore:end */
  }
});
