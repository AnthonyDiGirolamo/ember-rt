import Ember from 'ember';
import { colorAvatar } from '../../utils/avatar-utils';

export default Ember.Component.extend({
    tagName: 'div',
    classNameBindings: ['avatarClass'],
    attributeBindings: ['avatarColorBlockStyle:style'],

    avatarType: 'color',

    avatarClass: function() {
        if (this.get('avatarType') === 'color') {
            return "avatar avatar-color-block";
        }
        else {
            return "avatar";
        }
    }.property('avatarType'),

    avatarColorBlockStyle: function() {
        if (this.get('avatarType') === 'color') {
            return `color:#FFF;background-color:${colorAvatar(this.get('emailAddress'))}`;
        }
        else {
            return "";
        }
    }.property('avatarType','emailAddress'),


    renderAvatar: function() {
        return this.get('emailAddress')[0];
    }.property('avatarType', 'emailAddress'),

    actions: {
        // saveSearch: function() { this.get('search').save(); },
    }
});
