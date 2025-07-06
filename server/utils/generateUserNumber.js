import User from '../models/user.js';

export const generateUserNumber = async () => {
   
    let number;
    let exists = true;
    while (exists){
        number = Math.floor(1000* Math.random() * 9000);
        exists = await User.exists({userUniqueId: number})
    }
    return number;
}