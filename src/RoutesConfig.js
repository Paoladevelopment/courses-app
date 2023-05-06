import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import { Courses } from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { useState } from 'react';
import { Header } from './components/Header/Header';
import { CourseInfo } from './components/CourseInfo/CourseInfo';

export const RoutesConfig = () => {
  const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));

  const userIsLogged = userToken ? true : false;
  const [isVisibleAllHeader, setIsVisibleAllHeader] = useState(userIsLogged);

  const handleLogin = (token) => {
    setUserToken(token);
    setIsVisibleAllHeader(true);
  };

  const handleLogout = () => {
    setIsVisibleAllHeader(false);
    localStorage.removeItem('userToken');
    setUserToken(null);
  };

  return (
    <>
      <Router>
        <Header
          isVisibleAllHeader={isVisibleAllHeader}
          handleLogout={handleLogout}
        />
        <Routes>
          <Route
            path='/'
            element={
              userToken ? <Courses /> : <Login giveAccessTo={handleLogin} />
            }
          />
          <Route path='/registration' element={<Registration />} />
          <Route
            path='/login'
            element={
              userToken ? (
                <Navigate to='/courses' />
              ) : (
                <Login giveAccessTo={handleLogin} />
              )
            }
          />
          <Route
            path='/courses'
            element={userToken ? <Courses /> : <Navigate to='/' />}
          />

          <Route
            path='/courses/add'
            element={userToken ? <CreateCourse /> : <Navigate to='/' />}
          />

          <Route
            path='/courses/:courseId'
            element={userToken ? <CourseInfo /> : <Navigate to='/' />}
          />
        </Routes>
      </Router>
    </>
  );
};
