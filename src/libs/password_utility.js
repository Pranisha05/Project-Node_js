import bcrypt from "bcrypt"

const saltRounds = 10

export const generateHashForPassword = async (password) =>{
    try{
        const hash = await bcrypt.hash(password,saltRounds);
        return hash
    }
    catch(error){
        console.log(error)
    }
}

export const checkpassword = async (password,hash) =>{
    return await bcrypt.compare(password,hash)
}