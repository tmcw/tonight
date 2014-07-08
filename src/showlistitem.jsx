var TimeBlock = require('./timeblock.jsx');

/* ex: set tabstop=2 shiftwidth=2 expandtab: */
/** @jsx React.DOM */
module.exports = React.createClass({
  onTouchTap: function(event) {
    //window.location.href = this.props.show.url;
    event.stopPropagation();
    this.props.ontap(this.props.show);
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
        <div className='right-content pad1'>
          <h2 className='showTitle'>
            <TimeBlock times={show.times} />
            {show.title}
          </h2>
          <h3>
            {show.venue.properties.name}
          </h3>
        </div>
      </div>
    );
    /*jshint ignore:end */
  }
});
