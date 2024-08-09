## Step 1: Create a React Application
Run the following command to create a React application and save it in the folder `timegraph-app`:
```
npx create-react-app timegraph-app
cd timegraph-app
```
## Step 2: Install Necessary Packages
```
npm install @polkadot/extension-dapp @analog-labs/timegraph-js dotenv
```
## Step 3: Create a .env File
Replace `your-session-key-here` with your session key (this is a one-time setup):
```
REACT_APP_SESSION_KEY=your-session-key-here
```
## Step 4: Configure the React Application
Edit the `src/App.js` file with the content below, replacing `name` and `hashId`:
```javascript
import React, { useEffect, useState } from "react";
import { TimegraphClient } from "@analog-labs/timegraph-js";
import { web3Enable } from "@polkadot/extension-dapp";

const sessionKey = process.env.REACT_APP_SESSION_KEY;
const timegraphGraphqlUrl = "https://timegraph.testnet.analog.one/graphql";

async function watchSDKTesting(setData) {
  await web3Enable("abcd");

  const client = new TimegraphClient({
    url: timegraphGraphqlUrl,
    sessionKey: sessionKey,
  });
  let datas = []

  let aliasResponse = await client.alias.add({
        name: "name",
        hashId: "hashId",
        identifier: "name",
      });
      console.log(aliasResponse);
      datas = [...datas, ...aliasResponse];
      let response = await client.view.data({
          hashId: "hashId",
          _name: "name",
          fields: ["_index"],
          limit: "3",
      });
      console.log(response);
      datas = [...datas, ...response];

  setData(datas);
}

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    watchSDKTesting(setData);
  }, []);

  return (
    <div>
      <h1>Timegraph Data</h1>
      {/* Display the data if it's available */}
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
```
## Step 5: Run the Application
```
npm start
```
## Step 6: Access the Application to Run the Code
Typically, the app will be available at `http://localhost:3000`. 
You just need to open a browser and enter the address `http://localhost:3000` to run the query for you.