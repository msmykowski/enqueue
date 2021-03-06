const React = require('react');
const types = require('react').PropTypes;
const {Actions} = require('p-flux');

class PlaylistPage extends React.Component {
  static propTypes = {
    playlist: types.object
  };

  onClick = () => {
    const {playlist} = this.props;
    const {id} = playlist;
    const addedEntry = this._input.value;
    Actions.socketEmitPlaylistUpdate({id, entry: addedEntry});
  }

  render() {
    const {playlist} = this.props;
    if (!playlist) return (<div className="playlist-does-not-exist">Playlist Does Not Exist</div>);

    const {entries} = playlist;
    const entriesList = entries && entries.map((entry, i) => <div className="entry" key={i}>{entry}</div>);
    return (
      <div>
        <input name="entry-input" className="entry-input" ref={(c) => this._input = c}/>
        <button className="add-entry" onClick={this.onClick}>Add Entry</button>
        <div className="entries-list">
          {entriesList}
        </div>
      </div>
    );
  }
}

module.exports = PlaylistPage;
