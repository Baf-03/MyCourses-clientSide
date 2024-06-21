// src/components/CreateCourse.js
import { useState } from 'react';
import axios from 'axios';
const apiUrl = import.meta.env.VITE_API_URL;

const CreateCourse = () => {
  const [course, setCourse] = useState({
    name: '',
    instructor: '',
    description: '',
    enrollmentStatus: 'Open',
    thumbnail: '',
    duration: '',
    schedule: '',
    location: '',
    prerequisites: [''],
    syllabus: [{ week: '', topic: '', content: '' }],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({
      ...course,
      [name]: value,
    });
  };

  handleChange();

  const handlePrerequisiteChange = (index, e) => {
    const { value } = e.target;
    const newPrerequisites = [...course.prerequisites];
    newPrerequisites[index] = value;
    setCourse({
      ...course,
      prerequisites: newPrerequisites,
    });
  };

  const addPrerequisite = () => {
    setCourse({
      ...course,
      prerequisites: [...course.prerequisites, ''],
    });
  };

  const handleSyllabusChange = (index, e) => {
    const { name, value } = e.target;
    const newSyllabus = [...course.syllabus];
    newSyllabus[index][name] = value;
    setCourse({
      ...course,
      syllabus: newSyllabus,
    });
  };

  const addSyllabusWeek = () => {
    setCourse({
      ...course,
      syllabus: [...course.syllabus, { week: '', topic: '', content: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/createcourse`, course);
      console.log(response.data);
      setCourse({
        name: '',
        instructor: '',
        description: '',
        enrollmentStatus: 'Open',
        thumbnail: '',
        duration: '',
        schedule: '',
        location: '',
        prerequisites: [''],
        syllabus: [{ week: '', topic: '', content: '' }],
      })
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Create New Course</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Course Name</label>
          <input
            type="text"
            name="name"
            value={course.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-500  rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Instructors Name</label>
          <input
            type="text"
            name="instructor"
            value={course.instructor}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-500 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={course.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-500 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Enrollment Status</label>
          <select
            name="enrollmentStatus"
            value={course.enrollmentStatus}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-500 rounded"
            required
          >
            <option value="Open">Open</option>
            <option value="Closed">Closed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail"
            value={course.thumbnail}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-500 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Course Duration</label>
          <input
            type="text"
            name="duration"
            value={course.duration}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-500 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Schedule</label>
          <input
            type="text"
            name="schedule"
            value={course.schedule}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-500 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Location</label>
          <input
            type="text"
            name="location"
            value={course.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-500 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Pre-requisites</label>
          {course.prerequisites.map((prerequisite, index) => (
            <div key={index} className="flex space-x-2 mb-2">
              <input
                type="text"
                value={prerequisite}
                onChange={(e) => handlePrerequisiteChange(index, e)}
                className="w-full px-3 py-2 border border-gray-500 rounded"
                required
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addPrerequisite}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Prerequisite
          </button>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Syllabus</label>
          {course.syllabus.map((week, index) => (
            <div key={index} className="mb-2">
              <div className="flex space-x-2">
                <input
                  type="number"
                  name="week"
                  placeholder="Week"
                  value={week.week}
                  onChange={(e) => handleSyllabusChange(index, e)}
                  className="w-1/4 px-3 py-2 border border-gray-500 rounded"
                  required
                />
                <input
                  type="text"
                  name="topic"
                  placeholder="Topic"
                  value={week.topic}
                  onChange={(e) => handleSyllabusChange(index, e)}
                  className="w-1/4 px-3 py-2 border border-gray-500 rounded"
                  required
                />
                <textarea
                  name="content"
                  placeholder="Content"
                  value={week.content}
                  onChange={(e) => handleSyllabusChange(index, e)}
                  className="w-1/2 px-3 py-2 border border-gray-500 rounded"
                  required
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addSyllabusWeek}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Week
          </button>
        </div>
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
          Create Course
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
