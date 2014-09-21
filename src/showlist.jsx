/* ex: set tabstop=2 shiftwidth=2 expandtab: */
/** @jsx React.DOM */

var ShowListItem = require('./showlistitem.jsx'),
  ShowDetail = require('./showdetail.jsx'),
  sources = require('./sources'),
  Footer = require('./footer.jsx'),
  xhr = require('xhr');

module.exports = React.createClass({
  loadShowsFromServer() {
    xhr({
      url: this.props.url,
      json: true,
    }, function(err, resp, data) {
      if (err) {
        return console.error(this.props.url, status, err.toString());
      }
      var id = 0;
      data.forEach((show) => {
        show.venue = sources.sourceMap[show.venue_id];
        show.id = 'h' + (++id);
      });
      data.sort((a, b) => {
        if (a.times.length && b.times.length) {
          return a.times[0].stamp - b.times[0].stamp;
        }
      });
      this.setState({data: data});
    }.bind(this));
  },
  getInitialState() {
    return {data: [], selected_show:null};
  },
  componentWillMount() {
    this.loadShowsFromServer();
  },
  handleClick(show) {
    this.setState({ selected_show: show, date: this.state.data });
  },
  handleDetailClick(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({ selected_show: null, date: this.state.data });
  },
  render() {
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
    var tweetStyle = {
      padding: 10,
      textAlign: 'center'
    };
    return (
      <div className='shows'>
        <div style={tweetStyle}>
          <a href='http://twitter.com/dctnght'>@dctnght</a>
        </div>
        {showNodes ? showNodes : [] }
        {showDetail ? showDetail : [] }
      </div>
    );
    /*jshint ignore:end */
  }
});
