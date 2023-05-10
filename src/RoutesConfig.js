import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import { Courses } from './components/Courses/Courses';
import { CourseForm } from './components/CourseForm/CourseForm';
import { Header } from './components/Header/Header';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { getAllCourses } from './store/courses/thunk';
import { getAllAuthors } from './store/authors/thunks';

export const RoutesConfig = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.isAuth);
  dispatch(getAllCourses());
  dispatch(getAllAuthors());
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={userToken ? <Courses /> : <Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route
            path='/login'
            element={userToken ? <Navigate to='/courses' /> : <Login />}
          />
          <Route
            path='/courses'
            element={userToken ? <Courses /> : <Navigate to='/' />}
          />

          <Route
            path='/courses/add'
            element={userToken ? <CourseForm /> : <Navigate to='/' />}
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
