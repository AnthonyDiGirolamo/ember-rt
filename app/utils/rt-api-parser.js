import _ from 'lodash/lodash';
import moment from 'moment';
import MimeParser from 'npm:mimeparser';

function parseTicketMetadata(data, namespace) {
    // console.log(data);
    let ticket = _.chain(data.split('\n'))
        .reject((line) => {
            return !line.trim(); // blank line
        })
        .collect((line) => {
            let first_colon_index = line.indexOf(': ');
            return _.map([line.slice(0, first_colon_index), line.slice(first_colon_index+2)], _.trim);
        })
        .collect((pair) => {
            pair[0] = _.camelCase(pair[0]);
            return pair;
        })
        .zipObject()
        .value();
    ticket.id = ticket.id.replace("ticket/", "");
    ticket.links = {
        "messages": `${namespace}/ticket/${ticket.id}/history`, // ?format=l`
        "attachments": `${namespace}/ticket/${ticket.id}/attachments`
    };
    // console.log(ticket);
    return ticket;
}

function parseTicket(payload, namespace) {
    payload = payload.replace(/RT.*200 Ok\n\n/, '');
    // console.log(payload);

    let data = parseTicketMetadata(payload, namespace);

    data = {"ticket": data};
    // console.log(data);
    return data;
}

function parseHistory(payload, namespace, ticket_id) {
    // console.log(payload);
    // let data = payload.split('\n--\n');

    // Short Format example

    // RT/4.2.12 200 Ok
    //
    // # 6/6 (/total)
    //
    // 3418222: Ticket created by blad
    // 3422059: Status changed from 'new' to 'approval' by blank
    // 3422062: custom-field Blah Blah added by blank
    // 3435862: Given to First Last <first.last@example.com> by dude
    // 3435865: Owner set to First Last <first.last@example.com> by dude
    // 3435868: Outgoing email recorded by RT_System

    let data = _.chain( _.last(payload.split('(/total)\n\n')).split('\n') )
        .reject((line) => {
            return !line.trim(); // blank line
        })
        .collect((line) => {
            let first_colon_index = line.indexOf(': ');
            return _.map([line.slice(0, first_colon_index), line.slice(first_colon_index+2)], _.trim);
        })
        .collect((id_title_pair) => {
            return {'id': id_title_pair[0],
                    'title': id_title_pair[1],
                    'links': {'emails': `${namespace}/ticket/${ticket_id}/history/id/${id_title_pair[0]}`}
                   };
        })
        .value();
    data = {"messages": data};
    // console.log(data);
    return data;
}

function parseEmail(payload, namespace, message_id, ticket_id) {
    // let data = _.chain( payload.split('\n\n'))
    //     .value();

    // console.log(payload);
    let content = /Content: ((.|[\r\n])*)Creator:/.exec(payload);
    if (content) {
        content = _.collect(content[1].split('\n'), (line) => {
            return line.replace(/^         /m, "");
        }).join('\n');
    }

    // let attachments = _.first(/Attachments: ((.|[\r\n])*)$/.exec(payload));
    // console.log(attachments);
    // if (attachments) {
    //     attachments = _.chain(attachments.split('\n'))
    //     .reject((line) => {
    //         return !line.trim(); // blank line
    //     })
    //     .collect((line) => {
    //         let first_colon_index = line.indexOf(': ');
    //         return _.map([line.slice(0, first_colon_index), line.slice(first_colon_index+2)], _.trim);
    //     })
    //     .value();
    //     console.log(attachments);
    // }

    let data = {"emails": [
        { id:            message_id,
          body:          payload,
          created_at:    /^Created: (.*)$/m.exec(payload)[1],
          creator:       /^Creator: (.*)$/m.exec(payload)[1],
          description:   /^Description: (.*)$/m.exec(payload)[1],
          updateType:    /^Type: (.*)$/m.exec(payload)[1],
          changedField:  /^Field: (.*)$/m.exec(payload)[1],
          oldFieldValue: /^OldValue: (.*)$/m.exec(payload)[1],
          newFieldValue: /^NewValue: (.*)$/m.exec(payload)[1],
          subject:       /^Data: (.*)$/m.exec(payload)[1],
          timeTaken:     /^TimeTaken: (.*)$/m.exec(payload)[1],
          content:       content
          // "links": { "attachments": `${namespace}/ticket/${ticket_id}/attachments/${attachment_id}` }
        }]};

    // parser.write(payload);
    // parser.end();

    return data;
}

function parseAttachment(payload, namespace, ticket_id) {
    console.log(payload);

/*
RT/4.2.12 200 Ok

id: ticket/276082/attachments

Attachments: 1859983: (Unnamed) (text/plain / 475b),
             1869271: (Unnamed) (text/plain / 342b)

RT/4.2.12 200 Ok

id: ticket/276058/attachments
Attachments: 1859797: (Unnamed) (text/plain / 802b)

*/
    // let parser = new MimeParser();
    // parser.onheader = function(node){
    //     console.log(node.header.join('\n')); // List all headers
    //     console.log(node.headers['content-type']); // List value for Content-Type
    // };
    // parser.onbody = function(node, chunk){
    //     console.log('Received %s bytes for %s', chunk.byteLength, node.path.join("."));
    // };

    return {};
}

function parseSearch(payload, namespace, search_id) {
    payload = payload.replace(/RT.*200 Ok\n\n/, '');
    // console.log(payload);

    let data = _.collect(payload.split('\n\n--\n\n'), (ticket) => {
        return parseTicketMetadata(ticket, namespace);
    });

    _.each(data, (ticket) => {
        // ticket.id = ticket.id.replace("ticket/", "");

        let rto = moment(ticket.lastUpdated);
        ticket.relativeTimeAgo = rto.fromNow();
        ticket.lastUpdatedUnixTime = rto.unix();
    });

    data = {"tickets": data};
    // console.log(data);
    return data;
}

export {
    parseTicket,
    parseHistory,
    parseEmail,
    parseAttachment,
    parseSearch
};
