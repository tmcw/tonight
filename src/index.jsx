/* ex: set tabstop=2 shiftwidth=2 expandtab: */
/** @jsx React.DOM */
var Show = React.createClass({
  render: function() {
    /*jshint ignore:start */
    var cx = React.addons.classSet;
    var classes = cx({
      allages: this.props.minage === 0,
      show: true,
      pad1: true
    });
    return (
      <div className={classes}>
        <h2 className="showTitle">
          {this.props.title}
        </h2>
        <a href={this.props.tickets}>buy tickets</a>
      </div>
    );
    /*jshint ignore:end */
  }
});

var ShowList = React.createClass({
  loadShowsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        console.log(data);
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
    /*jshint ignore:start */
    var showNodes = this.state.data.map(function(show) {
      return <Show
        title={show.title}
        minage={show.minage}
        tickets={show.tickets}></Show>;
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
  <ShowList url="example.json" />,
  /*jshint ignore:end */
  document.getElementById('content')
);
