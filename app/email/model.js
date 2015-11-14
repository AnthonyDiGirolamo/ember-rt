import DS from 'ember-data';

export default DS.Model.extend({
    body:  DS.attr('string'),
    message: DS.belongsTo('message')
});
