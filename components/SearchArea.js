import { useState } from 'react'
import YoutubeResult from './YoutubeResult'
const SearchArea = () => {

    const [url, setUrl] = useState("");
    const [callResultComponent, setCallResultComponent] = useState(false)

    const search = () => {
        console.log(url)
        setCallResultComponent(true)
    }
    const handleChange = (e) => {
        setUrl(e.target.value)
        setCallResultComponent(false)
    }
    return (
        <>
            <div className="search_div">
                <textarea placeholder="Enter link ..." value={url} onChange={(e) => { handleChange(e) }} />
                <button className="search_btn" onClick={search}>search</button>
            </div>

            {callResultComponent && <YoutubeResult url={url} />}

        </>
    )
}

export default SearchArea;
