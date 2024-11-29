import { Route, Routes } from 'react-router-dom';
import BoardList from '../board/component/BoardList';
import BoardDetail from '../board/component/BoardDetail';
import BoardInsert from '../board/component/BoardInsert';
import BoardUpdate from '../board/component/BoardUpdate';

const BoardMain = () => {
  return (
    <div>
      <Routes>
        <Route path='/list' element={<BoardList />} />
        <Route path='/insert' element={<BoardInsert />} />
        <Route path='/detail/:id' element={<BoardDetail />} />
        <Route path='/update/:id' element={<BoardUpdate />} />
      </Routes>
    </div>
  );
};

export default BoardMain;
