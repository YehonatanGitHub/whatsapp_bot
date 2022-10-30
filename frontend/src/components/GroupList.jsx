// import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
// import { deleteGoal } from '../features/goals/goalSlice';

const GroupList = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();
    const url = '/api/wa/all-groups-info';

    const fetchData = async () => {
      try {
        const response = await fetch(url, { signal: abortCont.signal });
        const json = await response.json();
        setGroups(json);
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
      {/* {goals.length > 0 ? (
      <div className='groups'>
        {goals.map((goal) => (
          <GoalItem key={goal._id} goal={goal} />
        ))}
      </div>
    ) : (
      <h3>You have not set any goals</h3>
    )} */}
      <h2>My Whatsapp Chats:</h2>
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
