import DS from 'ember-data';

export default DS.Model.extend({
    header: DS.attr('string'),
    body: DS.attr('string'),
    ticket: DS.belongsTo('ticket')
});
