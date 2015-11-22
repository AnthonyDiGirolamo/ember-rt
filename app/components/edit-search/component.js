import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        saveSearch: function() {
            let s = this.get('searchRecord');
            s.set('lastUpdated', Math.floor(new Date() / 1000));
            s.save();
            this.$('.modal').modal('hide');
            this.sendAction('removeModal');
        },
        deleteSearch: function() {
            let s = this.get('searchRecord');
            s.destroyRecord();
            this.$('.modal').modal('hide');
            this.sendAction('removeModal');
        },
        removeModal: function() {
            this.sendAction('removeModal');
        }
    }
});
