import Ember from 'ember';
import DS from 'ember-data';
// import ApplicationAdapter from '../adapters/application';
// import LSAdapter from '';
import { parseSearch } from '../utils/rt-api-parser';

export default DS.LSAdapter.extend({
    namespace: 'ember-rt',

});
