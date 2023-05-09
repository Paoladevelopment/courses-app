import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Registration } from './components/Registration/Registration';
import { Login } from './components/Login/Login';
import { Courses } from './components/Courses/Courses';
import { CreateCourse } from './components/CreateCourse/CreateCourse';
import { Header } from './components/Header/Header';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { getAllCourses, getAllAuthors } from './services';
import { getCourses } from './store/courses/actionCreators';
import { getAuthors } from './store/authors/actionCreators';
export const RoutesConfig = () => {
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.user.isAuth);

  const listCourses = async () => {
    const courses = await getAllCourses();
    const authors = await getAllAuthors();
    dispatch(getCourses(courses));
    dispatch(getAuthors(authors));
  };

  useEffect(() => {
    listCourses();
  }, []);
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
