/*
 * Functions for opening/closing database and creating tables
*/

import { Platform } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// callbacks for SQL operations
const openCB = () => { console.log('Database OPENED'); }
const errorCB = (err) => { console.log('SQL Error: ' + err); }

//Extended createTables function
export const createTables = () => {
  let db = openDB();
  let createUserBaseQuery = `CREATE TABLE IF NOT EXISTS users 
              ('userID'         INTEGER     PRIMARY KEY,
               'username'       TEXT        NOT NULL, 
               'email'          TEXT        NOT NULL, 
               'password'       TEXT        NOT NULL,
               'biography'      TEXT        DEFAULT 'SAY SOMETHING ABOUT YOURSELF!',
               'profileImage'   VARBINARY,
               'PostCount'      INTEGER     DEFAULT 0,
               'followingCount' INTEGER     DEFAULT 0,
               'followersCount' INTEGER     DEFAULT 0,
               'isPrivate'      BOOLEAN     DEFAULT FALSE
               );`; // insert into users (username, password, email) values ('test','test','test@mail.com');
  let createImageBaseQuery = `CREATE TABLE IF NOT EXISTS image_database
                              ('userID'        INTEGER,
                               'imageID'       INTEGER,
                               'imageFile'     VARBINARY NOT NULL,
                               'totalLikes'    INTEGER   DEFAULT 0,
                               'datePosted'    TEXT,
                               'caption'       TEXT      DEFAULT ' ',
                               CONSTRAINT pk_image PRIMARY KEY (userID, imageID)
                               );`;
  let createCommentBaseQuery = `CREATE TABLE IF NOT EXISTS comment_database
                                ('userID'     INTEGER,
                                 'imageID'    INTEGER,
                                 'commentID'  INTEGER    IDENTITY,
                                 'comment'    TEXT       DEFAULT ' ',
                                 constraint pk_comments primary key (userID, imageID, commentID)
                                );`;
  let createLikeBaseQuery = `CREATE TABLE IF NOT EXISTS likes_database
                             ('userID'     INTEGER,
                              'imageID'    INTEGER,
                              'likeID'     INTEGER,
                              'username'   TEXT, 
                              CONSTRAINT pk_likes PRIMARY KEY (userID, imageID, likeID)
                             );`;
  let createFollowingBaseQuery = `CREATE TABLE IF NOT EXISTS following_database
                                  (
                                   'ID' INTEGER PRIMARY KEY,
                                   'followUsername' TEXT,
                                   'isFollowedUsername' TEXT
                                  );`;
  sendGenericQuery(createUserBaseQuery);
  sendGenericQuery(createLikeBaseQuery);
  sendGenericQuery(createImageBaseQuery);
  sendGenericQuery(createCommentBaseQuery);
  return sendGenericQuery(createFollowingBaseQuery);
}

export const openDB = () => {
  // the template is located in ~/android/app/src/main/assets/ for android and 
  // ~/ios/ecs165Instagram/www for iOS
  let pathToDB = Platform.OS == 'ios' ?
    { name: 'test.db' } : { name: 'test.db', createFromLocation: 'sql_template.sqlite' };

  return SQLite.openDatabase(pathToDB, openCB, errorCB);
}
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

