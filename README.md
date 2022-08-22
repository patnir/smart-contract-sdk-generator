# smart-contract-sdk-generator

Dependencies: 
1. [ts-node ](https://www.npmjs.com/package/ts-node)

Run the following command to create an SDK from a local ABI file: 
```
npx ts-node main.ts ./Example.json 
```

Run the following command to create a READ-ONLY SDK from a local ABI file. This SDK will only call the READ ONLY functions of the smart contract
```
npx ts-node main.ts ./Example.json --readyOnly
```

