import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { Authors } from './components/Authors/Authors';
import { getHoursDuration } from '../../helpers/pipeDuration';
import { getAuthorsId } from '../../helpers/authorsId';
import { dateGeneratop } from '../../helpers/dateGeneratop';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import './courseForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthors } from '../../store/authors/selectors';
import { addAuthor } from '../../store/authors/thunks';
import { updateCourse } from '../../store/courses/thunk';
import { getCourses } from '../../store/courses/selectors';
import { getCourse } from '../../helpers/courseById';
import { getAuthorsCourse } from '../../helpers/AuthorsOfCourse';

export const CourseFormUpdate = () => {
  const dispatch = useDispatch();
  const { courseId } = useParams();
  const courses = useSelector(getCourses);
  const authorsLst = useSelector(getAuthors);
  const courseAtMoment = getCourse(courses, courseId);
  const authorsThisCourse = getAuthorsCourse(
    authorsLst,
    courseAtMoment.authors
  );
  let beforeChangedAuthors = courseAtMoment.authors;

  const authorsOutThisCourse = authorsLst.filter(
    (aut) => authorsThisCourse.indexOf(aut) === -1
  );
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: courseAtMoment.title,
      description: courseAtMoment.description,
      duration: courseAtMoment.duration,
    },
  });
  const [textCreateAuthor, setTextCreateAuthor] = useState('');
  const [authors, setAuthors] = useState(authorsOutThisCourse);
  const [courseAuthors, setCourseAuthors] = useState(authorsThisCourse);
  let navigation = useNavigate();

  const duration = watch('duration');
  const onSubmit = (data) => {
    if (courseAuthors.length !== 0) {
      let idCurrentAuthors = getAuthorsId(courseAuthors);
      if (idCurrentAuthors.length === beforeChangedAuthors.length) {
        idCurrentAuthors =
          idCurrentAuthors[0] === beforeChangedAuthors[0]
            ? ''
            : idCurrentAuthors;
      }
      const updatedCourse = {
        title: data.title !== courseAtMoment.title ? data.title : '',
        description:
          data.description !== courseAtMoment.description
            ? data.description
            : '',
        duration:
          data.duration !== courseAtMoment.duration ? parseInt(duration) : '',
        authors: idCurrentAuthors,
      };

      const filteredData = Object.entries(updatedCourse)
        .filter(([key, value]) => value !== '')
        .reduce((acc, [key, value]) => {
          acc[key] = value;
          return acc;
        }, {});

      dispatch(updateCourse(courseAtMoment.id, filteredData));
      navigation('/courses');
    } else {
      alert('Please select authors for the course');
    }
  };

  const handleInputName = (e) => {
    setTextCreateAuthor(e.target.value);
  };

  const addCourseAuthor = (author) => {
    setCourseAuthors([...courseAuthors, author]);
    let newAuthor = authors.filter((au) => au.id !== author.id);
    setAuthors(newAuthor);
  };

  const deleteCourseAuthor = (author) => {
    setAuthors([...authors, author]);
    let newCourseAuthors = courseAuthors.filter((au) => au.id !== author.id);
    setCourseAuthors(newCourseAuthors);
  };

  const createNewAuthor = () => {
    if (textCreateAuthor !== '') {
      const newAu = {
        id: uuidv4(),
        name: textCreateAuthor,
      };
      setAuthors([...authors, newAu]);
      dispatch(addAuthor(newAu));
      setTextCreateAuthor('');
    }
  };

  return (
    <>
      <form className='app-createCourse' onSubmit={handleSubmit(onSubmit)}>
        <div className='app-createCourse__title app-createCourse__field'>
          <div>
            <Input
              labelText='Title'
              id='title'
              placeholder='Enter title...'
              type='text'
              register={register}
              validators={{ required: true }}
            />
            {errors.title?.type === 'required' && (
              <p>Field title is required</p>
            )}
          </div>
          <Button text='Update course' type='submit' />
        </div>
        <div className='app-createCourse__field'>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            name='description'
            placeholder='Enter description'
            {...register('description', { required: true, minLength: 2 })}
          ></textarea>
          {errors.description?.type === 'required' && (
            <p>Field description is required</p>
          )}
          {errors.description?.type === 'minLength' && (
            <p>Field description should be at least 2 characters</p>
          )}
        </div>
        <div className='app-createCourse__details app-createCourse__field'>
          <div className='app-createCourse__name-duration'>
            <div className='app-createCourse__add-author'>
              <h2>Add author</h2>
              <Input
                labelText='Author name'
                id='author'
                placeholder='Enter author name...'
                value={textCreateAuthor}
                type='text'
                onChange={handleInputName}
              />
              <Button
                text='Create author'
                type='button'
                onClick={createNewAuthor}
              />
            </div>
            <div className='app-createCourse__duration'>
              <h2>Duration</h2>
              <Input
                labelText='Duration'
                id='duration'
                placeholder='Enter duration in minutes...'
                type='number'
                register={register}
                validators={{ required: true }}
              />
              {errors.duration?.type === 'required' && (
                <p>Field duration is required</p>
              )}

              {duration && (
                <p>
                  Duration:{' '}
                  <span className='hour-format'>
                    {getHoursDuration(duration)}{' '}
                  </span>
                  hours{' '}
                </p>
              )}
            </div>
          </div>
          <div className='app-createCourse__authors'>
            <h2>Authors</h2>
            <Authors
              listAuthors={authors}
              textButton={'Add author'}
              onAdd={(author) => addCourseAuthor(author)}
            />
            <h2>Course authors</h2>
            {courseAuthors.length === 0 ? (
              <p className='app-createCourse__author--empty'>
                Author list is empty
              </p>
            ) : (
              <Authors
                listAuthors={courseAuthors}
                textButton={'Delete author'}
                onDelete={(author) => deleteCourseAuthor(author)}
              />
            )}
          </div>
        </div>
      </form>
    </>
  );
};
