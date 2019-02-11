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
               );`; // insert into users (username, password, email) values ('test','test','test@mail.com');
  let createImageBaseQuery = `CREATE TABLE IF NOT EXISTS image_database
                              ('userID'        INTEGER,
                               'imageID'       INTEGER   IDENTITY,
                               'imageFile'     VARBINARY NOT NULL,
                               'totalLikes'    INTEGER   DEFAULT 0,
                               'datePosted'    DATE      GETDATE,
                               'caption'       TEXT      DEFAULT ' ',
                               CONSTRAINT pk_image PRIMARY KEY (userID, imageID),
                               FOREIGN KEY (userID) REFERENCES users
                               );`;
  let createCommentBaseQuery = `CREATE TABLE IF NOT EXISTS comment_database
                                ('userID'     INTEGER,
                                 'imageID'    INTEGER,
                                 'commentID'  INTEGER    IDENTITY,
                                 'comment'    TEXT       DEFAULT ' ',
                                 constraint pk_comments primary key (userID, imageID, commentID)
                                 FOREIGN KEY (userID) REFERENCES users,
                                 FOREIGN KEY (imageID) REFERENCES image_database
                                );`;
  let createLikeBaseQuery = `CREATE TABLE IF NOT EXISTS likes_database
                             ('userID'     INTEGER,
                              'imageID'    INTEGER,
                              'likeID'     INTEGER    IDENTITY,
                              'username'   TEXT, 
                              CONSTRAINT pk_likes PRIMARY KEY (userID, imageID, likeID)
                              FOREIGN KEY  (userID) REFERENCES users,
                              FOREIGN KEY  (imageID) REFERENCES image_database
                             );`;
  let createFollowingBaseQuery = `CREATE TABLE IF NOT EXISTS following_Database
                                  ('followUserID' INTEGER,
                                   'followUsername' TEXT,
                                   'isFollowedUserID' INTEGER,
                                   'isFollowedUsername' TEXT,
                                   CONSTRAINT pk_following PRIMARY KEY (followUserID, isFollowedUserID),
                                   FOREIGN KEY (followUsername)   REFERENCES users,
                                   FOREIGN KEY (isFollowedUserID) REFERENCES users
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

