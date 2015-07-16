// AppView.js - Defines a backbone view class for the whole music app.
var AppView = Backbone.View.extend({

  initialize: function(params){
    this.playerView = new PlayerView({model: this.model.get('currentSong')});
    this.libraryView = new LibraryView({collection: this.model.get('library')});
    this.songQueueView = new SongQueueView({collection: this.model.get('songQueue')});

    // change:currentSong - this is Backbone's way of allowing you to filter events to
    // ONLY receive change events for the specific property, 'currentSong'
    this.model.on('change:currentSong', function(model){
      var currentSong = model.get('currentSong');
      this.playerView.setSong(currentSong);
      currentSong.set('playCount', currentSong.get('playCount') + 1);
      this.libraryView.render();
    }, this);

    this.playerView.$el.on('play', function(e){
      this.model.set('isPlaying', true);
    }.bind(this));

    this.playerView.$el.on('ended', function(e){
      this.model.set('isPlaying', false);
      this.model.get('songQueue').shift();

      var newSong = this.model.get('songQueue').at(0);
      this.model.updateCurrentSong(newSong);
      this.playerView.setSong(newSong);
    }.bind(this));
  },

  render: function(){
    return this.$el.html([
      this.playerView.$el,
      this.libraryView.$el,
      this.songQueueView.$el
    ]);
  }

});
