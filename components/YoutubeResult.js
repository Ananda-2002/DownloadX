import { useState, useEffect } from 'react'
import { Markup } from 'interweave';
import YoutubeDownloadBtn from './YoutubeDownloadBtn'
import YoutubeSearcResultSkelaton from './YoutubeSearchResultSkelaton'

const YoutubeResult = (props) => {
    const [descLength, setDescLength] = useState(400);
    const [videoInfo, setVideoInfo] = useState({
        thumbnail: "",
        title: "",
        description: "",
        videoURL: "",
        downloadOption: [],
    })

    const fullVideoDescription = () => {
        setDescLength(videoInfo.description.length)
    }
    console.log(props.url)
    async function getInfo() {
        const res = await fetch('/api/youtube/get-youtube-video-info?videoURL=' + props.url)
        const data = await res.json()

        setVideoInfo({
            thumbnail: data.videoDetails.thumbnails[data.videoDetails.thumbnails.length - 1].url,
            title: data.videoDetails.title,
            description: data.videoDetails.description,
            videoURL: props.url,
            downloadOption: data.formats
        })
        console.log(videoInfo.description)
    }

    useEffect(() => {
        getInfo()
    }, [props.url])
    return <>
        <div className="main_container">
            <div className="search_div">
                {(videoInfo.title == "" && true) ? <YoutubeSearcResultSkelaton /> : <div>
                    <img src={videoInfo.thumbnail} alt="" className="youtube_thumbnail" />
                    <div className="video_description">
                        <h2>{videoInfo.title}</h2>
                        <div><Markup content={videoInfo.description.slice(0, descLength)} /> </div>
                    </div>
                    <center>{(descLength == 400) ? <button onClick={fullVideoDescription} className="full_video_desc_btn">Show full video description</button> : <button onClick={() => { setDescLength(400) }} className="full_video_desc_btn">Show less video description</button>}</center>
                    <div className="download_btn_container">
                        {(videoInfo.title != "") && <YoutubeDownloadBtn videoURL={props.url} videoTitle={videoInfo.title} formats={videoInfo.downloadOption} />}
                    </div>
                </div>}
            </div>

        </div>
    </>
}
export default YoutubeResult;