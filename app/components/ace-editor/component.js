import Ember from 'ember';

export default Ember.Component.extend({
    editorSelector: 'ace-editor',

    content: function(key, val) {
        if (!this.editor) {
            this.preset = val;
            return val;
        }
        if (arguments.length == 1) {
            return this.editor.getSession().getValue();
        }
        var cursor = this.editor.getCursorPosition();
        this.editor.getSession().setValue(val);
        this.editor.moveCursorToPosition(cursor);
        return val;
    }.property(),

    didInsertElement: function() {
        this.editor = window.ace.edit(this.editorSelector);
        this.editor.setTheme('ace/theme/github');
        this.editor.getSession().setMode('ace/mode/markdown');

        var self = this;
        this.editor.on('change', function() {
            self.notifyPropertyChange('content');
        });

        if (this.preset) {
            this.set('content', this.preset);
            this.preset = null;
        }
    }
});
