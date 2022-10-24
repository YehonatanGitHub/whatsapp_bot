// import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
// import { deleteGoal } from '../features/goals/goalSlice';

const GroupList = () => {
  // const dispatch = useDispatch();

  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const abortCont = new AbortController();

    const fetchGroups = async () => {
      const res = await fetch('/api/wa/all-groups-info', { signal: abortCont.signal });
      const data = await res.json();
      console.log(data);
      setGroups(data);
    };
    fetchGroups();
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
      <h2>Whatsapp Groups:</h2>
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
