import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ThreadsList from '../components/Thread/ThreadsList';
import {
  asyncUpVoteThread,
  asyncNeutralizeVoteThread,
  asyncDownVoteThread,
} from '../states/threads/action';
import { useState } from 'react';
import { asyncGetUsersAndThreads } from '../states/shared/action';

function HomePage() {
  const threads = useSelector((states) => states.threads ?? []);
  const users = useSelector((states) => states.users) ?? [];
  const authUser = useSelector((states) => states.authUser) ?? null;
  const [categoryActive, setCategoryActive] = useState('');
  const [listCategory, setListCategory] = useState([]);

  const dispatch = useDispatch();

  const onUpVoteThread = (id) => {
    dispatch(asyncUpVoteThread(id));
  };

  const onDownVoteThread = (id) => {
    dispatch(asyncDownVoteThread(id));
  };

  const onNeutralizeVoteThread = (id) => {
    dispatch(asyncNeutralizeVoteThread(id));
  };

  const filterThreadByCategory = ({ threads, category }) => {
    if (!category) return threads;
    return threads.filter((thread) => thread.category === category);
  };

  useEffect(() => {
    dispatch(asyncGetUsersAndThreads());
  }, [dispatch]);

  useEffect(() => {
    const uniqueCategories = threads
      .map((t) => t.category)
      .filter((value, index, self) => self.indexOf(value) === index);
    setListCategory(uniqueCategories);
  }, [threads]);

  const filteredThreads = filterThreadByCategory({
    threads,
    category: categoryActive,
  });

  const threadList = filteredThreads.map((thread) => ({
    thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser,
  }));

  return (
    <section className="home-page">
      <div className="section-category">
        <div className="section-category-title">Popular Thread Category</div>
        {listCategory.map((category, key) => {
          return (
            <button
              key={key}
              className={
                category === categoryActive
                  ? 'section-category-button-active'
                  : 'section-category-button'
              }
              onClick={() =>
                category === categoryActive
                  ? setCategoryActive('')
                  : setCategoryActive(category)
              }
            >
              #{category}
            </button>
          );
        })}
      </div>
      <ThreadsList
        threads={threadList}
        upVote={onUpVoteThread}
        downVote={onDownVoteThread}
        neutralizeVote={onNeutralizeVoteThread}
      />
    </section>
  );
}

export default HomePage;
