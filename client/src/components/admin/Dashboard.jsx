import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './navBar';
import { styles } from '../../styles';
import PosterForm from './PosterForm';
import Alert from '../other_components/Alert';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const BASE_URL = `${API_BASE}/posters`;
export const USER_URL = `${API_BASE}/users`;

const Dashboard = () => {
    const [posters, setPosters] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editPoster, setEditPoster] = useState(null);
    const [alertBox, setAlertBox] = useState(null);

    const fetchPosters = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/all-posters`);
            setPosters(res.data);
        } catch (error) {
            console.error('Failed to fetch posters', error);
        }
    };

    const handleDelete = async (posterId) => {
        try {
            await axios.delete(`${BASE_URL}/delete/${posterId}`);
            setPosters((prev) => prev.filter((p) => p.posterId !== posterId));
            setAlertBox({ type: 'success', title: 'Deleted', message: `Poster deleted successfully` });
        } catch (error) {
            console.error('Failed to delete poster', error);
            setAlertBox({ type: 'error', title: 'Error', message: 'Error deleting poster' });
        }
    };

    const handleEditPoster = (poster) => {
        setEditPoster(poster);
        setShowForm(true);
    };

    useEffect(() => {
        fetchPosters();
    }, []);

    const makePosterUrl = (id) => `${window.location.origin}/quiz/${id}`;

    const handleCopyLink = async (id) => {
        const url = makePosterUrl(id);
        try {
            await navigator.clipboard.writeText(url);
            setAlertBox({ type: 'success', title: 'Success', message: `Copied: ${url}` });
        } catch (e) {
            const ta = document.createElement('textarea');
            ta.value = url;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setAlertBox({ type: 'success', title: 'Success', message: `Copied: ${url}` });
        }
    };

    const handleShowForm = () => {
        setShowForm(true);
    };

    useEffect(() => {
        if (!alertBox) return;
        const t = setTimeout(() => setAlertBox(null), 3000);
        return () => clearTimeout(t);
    }, [alertBox]);

    return (
        <>
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

            <div className={`${styles.dashBoardBackground} overflow-auto bg-gray-900`}>
                <NavBar />
                <div className="flex flex-col overflow-auto justify-center rounded-xl items-center bg-gray-800/50 mt-10 mx-20 shadow-transparent">
                    <div className="flex w-full px-6 py-4 items-center justify-between">
                        <div className="text-white font-semibold tracking-widest font-Poppins text-xl">
                            Poster Management
                        </div>
                        <button
                            type="button"
                            onClick={handleShowForm}
                            className="text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                        >
                            + Add Posters
                        </button>
                    </div>

                    <div className="w-full overflow-x-auto shadow-md sm:rounded-lg px-7 pt-3 pb-6">
                        <table className="min-w-full text-sm text-left text-gray-400">
                            <thead className="text-xs uppercase bg-gray-700 text-gray-400 rounded-t-xl">
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
                                        className="oddbg-gray-900 even:bg-gray-800 border-b :border-gray-700"
                                        key={poster._id}
                                    >
                                        <td className="px-6 py-4 font-medium whitespace-nowrap text-white">
                                            {poster.posterId}
                                        </td>
                                        <td className="px-6 py-4">{poster.question}</td>
                                        <td className="px-6 py-4">{poster.options?.join(', ')}</td>
                                        <td className="px-6 py-4">{poster.correctAnswer}</td>
                                        <td className="px-6 py-4">{poster.nextClue}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2 px-2 text-white">
                                                <button
                                                    type="button"
                                                    onClick={() => handleCopyLink(poster.posterId)}
                                                    className="inline-flex justify-center items-center font-medium hover:text-blue-400 bg-emerald-900/60 w-24 h-7 border border-white/20 rounded-full px-3"
                                                    title={makePosterUrl(poster.posterId)}
                                                >
                                                    Copy URL
                                                </button>
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

                {showForm && (
                    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-start pt-20">
                        <PosterForm
                            onClose={() => {
                                setShowForm(false);
                                setEditPoster(null);
                            }}
                            onPosterCreated={fetchPosters}
                            editPoster={editPoster}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Dashboard;
