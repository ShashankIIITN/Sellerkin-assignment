import React from 'react'
import "./slidedown.css"

function SlideDown({ type, filter, handleChangeFilter, handleChangeSort, handleSort,  handleFilter }) {
    return (
        <div className="slidedown">
            {type == 1 ? <form className="filterForm slidedown_cont">
                <div className="inputboxprice">
                    <div className="inpugen">

                        <label for="minPrice">Min Price:</label>
                        <input type="number" id="minPrice" name="min_price" onChange={handleChangeFilter} value={filter.min_price} placeholder="Enter min price" />
                    </div>
                    <div className="inputgen">

                        <label for="maxPrice">Max Price:</label>
                        <input type="number" id="maxPrice" name="max_price" onChange={handleChangeFilter} value={filter.max_price} placeholder="Enter max price" />
                    </div>
                </div>
                <div className="inputgen">

                    <label for="location">Location:</label>
                    <input type="text" id="location" name="location" onChange={handleChangeFilter} value={filter.location} placeholder="Enter location" />
                </div>
                <button type="button" onClick={handleFilter} >Apply Filters</button>
            </form> : <form className="sortForm slidedown_cont">
                <div className="inpugen">
                    <label for="sortOn">Sort By:</label>
                    <select id="sortOn" name="sort_on"  onChange={handleChangeSort}>
                        <option value="created">Date Created</option>
                        <option value="price">Price</option>
                        <option value="score">Score</option>
                        <option value="updated">Last Updated</option>
                    </select>
                </div>
                <div className="inpugen">
                    <label for="sortOrder">Sort Order:</label>
                    <select id="sortOrder" name="sort_order"  onChange={handleChangeSort}>
                        <option value="asc">Ascending</option>
                        <option value="desc">Descending</option>
                    </select>
                </div>

                <button type="button" onClick={handleSort}>Apply Sorting</button>
            </form>}
        </div>
    )
}

export default SlideDown