/* 
* Contains functions for registering new users / verifying current users
* Connects to our sqlite service to retrieve data for the frontend
*/

import { openDB } from './Init';

// add a user's data to the database after using the Register Form
// TODO: password should be encrypted 


/*     -- TABLE OF CONTENTS --
       -- format : functionName (input variables) => [outputFieldNames]
     
     Currently implemented:
     addUser (username) => [null]      /Creates new user when registering/
     AddImage (username, imageFile) => [null]
     getUserID (username) => [userID]  /mostly internal use/
     addFollowing (ownUsername, toFollowUsername) => [null]
     removeFollow (ownUsername, toUnfollowUsername) => [null]
     updateBio (username, bio) => [null]
     AddComment (ownUsername, comment, commentedUsername, commentedUserImageID) => [null]
     AddLike    (ownUsername, commentedUsername, CommentedUserImageID) => [null]
     searchForUser (textString)  => [username, userID] /might not need userID/
     getUserInfo (username) => [username, userID, profileImage, follwersCount, followingCount, postCount, biography]
    //to build userpage, makes the next 3 kind of irrelevant
     getLastImageID (username) => [imageID] 
     getUserFollowingNumber (username) => [followingCount]
     getUserFollowedByNumber (username) => [follwersCount]
     getPostCount (username) => [postCount]
    
     getFollwingList (username) => [username, userID]  //LIST : UNIMPLEMENTED
     GetImageFile (username, imageID) => [imageID, imageFile, totalLikes, datePosted, caption]

     sendGenericQuery (query) => [null]   /sends query without returning anything/
     getGenericOneRowQuery (query) => [genericOneRow]  /get one specific row from generic query/

*/


//Extended addUser Query
export const addUser = user => {
  let {username, email, password } = user;
  let insertUserQuery = `INSERT INTO users (username, email, password) VALUES 
              ('${username}', '${email}', '${password}');`;
    let userID = getUserID(username).userID;
    let imageTableName = `imageTable_${userID}`;
    let createImageTableQuery = `CREATE TABLE IF NOT EXISTS ${imageTableName}
                   ('imageID'    INTEGER            IDENTITY    PRIMARY KEY,
                    'imageFile'  VARBINARY,
                    'totalLikes' INTEGER            DEFAULT 0,
                    'datePosted' DATE               DEFAULT GETDATE,
                    'caption'    TEXT              DEFAULT ' ' 
                    );`; //GETDATE WON'T WORK + VARBINARY ISNT VARBINARY(MAX)
    let followingTableName = 'isFollowing_' + userID;
    let createFollowingTableQuery = `CREATE TABLE IF NOT EXISTS ${followingTableName}
                    ('userID'    INTEGER           NOT NULL   PRIMARY KEY,
                     'username'  TEXT              NOT NULL, 
                     FOREIGN KEY ('userID')        REFERENCES users(${userID})   ON DELETE CASCADE
                    );`;
    let followedByTableName = 'isFollowedBy_' + userID;
    let createFollowedByTableQuery = `CREATE TABLE IF NOT EXISTS ${followedByTableName}
                    ('userID'    INTEGER           NOT NULL   PRIMARY KEY,
                     'username'  TEXT              NOT NULL, 
                     FOREIGN KEY ('userID')        REFERENCES users(${userID})   ON DELETE CASCADE
                    );`;
    sendGenericQuery(insertUserQuery);
    sendGenericQuery(createImageTableQuery);
    sendGenericQuery(createFollowingTableQuery);
    return sendGenericQuery(createFollowedByTableQuery);
}

export const addImage = (image, username, caption) => {
  let userID = getUserID(username).userID;
  let tablename = 'imageTable_' + userID;
  let addImageQuery = `INSERT INTO '${tablename}'
                       (imageFile, caption)
                       (${image}, ${caption})`;
  let incrementPostNumberQuery = `UPDATE users
                                  SET postCount = postCount + 1
                                  WHERE  userID = ${userID}`;
  let imageID = getLastimageID(tablename); //PROBABLY WON'T WORK, TRY JUST GETTING POSTCOUNT FROM USER
  let createCommentTableQuery = `CREATE TABLE IF NOT EXISTS commentsFor_${userID}_${imageID}
                                ('commentID' INTEGER     NOT NULL     IDENTITY PRIMARY KEY, 
                                 'comment'   TEXT        DEFAULT ' ',
                                 'user'      TEXT        REFERENCES users ON DELETE CASCADE
                                )`;
  let createLikeTableQuery = `CREATE TABLE IF NOT EXISTS likesFor_${userID}_${imageID}
                              ('username   TEXT  PRIMARY KEY,
                              REFERENCES users ON DELETE CASCADE,
                               )`;
  
  sendGenericQuery(addImageQuery);
  sendGenericQuery(incrementPostNumberQuery);
  sendGenericQuery(createCommentTableQuery);
  return sendGenericQuery(createLikeTableQuery);
}

export const addFollowing = (ownUsername, toFollowUsername) => {
  let toFollowID = getUserID(toFollowUsername).userID;
  let ownUserID = getUserID(ownUsername).userID;
  let AddToFollowingTableQuery = `INSERT INTO isFollowing_${ownUserID} (userID, username) VALUES
                                  (${toFollowID}, ${toFollowUsername});`;
  let incrementfollowingQuery = `UPDATE users
                                 SET followingCount = followingCount + 1
                                 WHERE userID = ${ownUserID};`;
  let incrementFollowersQuery = `UPDATE users
                                 SET followersCount = followersCount + 1
                                 WHERE userID = ${toFollowID};`;
  let AddToFollowedByTableQuery = `INSERT INTO isFollowedBy_${toFollowID} (userID, username) VALUES
                                  (${toFollowID}, ${toFollowUsername});`;
  sendGenericQuery(AddToFollowingTableQuery);
  sendGenericQuery(incrementfollowingQuery);
  sendGenericQuery(AddToFollowedByTableQuery);
  return sendGenericQuery(incrementFollowersQuery);
}

export const removeFollow = (ownUsername, toUnfollowUsername) => {
  let toUnfollowID = getUserID(toFollowUsername).userID;
  let ownUserID = getUserID(ownUsername).userID;
  let removeFollowedByQuery = `DELETE FROM isFollowedBy_${toUnfollowID} WHERE userID = ${ownUserID};`;
  let removeFollowQuery = `DELETE FROM isFollowing_${ownUserID} WHERE userID = ${toUnfollowID}; `;
  let decrementfollowingQuery = `UPDATE users
                                 SET followingCount = followingCount - 1
                                 WHERE userID = ${ownUserID};`;
  let decrementFollowersQuery = `UPDATE users
                                 SET followersCount = followersCount - 1
                                 WHERE userID = ${toUnfollowID};`;
  sendGenericQuery(removeFollowQuery);
  sendGenericQuery(decrementfollowingQuery);
  sendGenericQuery(removeFollowedByQuery);
  return sendGenericQuery(decrementFollowersQuery);
}

export const changeBio = (username, newBio) => {
  let changeBioQuery = `UPDATE users
                        SET  'biography' = ${newBio}
                        WHERE username = ${username};`
  return sendGenericQuery(changeBioQuery);
}

export const AddComment = (ownUsername, comment, commentedUsername, commentedUserImageID) => {
  let commentedUserID = getUserID(commentedUsername).userID;
  let AddCommentQuery = `INSERT INTO commentsFor_${commentedUserID}_${commentedUserImageID} 
                         (username, comment) VALUES
                         (${ownUsername}, ${comment});`;
  //TODO: PARSE COMMENT FOR HASHTAGS AND UPLOAD THEM + IMAGEOWNERID + IMAGEID
  return sendGenericQuery(AddCommentQuery);
}

export const AddLike = (ownUsername, commentedUsername, commentedUserImageID) => {
  let commentedUserID = getUserID(commentedUsername).userID;
  let likeTableQuery = `INSERT INTO likesFor_${commentedUserID}_${commentedUserImageID}
                        (username) VALUES (${ownUsername});`;
  return sendGenericQuery(likeTableQuery);
}


export const searchForUser = (textQuery) => {
  let findUserQuery = `SELECT (username, userID, profileImage) FROM users WHERE username = ${text} OR email = ${text};`;
  return getGenericOneRowQuery(findUserQuery);
}


// ---------- GET functions for building user page  ------------
export const getUserInfo = (username) => {
  let getUserInfoQuery = `SELECT (username, userID, profileImage, follwersCount, followingCount, postCount, biography) 
                          FROM users WHERE username = ${username};`;
  return getGenericOneRowQuery(getUserInfoQuery);
}

export const getLastimageID = (tablename, db) => {
  let getImageQuery = `SELECT MAX(imageID) FROM '${tablename}'`;
  return getGenericOneRowQuery(getImageQuery); //WHAT'S THE FIELD NAME TO UNWRAP??
}


export const getUserFollowersNumber = (username) => {
  let userID = getUserID(username).userID;
  let follwersNumberQuery = `SELECT COUNT(*) FROM isFollowedBy_${userID};`;
  return getGenericOneRowQuery(follwersNumberQuery);
}

export const getUserFollowingNumber = (username) => {
  let userID = getUserID(username).userID;
  let followingNumberQuery = `SELECT COUNT(*) FROM isFollowing_${userID};`;
  return getGenericOneRowQuery(followingNumberQuery);
}

export const getPostCount = (username) => {
  let postCountQuery = `SELECT postCount FROM users WHERE username = ${username};`;
  return getGenericOneRowQuery(postCountQuery);
}


export const GetImageFile = (username ,imageID) => {
  let userID = getUserID(username).userID;
  let getImageQuery = `SELECT * FROM imageTable_${userID} WHERE imageID = ${imageID};`;
  return getGenericOneRowQuery(getImageQuery);
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


export const getFollwingList = (username) => {
  let userID = getUserID(username);
  let getFollwingListQuery = `SELECT * FROM isFollowing_${userID};`;
  return getGenericListQuery(getFollwingListQuery);
}

// get a user's data after using the Login Form or after completing Register Form
// TODO: might want to perform select on a different identifier than email
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



//TODO: UNIMPLEMENTED
export const validateEmailPasswordCombination = (email, password) => {
  let validateQuery = `SELECT (username) FROM users `
}



//Function to reduce clutter; Sends generic query to database that doesn't return anything
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
