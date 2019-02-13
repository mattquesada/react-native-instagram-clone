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