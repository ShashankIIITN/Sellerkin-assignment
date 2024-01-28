import React from 'react'
import "./loader.css"

function Loader() {
    return (
        <>
            <h4 className='infotext'>If it takes  too long, that means the backend is starting please wait for it to finish</h4>
            <div className="overlay"></div>
            <div class="loader"></div>
        </>
    )
}

export default Loader