import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';

import {checkifwalletconnected, connectwallet, connectingwithContract} from '../utils/apifeatures';


export const Chatappcontect = React.createContext();   

export const ChatappProvider = ({children}) => {

    const [account, setAccount] = useState("");
    const [username, setUsername] = useState("");
    const [friendlist, setFriendlist] = useState([]);
    const [friendmsg,  setfriendmsg] = useState([]);
    const [loading, setLoading] =  useState(false);
    const [userlist, setUserlist]= useState([]);
    const [error, seterror] = useState('');

    //Chat User Data
    const [currentUsername, setCurrentUsername] = useState("");
    const [currentUseraddess, setCurrentUseraddress] = useState("");
    
    const router = useRouter();

    //Fetch DAta time of page Load
    const fetchData = async() => {
        try { 
            //Get Contract
            const contract = await connectingwithContract();
            //Get Account
            const connectaccount = await connectwallet();
            setAccount(connectaccount);
            //Get Uername
            const username = await contract.getusername(connectaccount);
            setUsername(username)
            //Get My Friendlist
            const friendlist = await contract.getfriendlist();
            setFriendlist(friendlist)
            //Get Al users
            const userlist =await contract.getuserlist();
            setUserlist(userlist);

        } catch (error) {
            seterror("Please Install And connect Your Wallet")
        }
    };
    useEffect(() => {
        fetchData();
    },[]);

    //Read MSG
    const readmessage = async(friendaddress) => {
        try {
            const contract = await connectingwithContract();
            const read = await contract.readmessage(friendaddress);
            setfriendmsg(read); 
            
        } catch (error) {
            setError("Currenttly You Have No Messages");
        }
    };

    //Create Account
    const createaccount = async({ name, accountaddress }) => {
        if (name || accountaddress)
            return setError("Name and Accountaddress cannot be Empty");

        const contract = await connectingwithContract();
        const getcreateuser = await contract.createaccount(name);
        setLoading(true);
        await getcreateuser.wait();
        setLoading(false);
        window.location.reload();
    };   

    //Add your friend
    const addfriend = async({name, accountaddress}) => {
        try {
            if (name || accountaddress)
                return setError("Please Provide Data");
            const contract = await connectingwithContract();
            const addmyfriend = await contract.addfriend(accountaddress, name);
            setLoading(true);
            await addmyfriend.wait();
            setLoading(false);
            router.push("/");
            window.location.reload();

        } catch (error) {
            setError("Something went wrong while adding friend, Try Again");
        }
    }

    //Send MSG
    const sendmessage = async({msg, address}) => {
        try {
            const contract = await connectingwithContract();
            const addmessage = await contract.sendmessage(address, msg);
            setLoading(true);
            await addmessage.wait()
            setLoading(false);
            window.location.reload();
            
        } catch (error) {
            setError("Please Reload and Try Again");
        }
    }

    //Read Info
    const readuser  = async(useraddress) => {
        const contract = await connectingwithContract();
        const username = await contract.getusername(useraddress);
        setCurrentUsername(username);
        setCurrentUseraddress(useraddress);
    }

    return <Chatappcontect.Provider value={{readmessage, createaccount, addfriend, sendmessage, readuser, connectwallet, checkifwalletconnected,
    currentUsername, currentUseraddess,account, username, friendlist, friendmsg, loading, error, userlist}}>
        {children}
    </Chatappcontect.Provider>
}   