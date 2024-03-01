import React from 'react';

import './Form.css';

const Form = (props) =>  {
  const [repoUrl, setRepoUrl] = React.useState('');

  const onSubmit = (e) => {
    e.preventDefault();

    props.sendRequest(repoUrl);
  }

  return (
    <form className='repository-form' onSubmit={ onSubmit }>
      <input className='repository-url-input' onChange={(e) => setRepoUrl(e.currentTarget.value)} type="text" placeholder='Repository URL'/>
      <button className='repository-form-submit' type='submit' onSubmit={ () => props.sendRequest(repoUrl) }>Find similar</button>
    </form>
  );
}

export default Form;
