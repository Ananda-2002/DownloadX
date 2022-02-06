import Navbar from '../components/Navbar'
import SearchArea from '../components/SearchArea'
const index = () => {
  return (
    <>
      <Navbar />
      <div className="main_container">
        <div className="inner_container">
          <SearchArea />
        </div>
      </div>
    </>
  )
}

export default index;
