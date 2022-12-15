import React from 'react';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
// const users = [
//   { id: '2022-10-24', count: 12 },

//   { id: '2022-10-25', count: 30 },

//   { id: '2022-10-26', count: 13 },

//   { id: '2022-10-27', count: 29 },

//   { id: '2022-10-28', count: 8 },

//   { id: '2022-10-29', count: 1 },

//   { id: '2022-10-30', count: 35 },

//   { id: '2022-10-31', count: 43 },
// ];
const ActiveUsersTable = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();
    const url = '/api/db/stats-all-msgs';

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: abortCont.signal });
        const json = await response.json();
        setUsers(json);
        console.log(json);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
    return () => abortCont.abort();
  }, []);

  return (
    <div className='user-table'>
      <h2>Active Users:</h2>
      {/* {users &&
        users.map((user) => (
          <li key={user._id}>
            Group Name: {user._id} - Number of users: {user.count}
          </li>
        ))} */}
      {/* <LineChart width={600} height={400} data={users}>
        <Line type='monotone' dataKey='id' stroke='#8884d8' />
        {/* <Line type='monotone' dataKey='count' stroke='#82ca9d' /> 
      </LineChart> */}
      <BarChart width={600} height={300} data={users}>
        <Bar
          type='monotone'
          dataKey='msgCount'
          fill='#82ca9d'
          label={{ position: 'top' }}
          // barSize={40}
        />

        <XAxis dataKey='date' />
        <YAxis />
        <Tooltip />
      </BarChart>
    </div>
  );
};

export default ActiveUsersTable;
