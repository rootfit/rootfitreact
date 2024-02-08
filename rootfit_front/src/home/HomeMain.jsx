import Home from "./component/Home";
import RecentBoardList from "./component/board"
import RecentProductList from "./component/shopping"
// import 쇼핑어쩌구
import Health from "./component/todo";

const HomeMain = () => {
  // const 투두랜덤함수 = () => {
  //   // 아이디 비교 로직( 보드디테일 참고 가능~! )
  return (
    <div className="container">
      <Health />
      {/* <Home /> */}
      {/* <div className="col-12">
      <투두함수 />
      </div> */}
      <div className="row">

        <div className="col-6">
          <RecentProductList />
        </div>
        <div className="col-6">
          <RecentBoardList />
        </div>
      </div>
    </div>
  )
}
export default HomeMain