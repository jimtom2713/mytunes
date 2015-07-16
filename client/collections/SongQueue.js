// SongQueue.js - Defines a backbone model class for the song queue.
var SongQueue = Songs.extend({

  initialize: function(){

    this.on('dequeue', function(song){
      this.remove(song);
      // if song playing, stop it
    }, this);
  }

});