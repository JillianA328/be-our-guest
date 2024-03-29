import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email: String!, $password: String!){
    login(email: $email, password: $password){
        token
        user {
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!){
    addUser(username: $username, email: $email, password: $password){
        token
        user {
            _id
            username
        }
    }
}
`;


export const ADD_REVIEW = gql`
  mutation addReview($reviewText: String!, $restName: String!) {
    addReview(reviewText: $reviewText, restName: $restName) {
      _id
      reviewText
      createdAt
      username
      reactionCount
      reactions {
        _id
      }
    }
  }
`;

export const ADD_REACTION = gql`
  mutation addReaction($reviewId: ID!, $reactionBody: String!) {
    addReaction(reviewId: $reviewId, reactionBody: $reactionBody) {
      _id
      reactionCount
      reactions {
        _id
        reactionBody
        createdAt
        username
      }
    }
  }
`;

export const ADD_FRIEND = gql`
  mutation addFriend($id: ID!) {
    addFriend(friendId: $id) {
      _id
      username
      friends {
        _id
        username
      }
    }
  }
  `;

export const DELETE_REVIEW = gql`
mutation deleteReview($reviewId: ID!) {
  deleteReview(reviewId: $reviewId) {
    _id
    reviewText
        createdAt
        username
        reactionCount
        reactions {
          _id
          reactionBody
          createdAt
          username
        }
  }
}
`;