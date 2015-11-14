import DS from 'ember-data';

export default DS.Model.extend({
    title:  DS.attr('string'),
    emails: DS.hasMany('emails', {async: true}),
    ticket: DS.belongsTo('ticket')
});
