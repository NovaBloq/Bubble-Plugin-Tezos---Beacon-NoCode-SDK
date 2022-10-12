function(instance, properties, context) {

    const { wallet_to_receive, amount } = properties;

    const amountInMutez = amount * 1000000;

    if (instance.data.dAppClient && instance.data.userAddress) {
        instance.data.dAppClient.requestOperation({
            operationDetails: [
                {
                    kind: window.TezosOperationType.TRANSACTION,
                    destination: wallet_to_receive,
                    amount: `${amountInMutez}`, // Amount in mutez, the smallest unit in Tezos
                },
            ],
        }).then((res) => {
            const { transactionHash } = res;
            instance.publishState('transaction_hash', transactionHash);
            instance.triggerEvent('token_sent');
        }).catch(instance.data.err)
    }

}