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
export const createTables = () => {
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

export const openDB = () => {
  // the template is located in ~/android/app/src/main/assets/ for android and 
  // ~/ios/ecs165Instagram/www for iOS
  let pathToDB = Platform.OS == 'ios' ?
    { name: 'test.db' } : { name: 'test.db', createFromLocation: 'sql_template.sqlite' };

  return SQLite.openDatabase(pathToDB, openCB, errorCB);
}
