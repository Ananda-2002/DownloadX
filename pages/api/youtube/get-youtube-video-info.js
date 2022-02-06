const ytdl = require("ytdl-core")
export default async function handler(req, res) {

    const videoURL = req.query.videoURL;
    const info = await ytdl.getInfo(videoURL);
    res.status(200).json(info);
}
