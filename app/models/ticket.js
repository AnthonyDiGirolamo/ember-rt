import DS from 'ember-data';

export default DS.Model.extend({
    subject: DS.attr('string'),
    requestors: DS.attr('string'),
    owner: DS.attr('string'),
});
