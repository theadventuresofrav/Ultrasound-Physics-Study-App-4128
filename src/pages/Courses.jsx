import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CourseNavigator from '../components/courses/CourseNavigator';
import CourseViewer from '../components/courses/CourseViewer';

function Courses() {
  return (
    <Routes>
      <Route path="/" element={<CourseNavigator />} />
      <Route path="/:courseId" element={<CourseViewer />} />
      <Route path="/:courseId/:moduleId" element={<CourseViewer />} />
      <Route path="/:courseId/:moduleId/:topicId" element={<CourseViewer />} />
    </Routes>
  );
}

export default Courses;