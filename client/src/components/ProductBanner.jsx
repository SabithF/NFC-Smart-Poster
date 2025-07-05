import React from "react";

export function ProductBanner(  ) {
    return (
        <section className="mb-8">
            <div className="grid md:grid-cols-2 gap-4 bg-gray-800/30 backdrop-blur-lg rounded-xl p-6 shadow-2xl border border-cyan-500/20 hover:shadow-cyan-500/50 transition-shadow duration-300">
                <div className="relative group ">
                        <img src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" alt=""
                            className="w-fll h-48 object-cover rounded-2xl shadow-2xl transittion-transform duration-500 group-hover:scale-105"
                        
                        />
                        <div className="absolute bottom-4 left-4 text-black">
                            <h3 className="text-lg font-bold">Product Title</h3>
                            <p className="text-sm">Product Description</p>
                        </div>
                </div>
            </div>

        </section>
    )

}