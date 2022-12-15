// import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
// import { deleteGoal } from '../features/goals/goalSlice';

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();
    const url = '/api/wa/all-groups-info';
    //react fetch api

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: abortCont.signal });
        const json = await response.json();
        const result = Array.isArray(json);
        if (result) {
          setGroups(json);
        }
        console.log('setGroups');
        console.log(json);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
    return () => abortCont.abort();
  }, []);

  return (
    <section className='content'>
      <h2>My Whatsapp Chats</h2>
      <ul>
        {groups &&
          groups.map((group) => (
            <li key={group.serialized}>
              Group Name: {group.name} - Number of users: {group.participants}
            </li>
          ))}
      </ul>
    </section>
  );
};

export default GroupList;
