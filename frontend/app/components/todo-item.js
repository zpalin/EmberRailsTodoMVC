export default Ember.Component.extend({
  actions: {
    removeTodo: function(){
      var todo = this.get('todo');
      todo.deleteRecord();
      todo.save();
    },

    editTodo: function() {
      this.set('isEditing', true);
    },

    acceptChanges: function() {
      this.set('isEditing', false);

      if(Ember.isEmpty(this.get('todo.title'))) {
        this.send('removeTodo');
      } else {
        this.get('todo').save();
      }
    }
  },

  isEditing: false,

  isCompleted: Ember.computed({
    get: function() {
      var todo = this.get('todo');
      return todo.get('isCompleted');
    },
    set: function(key, value) {
      var todo = this.get('todo');
      todo.set('isCompleted', value);
      todo.save();
      return value;
    }
  })
});