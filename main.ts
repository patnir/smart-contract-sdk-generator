import { readFileSync } from "fs";
import { writeFile } from "fs/promises";

function payableNonPayableFunctions(
  functionName: string,
  current: any,
  type_mapping: any
): string {
  if (current.outputs > 0) {
    throw Error(`We don't support write functions with multiple outputs.`);
  }

  let inputString = "";
  let inputToFunctionString = "";

  if (current.inputs.length == 1) {
    inputString = `${current.inputs[0].name}: ${
      type_mapping[current.inputs[0].type]
    }`;
    inputToFunctionString = `${current.inputs[0].name}`;
  } else if (current.inputs.length > 1) {
    for (let i = 0; i < current.inputs.length - 1; i++) {
      inputString += `${current.inputs[i].name}: ${
        type_mapping[current.inputs[i].type]
      }, `;
      inputToFunctionString += `${current.inputs[i].name}, `;
    }
    inputString += `${current.inputs[current.inputs.length - 1].name}: ${
      type_mapping[current.inputs[current.inputs.length - 1].type]
    }`;
    inputToFunctionString += `${
      current.inputs[current.inputs.length - 1].name
    }`;
  }

  if (current.stateMutability === "payable") {
    inputString +=
      current.inputs.length === 0
        ? "valueInEth: Number"
        : ", valueInEth: Number";
    inputToFunctionString +=
      current.inputs.length === 0
        ? "{value: ethers.utils.parseEther(valueInEth.toString())}"
        : ",{value: ethers.utils.parseEther(valueInEth.toString())}";
  }

  return `\n\t${functionName} = async (${inputString}): Promise<ethers.providers.TransactionReceipt> => {
    const transaction: ethers.providers.TransactionResponse =
      await this.connectedContract.${current.name}(${inputToFunctionString});
    return await transaction.wait();};`;
}

function viewPureFunctions(
  functionName: string,
  current: any,
  type_mapping: any
): string {
  let inputString = "";
  let inputToFunctionString = "";

  let outputType = type_mapping[current.outputs[0].type];

  if (current.inputs.length == 1) {
    inputString = `${current.inputs[0].name}: ${
      type_mapping[current.inputs[0].type]
    }`;
    inputToFunctionString = `${current.inputs[0].name}`;
  } else if (current.inputs.length > 1) {
    for (let i = 0; i < current.inputs.length - 1; i++) {
      inputString += `${current.inputs[i].name}: ${
        type_mapping[current.inputs[i].type]
      }, `;
      inputToFunctionString += `${current.inputs[i].name}, `;
    }
    inputString += `${current.inputs[current.inputs.length - 1].name}: ${
      type_mapping[current.inputs[current.inputs.length - 1].type]
    }`;
    inputToFunctionString += `${
      current.inputs[current.inputs.length - 1].name
    }`;
  }

  if (current.outputs.length > 1) {
    console.log("fits the bill");
    console.log(current.name);
    console.log(current.outputs);
    outputType = "{";
    for (let i = 0; i < current.outputs.length - 1; i++) {
      outputType += `${current.outputs[i].name}: ${
        type_mapping[current.outputs[i].type]
      }, `;
    }
    outputType += `${current.outputs[current.outputs.length - 1].name}: ${
      type_mapping[current.outputs[current.outputs.length - 1].type]
    }`;
    outputType += "}";
  }

  return `\n\t${functionName} = async (${inputString}): Promise<${outputType}> => {
      return await this.connectedContract.${current.name}(${inputToFunctionString});\n\t}`;
}

const addFunctions = (
  contractInterface: { [x: string]: any[] },
  readOnly: boolean
) => {
  const types_dict: any = {};

  const type_mapping: any = {
    address: "string",
    bool: "Boolean",
    bytes: "string",
    bytes4: "string",
    string: "string",
    uint256: "Number",
    uint32: "Number",
    uint: "Number",
    uint64: "Number",
  };

  const functionCount: any = {};

  let result = contractInterface["abi"].map((current: any) => {
    if (current.type === "function") {
      if (!functionCount[current.name]) {
        functionCount[current.name] = 1;
      } else {
        functionCount[current.name] += 1;
      }

      // console.log("function name");
      // console.log(current.name);
      types_dict[current.name as string] = {
        inputs: [],
        outputs: [],
      };
      // console.log("inputs:");
      current.inputs.map((currentInput: any) => {
        // console.log(`\t${currentInput.name}`);
        // console.log(`\t${currentInput.type}`);
        // console.log(`\t${type_mapping[currentInput.type]}`);
        types_dict[current.name as string].inputs.push({
          name: currentInput.name,
          type: type_mapping[currentInput.type],
        });
      });
      // console.log("outputs:");
      current.outputs.map((currentInput: any) => {
        // console.log(`\t${currentInput.name}`);
        // console.log(`\t${currentInput.type}`);
        // console.log(`\t${type_mapping[currentInput.type]}`);
        types_dict[current.name as string].outputs.push({
          name: currentInput.name,
          type: type_mapping[currentInput.type],
        });
      });

      console.log(functionCount);
      console.log(current);
      const functionName =
        functionCount[current.name] == 1
          ? current.name
          : `${current.name}${functionCount[current.name]}`;

      if (["view", "pure"].includes(current.stateMutability)) {
        console.log(current.name);

        return viewPureFunctions(functionName, current, type_mapping);
      } else {
        if (!readOnly) {
          return payableNonPayableFunctions(
            functionName,
            current,
            type_mapping
          );
        }
      }
    }

    return "";
  });

  return result.join("");
};

const main = async () => {
  if (process.argv.length === 2) {
    throw Error("Need to ABI file location");
  }
  const fileLocation = process.argv[2];
  const readyOnly =
    process.argv.length === 4 && process.argv[3] === "--readOnly";

  const contractInterface = JSON.parse(readFileSync(fileLocation, "utf-8"));
  let start = !readyOnly
    ? `
import { ethers } from "ethers";
class ${contractInterface["contractName"]}SDK {
    connectedContract: any;

    constructor(node_url: string, private_key: string, contract_address: string) {
        const provider = new ethers.providers.JsonRpcProvider(node_url);
        let signer = new ethers.Wallet(private_key, provider);
        this.connectedContract = new ethers.Contract(contract_address, ${JSON.stringify(
          contractInterface.abi
        )}, signer);
    }`
    : `
    import { ethers } from "ethers";
    class ${contractInterface["contractName"]}ReadOnlySDK {
        connectedContract: any;
    
        constructor(node_url: string, contract_address: string) {
            const provider = new ethers.providers.JsonRpcProvider(node_url);
            this.connectedContract = new ethers.Contract(contract_address, ${JSON.stringify(
              contractInterface.abi
            )});
        }`;
  start += addFunctions(contractInterface, readyOnly);
  start += `\nconvertEthereumToNumber = (value: any): Number => { return Number(ethers.utils.formatEther(value));}\n}`;

  await writeFile(
    `./${contractInterface["contractName"]}${
      readyOnly ? "ReadOnly" : ""
    }SDK.ts`,
    start,
    "utf-8"
  );
};

main().then(() => {
  console.log("done");
});

/**
 * 
const main = async () => {
  const alchemy_https =
    "https://eth-goerli.g.alchemy.com/v2/SHznwE89Iv3dnva3Whsv2hM42549lVXF";
  const private_key =
    "872d2bf1f1c568539ede9c7fee4b7c558e92945b88d7a02ade40fe3d0273d0b5";
  const contractAddress = "0x9b84ACBA9780Df6AfCb2C199929fC7eb62ab7116";

  const hello = new CypherpunkSDK(alchemy_https, private_key, contractAddress);
  let result = await hello.price();
  console.log(typeof result);
  console.log(result);
  console.log(hello.convertEthereumToNumber(result));
  let newResult = await hello.mint(hello.convertEthereumToNumber(result));
  console.log(newResult);
};

main().then(() => {
  console.log("done?");
});
 * 
 * 
 */
