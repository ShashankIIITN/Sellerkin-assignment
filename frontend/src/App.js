import './App.css';
import { useState } from 'react';

const url = process.env.REACT_APP_URL || "http://localhost:3001";

function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await fetch(`${url}/send_mail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email }),
      });

      const jsonData = await data.json();

      if (jsonData.status) {
        alert("message sent!");
        console.log(jsonData);

      } else {
        alert("failed to send the message!" + jsonData.msg);
      }



    } catch (err) {
      console.log(err);
      alert(err);
    }

  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit} >

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label htmlFor="email">Email ID:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" >
          Submit
        </button>
      </form>
    </div>
  );
}

export default App;