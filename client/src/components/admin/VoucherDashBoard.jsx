import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './navBar';
import { styles } from '../../styles';
import { Link } from 'react-router-dom';
import VoucherForm from './VoucherForm';


const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const BASE_URL = `${API_BASE}/posters`;
export const USER_URL = `${API_BASE}/users`;


const VoucherDashBoard = () => {
    const [vouchers, setVouchers] = useState([]);
    const [showVoucherForm, setShowVoucherForm] = useState(false);
    const [editVoucher, setEditVoucher] = useState(null);


    const fetchVouchers = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/vouchers`);
            setVouchers(res.data);

        } catch (error) {
            console.error("Failed to fetch vouchers", error);
        }
    }


    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/vouchers/${id} `);
            await fetchVouchers();
            // setVouchers((prev) => prev.filter((v) => v._id !== id));
            alert("Voucher deleted successfully");
        } catch (error) {

            console.error("Failed to delete voucher", error);
            alert("Error deleting voucher");
        }
    }

    const handleEditVoucher = (voucher) => {
        setEditVoucher(voucher);
        setShowVoucherForm(true);
    }


    useEffect(() => {


        fetchVouchers();
    }, []);


    const handleShowForm = () => {
        setShowVoucherForm(true);
    };


    return (
        <>
            <div className={`${styles.dashBoardBackground} overflow-auto bg-gray-900`}>
                <NavBar />


                <div className="flex flex-col overflow-auto justify-center rounded-xl items-center bg-gray-800/50 mt-10 mx-20 shadow-transparent">
                    {/* title and button */}
                    <div className="flex w-full px-6 py-4 items-center justify-between">
                        <div className="text-white font-semibold tracking-widest text-xl">
                            Voucher Management
                        </div>
                        <button
                            type="button"
                            onClick={handleShowForm}
                            className="text-white  focus:ring-4  font-medium 
                rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-blue-600 hover:bg-blue-700 
                focus:outline-none focus:ring-blue-800"
                        >
                            + Add Vouchers
                        </button>
                    </div>

                    {/* table */}
                    <div className="w-full overflow-x-auto shadow-md sm:rounded-lg px-7 pt-3 pb-6">
                        <table className="min-w-full text-sm text-left text-gray-400">
                            <thead className="text-xs uppercase  bg-gray-700 text-gray-400 rounded-t-xl">
                                <tr>
                                    <th className="px-6 py-3">Voucher Code</th>
                                    <th className="px-6 py-3">Expiry Date</th>
                                    <th className="px-6 py-3">Redeemed Users</th>
                                    <th className="px-6 py-3">Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {vouchers.map((voucher) => (
                                    <tr
                                        className=" odd:bg-gray-900 
                                                     even:bg-gray-800 border-b 
                                                    border-gray-700 "
                                        key={voucher._id}
                                    >


                                        <td className="px-6 py-4 font-medium  whitespace-nowrap text-white">
                                            {voucher.voucherCode}
                                        </td>
                                        <td className="px-6 py-4">{voucher.expiryDate}</td>
                                        <td className="px-6 py-4">{voucher.redeemedUser}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2 px-2 text-white">
                                                <a
                                                    href="#"
                                                    onClick={() => handleEditVoucher(voucher)}
                                                    className="inline-flex justify-center items-center font-medium hover:text-blue-400 bg-blue-900/60 w-14 h-7 border border-white/20 rounded-full p-3"
                                                >
                                                    Edit
                                                </a>
                                                <a
                                                    href="#"
                                                    onClick={() => handleDelete(voucher._id)}
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
                {showVoucherForm && (
                    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-center items-start pt-20">
                        <VoucherForm
                            onClose={() => { setShowVoucherForm(false); setEditVoucher(null) }}
                            onVoucherCreated={fetchVouchers}
                            editVoucher={editVoucher} />
                    </div>
                )}


            </div>


        </>
    )





}

export default VoucherDashBoard;