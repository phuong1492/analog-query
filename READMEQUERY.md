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
Edit the `src/App.js` file with the content below
```javascript
import React, { useEffect, useState } from "react";
import { TimegraphClient } from "@analog-labs/timegraph-js";
import { web3Enable } from "@polkadot/extension-dapp";

const sessionKey = process.env.REACT_APP_SESSION_KEY;
const timegraphGraphqlUrl = "https://timegraph.testnet.analog.one/graphql";

async function watchSDKTesting(setData, setAliasResponse, name, hashId) {
  await web3Enable("abcd");

  const client = new TimegraphClient({
    url: timegraphGraphqlUrl,
    sessionKey: sessionKey, 
  });

  let aliasResponse = await client.alias.add({
    name: name,
    hashId: hashId,
    identifier: name,
  });

  console.log(aliasResponse);
  setAliasResponse(aliasResponse); 

  const data = await client.view.data({
    _name: name, 
    hashId: hashId, 
    fields: ["_index"],
    limit: 10,
  });

  setData(data);
}

function App() {
  const [data, setData] = useState(null);
  const [aliasResponse, setAliasResponse] = useState(null); 
  const [name, setName] = useState("");
  const [hashId, setHashId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); 
    watchSDKTesting(setData, setAliasResponse, name, hashId);
  };

  return (
    <div>
      <h1>Timegraph Data</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Hash ID:
            <input
              type="text"
              value={hashId}
              onChange={(e) => setHashId(e.target.value)}
              required
            />
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>

      
      {aliasResponse && (
        <div>
          <h2>Alias Response</h2>
          <pre>{JSON.stringify(aliasResponse, null, 2)}</pre>
        </div>
      )}

      {data ? (
        <div>
          <h2>Timegraph Data</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
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

Now i need input name and hashId then submit. Done