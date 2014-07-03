/* ex: set tabstop=2 shiftwidth=2 expandtab: */
/** @jsx React.DOM */

module.exports = React.createClass({
  onTouchTap: function(event) {
    location.href = this.props.show.url;
  },
  render: function() {
    var show = this.props.show;
    /*jshint ignore:start */
    return (
      <div className='show-detail'>
        <span onTouchTap={this.openVenue}>venue page</span> &bull;
        { (typeof show.minage === 'number') ?
          (show.minage === 0 ? 'All ages' : show.minage + '+') :
          '' }
      </div>
    );
    /*jshint ignore:end */
  }
});
