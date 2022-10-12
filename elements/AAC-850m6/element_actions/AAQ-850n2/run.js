function(instance, properties, context) {


    if (instance.data.userAddress) {
        instance.data.dAppClient.clearActiveAccount().then(instance.data.disconnected);
    } 



}