/* ex: set tabstop=2 shiftwidth=2 expandtab: */

React.addons.injectTapEventPlugin();

var sources = require('tonight-sources').sources;

var sourceMap = {};

sources.features.forEach(function(feat) {
  sourceMap[feat.properties.id] = feat;
});

React.initializeTouchEvents(true);

/** @jsx React.DOM */
var Show = React.createClass({
  _cancelTouch: false,
  onTouchTap: function(event) {
    alert('hi');
  },
  render: function() {
    var show = this.props.show;
    var bg = '#000';
    var inlineStyle = { backgroundColor: show.venue.properties.color };

    /*jshint ignore:start */
    return (
      <div
        onTouchTap={this.onTouchTap}
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

var DateBlock = React.createClass({
  render: function() {
    var formatted = '?';
    if (this.props.times && this.props.times.length) {
      var firstTime = this.props.times[0];
      var t = moment(firstTime.stamp);
      formatted = t.format('ddd MMM D').toUpperCase();
    }
    /*jshint ignore:start */
    return (
      <div className='dark pad1 small'>
        {formatted}
      </div>
    );
    /*jshint ignore:end */
  }
});

var TimeBlock = React.createClass({
  render: function() {
    var formatted = '?';
    if (this.props.times && this.props.times.length) {
      var firstTime = this.props.times[0];
      var t = moment(firstTime.stamp);
      formatted = t.minutes() ? t.format('h:mm') : t.format('h');
    }
    /*jshint ignore:start */
    return (
      <span>
        {formatted}
      </span>
    );
  }
});

var ShowList = React.createClass({
  loadShowsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        data.forEach(function(show) {
          show.venue = sourceMap[show.venue_id];
        });
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentWillMount: function() {
    this.loadShowsFromServer();
  },
  render: function() {
    this.state.data.sort(function(a, b) {
      if (a.times.length && b.times.length) {
        return a.times[0].stamp - b.times[0].stamp;
      }
    });
    /*jshint ignore:start */
    var showNodes = this.state.data.map(function(show) {
      return <Show
        show={show}></Show>;
    });
    return (
      <div className='shows'>
        {showNodes}
      </div>
    );
    /*jshint ignore:end */
  }
});

React.renderComponent(
  /*jshint ignore:start */
  <ShowList url='example.json' />,
  /*jshint ignore:end */
  document.getElementById('content')
);
