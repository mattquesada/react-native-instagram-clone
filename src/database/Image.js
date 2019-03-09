// connects to our express server located at: 
// https://ig-express-api.herokuapp.com/ to retrieve postgres data

import { ACCESS_KEY } from '../config/config';

const BASE_URL = 'https://ig-express-api.herokuapp.com';
const headers = { 'access-key': ACCESS_KEY, 'Content-Type': 'application/json' };

// add an image to the postgres DB and tie it to the given userID
export const addImage = (userID, imageURL) => {
  let endpoint = BASE_URL + '/image';
  let options = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ userID, imageURL }),
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
};

// given a user ID, return all the images that belong to that user
export const getImages = userID => {
  let endpoint = BASE_URL + `/images?userID=${userID}`;
  let options = {
    headers: headers,
    method: 'GET',
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const getImagesForMultipleUsers = userIDs => {
  let endpoint = BASE_URL + `/imagesByIDs?userIDs=${userIDs.join()}`;
  let options = {
    headers: headers,
    method: 'GET'
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const incrementLikes = imageID => {
  let endpoint = BASE_URL + '/likes';
  let options = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ imageID }),
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const countLikes = userID => {
  let endpoint = BASE_URL + `/countLikes?userID=${userID}`;
  let options = {
    headers: headers,
    method: 'GET'
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const addComment = (imageID, userID, commentText) => {
  let endpoint = BASE_URL + '/comment';
  let options = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ imageID, userID, commentText }),
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const updateCaption = (caption, imageID) => {
  let endpoint = BASE_URL + '/caption';
  let options = {
    headers: headers,
    method: 'POST',
    body: JSON.stringify({ caption, imageID }),
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const getComments = imageID => {
  let endpoint = BASE_URL + `/imageComments?imageID=${imageID}`;
  let options = {
    headers: headers,
    method: 'GET'
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const getHashtags = imageID => {
  let endpoint = BASE_URL + `/hashtags?imageID=${imageID}`;
  let options = {
    headers: headers,
    method: 'GET'
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const searchHashtags = input => {
  let endpoint = BASE_URL + `/searchHashtags?hashtagText=${input}`;
  let options = {
    headers: headers,
    method: 'GET'
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
}

export const getImagesByHashtag = hashtag => {
  let endpoint = BASE_URL + `/imagesByHashtag?hashtag=${hashtag}`;
  let options = {
    headers: headers,
    method: 'GET'
  };

  return fetch(endpoint, options)
    .then(res => res.json())
    .catch(err => console.log(err));
}