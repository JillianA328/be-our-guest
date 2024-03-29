import { gql } from '@apollo/client';

export const QUERY_REVIEWS = gql`
query reviews($username: String) {
    reviews(username: $username) {
        _id
        reviewText
        restName
        createdAt
        username
        reactionCount
        reactions {
            _id
            createdAt
            username
            reactionBody
        }
    }
}
`;

export const QUERY_REVIEW = gql`
  query review($id: ID!) {
    review(_id: $id) {
      _id
      reviewText
      createdAt
      username
      reactionCount
      reactions {
        _id
        createdAt
        username
        reactionBody
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      reviews {
        _id
        reviewText
        createdAt
        reactionCount
      }
    }
  }
`;

//not passing variables
export const QUERY_ME = gql`
{
  me{
    _id
    username
    email
    reviews {
      _id
      reviewText
      createdAt
      reactionCount
      reactions {
        _id
        createdAt
        reactionBody
        username
      }
    }
  }
}
`;

export const QUERY_ME_BASIC = gql`
{
  me{
    _id
    username
    email
  }
}
`;
