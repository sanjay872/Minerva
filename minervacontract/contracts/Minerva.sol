// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

contract Minerva {
  
  uint public tutorialCount = 0;
  string public name = "Minerva";
  
  mapping(uint => Video) public tutorials;

  struct User {
    address userAddress;
    mapping(uint => string) broughtTutorials;
    mapping(uint => string) userTutorials;
    uint broughtTutorialsCount;
    uint userTutorialsCount;
  }
  
  struct Video {
    uint id;
    string hash;
    string title;
    address author;
  }

  event VideoUploaded(
    uint id,
    string hash,
    string title,
    address author
  );

  mapping(address => User) public users;

  function uploadTutorial(string calldata _videoHash, string calldata _title) public {
    
     require(bytes(_videoHash).length > 0);
        require(bytes(_title).length > 0);

        tutorialCount++;
        tutorials[tutorialCount] = Video(tutorialCount, _videoHash, _title, msg.sender);
        
        users[msg.sender].userTutorialsCount++;
        users[msg.sender].userTutorials[users[msg.sender].userTutorialsCount] = _videoHash;

        emit VideoUploaded(tutorialCount, _videoHash, _title, msg.sender);
  }

  function getTutorialCount() public view returns(uint) {
    return tutorialCount;
  }

  function getAllTutorials() public view returns(Video[] memory) {
    Video[] memory _tutorials = new Video[](tutorialCount);
    for(uint i = 1; i <=tutorialCount; i++) {
      _tutorials[i-1] = tutorials[i];
    }
    return _tutorials;
  }

  function getTutorialsByUser(address _user) public view returns(Video[] memory) {
    Video[] memory _tutorials = new Video[](users[_user].userTutorialsCount);
    for(uint i = 1; i <= users[_user].userTutorialsCount; i++) {
      _tutorials[i-1] = tutorials[i];
    }
    return _tutorials;
  }

  function buyTutorial(address _author, uint _tutorialId) public {
    require(_author != address(0));
    require(_tutorialId > 0 && _tutorialId <= tutorialCount);
    require(users[msg.sender].userAddress != address(0));
    require(users[_author].userAddress != address(0));
    require(users[msg.sender].userAddress != _author);
    require(keccak256(bytes(users[_author].userTutorials[_tutorialId])) != keccak256(bytes(users[msg.sender].broughtTutorials[_tutorialId])));

    users[msg.sender].broughtTutorialsCount++;
    users[msg.sender].broughtTutorials[users[msg.sender].broughtTutorialsCount] = tutorials[_tutorialId].hash;
  }

}
