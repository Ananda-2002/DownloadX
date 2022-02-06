import Skeleton from '@mui/material/Skeleton';

const YoutubeSearcResultSkelaton = () => {
    const buttonSkeletonGrid = {
        "display": "grid",
        "gridTemplateColumns": "1fr 1fr 1fr",
        "gap": "0.5rem",
        "borderRadius": "10px",
        "marginTop": "1rem"
    }
    const borderRadius = {
        'borderRadius': '10px'
    }
    return (
        <>
            <Skeleton variant="rectangular" animation="wave" height={118} />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <Skeleton variant="text" animation="wave" />
            <div style={buttonSkeletonGrid}>
                <Skeleton variant="rectangular" animation="wave" height={60} style={borderRadius} />
                <Skeleton variant="rectangular" animation="wave" height={60} style={borderRadius} />
                <Skeleton variant="rectangular" animation="wave" height={60} style={borderRadius} />
                <Skeleton variant="rectangular" animation="wave" height={60} style={borderRadius} />
                <Skeleton variant="rectangular" animation="wave" height={60} style={borderRadius} />
                <Skeleton variant="rectangular" animation="wave" height={60} style={borderRadius} />
            </div>

        </>
    )
}
export default YoutubeSearcResultSkelaton