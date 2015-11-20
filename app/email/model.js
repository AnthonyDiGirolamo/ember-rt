import DS from 'ember-data';

export default DS.Model.extend({
    body:  DS.attr('string'),
    attachments: DS.hasMany('attachments', {async: true}),
    message: DS.belongsTo('message')
});
