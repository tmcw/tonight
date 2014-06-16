/* ex: set tabstop=2 shiftwidth=2 expandtab: */
var sources = require('tonight-sources').sources;

var sourceMap = {};

sources.features.forEach(function(feat) {
  sourceMap[feat.properties.id] = feat;
});

React.initializeTouchEvents(true);

/** @jsx React.DOM */
var Show = React.createClass({
  render: function() {
    var show = this.props.show;

    var bg = '#000';
    var venue = {};
    if (sourceMap[this.props.show.venue_id]) {
      bg = sourceMap[this.props.show.venue_id].properties.color || '#000';
      venue = sourceMap[this.props.show.venue_id];
    }

    var inlineStyle = {
      backgroundColor: bg
    };

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

    var soundcloud = (this.props.show.soundcloud && this.props.show.soundcloud.length) &&
      this.props.show.soundcloud[0];
    var youtube = (this.props.show.soundcloud && this.props.show.soundcloud.length) &&
      this.props.show.youtube[0];

    var ages = '';
    if (this.props.show.minage === 0) ages = 'all ages';
    if (this.props.show.minage) ages = this.props.show.minage + '+';

    /*jshint ignore:start */
    return (
      <div style={inlineStyle} className='show pad1'>
        <VenuePeek title={venue.properties.shortname} />
        <h2 className='showTitle'>
          <a href={this.props.show.url}>{this.props.show.title}</a>
        </h2>
        <div className='pad0y'>
          {priceFormatted ?
            <span className='button small'>${priceFormatted}</span> : '' }
          {soundcloud ?
            <span className='button small'><a href={soundcloud}>soundcloud</a></span> : '' }
          {youtube ?
            <span className='button small'><a href={youtube}>youtube</a></span> : '' }
          {ages ?
            <span className='button small'>{ages}</span> : '' }
        </div>
      </div>
    );
    /*jshint ignore:end */
  }
});

var Drawer = React.createClass({
  render: function() {
    /*jshint ignore:start */
    return (
      <div>
        <h2 className='pad1'>TONIGHT</h2>
        <AgeToggle />
      </div>
    );
    /*jshint ignore:end */
  }
});

var VenuePeek = React.createClass({
  render: function() {
    /*jshint ignore:start */
    return (
      <span className='inset round dark float-right'>
        {this.props.title}
      </span>
    );
    /*jshint ignore:end */
  }
});

var AgeToggle = React.createClass({
  getInitialState: function() {
    return { checked: false };
  },
  handleChange: function(event) {
    this.setState({ checked: event.target.value });
  },
  render: function() {
    return (
      <div className='pad1'>
        <input type='checkbox' onChange={this.handleChange} name='allages-toggle' />
        <label for='allages-toggle'>ALL AGES</label>
      </div>
    );
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
  <ShowList url="example.json" />,
  /*jshint ignore:end */
  document.getElementById('content')
);

React.renderComponent(
  /*jshint ignore:start */
  <Drawer />,
  /*jshint ignore:end */
  document.getElementById('drawer')
);

var snapper = new Snap({
  element: document.getElementById('content'),
  disable: 'right',
  maxPosition:150
});
