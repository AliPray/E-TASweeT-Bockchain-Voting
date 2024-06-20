//SPDX-License-Identifier: MIT

pragma solidity ^0.8.8;

contract Election {
    //struct for candidate
    struct Candidate {
        uint candidateId;
        string candidateName;
        string party;
        uint voteCount;
    }
    //struct for voter
    struct Voter {
        uint voterId;
        string voterfirstName;
        string voterLastName;
        // there is no need to set a password for voter cause the metamask will handle the authentification
        // on his unique wallet address
        address voterAddress;
        string voterState;
        bool voted;
    }



     // Store accounts that have voted
    mapping(address => bool) public votersVoted;

    //store user account address by their voter Id
    mapping(address => uint) public VotersAddresses;

    //store candidates in a map for faster access
    mapping(uint => Candidate) public candidatesMap;

    //store voters in a map for faster access
    mapping(address => Voter) public votersMap;
    
    //create the owner of election: admin side
     address public owner;

     //return owner function to login with admin:

     function returnOwner() public view returns (address){
        require(msg.sender == owner,"you are not admin");
        return owner;
     }

    // get voter info:
    function getVoterinfo() public view returns(uint , string memory , string memory , 
                         string memory, bool){
         require(votersMap[msg.sender].voterId!=0,"Id/Address not registered!");
         return(
            votersMap[msg.sender].voterId,
            votersMap[msg.sender].voterfirstName,
            votersMap[msg.sender].voterLastName,
            votersMap[msg.sender].voterState,
            votersMap[msg.sender].voted
            
        );

    }



    //variables/mapping/arrays
    // Store Candidates number and voters and casted votes
    uint public candidatesCount;
    uint public numVoters;
    uint public castedVotes;

    //election status
    //results status

    bool public electionStatus;
    bool public resultStatus;

    //create array and a function to return array data to hold candidates info
    Candidate [] public registeredCandidates;
    //mapping to hold the registered Ids of voters  and check if id registered
    mapping(uint => bool) public registeredVoterIds;

   uint[]  public candidatesIds;
    


    //function return all candidates
    function returnCandidates() public view returns (Candidate[] memory){
      Candidate[] memory array = new Candidate[](candidatesCount);
      for (uint i = 0; i < candidatesCount; i++) {
          Candidate storage candidate = registeredCandidates[i];
          array[i] = candidate;
      }
      return array;
    }

    
    function returnResult() public view returns (Candidate[] memory){
      require(resultStatus,"results not out yet");
      
      Candidate[] memory array = new Candidate[](candidatesCount);
      for (uint i = 0; i < candidatesCount; i++) {
          
          uint pointer = candidatesIds[i];
          Candidate storage candidate = candidatesMap[pointer];
          array[i] = candidate;
      }
      return array;
    }

    function getResultStatus() public view returns(bool){
        return resultStatus;
    }

    //trigger resultsStatus
    function triggerResult() public {
        require(msg.sender == owner,"Error, you are not the owner");
        if(!resultStatus){
            resultStatus=true;
        }
    }
    

    //change the election status to true or false to enable/disable voters from voting.
    function triggerElection() public {
        require(msg.sender == owner,"Error, you are not the owner");
        if(!electionStatus){
            electionStatus=true;
        }else{
            electionStatus=false;
        }
    }

    function getElectionStatus() public view returns(bool){
        return electionStatus;
    }

    function getCandidatesNumber() public view returns (uint) {
        return candidatesCount;
    }
    function getVoterNumber() public view returns (uint) {
        return numVoters;
    }
    function getCastedVotes() public view returns (uint) {
        return castedVotes;
    }

    


     //constructor to pre fill candidates and owner of contract
    constructor(){
        owner = msg.sender;

    }



    //function to get candidate infos
    function getCandidateInfo(uint _candidateId) public view returns (uint, 
    string memory, string memory) {

        
        return(
            candidatesMap[_candidateId].candidateId,
            candidatesMap[_candidateId].candidateName,
            candidatesMap[_candidateId].party
        );
    }

    //add candidates

    function addCandidate(uint _candidateId, 
                            string memory _candidateName,
                            string memory _party) public {  
    //check if admin/owner calling this function
    require(msg.sender == owner,"you are not owner");
    require(electionStatus,"election already started");
    //check if the candidate Id exists
    require(candidatesMap[_candidateId].candidateId == 0,"candidate with this id exists!");
    
    Candidate memory newCandidate = Candidate(_candidateId,_candidateName, _party, 0);
    //store candidates details in map by candidate Id
    candidatesMap[_candidateId] =(newCandidate);
    //store candidates info in array
    registeredCandidates.push(newCandidate);
    candidatesIds.push(_candidateId);
    // increment number of candidates in the election
    candidatesCount++;
    }


    //add voters
    
    function addVoter(uint _voterId, string memory _voterfirstName, 
    string memory _voterLastName, 
    string memory  _voterState) public {
        
        require(votersMap[msg.sender].voterId == 0,"voter with this id exists!");
        
        Voter memory newVoter = Voter(_voterId, _voterfirstName, _voterLastName, 
        msg.sender, _voterState, false);
        //store the voter details in a map by voterId
        votersMap[msg.sender] = newVoter;
        //store Voter's Id ( from metamask) in a map by addresses
        VotersAddresses[msg.sender]=_voterId;
        //register voterId to authentificate registeration
        registeredVoterIds[_voterId]=true;
        //incerement number of voters in the election
        numVoters++;
        
    }


    function vote(uint _candidateId) public {
        // require that they haven't voted before
        require(!votersMap[msg.sender].voted,"Already casted vote!");

        // require a valid candidate
        require(candidatesCount>0,"No candidates registered yet!");

        //check if election status on (if election started)
        require(electionStatus,"election hasn't started yet!");
        // record that voter has voted
        votersMap[msg.sender].voted = true;

        // update candidate vote Count
        candidatesMap[_candidateId].voteCount++;

        castedVotes++;

    }

}