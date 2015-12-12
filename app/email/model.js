import DS from 'ember-data';

export default DS.Model.extend({

    typeToIcon: {
        "Create":             "asterisk",
        "EmailRecord":        "arrow-right",
        "Correspond":         "envelope-o",
        "Comment":            "comment-o",
        "CommentEmailRecord": "arrow-right",
        "Status":             "question-circle",
        "Give":               "hand-o-right",
        "Set":                "hand-o-right",
        "Take":               "hand-o-right",
        "AddLink":            "sitemap",
        "AddWatcher":         "eye",
        "SetWatcher":         "eye",
        "DelWatcher":         "eye",
        "CustomField":        "tag"
    },

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
    created:       DS.attr('date'),

    isAnEmail: function() {
        let type = this.get('updateType');
        let content = this.get('content').trim();
        return (type === 'Correspond' || type === 'Comment' || type === 'Create') && content; // && !content.substring(0, 43) === "This transaction appears to have no content";
    }.property('updateType'),

    iconClass: function() {
        return this.get('typeToIcon')[this.get('updateType')];
    }.property('updateType'),

    attachments: DS.hasMany('attachments', {async: true}),
    message: DS.belongsTo('message')
});
