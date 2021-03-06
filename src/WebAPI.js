import { getAuthToken } from './utils';

const BASE_URL = 'https://student-json-api.lidemy.me';

export const getAllPosts = () => {
  return fetch(`${BASE_URL}/posts?_sort=id&_order=desc`).then((res) =>
    res.json()
  );
};

export const getPaginatePosts = (page) => {
  return fetch(
    `${BASE_URL}/posts?_page=${page}&_limit=5&_sort=id&_order=desc`
  ).then((res) => res.json());
};

export const getPost = (id) => {
  return fetch(`${BASE_URL}/posts?id=${id}`).then((res) => res.json());
};

export const login = (username, password) =>
  fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      username,
      password,
    }),
  }).then((res) => res.json());

export const signUp = (nickname, username, password) =>
  fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      nickname,
      username,
      password,
    }),
  }).then((res) => res.json());

export const getMe = () => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/me`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};

export const newPost = (title, body) => {
  const token = getAuthToken();
  return fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      body,
    }),
  }).then((res) => res.json());
};
