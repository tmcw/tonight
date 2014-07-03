var TimeBlock = require('./timeblock.jsx'),
  ShowDetail = require('./showdetail.jsx');

/* ex: set tabstop=2 shiftwidth=2 expandtab: */
/** @jsx React.DOM */
module.exports = React.createClass({
  getInitialState: function() {
    return { open: false };
  },
  onTouchTap: function(event) {
    // window.location.href = this.props.show.url;
    this.setState({ open: !this.state.open });
  },
  render: function() {
    var show = this.props.show;
    var inlineStyle = {
      backgroundColor: show.venue.properties.color
    };
    /*jshint ignore:start */
    return (
      <div
        style={inlineStyle}
        onTouchTap={this.onTouchTap}
        className='show'>
        <div className='pad1'>
          <h2 className='showTitle'>
            <TimeBlock times={show.times} />
            {show.title}
          </h2>
          <div className='pad0y minor'>
            {show.venue.properties.name}
          </div>
        </div>
        { this.state.open ? <ShowDetail show={show} /> : '' }
      </div>
    );
    /*jshint ignore:end */
  }
});
