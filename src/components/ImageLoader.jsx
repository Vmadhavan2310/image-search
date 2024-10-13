import React, { useEffect, useRef, useState } from 'react'

const access_key = process.env.REACT_APP_UNSPLASH_CLIENT_KEY;

export default function ImageLoader({search}) {
    const [imgArr,setImgArr] = useState([]);
    const page = useRef(1);
    
    const getPhotos = async () => {
        const params = new URL(window.location.href);
        const keyword = params.searchParams.get('query');
        if(search != keyword) page.current = 1;
        const searchURL = search ?  `https://api.unsplash.com/search/photos?page=${page.current}&query=${search}&client_id=${access_key}`: `https://api.unsplash.com/photos/?client_id=${access_key}`;
        const res = await fetch(searchURL);
        const data = await res.json();
        if(data.results) {
            page.current == 1 ? setImgArr(data.results) : setImgArr([...imgArr,...data.results]);
            return;
        }
        setImgArr([...imgArr,...data]);
    }

    const historyUpdate = (search_key) => {
        window.history.replaceState(null, search_key, `/photos/results/?query=${search_key}&${search ? 'page='+page.current : ''}`)
    }

    const handlePage = async () => {
        page.current += 1;
       await getPhotos();
    }
    useEffect(()=>{
        async function fetchData() {
            await getPhotos();
            historyUpdate(search);
        }
        fetchData()
    },[search])
  return (
    <>
      <div className='row'>
    {imgArr.map(image => {
        return (
                <div className='column' key={image.id}>
                    <img src={image.urls.regular} alt={image.alt_description} />
                </div>
        )
    })}
    </div>
    {search && <button className="button-76" role="button" onClick={handlePage}>View More</button>}  
    </>
  )
}
