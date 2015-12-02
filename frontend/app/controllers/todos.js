import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    createTodo: function() {
      var title = this.get('newTitle');
      
      if (!title){return false};
      if (!title.trim()) {return;}

      var todo = this.store.createRecord('todo', {
        title: title,
        isCompleted: false
      });

      this.set('newTitle', '');

      todo.save();
    },

    clearCompleted: function() {
      var completed = this.model.filterBy('isCompleted', true);
      completed.invoke('deleteRecord');
      completed.invoke('save');
    }
  },

  allAreDone: Ember.computed('@each.isCompleted', {
    get: function() {
      return this.get('length') && this.isEvery('isCompleted');
    },
    set: function(key, value) {
      this.setEach('isCompleted', value);
      this.invoke('save');
      return value;
    }
  }),

  remaining: function() {
    return this.model.filterBy('isCompleted', false).get('length');
  }.property('@each.isCompleted'),

  inflection: function() {
    var remaining = this.get('remaining');

    return (remaining === 1) ? 'item' : 'items';
  }.property('remaining'),

  completed: function() {
    return this.model.filterBy('isCompleted', true).get('length');
  }.property('@each.isCompleted'),

  hasCompleted: function() {
    return this.get('completed') > 0;
  }.property('completed')
});