import React, { useEffect, useState } from 'react'
import '../css/task2main.css'
import '../css/searchbox.css'
import Img from "../assets/27002.jpg"
import json from '../assets/demodata.json'
import axios from 'axios'
import Loader from './Loader'
import SlideDown from './SlideDown'

const url = process.env.REACT_APP_URL || "http://localhost:3001/";
const api = process.env.REACT_APP_ETSY_API || "0aa6qx7gfy3cds87hvijwe40";

function Task2() {

    const [search, setsearch] = useState("")
    const [filter, setfilter] = useState({});
    const [sort, setsort] = useState({});
    const [isfetching, setisfetching] = useState(false)
    const [data, setdata] = useState(null)
    const [page, setpage] = useState(0);
    const [type, settype] = useState(1)

    const handleChangePage = async (e) => {


        if (e.target.name == "pos") {

            setpage(page + 1);
        } else {
            if (page == 0) return;
            setpage(page - 1);
        }

        await fetchData();

    }

    const handleChangeFilter = (e) => {
        setfilter({ ...filter, [e.target.name]: e.target.value });
    }
    const handleChangeSort = (e) => {
        setsort({ ...sort, [e.target.name]: e.target.value });
    }

    const handleFilter = async (e) => {
        document.querySelector(".slidedown").classList.toggle("show");
        await fetchData(search, filter, sort);
    }

    const handleSort = async () => {
       
        document.querySelector(".slidedown").classList.toggle("show");
        await fetchData(search, filter, sort);
    }

    const handleSearch = async () => {

        if (search.trim() == "") return;
        await fetchData(search).then(res => {
             document.querySelector(".list_heading").textContent = "Search Results for " + search;
        }).catch(err => console.log(err));
    }

    const fetchData = async (searchres, filter, sort) => {
        setisfetching(true);

        await axios.get(`${url}listings/all/${page * 25}`, {
            params: {

                search: search ? search.trim() : "",
                sort_order: filter ? sort.sort_order : "",
                sort_on: filter ? sort.sort_on : "",
                shop_location: filter ? filter.location : "",
                min_price: filter ? filter.min_price : "",
                max_price: filter ? filter.max_price : "",

                tags: null,
                category: null

            }
            ,
            headers: {
                "Content-Type": "application/json",
                "x-api-key": api
            }
        }).then(response => {

            
            setdata(response.data);
            console.log(response.data.message);
            setisfetching(false)
        }).catch(err => {
            console.log(err)
            alert(err.response.data.message);
            setisfetching(false)
        })
        console.log(page);
    }

    const handleClick = (e) => {
        if (e.target.name == 'filters') {
            settype(1);
            document.querySelector(".slidedown").classList.toggle("show");
        } else {
            settype(0);
            document.querySelector(".slidedown").classList.toggle("show");
        }
    }

    const handleClear = () =>{
        setfilter({});
        setsort({});
        setsearch("");
        fetchData();
        if(document.querySelector(".slidedown").classList.contains("show"))
        {
            document.querySelector(".slidedown").classList.remove("show");

        }
        document.querySelector(".list_heading").textContent = "All Listings"
    }

    useEffect(() => {
        if (!isfetching) fetchData();
    }, [])

    return (
        <div className='list_main'>
            <div className="searchboxfilter" >
                <input type="text" name="search" placeholder='Enter text to search' id="search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
                <button type="button" onClick={handleSearch}>Search</button>
                <button type="button" onClick={handleClick} name='filters'>Filters</button>
                <button type="button" onClick={handleClick} name='sort'>Sort</button>
                <button type="button" onClick={handleClear} name='clear'>Clear</button>
                <SlideDown type={type} sort={sort} filter={filter} handleChangeFilter={handleChangeFilter} handleChangeSort={handleChangeSort} handleFilter={handleFilter} handleSort={handleSort} />
            </div>
            <h1 className='list_heading'>ALL LISTINGS</h1>
            {!isfetching && <div className="itemlist">
                {data && data?.data?.results?.map((el, ind) => {

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