import React from "react";
import { BsTrash } from 'react-icons/bs';
import { BiEdit } from 'react-icons/bi';
import { useMutation } from "@apollo/client";
import { DELETE_REVIEW, UPDATE_REVIEW } from "../../utils/mutations";
import Auth from '../../utils/auth'

const ReviewFooter = (props) => {

  console.log('props', props)

  const [deleteReview] = useMutation(DELETE_REVIEW)
  const [updateReview] = useMutation(UPDATE_REVIEW)

  const handleDeleteReview = async (reviewId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null
    if(!token) {
      return false
    }
    try {
      const {data} = await deleteReview({ variables: { reviewId } })
      // console.log('data', data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdateReview = async (reviewId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null
    if(!token) {
      return false
    }
    console.log(reviewId)
    try {
      console.log('did i make it here')
      const {data} = await updateReview({ variables: { reviewId } })
      console.log('data', data)
    } catch (error) {
      console.error(error)
    }
  }


    return (
        <footer className="card-footer d-flex justify-content-end">
            <button onClick={()=> handleDeleteReview(props.reviewId) }>
          
                <BsTrash />
        
            </button>

            <button onClick={()=> handleUpdateReview(props.reviewId) }>

              <BiEdit />

            </button>
            
        </footer>
    );
}

export default ReviewFooter;
