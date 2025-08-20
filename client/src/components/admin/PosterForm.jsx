import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Alert from '../other_components/Alert';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const BASE_URL = `${API_BASE}/posters`;
export const USER_URL = `${API_BASE}/users`;

const PosterForm = ({ onClose, onPosterCreated, editPoster }) => {
  const [form, setForm] = useState({
    posterId: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    nextClue: '',
  });

  const [alertBox, setAlertBox] = useState(null);

  useEffect(() => {
    if (editPoster) setForm(editPoster);
  }, [editPoster]);

  // useEffect(() => {
  //   if (!alertBox) return;
  //   const t = setTimeout(() => setAlertBox(null), 3000);
  //   return () => clearTimeout(t);
  // }, [alertBox]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('option')) {
      const index = parseInt(name.slice(-1), 10);
      const updatedOptions = [...form.options];
      updatedOptions[index] = value;
      setForm({ ...form, options: updatedOptions });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const addOption = () => {
    setForm((prevForm) => ({
      ...prevForm,
      options: [...prevForm.options, ''],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editPoster) {
        await axios.put(`${BASE_URL}/update/${editPoster.posterId}`, form);
        setAlertBox({
          type: 'success',
          title: 'Updated',
          message: 'Poster updated successfully.',
        });
      } else {
        await axios.post(`${BASE_URL}/create`, form);
        setAlertBox({
          type: 'success',
          title: 'Created',
          message: 'Poster created successfully.',
        });
      }

      setForm({
        posterId: '',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        nextClue: '',
      });

      onPosterCreated?.();

      setTimeout(() => {
        onClose?.();
      }, 800);
    } catch (error) {
      setAlertBox({
        type: 'error',
        title: 'Error',
        message:
          error?.response?.data?.error ||
          'Failed to save poster. Please try again.',
      });
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto scrollbar-hide no-scrollbar flex items-center justify-center bg-black/40">
      
      
      {alertBox && (
        <div className="fixed top-4 right-4 z-[1000] space-y-3 pointer-events-none">
          <Alert
            variant={alertBox.type}
            title={alertBox.title}
            onClose={() => setAlertBox(null)}
            className="pointer-events-auto w-80"
          >
            {alertBox.message}
          </Alert>
        </div>
      )}

      <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full no-scrollbar max-w-lg max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-white text-xl font-bold hover:text-red-500"
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold mb-6 text-white text-center">
          Create New Poster
        </h2>

        <form onSubmit={handleSubmit} className="overflow-auto">
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-white">
              Poster ID
            </label>
            <input
              type="text"
              name="posterId"
              value={form.posterId}
              onChange={handleChange}
              required
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-white">
              Question
            </label>
            <input
              type="text"
              name="question"
              value={form.question}
              onChange={handleChange}
              required
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-white">
              Options
            </label>
            {form.options.map((opt, index) => (
              <input
                key={index}
                type="text"
                name={`option${index}`}
                value={opt}
                onChange={handleChange}
                required
                placeholder={`Option ${index + 1}`}
                className="w-full mb-2 p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
              />
            ))}
            <button
              type="button"
              onClick={addOption}
              className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md mt-2"
            >
              + Add Option
            </button>
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-white">
              Correct Answer
            </label>
            <select
              name="correctAnswer"
              value={form.correctAnswer}
              onChange={handleChange}
              required
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
              <option value=""> Select correct answer</option>
              {form.options.map((opt, index) => (
                <option key={index} value={opt}>
                  {opt || `Option ${index + 1}`}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-white">
              Next Clue
            </label>
            <input
              type="text"
              name="nextClue"
              value={form.nextClue}
              onChange={handleChange}
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg"
          >
            {editPoster ? 'Update' : 'Create poster'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PosterForm;
