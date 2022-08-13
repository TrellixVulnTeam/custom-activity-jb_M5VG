var connection = new Postmonger.Session();
var eventKey = '';

connection.trigger('ready');

connection.on('requestedTriggerEventDefinition', function (eventDefinitionModel) {
    var eventKey = eventDefinitionModel['eventDefinitionKey'];
    save(eventKey);
});

connection.on('initActivity', function( data ) {
    document.getElementById('response').value = JSON.stringify(data, null, 2);
    payload = data;
});

connection.on('clickedNext', function() {
    var resp = JSON.parse(document.getElementById('response').value);
    console.log(eventKey);
    var params = {
        subscriberKey: '{{Contact.key}}',
        email: '{{Event.' + eventKey + '.Email}}',
      };
    payload['arguments'].execute.inArguments = [params];
    connection.trigger('updateActivity', payload);
});
