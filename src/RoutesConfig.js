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
import { CourseFormUpdate } from './components/CourseForm/CourseFormUpdate';
import { Header } from './components/Header/Header';
import { CourseInfo } from './components/CourseInfo/CourseInfo';
import { getAllCourses } from './store/courses/thunk';
import { getAllAuthors } from './store/authors/thunks';
import { getAuth, getRole } from './store/user/selectors';
import { getUser } from './store/user/thunk';
import { PrivateRoutes } from './components/PrivateRouter/PrivateRouter';
import { useEffect } from 'react';

const token = localStorage.getItem('userToken');
export const RoutesConfig = () => {
  const dispatch = useDispatch();
  const userToken = useSelector(getAuth);
  const userRole = useSelector(getRole);
  dispatch(getAllCourses());
  dispatch(getAllAuthors());

  useEffect(() => {
    const token = localStorage.getItem('userToken');

    if (token) {
      dispatch(getUser(token));
    }
  }, [dispatch]);
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

          <Route element={<PrivateRoutes role={userRole} />}>
            <Route element={<CourseForm />} path='/courses/add' />

            <Route
              element={<CourseFormUpdate />}
              path='/courses/update/:courseId'
            />
          </Route>

          <Route
            path='/courses/:courseId'
            element={userToken ? <CourseInfo /> : <Navigate to='/' />}
          />
        </Routes>
      </Router>
    </>
  );
};
