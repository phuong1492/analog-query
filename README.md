## Title: Script to Run Query for Analog Project View

### Preparation
- **Node Version**: 14
- **Download Source**: Download the source code to your machine
- **Install Dependencies**: Navigate to the code directory and run `npm i`
- **Export JSON File**: Export the JSON file from Polkadot.js or Subwallet

### How to Run
1. **Create Session Key (only run once)**
    - Open the `createSSK.js` file and replace the variables `WALLET_JSON`, `WALLET_ADD`, and `PASSWORD`
    - `WALLET_JSON`: The content of the JSON file exported from Polkadot.js or Subwallet (format example: `{"encoded":"pLeF+fSC6RIKqM...`)
    - `WALLET_ADD`: The address of the Polkadot.js or Subwallet
    - `PASSWORD`: The password set during export

    - Run the file: `node createSSK.js`

2. **Run Query**
    - Open the `query.js` file and replace `myViewHash` and `myViewName` with your own view values
    - Run the file: `node query.js`

This should help you create the necessary documentation for your project. If you need any further adjustments or additions, feel free to ask!