import React from 'react'
import Loader from './Loader';

function Task1({ name, setName, email, setEmail, isSending, handleSubmit }) {
    return (
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
            {isSending && <Loader />}
        </form>
    )
}

export default Task1