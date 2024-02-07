import Home from "./component/Home";
import RecentBoardList from "./component/board"
// import 쇼핑어쩌구
// import todo어쩌구

const HomeMain = () => {
  // const 투두랜덤함수 = () => {
  //   // 아이디 비교 로직( 보드디테일 참고 가능~! )
  return (
    <div className="container">
      {/* <Home /> */}
      {/* <div className="col-12">
      <투두함수 />
      </div> */}
      {/* <div className="col-6">
      <쇼핑 />
      </div> */}
      <div className="col-6">
        <RecentBoardList />
      </div>

      {/* 의미 없는 컴포넌트가 선언된 것처럼 보이지만..
      무언가 상황에 따라.홈 화면을 위한 컴포넌트가 더 추가될 수도 있고..
      홈 화면내에 충첩 라우팅으로.. 여러 화면이 변경되면서 나올수도 있어서 유지한다. */}
    </div>
  )
}
export default HomeMain