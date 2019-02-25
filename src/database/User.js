// connects to our express server located at: 
// https://ig-express-api.herokuapp.com/ to retrieve postgres data

import config from '../config/config';

const BASE_URL = 'https://ig-express-api.herokuapp.com/'
const headers = { 'access-key': config.ACCESS_KEY };

// add a user's data to the database after using the Register Form
// TODO: password should be encrypted 
export const addUser = user => {
  let endpoint = BASE_URL + '/user';
  let options = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify(user)
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
};

// get a user's data after using the Login Form or after completing Register Form
// TODO: might want to perform select on a different identifier than email
export const getUser = username => {
  let endpoint = BASE_URL + '/user';
  let options = {
    headers: headers,
    method: 'GET',
    body: JSON.stringify({ username })
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getAllUsers = () => {
  let endpoint = BASE_URL + '/allUsers';
  let options = {
    headers: headers,
    method: 'GET'
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
    body: JSON.stringify({ username, biography })
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const addFollow = (ownUsername, toFollowUsername) => {
  let endpoint = BASE_URL + '/addFollow';
  let options = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ ownUsername, toFollowUsername })
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const removeFollow = (ownUsername, toUnfollowUsername) => {
  let endpoint = BASE_URL + '/removeFollow';
  let options = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ ownUsername, toUnfollowUsername })
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
};

export const getFollowers = username => {
  let endpoint = BASE_URL + '/followers';
  let options = {
    headers: headers,
    method: 'GET',
    body: JSON.stringify({ username })
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
};