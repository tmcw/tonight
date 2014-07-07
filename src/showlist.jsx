/* ex: set tabstop=2 shiftwidth=2 expandtab: */
/** @jsx React.DOM */

var ShowListItem = require('./showlistitem.jsx'),
  ShowDetail = require('./showdetail.jsx'),
  sources = require('./sources'),
  Footer = require('./footer.jsx'),
  xhr = require('xhr');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

module.exports = React.createClass({
  loadShowsFromServer: function() {
    xhr({
      url: this.props.url,
      json: true,
    }, function(err, resp, data) {
      if (err) {
        return console.error(this.props.url, status, err.toString());
      }
      var id = 0;
      data.forEach(function(show) {
        show.venue = sources.sourceMap[show.venue_id];
        show.id = 'h' + (++id);
      });
      data.sort(function(a, b) {
        if (a.times.length && b.times.length) {
          return a.times[0].stamp - b.times[0].stamp;
        }
      });
      this.setState({data: data});
    }.bind(this));
  },
  getInitialState: function() {
    return {data: [], selected_show:null};
  },
  componentWillMount: function() {
    this.loadShowsFromServer();
  },
  handleClick: function(show) {
    this.setState({ selected_show: show, date: this.state.data });
  },
  handleDetailClick: function(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ selected_show: null, date: this.state.data });
  },
  render: function() {
    var handleClick = this.handleClick;
    var handleDetailClick = this.handleDetailClick;
    /*jshint ignore:start */
    var showNodes = this.state.selected_show ? [] : this.state.data.map(function(show) {
      return <ShowListItem
        ontap={handleClick}
        key={show.id}
        show={show}></ShowListItem>;
    });
    var showDetail = this.state.selected_show ?
      <div>
      <h2 className='back-button' onTouchTap={handleDetailClick}>back</h2>
      <ShowDetail
        key='show-detail'
        show={this.state.selected_show} /></div> : [];
    return (
      <div className='shows'>
        {showNodes ? showNodes : [] }
        {showDetail ? showDetail : [] }
      </div>
    );
    /*jshint ignore:end */
  }
});
