import DS from 'ember-data';

export default DS.Model.extend({
    body:  DS.attr('string'),
    updateType: DS.attr('string'),
    description: DS.attr('string'),
    content: DS.attr('string'),
    creator: DS.attr('string'),
    created_at: DS.attr('date'),

    attachments: DS.hasMany('attachments', {async: true}),
    message: DS.belongsTo('message')
});
