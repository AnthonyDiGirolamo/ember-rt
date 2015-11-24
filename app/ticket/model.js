import DS from 'ember-data';

export default DS.Model.extend({
    // raw:             DS.attr('string'),
    subject:         DS.attr('string'),
    requestors:      DS.attr('string'),
    owner:           DS.attr('string'),
    adminCc:         DS.attr('string'),
    cc:              DS.attr('string'),
    cfUaDevCodebase: DS.attr('string'),
    creator:         DS.attr('string'),
    due:             DS.attr('string'),
    finalPriority:   DS.attr('string'),
    initialPriority: DS.attr('string'),
    priority:        DS.attr('string'),
    queue:           DS.attr('string'),
    starts:          DS.attr('string'),
    status:          DS.attr('string'),
    timeEstimated:   DS.attr('string'),
    timeLeft:        DS.attr('string'),
    timeWorked:      DS.attr('string'),

    created:         DS.attr('date'),
    started:         DS.attr('date'),
    resolved:        DS.attr('date'),
    told:            DS.attr('date'),
    lastUpdated:     DS.attr('date'),

    user:     DS.belongsTo('user', {async: true}),
    messages: DS.hasMany('messages', {async: true}),
    attachments: DS.hasMany('attachments', {async: true})
});
