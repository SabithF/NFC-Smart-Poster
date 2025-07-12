import React, { useEffect, useState } from 'react';
import axios from 'axios';

const isLocalhost = window.location.hostname === 'localhost';

const LOCAL_IP = '192.168.0.127';

const BASE_URL = isLocalhost
  ? 'http://localhost:8080/api/posters'
  : `http://${LOCAL_IP}:8080/api/posters`;

const PosterForm = ({ onClose, onPosterCreated, editPoster  }) => {
  const [form, setForm] = useState({
    posterId: '',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    nextClue: ''
  });

  useEffect(()=> {
    if (editPoster) {
      setForm(editPoster);
    }
  }, [editPoster]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('option')) {
      const index = parseInt(name.slice(-1));
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
      options: [...prevForm.options, '']
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(editPoster) {
        await axios.put(`${BASE_URL}/update/${editPoster.posterId}`, form)
        alert("Poster updated successfully");
      }else {
        await axios.post(`${BASE_URL}/create`, form);
        alert("Poster created successfully!");

      }
      
      
      

      setForm({
        posterId: '',
        question: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        nextClue: ''
      });
      onPosterCreated()
      onClose();
      
    } catch (error) {
      alert("Failed to create poster");
      console.error(error);
    }
  };

  return (
    
       <div className="fixed inset-0 z-50 overflow-y-auto scrollbar-hide no-scrollbar flex items-center justify-center bg-black/40">
        <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-full no-scrollbar max-w-lg max-h-[90vh] overflow-y-auto relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-4 text-white text-xl font-bold hover:text-red-500"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold mb-6 text-white text-center">Create New Poster</h2>


        <form onSubmit={handleSubmit} className='overflow-auto'>
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-white">Poster ID</label>
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
            <label className="block mb-1 text-sm font-medium text-white">Question</label>
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
            <label className="block mb-2 text-sm font-medium text-white">Options</label>
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
            <label className="block mb-1 text-sm font-medium text-white">Correct Answer</label>
            <select
              name="correctAnswer"
              value={form.correctAnswer}
              onChange={handleChange}
              required
              className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
            >
            <option value =""> Select correct answer

            </option>

            {form.options.map((opt, index) =>(
               <option key={index} value={opt}>
                {opt || `Option ${index + 1}`}
               </option>
            ))}
            </select>
            
          </div>

          <div className="mb-6">
            <label className="block mb-1 text-sm font-medium text-white">Next Clue</label>
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
            {editPoster ? "Update": "Create poster"}

          </button>
        </form>
      </div>
      </div>
   
  );
};

export default PosterForm;
