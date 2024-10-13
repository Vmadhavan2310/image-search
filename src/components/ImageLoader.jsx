import React, { useEffect, useRef, useState,createRef } from 'react'

const access_key = process.env.REACT_APP_UNSPLASH_CLIENT_KEY;

export default function ImageLoader({search}) {
    const [imgArr,setImgArr] = useState([]);
    const page = useRef(1);
    const lastElem = useRef(null);
    
    const getPhotos = async () => {
        const params = new URL(window.location.href);
        const keyword = params.searchParams.get('query');
        if(search != keyword) page.current = 1;
        const searchURL = search ?  `https://api.unsplash.com/search/photos?page=${page.current}&query=${search}&client_id=${access_key}`: `https://api.unsplash.com/photos/?client_id=${access_key}`;
        const res = await fetch(searchURL);
        const data = await res.json();
        if(data.results) {
            page.current == 1 ? setImgArr(data.results) : setImgArr([...imgArr,...data.results]);
            historyUpdate(search);
            return;
        }
        setImgArr([...imgArr,...data]);
        historyUpdate(search);
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
        }
        fetchData();
       
    },[search])
  return (
    <>
      <div className='row'>
    {imgArr.map((image,index) => {
        return (
                <div className={index == imgArr.length-1 ? 'column last' : 'column'} key={image.id} ref={index == imgArr.length-1 ? lastElem :null}>
                    <img src={image.urls.regular} alt={image.alt_description} />
                </div>
        )
    })}
    </div>
    {search && <button className="button-76" role="button" onClick={handlePage}>View More</button>}  
    </>
  )
}
