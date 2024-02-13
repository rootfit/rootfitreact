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
      {/* <Home /> */}
      <div className="row">
        <div>
          <h1 className="text-center">
            <br />
            {/* 로고 만들어서 대체하는게 좋을 것 같아요~ */}
            RootFit
            <br />
          </h1>
          <br />
          <hr className="hr-solid"/ >
        </div>

        
        {/* todo */}
        <div>
          <Health />
          {/* todo.jsx에 위아래 여백 더 주세요 */}
        </div>
        <hr className="hr-solid"/ >
        
        
        {/* shop */}
        <div>
          <RecentProductList />
        </div>
        <hr className="hr-solid"/ >
        
        
        {/* board */}
        <div>
          <RecentBoardList />
        </div>
      </div>
    </div>
  )
}
export default HomeMain