function(instance, properties, context) {


    if (instance.data.dAppClient) {
        instance.data.dAppClient.requestPermissions({ network: instance.data.network }).then(instance.data.connected).catch(instance.data.err)
    }


}