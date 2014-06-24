/* ex: set tabstop=2 shiftwidth=2 expandtab: */
/** @jsx React.DOM */

var TimeBlock = require('./timeblock.jsx');

module.exports = React.createClass({
  onTouchClose: function(event) {
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
        className='show'>
        <div className='left-gutter pad1y'>
          <h3 className='align-right'>
            <TimeBlock times={show.times} />
          </h3>
        </div>
        <div className='right-content pad1'>
          <h2 className='showTitle'>
            {show.title}
          </h2>
          <div className='pad0y'>
            {show.venue.properties.name}
          </div>
        </div>
      </div>
    );
    /*jshint ignore:end */
  }
});
