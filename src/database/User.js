

import { openDB } from './Init';

/*     -- TABLE OF CONTENTS --
       -- format : functionName (input variables) => [outputFieldNames]
     
     Currently implemented:
     addUser(user struct) => [null]
     addImage(username, imagefile, caption) => [null]     //currently probs won't work due to not knowing how to insert file
     addFollow(ownUsername, toFollowUsername) => [null]
     removeFollow(ownUsername, toFollowUsername) => [null]
     getUserID(username) => [useID] //mostly for internal use
     getUserInfo(username) => [userID, username, biography, profileImage, postCount, followersCount, followingCount]
     searchForUsers(keyword) => [userID, username, profileImage]
     setHashtag(hashtag, userID, imageID) => [null]
     getHashtagContainedInfo(hashtag) => [(userID, ImageID), ..., (userID, ImageID)]

     sendGenericQuery(query) => [null]   /send generic query that doesn't expect a return table
     getGenericOneRowQuery(query) => [genericOneRow]  /get one specific row from generic query/
     getGenericListQuery(query) => [genericItem1 , ... , genericItemN] /get all rows that match query


*/
export const addUser = user => {
  let {username, email, password } = user;
  let insertUserQuery = `INSERT INTO users (username, email, password) VALUES 
              ('${username}', '${email}', '${password}');`;
  return sendGenericQuery(insertUserQuery);

}



export const addImage = (username, image, caption) => {
  let userID = getUserID(username).userID;
  let incrementPostNumberQuery = `UPDATE users
                                  SET postCount = postCount + 1
                                  WHERE  userID = ${userID};`;
  sendGenericQuery(incrementPostNumberQuery);
  let getpostCountQuery = `SELECT postCount FROM users WHERE users.userID = ${userID}`
  let postCount = getGenericOneRowQuery(getpostCountQuery)['postCount'];
  let addImageQuery = `INSERT into image_Database (userID, imageID, username, caption, imageFile) VALUES
             (${userID}, ${postCount}, '${username}', '${caption}',${image});`;
  return new Promise( (resolve, reject) => { //IDK how to send image file so I left it like this but NEEDS FIXIN'
    db.transaction(tx => {
      tx.executeSql(addImageQuery, [image], (tx, results) => {
        let selectedUserID = results.rows.item(0);
        resolve(selectedUserID);
      }, (err) => { 
        reject(err); 
      });
    });
  });
}


export const addFollow = (ownUsername, toFollowUsername) => {
  let ownUserID = getUserID(ownUsername).userID;
  let toFollowUserID = getUserID(toFollowUsername).userID;
  let addFollowQuery = `INSERT INTO following_database 
              (followUserID, followUsername, isFollowedUserID, isFollowedUsername) VALUES
              (${ownUserID}), '${ownUsername}', ${toFollowUserID}, '${toFollowUsername}');`;
  let updateFollowerCount = `UPDATE users
                 SET followersCount = followersCount + 1
                 WHERE userID = ${toFollowUserID};`;
  let updateFollowingCount =`UPDATE users
                 SET followeingCount = followersCount + 1
                 WHERE userID = ${ownUserID};`;
  sendGenericQuery(addFollowQuery);
  sendGenericQuery(updateFollowingCount);
  return sendGenericQuery(updateFollowerCount);
}

export const removeFollow = (ownUsername, toUnfollowUsername) => {
  let removeFollowQuery = `DELETE FROM following_database 
               WHERE followUsername = '${ownUsername}' AND isFollowedUsername = '${toUnfollowUsername}' `;
  let updateFollowerCount = `UPDATE users
                 SET followersCount = followersCount - 1
                 WHERE userID = ${toUnfollowUserID};`;
  let updateFollowingCount =`UPDATE users
                 SET followingCount = followersCount - 1
                 WHERE userID = ${ownUserID};`;
  sendGenericQuery(removeFollowQuery);
  sendGenericQuery(updateFollowingCount);
  return sendGenericQuery(updateFollowerCount);
}

export const updateBio = (username, newBio) => {
  let userID = getUserID(username).userID;
  let updateBioQuery = `INSERT INTO users (biography) VALUES ('${newBio}');`;
  return sendGenericQuery(updateBioQuery);
}

export const getUserInfo = (username) =>  {
  let getUserInfoQuery = `SELECT (userID, username, biography, profileImage, postCount, followersCount, followingCount)
              FROM users
              WHERE users.username = '${username}' `;
  return getGenericOneRowQuery(getUserInfoQuery);
}

export const searchForUser = (keyword) => {
  let findUsersQuery = `SELECT (userID, username, profileImage) 
                        FROM users
                        WHERE users.username ='${keyword}' OR users.email = '${keyword}'; `;
  return getGenericListQuery(findUsersQuery);
}


export const getUserID = username => {
  let query = `SELECT users.userID FROM users WHERE users.username = '${username}'`;
  let db = openDB();
  return new Promise( (resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        let selectedUserID = results.rows.item(0);
        resolve(selectedUserID);
      }, (err) => { 
        reject(err); 
      });
    });
  });
};

export const setHashtag = (hashtag, userID, imageID) =>{
  let hashtagQuery = `INSERT INTO hashtag_Database (hashtag, userID, imageID) 
                      VALUES ('${hashtag}', ${userID}, ${imageID});`;
  return sendGenericQuery(hashtagQuery);
}

export const getHashtagContainedInfo = (hashtag) => {
  let getHashInfoQuery = `Select userID, imageID FROM hashtag_Database WHERE hashtag_Database.hashtag = ${hashtag}`;
  return getGenericListQuery(getHashInfoQuery);
}


//Function to reduce clutter; Sends generic query that returns exactly one row. 
//WARNING: Does not know what type of table returned: needs to be handled externally.
export const getGenericOneRowQuery = query => {
  let db = openDB();
  return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(query, [], (tx, results) => {
          resolve(results.rows.item(0));
        }, (err) => {
          reject('SQL Error: ' + err);
        });
      });
  });
}


export const getGenericListQuery = query => {
  let db = openDB();
  return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(query, [], (tx, results) => {
          resolve(results);
        }, (err) => {
          reject('SQL Error: ' + err);
        });
      });
  });
}

export const sendGenericQuery = query => {
  let db = openDB();
  return new Promise( (resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        resolve('success');
      }, (err) => { 
        reject(err); 
      });
    });
  });
}

export const getAllUsernames = word => {
  query = `SELECT username FROM users`;
  return getGenericListQuery(query);
}
export const getUser = email => {
  let query = `SELECT * FROM users WHERE email =?`;
  let db = openDB();

  return new Promise( (resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(query, [email], (tx, results) => {
        let selectedUser = results.rows.item(0);
        resolve(selectedUser.username);
      }, (err) => { 
        reject(err); 
      });
    });
  });
};
