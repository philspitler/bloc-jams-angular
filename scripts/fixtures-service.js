angular.module('blocJams').factory('Fixtures', function () {
  var albumPicasso = {
      name: 'The Colors',
      artist: 'Pablo Picasso',
      label: 'Cubism',
      year: '1881',
      albumArtUrl: 'assets/images/album_covers/01.png',
      songs: [
          { name: 'Blue', length: '161.71', audioUrl: 'assets/music/blue', playing: false },
          { name: 'Green', length: '103.96', audioUrl: 'assets/music/green', playing: false },
          { name: 'Red', length: '268.45', audioUrl: 'assets/music/red', playing: false },
          { name: 'Pink', length: '153.14', audioUrl: 'assets/music/pink', playing: false },
          { name: 'Magenta', length: '374.22', audioUrl: 'assets/music/magenta', playing: false }
      ]
  };

  var albumMarconi = {
      name: 'The Telephone',
      artist: 'Guglielmo Marconi',
      label: 'EM',
      year: '1909',
      albumArtUrl: 'assets/images/album_covers/20.png',
      songs: [
          { name: 'Hello, Operator?', length: '1:01' },
          { name: 'Ring, ring, ring', length: '5:01' },
          { name: 'Fits in your pocket', length: '3:21' },
          { name: 'Can you hear me now?', length: '3:14' },
          { name: 'Wrong phone number', length: '2:15' }
      ]
  };

  return {
    getAlbum: function () {
      return albumPicasso;
    },
    getCollection: function (numberOfAlbums) {
      var albums = [];
      for (var i = 0; i < numberOfAlbums; i++) {
        albums.push(albumPicasso);
      }
      return albums;
    }
  };
});
