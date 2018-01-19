import React from 'react';
import { Field } from 'redux-form';

const CreateTweetForm = ({
  handleTweet
}) => (
  <div className='card card-content'>
    <form  className='container' onSubmit={handleTweet}>
      <div className='row'>
        <div className='col'>
          <Field
            name='status'
            component='input'
            type='text'
            className='form-control'
            placeholder='Share your status'
          />
        </div>
        <div className='col-auto'>
          <button type='submit' className='btn btn-primary mb-2'>Tweet!</button>
        </div>
      </div>
    </form>
  </div>
);

export default CreateTweetForm;
