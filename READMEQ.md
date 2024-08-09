## Bước 1: Tạo ứng dụng React
Chạy lệnh sau sẽ tạo ra ứng dụng react và lưu ở folder timegraph-app

```
npx create-react-app timegraph-app
cd timegraph-app
```

## Bước 2: Cài đặt các gói cần thiết

```
npm install @polkadot/extension-dapp @analog-labs/timegraph-js dotenv
```

## Bước3: Tạo file .env 
Thay thế your-session-key-here bằng session key của bạn (chỉ làm 1 lần)

```
REACT_APP_SESSION_KEY=your-session-key-here
```

## Bước 4: Cấu hình ứng dụng React

sửa file src/App.js bằng nội dung bên dưới, thya name và hashId

```
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

  
  const data = await client.view.data({
    _name: "name", 
    hashId: "hashId", 
    fields: ["_index"],
    limit: 10,
  });

  setData(data);
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

## Bước 5: Chạy ứng dụng
```
npm start
```

## Bước 6: Truy cập vào ứng dụng để nó chạy code 

Thường nó sẽ tạo app ở địa chỉ `http://localhost:3000`
ae chỉ cần mở browser và nhập địa chỉ  `http://localhost:3000` là nó sẽ chạy query cho ae 