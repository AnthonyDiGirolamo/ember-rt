import Ember from 'ember';

export default Ember.Component.extend({
    actions: {
        ok: function() {
            this.$('.modal').modal('hide');
            this.sendAction('ok');
        }
    },
    show: function() {
        this.$('.modal').modal().on('hidden.bs.modal', () => {
            this.sendAction('close');
        });
    }.on('didInsertElement')
});
