const React = require('react');
const types = require('react').PropTypes;
const {Actions} = require('p-flux');
const SongInput = require('./song_input');

class PlaylistPage extends React.Component {
  static propTypes = {
    playlist: types.object
  };

  render() {
    const {playlist, spotify} = this.props;
    if (!playlist) return (<div className="playlist-does-not-exist">Playlist Does Not Exist</div>);

    const {entries} = playlist;
    const entriesList = entries && entries.map((entry, i) => <div className="entry" key={i}>{entry}</div>);
    return (
      <div>
        <SongInput {...{playlist, spotify}}/>
        <div className="entries-list">
          {entriesList}
        </div>
      </div>
    );
  }
}

module.exports = PlaylistPage;
