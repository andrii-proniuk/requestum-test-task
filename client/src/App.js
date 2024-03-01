import { useState } from 'react';
import './App.css';
import Form from './components/form/Form';
import RepositoriesList from './components/repositories-list/RepositoriesList';

import env from './environments.json';

function App() {
  const [repositoriesList, setRepositoriesList] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = async (url) => {
    console.log('sending request:', url);

    setLoading(true);
    setError(undefined)

    try {
      const response = await fetch(`http://${env.hostname}${':' + env.port}`, {
        method: 'POST',
        body: JSON.stringify({ url }),
      });

  
      const list = await response.json();

      setRepositoriesList(list);
    } catch (e) {
      console.log(e);

      setError('Error while loading similar repositories');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <Form sendRequest={ sendRequest } />
        {
          loading
            ?
              <p>Loading...</p>
            :
              !!error
                ? <p>{ error }</p>
                : Array.isArray(repositoriesList) && repositoriesList.length
                  ?
                    <RepositoriesList list={ repositoriesList } />
                  :
                    <></>
        }
        {/* <RepositoriesList list={ mockRepositoriesList }/> */}
      </div>
    </div>
  );
}

export default App;
