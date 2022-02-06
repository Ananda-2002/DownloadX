const ytdl = require("ytdl-core")
const ffmpeg = require('ffmpeg-static');
const cp = require('child_process');

export default async function handler(req, res) {
    const videoURL = req.query.videoURL;
    const ref = videoURL
    const itag = req.query.itag;
    const title = req.query.title
    // let info = title;
    res.setHeader("Content-Disposition", `attachment;filename=${title}.mp4`)
    const tracker = {
        start: Date.now(),
        audio: { downloaded: 0, total: Infinity },
        video: { downloaded: 0, total: Infinity },
        merged: { frame: 0, speed: '0x', fps: 0 },
    };

    // Get audio and video streams
    const audio = ytdl(ref, { filter: 'audioonly', })
        .on('progress', (_, downloaded, total) => {
            tracker.audio = { downloaded, total };
        });
    const video = ytdl(ref, { filter: format => format.itag == itag })
        .on('progress', (_, downloaded, total) => {
            tracker.video = { downloaded, total };
        });


    // Start the ffmpeg child process
    const ffmpegProcess = cp.spawn(ffmpeg, [
        // Remove ffmpeg's console spamming
        '-loglevel', '8', '-hide_banner',
        // Redirect/Enable progress messages
        '-progress', 'pipe:3',
        // Set inputs
        '-i', 'pipe:3',
        '-i', 'pipe:4',
        // Map audio & video from streams
        '-map', '0:a',
        '-map', '1:v',
        // Keep encoding
        '-c:v', 'copy',
        // Define output file
        // 'out.mp4',
        '-f', 'mpegts'/*'matroska*/, 'pipe:5'
    ], {
        windowsHide: true,
        stdio: [
            /* Standard: stdin, stdout, stderr */
            'inherit', 'inherit', 'inherit',
            /* Custom: pipe:3, pipe:4, pipe:5 */
            'pipe', 'pipe', 'pipe', 'pipe'
        ],
    });
    ffmpegProcess.on('close', () => {

        console.log('done');
        // Cleanup
        process.stdout.write('\n\n\n\n');
    });

    // Link streams
    // FFmpeg creates the transformer streams and we just have to insert / read data
    ffmpegProcess.stdio[3].on('data', chunk => {
        // Parse the param=value list returned by ffmpeg
        const lines = chunk.toString().trim().split('\n');
        const args = {};
        for (const l of lines) {
            const [key, value] = l.split('=');
            args[key.trim()] = value.trim();
        }
        tracker.merged = args;
    });
    audio.pipe(ffmpegProcess.stdio[3]);
    video.pipe(ffmpegProcess.stdio[4]);
    res.setHeader("Content-Disposition", `attachment;filename=${title}.mp4`)
    ffmpegProcess.stdio[5].pipe(res);

}