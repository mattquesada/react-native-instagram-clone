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