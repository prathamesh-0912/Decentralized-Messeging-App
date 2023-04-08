

// SPDX-License-Identifier: MIT
pragma solidity >= 0.7.0 < 0.9.0;

contract Chatapp{

    // USER STRUCTURE
    struct user{
        string name;
        friend[] friendList;
    }

    struct friend{
        address pubkey;
        string name;
    }

    struct message{
        address sender;
        uint256  timestamp;
        string msg;
    }

    struct alluserstruck{
        string name;
        address accountaddress; 
    }

    alluserstruck[] getalluser;

    mapping(address => user) userlist;
    mapping(bytes32 => message[]) allmessages;

    //Check user exist
    function checkuserexists(address pubkey) public view returns(bool){
        return bytes(userlist[pubkey].name).length > 0;
    }

    // Create Account
    function createaccount(string calldata name) external{
        require(checkuserexists(msg.sender) == false, "user already exists");
        require(bytes(name).length > 0, "Username cannt o be empty");

        userlist[msg.sender].name = name;

        getalluser.push(alluserstruck(name, msg.sender));

    }

    //Get username
    function getusername(address pubkey) external view returns(string memory){
        require(checkuserexists(pubkey), "User is not Registered");
        return userlist[pubkey].name;

    }

    //Add friends
    function addfriend(address friend_key, string calldata name) external{
        require(checkuserexists(msg.sender), "Create A account First");
        require(checkuserexists(friend_key), "User is not registered");
        require(msg.sender != friend_key, "User cannot add themselves as a friend");
        require(checkalreadyfriend(msg.sender, friend_key) == false, "Already Friend");

        _addfriend(msg.sender, friend_key, name);
        _addfriend(friend_key, msg.sender, userlist[msg.sender].name);
    }

    //heckalreadyfriend
    function checkalreadyfriend(address pubkey1, address pubkey2) internal view returns(bool){
        if (userlist[pubkey1].friendList.length > userlist[pubkey2].friendList.length){
            address tmp = pubkey1;
            pubkey1 = pubkey2;
            pubkey2 = tmp;
        }

        for(uint256 i = 0 ; i<userlist[pubkey1].friendList.length; i++){

            if (userlist[pubkey1].friendList[i].pubkey == pubkey2) return true;
        }
        return false;
    }

    function _addfriend(address me , address friend_key, string memory name) internal {
        friend memory newFriend = friend(friend_key, name);
        userlist[me].friendList.push(newFriend);
    }
      //GET my frinflist
    function  getmyfriendlist()external view returns (friend[] memory){
        return userlist[msg.sender].friendList;
    }

    // Get chat code
    function getchatcode(address pubkey1, address pubkey2) internal pure returns(bytes32){
        if (pubkey1 < pubkey2){
            return keccak256(abi.encodePacked(pubkey1, pubkey2));
        }
        else {
        return keccak256(abi.encodePacked(pubkey2, pubkey1));
        }
    }

    // Send message
    function sendmessege(address friend_key, string calldata _msg) external{
        require(checkuserexists(msg.sender), "Create A Account");
        require(checkuserexists(friend_key), "User not registered");
        require(checkalreadyfriend(msg.sender, friend_key), "You are not a friend");

        bytes32 chatcode  = getchatcode(msg.sender, friend_key);
        message memory newMsg = message(msg.sender, block.timestamp , _msg);
        allmessages[chatcode].push(newMsg);
    }

    //Read Message
    function readmessage(address friend_key)external view returns(message[] memory){
        bytes32 chatcode = getchatcode(msg.sender, friend_key);
        return allmessages[chatcode];
    }

    function getallappuser() public view returns (alluserstruck[] memory){
        return getalluser;
    }
}