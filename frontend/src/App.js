import './App.css';
import { useState } from 'react';

import { Routes, Route } from "react-router-dom";
import Task1 from './Task1';
import Task2 from './Task2/Task2';
import NavBar from './Task2/NavBar';

const url = process.env.REACT_APP_URL || "http://localhost:3001";

function App() {
  const [type, settype] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSending, setisSending] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    setisSending(true);

    try {
      const data = await fetch(`${url}send_mail`, {
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
    } finally {
      setisSending(false);
    }

  };

  return (
    <>
      <NavBar type={type} settype = {settype} />
      <div className="App">
        <Routes>
          <Route path='/' element={<Task1 name={name} email={email} setName={setName} setEmail={setEmail} isSending={isSending} setisSending={setisSending} handleSubmit={handleSubmit} />}></Route>
          <Route path='/task2' element={<Task2 name={name} email={email} setName={setName} setEmail={setEmail} isSending={isSending} setisSending={setisSending} handleSubmit={handleSubmit} />}></Route>
        </Routes>

      </div>
    </>
  );
}

export default App;
