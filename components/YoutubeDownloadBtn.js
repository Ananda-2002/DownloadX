
const YoutubeDownloadBtn = (props) => {
    console.log(props)
    let titleRegex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
    let vTitle = props.videoTitle.replace(titleRegex, '');
    vTitle = vTitle.replace(/[^a-zA-Z0-9]/g, " ")

    const downloadVideo = (tag) => {
        const host = '/api/youtube/download-youtube-video'
        const videoURL = props.videoURL
        const itag = tag
        const title = vTitle
        window.open(host + "?videoURL=" + videoURL + "&itag=" + itag + "&title=" + title)

    }
    let buttonArr = []
    for (let i = 0; i < props.formats.length; i++) {
        if ((props.formats[i].container == 'mp4' && props.formats[i].hasVideo && props.formats[i].itag < 350)) {
            buttonArr.push(props.formats[i]);
        }
    }
    console.log(buttonArr)
    return (
        <>
            {buttonArr.map((item, index) => {
                return <button key={index} onClick={() => { downloadVideo(item.itag) }}><p>{item.qualityLabel}</p><p>{(item.contentLength / (1024 * 1024)).toFixed(2)} MB</p></button>;
            })}
        </>
    )

}

export default YoutubeDownloadBtn;