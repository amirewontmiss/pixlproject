import { toNano } from '@ton/core';
import { Pixl } from '../wrappers/Pixl';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const pixl = provider.open(
        Pixl.createFromConfig(
            {
                id: Math.floor(Math.random() * 10000),
                counter: 0,
            },
            await compile('Pixl')
        )
    );

    await pixl.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(pixl.address);

    console.log('ID', await pixl.getID());
}
