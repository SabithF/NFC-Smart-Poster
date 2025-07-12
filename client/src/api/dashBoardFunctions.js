import React from "react";

const fetchPosters = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/all-posters`);
                setPosters(res.data);

            } catch (error) {
                 console.error("Failed to fetch posters", error);
                
            }
        }
