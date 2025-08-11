import axios from "axios"

export const unsubscribeMail = async() =>{
    const res = await axios.post("/questions/unsubscribe")
    return res.data
}