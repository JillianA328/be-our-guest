import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_REVIEWS, QUERY_ME_BASIC } from '../utils/queries';
import ReviewList from '../components/ReviewList';
import Auth from '../utils/auth';
import ReviewForm from '../components/ReviewForm';



const Home = () => {

  //use useQuery top make query request

  const { loading, data } = useQuery(QUERY_REVIEWS);
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  const reviews = data?.reviews || [];
  console.log(reviews);

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className='flex-row justify-space-between'>
      {loggedIn && (
      <div className="col-12 mb-3">
        <ReviewForm />
      </div>
    )}

        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ReviewList reviews={reviews} title="Some Food for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;