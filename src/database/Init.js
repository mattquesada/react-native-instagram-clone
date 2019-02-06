/*
 * Functions for opening/closing database and creating tables
*/

import { Platform } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// callbacks for SQL operations
const successCB = () => { console.log('Operation completed successfully'); }
const openCB = () => { console.log('Database OPENED'); }
const errorCB = (err) => { console.log('SQL Error: ' + err); }

// Creates the tables inside of the SQLite database
/*export const createTables = () => {
  let db = openDB();
  let query = `CREATE TABLE IF NOT EXISTS users 
              ('userID' INTEGER NOT NULL PRIMARY KEY,
               'username' TEXT NOT NULL, 
               'email' TEXT NOT NULL, 
               'password' TEXT NOT NULL)`;
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(query, [], resolve(successCB), reject(errorCB));
    });
  })
}
*/
//Extended createTables functino
export const createTables = () => {
  let db = openDB();
  let query = `CREATE TABLE IF NOT EXISTS users 
              ('userID'         INTEGER     IDENTITY      PRIMARY KEY,
               'username'       TEXT        NOT NULL, 
               'email'          TEXT        NOT NULL, 
               'password'       TEXT        NOT NULL,
               'biography'      TEXT        DEFAULT 'SAY SOMETHING ABOUT YOURSELF!',
               'profileImage'   VARBINARY,
               'PostCount'      INTEGER     DEFAULT 0,
               'followingCount' INTEGER     DEFAULT 0,
               'followersCount' INTEGER     DEFAULT 0,
               'isPrivate'      BOOLEAN     DEFAULT FALSE
               )`;
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(query, [], resolve(successCB), reject(errorCB));
    });
  })
}

export const openDB = () => {
  // the template is located in ~/android/app/src/main/assets/ for android and 
  // ~/ios/ecs165Instagram/www for iOS
  let pathToDB = Platform.OS == 'ios' ?
    { name: 'test.db' } : { name: 'test.db', createFromLocation: 'sql_template.sqlite' };

  return SQLite.openDatabase(pathToDB, openCB, errorCB);
}
