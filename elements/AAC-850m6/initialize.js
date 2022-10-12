function(instance, context) {
    //## Fix sodium error
    //## https://tezos.b9lab.com/beacon
    // sed -i '' 's/require("libsodium-wrappers"));/require("libsodium-wrappers")).default;/g' ./filename.js
    // sed -i '' 's/qrcode(/qrcode.default(/g' ./filename.js

    instance.data.userAddress;
    instance.data.network;

    instance.data.connected = activeAccount => {
        const { address } = activeAccount;
        instance.data.userAddress = address;
        instance.publishState('connected_wallet_address', address);
        instance.publishState('is_wallet_connected', true);
        instance.triggerEvent('wallet_connected');
    }

    instance.data.disconnected = () => {
        instance.publishState('connected_wallet_address', '');
        instance.publishState('is_wallet_connected', false);
    }

    instance.data.err = err => {
        if (err.title == "Aborted") {
            instance.triggerEvent('user_aborted_action');
        } else console.log(err);
    }

    //Plugin by NovaBloq.com

    instance.data.run = conf => {
        const { dapp_name, network, theme } = conf;
        instance.data.network = {
            type: network.toLowerCase()
        };
        instance.data.dAppClient = new DAppClient({ name: dapp_name });
        instance.data.dAppClient.setColorMode(theme === "Dark" ? window.ColorMode.DARK : window.ColorMode.LIGHT);
        // This code should be called every time the page is loaded or refreshed to see if the user has already connected to a wallet.
        instance.data.dAppClient.getActiveAccount().then((account) => {
            window.tezosProvider = instance.data.dAppClient;
            if (account) instance.data.connected(account);
            else instance.publishState('is_wallet_connected', false);
        });
        instance.data.dAppClient.subscribeToEvent(window.BeaconEvent.ACTIVE_ACCOUNT_SET, (data) => {
            // console.log(`hide triggered: `, data);
        });
    }

}