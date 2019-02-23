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
  /*let dropTableQuery = `Drop table users`;
  let dropTableImageQuery = `Drop table image_database`;
  let dropTableFollowersQuery = `Drop table following_database`;
  let dropTableCommentQuery = `Drop table comment_database`;
  let dropTableLikesQuery = `Drop table likes_database`;
  let dropTableHashtagQuery = `Drop table hashtag_database`;
  sendGenericQuery(dropTableHashtagQuery);
  sendGenericQuery(dropTableQuery);
  sendGenericQuery(dropTableImageQuery);
  sendGenericQuery(dropTableFollowersQuery);
  sendGenericQuery(dropTableLikesQuery);
  sendGenericQuery(dropTableCommentQuery);*/

  let createUserBaseQuery = `CREATE TABLE IF NOT EXISTS users
              ('userID'         INTEGER     PRIMARY KEY,
               'username'       TEXT        NOT NULL,
               'email'          TEXT        NOT NULL,
               'password'       TEXT        NOT NULL,
               'biography'      TEXT        DEFAULT 'Say Something about yourself!',
               'profileImage'   BLOB,
               'PostCount'      INTEGER     DEFAULT 0,
               'followingCount' INTEGER     DEFAULT 0,
               'followersCount' INTEGER     DEFAULT 0,
               'isPrivate'      BOOLEAN     DEFAULT FALSE
               );`; // insert into users (username, password, email) values ('test','test','test@mail.com');
  let createImageBaseQuery = `CREATE TABLE IF NOT EXISTS image_database
                              ('userID'        INTEGER,
                               'imageID'       INTEGER,
                               'imageFile'     BLOB      NOT NULL,
                               'totalLikes'    INTEGER   DEFAULT 0,
                               'totalComments' INTEGER   DEFAULT 0,
                               'datePosted'    TEXT,
                               'caption'       TEXT      DEFAULT ' ',
                               CONSTRAINT pk_image PRIMARY KEY (userID, imageID)
                               );`;
  let createCommentBaseQuery = `CREATE TABLE IF NOT EXISTS comment_database
                                ('userID'             INTEGER,
                                 'imageID'            INTEGER,
                                 'commentID'          INTEGER    DEFAULT 0,
                                 'commentingUserID'   INTEGER    NOT NULL,
                                 'commentingUsername' TEXT       NOT NULL,
                                 'comment'            TEXT       DEFAULT ' ',
                                 constraint pk_comments primary key (userID, imageID, commentID)

                                );`;
  let createLikeBaseQuery = `CREATE TABLE IF NOT EXISTS likes_database
                             ('userID'         INTEGER,
                              'imageID'        INTEGER,
                              'likeID'         INTEGER       DEFAULT 0,
                              'likingUserID'   INTEGER       NOT NULL,
                              'likingUsername' TEXT          NOT NULL,
                              CONSTRAINT pk_likes PRIMARY KEY (userID, imageID, likeID)
                             );`;
  let createFollowingBaseQuery = `CREATE TABLE IF NOT EXISTS following_database
                                  (
                                   'ID' INTEGER PRIMARY KEY,
                                   'followUsername' TEXT,
                                   'isFollowedUsername' TEXT
                                  );`;
  let createHashtagBaseQuery = `CREATE TABLE IF NOT EXISTS hashtag_database
                                (
                                  'hashtag'   TEXT,
                                  'userID'    INTEGER,
                                  'imageID'   INTEGER,
                                  CONSTRAINT pk_hashtag PRIMARY KEY (userID, imageID, hashtag)
                                );`;
  sendGenericQuery(createUserBaseQuery);
  sendGenericQuery(createLikeBaseQuery);
  sendGenericQuery(createImageBaseQuery);
  sendGenericQuery(createCommentBaseQuery);
  sendGenericQuery(createHashtagBaseQuery);
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
