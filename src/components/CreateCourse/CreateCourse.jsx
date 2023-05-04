import { Input } from '../../common/Input/Input';
import { Button } from '../../common/Button/Button';
import { Courses } from '../Courses/Courses';
import { Authors } from './components/Authors/Authors';
import { getHoursDuration } from '../../helpers/pipeDuration';
import { getAuthorsId } from '../../helpers/authorsId';
import { dateGeneratop } from '../../helpers/dateGeneratop';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { mockedAuthorsList, mockedCoursesList } from '../../constants';
import { v4 as uuidv4 } from 'uuid';
import './createCourse.css';

export const CreateCourse = () => {
  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
  } = useForm();

  const [textCreateAuthor, setTextCreateAuthor] = useState('');
  const [authors, setAuthors] = useState(mockedAuthorsList);
  const [courseAuthors, setCourseAuthors] = useState([]);
  const [showCourses, setShowCourses] = useState(false);

  const duration = watch('duration');
  const onSubmit = (data) => {
    if (courseAuthors.length !== 0) {
      const newCourse = {
        id: uuidv4(),
        title: data.title,
        description: data.description,
        creationDate: dateGeneratop(),
        duration: parseInt(duration),
        authors: getAuthorsId(courseAuthors),
      };
      mockedCoursesList.push(newCourse);
      setShowCourses(true);
    } else {
      alert('Please select authors for the course');
    }
  };

  const handleInputName = (e) => {
    setTextCreateAuthor(e.target.value);
  };

  const addCourseAuthor = (author) => {
    setCourseAuthors([...courseAuthors, author]);
    let newAuthors = authors.filter((au) => au.id !== author.id);
    setAuthors(newAuthors);
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
      mockedAuthorsList.push(newAu);
    }
  };

  return (
    <>
      {showCourses ? (
        <Courses />
      ) : (
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
            <Button text='Create course' type='submit' />
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
      )}
    </>
  );
};
