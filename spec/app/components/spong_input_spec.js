require('../spec_helper');

describe('songInput', () => {
  let spotifySpy, subject;
  beforeEach(() => {
    const entries = ['song1', 'song2'];
    const playlist = {id: 1, entries};
    spotifySpy = jasmine.createSpyObj('spotify', ['searchTracks']);
    const props = {playlist, spotify: spotifySpy};
    const SongInput = require('../../../app/components/song_input');
    subject = ReactDOM.render(<SongInput {...props}/>, root);
  });

  it('renders an input', () => {
    expect('.entry-input').toExist();
    expect('.add-entry').toContainText('Add Entry');
    expect('.search-entry').toContainText('Search Entry');
  });

  describe('clicking the add song', () => {
    let newSong;
    beforeEach(() => {
      newSong = 'song3';
      $('.entry-input').val(newSong);
      $('.add-entry').simulate('click');
    });

    it('dispatches a playlist update event', () => {
      expect(Dispatcher.dispatch).toHaveBeenCalledWith({type: 'socketEmitPlaylistUpdate', data: {id: 1, entry: newSong}});
    });
  });

  describe('clicking the search song', () => {
    let newSong, tracks, promise;
    beforeEach(() => {
      tracks = [1,2,3,4];
      newSong = 'my-song';
      promise = Promise.resolve({body: {tracks: {items: tracks}}});
      spyOn(require('../../../app/adapters/spotify_adapter'), 'createClient').and.returnValue(spotifySpy);
      spotifySpy.searchTracks.and.returnValue(promise);
      $('.entry-input').val(newSong);
      $('.search-entry').simulate('click');
    });

    it('fetches the songs from spotify', () => {
      expect(spotifySpy.searchTracks).toHaveBeenCalled();
    });

    it('sets the state with the tracks that are returned', (done) => {
      promise.then(() => {
        expect(subject.state.tracks).toEqual(tracks)
        done();
      });
    });

    it('puts the songs on the page', () => {
      
    });
  });
});
