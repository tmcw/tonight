/* ex: set tabstop=2 shiftwidth=2 expandtab: */
/** @jsx React.DOM */
var Show = React.createClass({
  render: function() {
    /*jshint ignore:start */
    var cx = React.addons.classSet;
    var show = this.props.show;
    var classes = cx({
      allages: this.props.show.minage === 0,
      show: true,
      even: this.props.even
    });
    var priceFormatted = '?';
    if (this.props.show.prices && this.props.show.prices.length) {
      var bestPrice = this.props.show.prices.filter(function(price) {
        return price.type === 'door';
      });
      if (!bestPrice.length) bestPrice = this.props.show.prices[0];
      else bestPrice = bestPrice[0];
      if (bestPrice) {
        priceFormatted = bestPrice.price;
      }
    }
    return (
      <div className={classes}>
        <div className='gutter'>
          {priceFormatted ? <div className='dollar quiet'>$</div> : '' }
          {priceFormatted ? <div className='dollar-value'>{priceFormatted}</div> : '' }
        </div>
        <div className='prose pad1'>
          <h2 className="showTitle">
            {this.props.show.title}
          </h2>
        </div>
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
    var even = true;
    var showNodes = this.state.data.map(function(show) {
      even = !even;
      return <Show
        even={even}
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
  <ShowList url="example.json" />,
  /*jshint ignore:end */
  document.getElementById('content')
);
