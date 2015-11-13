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
    // console.log(data);
    return data;
}

function parseHistory(payload, namespace) {
    console.log(payload);
    return {};
}

export {
  parseTicket,
  parseHistory
};
