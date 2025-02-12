import { prisma } from "../db/index.js";
import { generateJwtToken } from "../libs/jwt_utility.js";
import { checkpassword, generateHashForPassword } from "../libs/password_utility.js";


export const userFirstService = async (args) => {
    console.log("Reached Service layer")
    console.log("Doing some database work")
    const someDataFromDatabase = "MY DATA";
    return someDataFromDatabase;
}

export const loginUserService = async (loginData) => {
    const email = loginData.email;
    const password = loginData.password

    const user= await prisma.user.findUnique({where:{email:email}})
    if(!user){
        throw new Error("Invalid credentials",{cause: "CustomError"})
    }

    const isPasswordSame = await checkpassword(password,user.password);
    if(!isPasswordSame){
        throw new Error("Invalid credentials",{cause: "CustomError"})  
    }
    const token = generateJwtToken(user.id)
    delete user.password
    return{message: "Login succesful",user,token}
    
}


export const  allUserService = async() => {
   const allUsers = await prisma.user.findMany({omit: {password:true}})
   return allUsers;
}
allUserService()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })


export const getRegisterService = async(registerData) =>{
    const hashedPassword = await generateHashForPassword(registerData.password)
    const res = await prisma.user.create({
        data:{
            fullName: registerData.fullName,
            email: registerData.email,
            password: hashedPassword,
            gender: registerData.gender,
        },
        omit:{
            password:true
        } 
    })
    const token = generateJwtToken(res.id)
    return {user:res,token}
}

export const userProfileService = async (userId) =>{
    const user = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        omit: {password: true},
    })
    return user
}