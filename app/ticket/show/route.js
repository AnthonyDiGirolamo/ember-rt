import Ember from 'ember';
import TicketBaseRoute from '../route';

export default TicketBaseRoute.extend({
    model: function(params) {
        return this.store.find('ticket', params.ticket_id);
    },
    actions: {
    }
});
