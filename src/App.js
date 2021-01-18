import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Photo from "./Photo";
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState('');
  console.log(query);
  const fetchPhotos = async () => {
    setLoading(true);
    let url;
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${query}`;
    if (query) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPhotos((oldPhotos) => {
        if (query && page === 1) {
          return data.results;
        } else if (query) {
          /**if user search something and the page is not equal to 1
           * return the current oldPhotos and the new results
           */
          return [...oldPhotos, ...data.results];
        } else {
          console.log('check2')
          return [...oldPhotos, ...data];
        }
      });
      setLoading(false)
      
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
  };


  useEffect(() => {
    const event = window.addEventListener("scroll", () => {
      if (
        (!loading && window.innerHeight + window.scrollY) >=
        document.body.scrollHeight - 2
      ) {
        setPage((oldPage) => {
          return oldPage + 1;
        });
      }
    });
    return () => window.removeEventListener("scroll", event);
  }, []);



  useEffect(() => {
    fetchPhotos();
  }, [page]);
  return (
    <main>
      <section className="search">
        <form className="search-form" >
          <input
            type="text"
            placeholder="search"
            className="form-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            className="submit-btn"
            type="submit"
            style={{ cursor: "pointer" }}
            onClick = {handleSubmit}
          >
            <FaSearch />
          </button>
        </form>
      </section>
      <section className="photos">
        <div className="photos-center">
          {photos.map((photo, index) => {
            return <Photo key={index} photo={photo} />;
          })}
        </div>
        {loading && <h2 className = 'loading'>Loading...</h2>}

      </section>
    </main>
  );
}

export default App;
