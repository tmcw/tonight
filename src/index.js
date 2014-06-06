/** @jsx React.DOM */
var Show = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.title}
        </h2>
      </div>
    );
  }
});

var ShowList = React.createClass({
  render: function() {
    var showNodes = this.props.data.map(function(show) {
        return <Show title={show.title}></Show>;
    });
    return (
        <div className='shows'>
          {showNodes}
        </div>
    );
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
