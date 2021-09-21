import React, { useState } from 'react';
import { useMutation } from "@apollo/client";
import { ADD_REVIEW } from "../../utils/mutations";
import { QUERY_REVIEWS, QUERY_ME } from "../../utils/queries";
import { Container, Col, Row, Jumbotron, Form, Button } from "react-bootstrap";

const ReviewForm = () => {

  const [reviewText, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addReview, { error }] = useMutation(ADD_REVIEW, {
    update(cache, { data: { addReview } }) {
      try {
        // read what's currently in cache
        const { reviews } = cache.readQuery({ query: QUERY_REVIEWS });

        // prepend the newest thought to the front of the array
        cache.writeQuery({
          query: QUERY_REVIEWS,
          data: { reviews: [addReview, ...reviews] },
        });
      } catch (e) {
        console.log(e);
      }

      // update me object's cache, appending a new thought to the end of the list
      const { me } = cache.readQuery({ query: QUERY_ME });
      cache.writeQuery({
        query: QUERY_ME,
        data: { me: { ...me, reviews: [...me.reviews, addReview] } }
      });
    }
  });

  const handleChange = event => {
    if (event.target.value.length <= 280) {
      setText(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // add thought to database
      await addReview({
        variables: { reviewText },
      });
      setText("");
      setCharacterCount(0);
    } catch (e) {
      console.log(e);
    }
  };


  return (
    <div>


      <Form>
        {/* className="flex-row justify-center justify-space-between-md align-stretch"
        onSubmit={handleFormSubmit} */}
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Restaurant Name</Form.Label>
          <Form.Control type="text" placeholder="Restaurant Name"
            value={reviewText}
            className="form-input col-6 col-md-4"
            onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="review-form">
          <Form.Label>Leave a review!</Form.Label>  
          <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
          Character Count: {characterCount}/280
          </p>
          <Form.Control as="textarea" rows={3} />
          
          <button className="btn col-12 col-md-3" type="submit">
            Submit
          </button>

        </Form.Group>
      </Form>
    </div>
  );
};

export default ReviewForm;
