import React from 'react';

const fetchUsers = () => {
  return new Promise((resolve, reject) => {
    const randomNum = Math.floor(Math.random() * 4000);
    if (randomNum <= 2000) {
      return setTimeout(() => {
        reject({
          errorMessage: 'Failure to fetch users. Please try again.',
        });
      }, randomNum);
    } else {
      return setTimeout(() => {
        resolve([
          {
            name: 'Theo',
            id: 0,
          },
          {
            name: 'James',
            id: 1,
          },
        ]);
      }, randomNum);
    }
  });
};

const Dashboard = ({ dispatch, state }) => {
  const { errorMessage, users, isLoading } = state;
  return (
    <div style={{ width: '500px', margin: '0 auto', padding: '20px' }}>
      <button
        disabled={users.length}
        onClick={e => {
          dispatch({ type: 'FETCHING_USERS' });
          fetchUsers()
            .then(users => {
              dispatch({ type: 'FETCHED_USERS', data: { users } });
            })
            .catch(({ errorMessage }) =>
              dispatch({ type: 'FETCHED_USERS_ERROR', data: { errorMessage } }),
            );
        }}
      >
        Click to fetch users{' '}
      </button>
      <hr />
      {errorMessage && errorMessage}
      {isLoading && <div> LOADING USERS... </div>}
      {users &&
        users.map(user => {
          return (
            <div key={user.id}>
              {user.name} {user.id}
              <hr />
            </div>
          );
        })}
    </div>
  );
};
export default Dashboard;
