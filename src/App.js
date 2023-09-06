import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignupLogin from './components/SignupLogin/SignupLogin';
import RootLayout from './components/Layout/RootLayout';
import Expenses from './components/ExpenseTrack/Expenses';
import Updateprofile from './components/Profile/Updateprofile';
import Welcomepage from './components/Welcome/Welcomepage';
import { useSelector } from 'react-redux';

function App() {
  const isDarkMode = useSelector((state) => state.theme.isDark);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <div  className={`App ${isLoggedIn && isDarkMode ? "darkTheme" : "lightTheme"}`}>
      <Routes>
        <Route path='/' element={<SignupLogin/>}/>
        {/* <Route path='/profile' element={<Profile/>}/> */}
        <Route path='/profile' element={<RootLayout/>}>
          <Route path='/profile/welcome' element={<Welcomepage/>}/>
          <Route path='/profile/expenses' element={<Expenses/>}/>
          <Route path="/profile/update" element={<Updateprofile/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
