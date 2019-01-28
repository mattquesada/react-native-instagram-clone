/* 
  Contains functions for registering new users / verifying current users
  Connects to our sqlite service to retrieve data for the frontend
*/

import SQLite from 'react-native-sqlite-storage';

// callbacks for SQL operations
const openCB = () => { console.log('Database OPENED'); }
const errorCB = (err) => { console.log('SQL Error: ' + err); }

const openDB = () => {
  // the template is located in ~/android/app/src/main/assets/ for android and 
  // [some future location] for ios
  return SQLite.openDatabase({name: 'test.db', createFromLocation: 'sql_template.sqlite' }, openCB, errorCB);
}

// add a user's data to the database after using the Register Form
// TODO: password should be encrypted 
export const addUser = user => {
  let { username, email, password } = user; 
  let query = `INSERT INTO users (username, email, password) VALUES ('${username}', '${email}', '${password}')`;
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