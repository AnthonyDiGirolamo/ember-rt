import DS from 'ember-data';

export default DS.Model.extend({
    subject:         DS.attr('string'),
    requestors:      DS.attr('string'),
    owner:           DS.attr('string'),
    adminCc:         DS.attr('string'),
    cc:              DS.attr('string'),
    cfUaDevCodebase: DS.attr('string'),
    created:         DS.attr('string'),
    creator:         DS.attr('string'),
    due:             DS.attr('string'),
    finalPriority:   DS.attr('string'),
    initialPriority: DS.attr('string'),
    lastUpdated:     DS.attr('string'),
    priority:        DS.attr('string'),
    queue:           DS.attr('string'),
    resolved:        DS.attr('string'),
    started:         DS.attr('string'),
    starts:          DS.attr('string'),
    status:          DS.attr('string'),
    timeEstimated:   DS.attr('string'),
    timeLeft:        DS.attr('string'),
    timeWorked:      DS.attr('string'),
    told:            DS.attr('string'),

    messages: DS.hasMany('messages')
});
