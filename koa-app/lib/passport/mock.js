const userList = [
  {
    id: 1,
    username: 'test',
    password: 'test',
    email: 'Vasya@petichkin@induk.com',
  },
  {
    id: 2,
    username: 'test1',
    password: 'test1',
    email: 'Vasya@petichkin@induk.com',
  },
  {
    id: 3,
    username: 'test2',
    password: 'test2',
    email: 'Vasya@petichkin@induk.com',
  },
];



export const fetchUser = (field, value) => {
  return Promise.resolve(userList.find(u => value === u[field]));
};