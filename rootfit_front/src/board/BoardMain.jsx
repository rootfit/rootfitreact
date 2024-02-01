import { Route, Routes } from "react-router-dom";
import BoardList from "./component/BoardList";
import BoardDetail from "./component/BoardDetail";
// import BoardInsert from ""
// import BoardUpdate from ""


const BoardMain = () => {
  return (
    <div>
    <Routes>
      <Route path='/list' element={<BoardList />} />
      {/* <Route path='/insert' element={<BoardInsert />} /> */}
      <Route path='/detail/:id' element={<BoardDetail />} />
      {/* <Route path='/update/:id' element={<BoardUpdate />} /> */}
    </Routes>
    </div>
  )
}

export default BoardMain