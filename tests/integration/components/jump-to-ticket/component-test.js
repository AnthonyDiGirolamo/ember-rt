import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('jump-to-ticket', 'Integration | Component | jump to ticket', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{jump-to-ticket}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#jump-to-ticket}}
      template block text
    {{/jump-to-ticket}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
