//new file
import React from 'react';
import { Redirect, useParams } from 'react-router-dom';

import ReviewList from '../components/ReviewList';
import FriendList from '../components/FriendsList';
import ReviewForm from '../components/ReviewForm';


import { ADD_FRIEND } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();
  const [addFriend, { error }] = useMutation(ADD_FRIEND);

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam }
  });

  const user = data?.me || data?.user || {};

  if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    return <Redirect to="/profile" />
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.username) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to log in.
      </h4>
    )
  }

  const handleClick = async () => {
    console.log(user._id);
    try {
      const { data } = await addFriend({
        variables: { id: user._id }
      });

      console.log(data)
    } catch (e) {
      console.log(error)
      console.error(e)
    }
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className=" p-3 display-inline-block">
          Viewing {userParam ? `${user.username}'s` : 'your'} profile.
        </h2>

        {/* {userParam && ( */}
        <button className="btn ml-auto" onClick={handleClick}>
          Add Friend
        </button>
        {/* )} */}

      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <ReviewList reviews={user.reviews} title={`${user.username}'s reviews...`} />
        </div>

        <div className="col-12 col-lg-3 mb-3">
          <FriendList
            username={user.username}
            friendCount={user.friendCount}
            friends={user.friends}
          />
        </div>
      </div>
      <div className="mb-3">{!userParam && <ReviewForm />}</div>
    </div >
  );
};

export default Profile;