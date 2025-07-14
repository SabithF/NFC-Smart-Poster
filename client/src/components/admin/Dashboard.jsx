import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './navBar';
import { styles } from '../../styles';
import PosterForm from './PosterForm';
import { Link } from 'react-router-dom';



const isLocalhost = window.location.hostname === 'localhost';
const LOCAL_IP = '192.168.0.127';

const BASE_URL = isLocalhost
    ? 'http://localhost:8080/api/posters'
    : `http://${LOCAL_IP}:8080/api/posters`;


const Dashboard = () => {
    const [posters, setPosters] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editPoster, setEditPoster] = useState(null);


    const fetchPosters = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/all-posters`);
            setPosters(res.data);

        } catch (error) {
            console.error("Failed to fetch posters", error);

        }
    }
    const handleDelete = async (posterId) => {
        try {
            await axios.delete(`${BASE_URL}/delete/${posterId}  `);
            setPosters((prev) => prev.filter((p) => p.posterId !== posterId))
            alert("Poster deleted successfully");
        } catch (error) {

            console.error("Failed to delete poster", error);
            alert("Error deleting poster");
        }
    }

    const handleEditPoster = (poster) => {
        setEditPoster(poster);
        setShowForm(true);
    }


    useEffect(() => {


        fetchPosters();
    }, []);






    const handleShowForm = () => {
        setShowForm(true);
    };

    return (
        <>
            <div className={`${styles.dashBoardBackground} overflow-auto`}>
                <NavBar />

                <div className="flex flex-col overflow-auto justify-center rounded-xl items-center bg-gray-800/10 mt-10 mx-20 shadow-transparent">
                    {/* title and button */}
                    <div className="flex w-full px-6 py-4 items-center justify-between">
                        <div className="text-white font-semibold tracking-widest  font-Poppins text-xl">
                            Poster Management
                        </div>
                        <button
                            type="button"
                            onClick={handleShowForm}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium 
                rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                focus:outline-none dark:focus:ring-blue-800"
                        >
                            + Add Posters
                        </button>
                    </div>

                    {/* table */}
                    <div className="w-full overflow-x-auto shadow-md sm:rounded-lg px-7 pt-3 pb-6">
                        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-t-xl">
                                <tr>
                                    <th className="px-6 py-3">Poster Id</th>
                                    <th className="px-6 py-3">Questions</th>
                                    <th className="px-6 py-3">Options</th>
                                    <th className="px-6 py-3">Correct option</th>
                                    <th className="px-6 py-3">Clue</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {posters.map((poster) => (
                                    <tr
                                        className="odd:bg-white odd:dark:bg-gray-900 
                    even:bg-gray-50 even:dark:bg-gray-800 border-b 
                    dark:border-gray-700 border-gray-200"
                                        key={poster._id}
                                    >


                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {poster.posterId}
                                        </td>
                                        <td className="px-6 py-4">{poster.question}</td>
                                        <td className="px-6 py-4">{poster.options?.join(',')}</td>
                                        <td className="px-6 py-4">{poster.correctAnswer}</td>
                                        <td className="px-6 py-4">{poster.nextClue}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2 px-2 text-white">
                                                <a
                                                    href="#"
                                                    onClick={() => handleEditPoster(poster)}
                                                    className="inline-flex justify-center items-center font-medium hover:text-blue-400 bg-blue-900/60 w-14 h-7 border border-white/20 rounded-full p-3"
                                                >
                                                    Edit
                                                </a>
                                                <a
                                                    href="#"
                                                    onClick={() => handleDelete(poster.posterId)}
                                                    className="inline-flex justify-center items-center font-medium hover:text-blue-400 bg-red-900/60 w-14 h-7 border border-white/20 rounded-full p-3"
                                                >
                                                    Delete
                                                </a>
                                            </div>
                                        </td>
                                    </tr>

                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>

                {/* FORM CARD OVERLAY */}
                {showForm && (
                    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-start pt-20">
                        <PosterForm 
                            onClose={() => 
                            {setShowForm(false); setEditPoster(null)}} 
                            onPosterCreated={fetchPosters}
                            editPoster={editPoster} />
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard;
