import React, { useState } from 'react';

const ReviewForm = () => {

    const [reviewText, setText] = useState('');
    const [characterCount, setCharacterCount] = useState(0);

    const handleChange = event => {
        if (event.target.value.length <= 280) {
            setText(event.target.value);
            setCharacterCount(event.target.value.length);
        }
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        setText('');
        setCharacterCount(0);
    }

    const handleAddReview = async (bookId) => {
        // find the book in `searchedBooks` state by the matching id
        const bookToSave = searchedBooks.find((book) => book.bookId === bookId);
    
        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
          return false;
        }
    
        try {
      
          // updated to use new mutation
          const { data } = await saveBook({
            variables: { bookData: { ...bookToSave } },
          });
    
          console.log("data:", data);
    
          // if book successfully saves to user's account, save book id to state
          setSavedBookIds([...savedBookIds, bookToSave.bookId]);
        } catch (err) {
          console.error(err);
        }
      };
    
    return (
        <div>
            <p className={`m-0 ${characterCount === 280 ? 'text-error' : ''}`}>
                Character Count: {characterCount}/280
            </p>
            <form
                className="flex-row justify-center justify-space-between-md align-stretch"
                onSubmit={handleFormSubmit}
            >
                <textarea
                    placeholder="Here's a new review..."
                    value={reviewText}
                    className="form-input col-12 col-md-9"
                    onChange={handleChange}
                ></textarea>
                <button className="btn col-12 col-md-3" type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;
