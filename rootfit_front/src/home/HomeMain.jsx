import Home from "./component/Home";

const HomeMain = () => {
  return (
    <div>
      <Home/>
      {/* 의미 없는 컴포넌트가 선언된 것처럼 보이지만..
      무언가 상황에 따라.홈 화면을 위한 컴포넌트가 더 추가될 수도 있고..
      홈 화면내에 충첩 라우팅으로.. 여러 화면이 변경되면서 나올수도 있어서 유지한다. */}
    </div>
  )
}
export default HomeMain