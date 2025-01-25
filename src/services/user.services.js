export const userFirstService = async (args) => {
    console.log("Reached Service layer")
    console.log("Doing some database work")
    const someDataFromDatabase = "MY DATA";
    return someDataFromDatabase;
}

export const loginUserService = async (loginData) => {
    const email = loginData.email;
    const password = loginData.password
    if(email =="pranisha@gmail.com" && password=="1234"){
        return {"message": "Login successful"}
    }
    else{
        return {"message": "Login unsuccessful"}
    }
}

const usersDataList = [
    {   username:"pranisha",  email: "pranisha@gmail.com"},
    {   username: "ram",      email: "ram123@gmail.com"} ,
    {   username: 'prakash',  email: "sprakash@gmail.com"}
]
export const allUserService = async () => {
    return usersDataList;
}