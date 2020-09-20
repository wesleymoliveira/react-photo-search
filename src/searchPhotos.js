import React, { useState } from "react";
import Unsplash, { toJson } from "unsplash-js";

const API_KEY = `${process.env.REACT_APP_UNSPLASH_API_KEY}`;
const unsplash = new Unsplash({
  accessKey: API_KEY,
});

export default function SearchPhotos() {
  const [query, setQuery] = useState("");
  const [pics, setPics]= useState([]);
  //console.log(query);

  const searchPhotos = async (e) => {
    e.preventDefault();
    //console.log("Submitting the form")
    unsplash.search
    .photos(query)
    .then(toJson)
    .then((json) => {
     //console.log(json);
      setPics(json.results);
    });
  };
  
  return (
    <>
      <form className="form" onSubmit={searchPhotos}>
        <label className="label" htmlFor="query">
          {" "}
          📷
        </label>
        <input
          type="text"
          name="query"
          className="input"
          placeholder={'Try "apple" or "dog"'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
       />
       <button type="submit" className="button">
         Search
       </button>
      </form>
      <div className="card-list"> {
          pics.map((pic) =>
            <div className="card" key={pic.id}>
              <img
                className="card--image"
                alt={pic.alt_description}
                src={pic.urls.full}
                width="50%"
                height="50%"
              ></img>
            </div>)
        }
      </div>
    </>
  );
}