// connects to our express server located at: 
// https://ig-express-api.herokuapp.com/ to retrieve postgres data

import { ACCESS_KEY } from '../config/config';

const BASE_URL = 'https://ig-express-api.herokuapp.com';
const headers = { 'access-key': ACCESS_KEY, 'Content-Type': 'application/json' };

// add a user's data to the database after using the Register Form
// TODO: password should be encrypted 
export const addUser = user => {
  let userObj = { // unpack user of type struct to javascript object
    username: user['Username'],
    email: user['Email'],
    password: user['Password']
  };
  let endpoint = BASE_URL + '/user';
  let options = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(userObj),
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
};

// get a user's data after using the Login Form or after completing Register Form
// TODO: might want to perform select on a different identifier than email
export const getUser = username => {
  let endpoint = BASE_URL + `/user?username=${username}`;
  let options = {
    headers: headers,
    method: 'GET',
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getUserByID = userID => {
  let endpoint = BASE_URL + `/userById?userID=${userID}`;
  let options = {
    headers: headers,
    method: 'GET'
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const getMultipleUsersByID = userIDs => {
  let endpoint = BASE_URL + `/usersByID?userIDs=${userIDs.join()}`;
  let options = {
    headers: headers,
    method: 'GET'
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const getAllUsers = () => {
  let endpoint = BASE_URL + '/allUsers';
  let options = {
    headers: headers,
    method: 'GET',
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const searchForUsers = input => {
  let endpoint = BASE_URL + `/searchUsers?searchText=${input}`;
  let options = {
    headers: headers,
    method: 'GET',
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const updateBiography = (username, biography) => {
  let endpoint = BASE_URL + '/biography';
  let options = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ username, biography }),
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const addFollow = (ownUserID, toFollowUserID) => {
  let endpoint = BASE_URL + '/addFollow';
  let options = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ ownUserID, toFollowUserID })
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const removeFollow = (ownUserID, toUnfollowUserID) => {
  let endpoint = BASE_URL + '/removeFollow';
  let options = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ ownUserID, toUnfollowUserID } )
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getFollowing = async (userID) => {
  let endpoint = BASE_URL + `/following?userID=${userID}`;
  let options = {
    headers: headers,
    method: 'GET',
  };

  let response = await fetch(endpoint, options);
  let results = await response.json();
  
  let followedUserIDs = [];
  results.forEach(user => {
    followedUserIDs.push(user.is_followed_id);
  });

  return followedUserIDs;
};

export const countFollowers = userID => {
  let endpoint = BASE_URL + `/countFollowers?userID=${userID}`;
  let options = {
    headers: headers,
    method: 'GET',
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
}