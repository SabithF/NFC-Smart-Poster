import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './navBar';
import { styles } from '../../styles';
import VoucherForm from './VoucherForm'



const isLocalhost = window.location.hostname === 'localhost';
const LOCAL_IP = '192.168.0.127';

const BASE_URL = isLocalhost
    ? 'http://localhost:8080/api/posters'
    : `http://${LOCAL_IP}:8080/api/posters`;



const UserDashBoard = () => {
    const [users, setUsers] = useState([]);


    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/all-users`)
            setUsers(res.data);
        } catch (error) {
            console.error("Failed to fetch users", error)
            
        }
    }
    
    useEffect(() => {
        fetchUsers();
    }, []);

return (

    <>

    <div className={`${styles.dashBoardBackground} overflow-auto`}>
        <NavBar />



        <div className="flex flex-col overflow-auto justify-center rounded-xl items-center bg-gray-800/10 mt-10 mx-20 shadow-transparent">
                    {/* title and button */}
                    <div className="flex w-full px-6 py-4 items-center justify-between">
                        <div className="text-white font-semibold tracking-widest text-xl">
                            User Management
                        </div>
                        <button
                            type="button"
                            
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium 
                rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 
                focus:outline-none dark:focus:ring-blue-800"
                        >
                            Download
                        </button>
                    </div>

                    {/* table */}
                    <div className="w-full overflow-x-auto shadow-md sm:rounded-lg px-7 pt-3 pb-6">
                        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 rounded-t-xl">
                                <tr>
                                    <th className="px-6 py-3">DeviceId</th>
                                    <th className="px-6 py-3">Nick Name </th>
                                    <th className="px-6 py-3">Collected Badges</th>
                                    <th className="px-6 py-3">Scan Count</th>
                                    <th className="px-6 py-3">Voucher Status</th>
                                    <th className="px-6 py-3">Device IP</th>
                                    <th className="px-6 py-3">Unique Device Id</th>
                                    
                                </tr>
                            </thead>

                            <tbody>
                                {users.map((user) => (
                                    <tr
                                        className="odd:bg-white odd:dark:bg-gray-900 
                                                    even:bg-gray-50 even:dark:bg-gray-800 border-b 
                                                    dark:border-gray-700 border-gray-200"
                                        key={user._id}
                                    >


                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {user.deviceId}
                                        </td>
                                        
                                        <td className="px-6 py-4">{user.nickName}</td>
                                        <td className="px-6 py-4">{user.badges}</td>
                                        <td className="px-6 py-4">{user.scanCount}</td>
                                        <td className="px-6 py-4">
                                            {user.voucherUnlocked ? (
                                                <span className="px-3 py-1 text-xs font-semibold text-white bg-green-900/50 border border-white/20 rounded-full">
                                                    Unlocked
                                                </span>
                                            ):(
                                                <span className="px-3 py-1 text-xs font-semibold text-white/40 bg-red-900/40 rounded-full">
                                                    Locked
                                                </span>
                                            )}


                                        </td>

                                        <td className="px-6 py-4">{user.deviceIp}</td>
                                        <td className="px-6 py-4">{user.userUniqueId}</td>
                                        
                                    </tr>

                                ))}

                            </tbody>
                        </table>
                    </div>
                </div>


        
        
s
    </div>
    
    
    
    
    </>
    
)













};

export default UserDashBoard;