import _ from 'lodash/lodash';

function parseTicket(payload, namespace) {
    let data = _.chain(payload.split('\n'))
        .reject((line) => {
            return !line.trim() || // blank line
                (_.startsWith(line, "RT/") &&
                 _.endsWith(line,   "200 Ok"));
        })
        .collect((line) => {
            return _.map(line.split(':', 2), _.trim);
        })
        .collect((pair) => {
            pair[0] = _.camelCase(pair[0]);
            return pair;
        })
        .zipObject()
        .value();
    data.id = data.id.replace("ticket/", "");
    data.links = { "messages": namespace + "/ticket/" + data.id + "/history" };
    data = {"ticket": data};
    console.log(data);
    return data;
}

function parseHistory(payload, namespace, ticket_id) {
    // console.log(payload);

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
            return !line.trim() // blank line
        })
        .collect((line) => {
            return _.map(line.split(':', 2), _.trim);
        })
        .collect((id_title_pair) => {
            return {'id': id_title_pair[0],
                    'title': id_title_pair[1],
                    'links': {'content': namespace + "/ticket/" + ticket_id + "/history/id/" + id_title_pair[0]}
                   };
        })
        .value();
    data = {"messages": data};
    console.log(data);
    return data;
}

export {
  parseTicket,
  parseHistory
};
