import axios from 'axios'

export function registerUser(newUserDetails){
    let apiUrl = '/api/admin/signup'
    
    return axios.post(apiUrl,newUserDetails,{
        // headers:{
        //     'Content-Type': 'application/json',
        //     "Access-Control-Allow-Origin": "*",
        //     "Access-Control-Allow-Credentials":"true"
        // }

        headers: {
            'Content-Type': 'application/json'
        }
    })
}
