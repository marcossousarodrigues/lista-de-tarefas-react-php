import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Task from './pages/task/Task';
import NavBar from './components/navbar/NavBar';
import EditTask from './pages/task/EditTask';
import User from './pages/user/User';

function App() {
  return (
    <div className="App"> 
      <BrowserRouter>
      <NavBar/>
        <Routes>
            <Route path='/' element={<Task/>} />
            <Route path='/tasks' element={<Task/>} />
            <Route path='/user' element={<User/>} />
            <Route path='/edit/:id' element={<EditTask/>} />
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
