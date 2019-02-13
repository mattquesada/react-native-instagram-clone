/* 
* Contains functions for registering new users / verifying current users
* Connects to our sqlite service to retrieve data for the frontend
*/

import { openDB } from './Init';

// add a user's data to the database after using the Register Form
// TODO: password should be encrypted 
export const addUser = user => {
  let { username, email, password } = user;
  let query = `INSERT INTO users (username, email, password) VALUES 
              ('${username}', '${email}', '${password}')`;
  let db = openDB();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        resolve('User added successfully');
      }, (err) => {
        reject('SQL Error: ' + err);
      });
    });
  });
};

// get a user's data after using the Login Form or after completing Register Form
// TODO: might want to perform select on a different identifier than email
export const getUser = username => {
  let query = `SELECT * FROM users WHERE username ='${username}'`;
  let db = openDB();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        let selectedUser = results.rows.item(0);
        resolve(selectedUser);
      }, (err) => {
        reject(err);
      });
    });
  });
};

export const getAllUsernames = currentUsername => {
  let query = `SELECT username FROM users`;
  let db = openDB();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        let usernames = []; // push all usernames 
        for (let i = 0; i < results.rows.length; i++) {
          let foundUsername = results.rows.item(i).username;
          if (currentUsername !== foundUsername)
            usernames.push(foundUsername);
        }
        resolve(usernames);
      }, (err) => {
        reject(err);
      });
    });
  });
}

export const updateBiography = (username, biography) => {
  let query = ` UPDATE users 
                SET biography = '${biography}'
                WHERE username = '${username}' 
              `;
  let db = openDB();

  return new Promise((resolve, reject) =>{
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        resolve('biography updated successfully');
      }, (err) => {
        reject(err);
      });
    });
  }); 
};

export const sendGenericQuery = query => {
  let db = openDB();
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        resolve('success');
      }, (err) => {
        reject(err);
      });
    });
  });
}

export const addFollow = (ownUsername, toFollowUsername) => {
  let addFollowQuery = `INSERT INTO following_database 
              (followUsername, isFollowedUsername) VALUES
              ('${ownUsername}', '${toFollowUsername}')`;
  let updateFollowerCount = `UPDATE users
                 SET followersCount = followersCount + 1
                 WHERE username = '${toFollowUsername}';`;
  let updateFollowingCount = `UPDATE users
                 SET followingCount = followingCount + 1
                 WHERE username = '${ownUsername}';`;
  sendGenericQuery(updateFollowingCount);
  sendGenericQuery(updateFollowerCount);
  return sendGenericQuery(addFollowQuery);
};

export const removeFollow = (ownUsername, toUnfollowUsername) => {
  let removeFollowQuery = `DELETE FROM following_database 
               WHERE followUsername = '${ownUsername}' AND isFollowedUsername = '${toUnfollowUsername}' `;
  let updateFollowerCount = `UPDATE users
                 SET followersCount = followersCount - 1
                 WHERE username = '${toUnfollowUsername}'`;
  let updateFollowingCount = `UPDATE users
                 SET followingCount = followingCount - 1
                 WHERE username = '${ownUsername}'`;
  sendGenericQuery(updateFollowingCount);
  sendGenericQuery(updateFollowerCount);
  return sendGenericQuery(removeFollowQuery);
};

export const getFollowers = username => {
  let query = ` SELECT isFollowedUsername 
                FROM following_database
                WHERE followUsername = '${username}'`;
  let db = openDB();

  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(query, [], (tx, results) => {
        let followers = []; // push all usernames 
        for (let i = 0; i < results.rows.length; i++) {
          followers.push(results.rows.item(i).isFollowedUsername)
        }
        resolve(followers);
      }, (err) => {
        reject(err);
      });
    });
  });
};

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
  return new Promise((resolve, reject) => { //IDK how to send image file so I left it like this but NEEDS FIXIN'
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

export const updateBio = (username, newBio) => {
  let userID = getUserID(username).userID;
  let updateBioQuery = `INSERT INTO users (biography) VALUES ('${newBio}');`;
  return sendGenericQuery(updateBioQuery);
}

export const getUserInfo = (username) => {
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
  return new Promise((resolve, reject) => {
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

export const setHashtag = (hashtag, userID, imageID) => {
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