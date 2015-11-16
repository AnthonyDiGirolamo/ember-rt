import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        saveSearch: function() { this.get('search').save(); },
    }
});
