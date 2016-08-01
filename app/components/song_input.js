const React = require('react');
const types = require('react').PropTypes;
const {Actions} = require('p-flux');

class SongInput extends React.Component {
  static propTypes = {
    playlist: types.object,
    spotify: types.object
  };

  constructor(props, context) {
    super(props, context);
    this.state = {tracks: []};
  }

  addEntry = () => {
    const {playlist} = this.props;
    const {id} = playlist;
    const entry = this._input.value;
    Actions.socketEmitPlaylistUpdate({id, entry});
  }

  searchEntry = async() => {
    const {spotify} = this.props;
    const entry = this._input.value;
    const {body: {tracks: {items: tracks}}} = await spotify.searchTracks(entry);
    this.setState({tracks});
  }

  render() {
    const fetchedSongs = this.state.tracks.map((track, key) => <div {...{key}}>{track.name}</div>)
    return (
      <div>
        <input name="entry-input" className="entry-input" ref={(c) => this._input = c}/>
        <button className="add-entry" onClick={this.addEntry}>Add Entry</button>
        <button className="search-entry" onClick={this.searchEntry}>Search Entry</button>
        {fetchedSongs}
      </div>
    );
  }
}

module.exports = SongInput;
