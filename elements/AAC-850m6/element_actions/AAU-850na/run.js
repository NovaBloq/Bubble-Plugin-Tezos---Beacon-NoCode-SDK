function(instance, properties, context) {

    const { message } = properties;

    if (message && instance.data.userAddress) {
        instance.data.dAppClient.requestSignPayload({
            signingType: window.SigningType.RAW,
            payload: message
        }).then((res) => {
            instance.publishState('signature', res.signature);
            instance.triggerEvent('signed');
        }).catch(instance.data.err);
    }


}