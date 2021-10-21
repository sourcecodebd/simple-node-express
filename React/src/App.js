import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const nameRef = useRef('');
  const emailRef = useRef('');
  // const URL = `http://localhost:4000/users`;
  const URL = `https://simple-react-node-express.herokuapp.com/users`;

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [URL, users]);

  const handleAddUser = (e) => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    // const newUser = { name: name, email: email };
    // or
    const newUser = { name, email };

    //send data to the server
    // aync-await
    const sendData = async () => {
      const res = await fetch(URL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(newUser)
      });
      if (res.ok) {
        return res;
      }
      const data = await res.json();
      const addedUser = data;
      const newUsers = [...users, addedUser];
      setUsers(newUsers);
    }
    sendData();

    /* // .then
    fetch(URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
      .then(res => res.json())
      .then(data => {
        const addedUser = data;
        const newUsers = [...users, addedUser];
        setUsers(newUsers);
      }); */

    nameRef.current.value = '';
    emailRef.current.value = '';

    e.preventDefault();
  }

  return (
    <div className="App">
      <div className="mx-3">
        <a href="/"><h4 className="text-primary my-3">Add User</h4></a>
        <form onSubmit={handleAddUser} className="col-md-3 mx-auto d-flex flex-column gap-2 mb-4">
          <input type="text" ref={nameRef} className="form-control" placeholder="Name" required />
          <input type="email" ref={emailRef} className="form-control" placeholder="Email" required />
          <button type="submit" className="btn btn-primary text-white">Continue</button>
        </form>

        <h4 className="text-primary my-3">Found Users: {users?.length}</h4>
        {
          users?.map(user => <div className="alert alert-primary col-md-4 mx-auto" style={{ listStyle: 'none' }} key={user.id}>{user.id}.{user.name}, Email: {user.email}</div>)
        }
      </div>
    </div>
  );
}

export default App;