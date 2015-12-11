import DS from 'ember-data';

export default DS.Model.extend({
    body:          DS.attr('string'),
    updateType:    DS.attr('string'),
    description:   DS.attr('string'),
    content:       DS.attr('string'),
    changedField:  DS.attr('string'),
    oldFieldValue: DS.attr('string'),
    newFieldValue: DS.attr('string'),
    creator:       DS.attr('string'),
    timeTaken:     DS.attr('string'),
    subject:       DS.attr('string'),
    created_at:    DS.attr('date'),

    attachments: DS.hasMany('attachments', {async: true}),
    message: DS.belongsTo('message')
});
