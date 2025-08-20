import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

export const BASE_URL = `${API_BASE}/posters`;
export const USER_URL = `${API_BASE}/users`;


const VoucherForm = ({ onClose, onVoucherCreated, editVoucher }) => {

    const [form, setForm] = useState({
        voucherCode: '',
        expiryDate: '',
        redeemedUsers: ''

    });

    useEffect(() => {
        if (editVoucher) {
            setForm(editVoucher);
        }
    }, [editVoucher]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editVoucher) {
                await axios.put(`${BASE_URL}/update-voucher/${editVoucher._id}`, form)
                alert("Voucher updated successfully");
            } else {
                await axios.post(`${BASE_URL}/create-voucher`, form);
                alert("Voucher created successfully!");

            }
            setForm({
                voucherCode: '',
                expiryDate: '',

            });
            onVoucherCreated()
            onClose();

        } catch (error) {
            alert("Failed to create voucher");
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

                <h2 className="text-2xl font-bold mb-6 text-white text-center">
                    {editVoucher ? "Update voucher" : "Create New Vouhcer"}
                </h2>


                <form onSubmit={handleSubmit} className='overflow-auto'>
                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium text-white">Voucher Code</label>
                        <input
                            type="text"
                            name="voucherCode"
                            value={form.voucherCode}
                            onChange={handleChange}
                            required
                            className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 text-sm font-medium text-white">Expiry Date</label>
                        <input
                            type="text"
                            name="expiryDate"
                            value={form.expiryDate}
                            onChange={handleChange}
                            required
                            className="w-full p-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 rounded-lg"
                    >
                        {editVoucher ? "Update voucher" : "Create voucher"}

                    </button>
                </form>
            </div>
        </div>

    );
};

export default VoucherForm;