var Show = require('./show.jsx'),
    sources = require('./sources');

module.exports = React.createClass({
  loadShowsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        data.forEach(function(show) {
          show.venue = sources.sourceMap[show.venue_id];
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
