
import { ethers } from "ethers";
class ExampleSDK {
    connectedContract: any;

    constructor(node_url: string, private_key: string, contract_address: string) {
        const provider = new ethers.providers.JsonRpcProvider(node_url);
        let signer = new ethers.Wallet(private_key, provider);
        this.connectedContract = new ethers.Contract(contract_address, [{"inputs":[{"internalType":"string","name":"baseURI_","type":"string"},{"internalType":"uint256","name":"price_","type":"uint256"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"approved","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"operator","type":"address"},{"indexed":false,"internalType":"bool","name":"approved","type":"bool"}],"name":"ApprovalForAll","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"MAX_PUNKS","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"approve","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"multipleOutput","outputs":[{"internalType":"uint256","name":"firstOutput","type":"uint256"},{"internalType":"string","name":"secondOutput","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"getApproved","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"pure","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"operator","type":"address"}],"name":"isApprovedForAll","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"mint","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"ownerOf","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"price","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"bytes","name":"data","type":"bytes"}],"name":"safeTransferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"operator","type":"address"},{"internalType":"bool","name":"approved","type":"bool"}],"name":"setApprovalForAll","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bytes4","name":"interfaceId","type":"bytes4"}],"name":"supportsInterface","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"tokenURI","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"total","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"}],"name":"transferFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}], signer);
    }
	MAX_PUNKS = async (): Promise<Number> => {
      return await this.connectedContract.MAX_PUNKS();
	}
	approve = async (to: string, tokenId: Number): Promise<ethers.providers.TransactionReceipt> => {
    const transaction: ethers.providers.TransactionResponse =
      await this.connectedContract.approve(to, tokenId);
    return await transaction.wait();};
	balanceOf = async (owner: string): Promise<Number> => {
      return await this.connectedContract.balanceOf(owner);
	}
	multipleOutput = async (): Promise<{firstOutput: Number, secondOutput: string}> => {
      return await this.connectedContract.multipleOutput();
	}
	getApproved = async (tokenId: Number): Promise<string> => {
      return await this.connectedContract.getApproved(tokenId);
	}
	isApprovedForAll = async (owner: string, operator: string): Promise<Boolean> => {
      return await this.connectedContract.isApprovedForAll(owner, operator);
	}
	mint = async (valueInEth: Number): Promise<ethers.providers.TransactionReceipt> => {
    const transaction: ethers.providers.TransactionResponse =
      await this.connectedContract.mint({value: ethers.utils.parseEther(valueInEth.toString())});
    return await transaction.wait();};
	name = async (): Promise<string> => {
      return await this.connectedContract.name();
	}
	owner = async (): Promise<string> => {
      return await this.connectedContract.owner();
	}
	ownerOf = async (tokenId: Number): Promise<string> => {
      return await this.connectedContract.ownerOf(tokenId);
	}
	price = async (): Promise<Number> => {
      return await this.connectedContract.price();
	}
	renounceOwnership = async (): Promise<ethers.providers.TransactionReceipt> => {
    const transaction: ethers.providers.TransactionResponse =
      await this.connectedContract.renounceOwnership();
    return await transaction.wait();};
	safeTransferFrom = async (from: string, to: string, tokenId: Number): Promise<ethers.providers.TransactionReceipt> => {
    const transaction: ethers.providers.TransactionResponse =
      await this.connectedContract.safeTransferFrom(from, to, tokenId);
    return await transaction.wait();};
	safeTransferFrom2 = async (from: string, to: string, tokenId: Number, data: string): Promise<ethers.providers.TransactionReceipt> => {
    const transaction: ethers.providers.TransactionResponse =
      await this.connectedContract.safeTransferFrom(from, to, tokenId, data);
    return await transaction.wait();};
	setApprovalForAll = async (operator: string, approved: Boolean): Promise<ethers.providers.TransactionReceipt> => {
    const transaction: ethers.providers.TransactionResponse =
      await this.connectedContract.setApprovalForAll(operator, approved);
    return await transaction.wait();};
	supportsInterface = async (interfaceId: string): Promise<Boolean> => {
      return await this.connectedContract.supportsInterface(interfaceId);
	}
	symbol = async (): Promise<string> => {
      return await this.connectedContract.symbol();
	}
	tokenURI = async (tokenId: Number): Promise<string> => {
      return await this.connectedContract.tokenURI(tokenId);
	}
	total = async (): Promise<Number> => {
      return await this.connectedContract.total();
	}
	transferFrom = async (from: string, to: string, tokenId: Number): Promise<ethers.providers.TransactionReceipt> => {
    const transaction: ethers.providers.TransactionResponse =
      await this.connectedContract.transferFrom(from, to, tokenId);
    return await transaction.wait();};
	transferOwnership = async (newOwner: string): Promise<ethers.providers.TransactionReceipt> => {
    const transaction: ethers.providers.TransactionResponse =
      await this.connectedContract.transferOwnership(newOwner);
    return await transaction.wait();};
convertEthereumToNumber = (value: any): Number => { return Number(ethers.utils.formatEther(value));}
}