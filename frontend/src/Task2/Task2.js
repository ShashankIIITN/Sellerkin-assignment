import React, { useEffect, useState } from 'react'
import '../css/task2main.css'
import '../css/searchbox.css'
import Img from "../assets/27002.jpg"
import json from '../assets/demodata.json'
import axios from 'axios'
import Loader from './Loader'

const url = process.env.REACT_APP_URL || "http://localhost:3001/";
const api = process.env.REACT_APP_ETSY_API;

function Task2() {

    const [search, setsearch] = useState("")
    const [isfetching, setisfetching] = useState(false)
    const [data, setdata] = useState(null)
    const [page, setpage] = useState(0);

    const handleChangePage = async (e) => {


        if (e.target.name == "pos") {

            setpage(page + 1);
        } else {
            if (page == 0) return;
            setpage(page - 1);
        }

        await fetchData();

    }
    
    const handleSearch = ()=>{
        console.log(search)
    }

    const fetchData = async () => {
        setisfetching(true);

        await axios.get(`${url}listings/all/${page * 25}`, {

            headers: {
                "Content-Type": "application/json",
                "x-api-key": api
            }
        }).then(response => {

            setdata(response.data);
            console.log(response.data);
            setisfetching(false)
        }).catch(err => {
            console.log(err)
        })
        console.log(page);
        setisfetching(false)
    }

    useEffect(() => {
        if(!isfetching) fetchData();
    }, [])

    return (
        <div className='list_main'>
            <div className="searchboxfilter" >
                <input type="text" name="search" id="search" value={search} onChange={(e)=>{setsearch(e.target.value)}} />
                <button type="button" onClick={handleSearch}>Search</button>
                <button type="button">Filters</button>
                <button type="button">Sort</button>
            </div>
            <h1>ALL LISTINGS</h1>
            {!isfetching && <div className="itemlist">
                {data && data?.data?.results.map((el, ind) => {

                    return <div className="item">
                        <div className="img">
                            <img src={data?.imgdata[ind].results[0].url_fullxfull} alt="" srcset="" />
                        </div>
                        <div className="content">

                            <h3><pre>{el.title}</pre></h3>
                            {/* <p><pre>{el.description.slice(0, 256).replace("&#39;", "'")}</pre></p> */}
                            <h4>Price({el.price.currency_code}):  <span >{el.price.amount / el.price.divisor}</span></h4>
                        </div>
                    </div>
                })}
            </div>}
            {!isfetching && <div className="btngrp">
                <button onClick={() => { setpage(page - 1) }} name='neg'>Prev</button>
                <button onClick={handleChangePage} name='pos'>Next</button>
            </div>}
            {isfetching && <Loader />}
        </div>
    )
}

export default Task2