/** @jsx React.DOM */
var Show = React.createClass({
  render: function() {
    /*jshint ignore:start */
    return (
      <div className="show pad1">
        <h2 className="showTitle">
          {this.props.title}
        </h2>
      </div>
    );
    /*jshint ignore:end */
  }
});

var ShowList = React.createClass({
  render: function() {
    /*jshint ignore:start */
    var showNodes = this.props.data.map(function(show) {
        return <Show title={show.title}></Show>;
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
  ShowList({
    data: [
      {
        title: 'Teen Mom'
      },
      {
        title: 'Shark Week'
      }
  ]}),
  document.getElementById('content')
);
