/* ex: set tabstop=2 shiftwidth=2 expandtab: */
/** @jsx React.DOM */

var ShowListItem = require('./showlistitem.jsx'),
sources = require('./sources'),
xhr = require('xhr');

module.exports = React.createClass({
  loadShowsFromServer: function() {
    xhr({
      url: this.props.url,
      json: true,
    }, function(err, resp, data) {
      if (err) {
        return console.error(this.props.url, status, err.toString());
      }
      data.forEach(function(show) {
        show.venue = sources.sourceMap[show.venue_id];
      });
      this.setState({data: data});
    }.bind(this));
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
      return <ShowListItem
        show={show}></ShowListItem>;
    });
    return (
      <div className='shows'>
        {showNodes}
      </div>
    );
    /*jshint ignore:end */
  }
});
