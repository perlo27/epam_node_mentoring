export const fetchUser = (() => {
  const user = {
    id: 1,
    username: 'test',
    password: 'test',
    email: 'Vasya@petichkin@induk.com',
  };
  return async function() {
    return user;
  };
})();