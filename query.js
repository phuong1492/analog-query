const { TimegraphClient } = require("@analog-labs/timegraph-js");
const fs = require('fs').promises;
const SSKeyPath = '.session.txt';
const myViewHash = ""
const myViewName = ""
const otherViewHash = ""
const otherViewName = ""
async function getSSKey(filePath) {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return data;
    } catch (err) {
        console.error('Error reading file:', err);
        throw err;
    }
}

async function main() {
    const SSKey = await getSSKey(SSKeyPath);
    console.log(SSKey)
    const timeGraphClient = new TimegraphClient({
        url: "https://timegraph.testnet.analog.one/graphql", 
        sessionKey: SSKey,
    });

    try {
        let response = await timeGraphClient.view.data({
            hashId: myViewHash,
            fields: ["_index"],
            identifier: myViewName,
            limit: "3",
        });

        let aliasResponse2 = await timeGraphClient.alias.add({
            name: "zzzzzz1",
            hashId: "QmViFKsyH8qGWgbKyYX66QobVy5s2D9EWxwgwpweSPCsUP",
            identifier: "zzzzzz1",
        });
        

        let response1 = await timeGraphClient.view.data({
            hashId: "QmViFKsyH8qGWgbKyYX66QobVy5s2D9EWxwgwpweSPCsUP",
            fields: ["_index"],
            limit: "3",
        });

        aliasResponse2 = await timeGraphClient.alias.add({
            name: "dfxzccxzcz",
            hashId: "QmUo31vmtUcys9LBrZHSiVWVoQf6LMj1sxnLd6EcDZdWfG",
            identifier: "dfxzccxzcz",
        });

        response1 = await timeGraphClient.view.data({
            hashId: "QmUo31vmtUcys9LBrZHSiVWVoQf6LMj1sxnLd6EcDZdWfG",
            fields: ["_index"],
            limit: "3",
        });
        
        console.log(response)
        if (otherViewHash != ""){
            let aliasResponse = await timeGraphClient.alias.add({
                name: otherViewName,
                hashId: otherViewHash,
                identifier: otherViewName,
            });
            console.log(aliasResponse);
    
            let response2 = await timeGraphClient.view.data({
                hashId: otherViewHash,
                fields: ["_index"],
                limit: "3",
            });
    
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
