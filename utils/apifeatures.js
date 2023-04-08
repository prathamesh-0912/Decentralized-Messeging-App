import {ethers} from 'ethers';
import {web3modal} from 'web3modal';

import {Chatappaddress, ChatappABI} from '../context/constant';

export const  checkifwalletconnected = async() =>{
    try {
        if (!window.ethereum) return console.log('Install MateMask')
        const account  = await window.ethereum.request({
            method: "eth_account",
        });
        const firstaccount = account[0];
        return firstaccount;
    } catch (error) {
        console.log(error);
        
    }
}

export const connectwallet = async()=>{
    try {
        if (!window.ethereum) return console.log('Connect Wallet')
        const account  = await window.ethereum.request({
            method: "eth_requestaccounts",
        });
        const firstaccount = account[0];
        return firstaccount;
    } catch (error) {
        console.log(error);
        
    }
}

const fetchcontract = (signerorProvider) => new ethers.Contract(Chatappaddress, ChatappABI, signerorProvider);

export const connectingwithContract = async() => {
    try {
        const web3modal = new web3modal();
        const connection = new web3modal.connect();
        const provider = new ethers.providers.web3modal(connection);
        const signer = provider.getSigner();
        const Contract =  fetchcontract(signer);

        return Contract;

    } catch (error) {
        console.log(error);
    }
}

export const convertTime = (time) => {

    const newtime = new Data(time.toNumber());
    const realtime = newtime.getHours() + "/" + newtime.getMinutes() + "/" + newtime.getSeconds() + 
    " Date:" + newtime.getData() + "/" + newtime.getMonth()+ "/" + newtime.getFullYear();

    return realtime;

}