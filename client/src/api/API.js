// const API_URL = "http://localhost:2000"

export const listEntries = async() => {
    const response = await fetch ('https://maper1.herokuapp.com/api/entry')
    return response.json()
}

export const createEntry = async(entry) => {
    const password = entry.apiKey
    delete entry.apiKey
    const response = await fetch ('https://maper1.herokuapp.com/api/entry',{
        method: "POST",
        headers: {
            'content-type': 'application/json',
            'X-PASSWORD': password,
        },
        body: JSON.stringify(entry)
    })
    const json = await response.json()
    if(response.ok){
        console.log(json)
        return json
    }
    console.log(json)
    const error =  new Error (json.message)
    error.response = json
    throw error 
}

export const deleteEntry = async(id) => {
    const response = await fetch('https://maper1.herokuapp.com/api/entry/remove/' + id, {
        method: "DELETE",
        headers: {
            'content-type': 'application/json'
        },
    })
    return response.json()
}

export const updateEntry = async(id, data) => {
    console.log(data)
    const password = data.apiKey
    delete data.apiKey
    const response = await fetch('https://maper1.herokuapp.com/api/entry/update/' + id, {
        method: "PUT",
        headers: {
            'content-type': 'application/json',
            "X-PASSWORD" : password
        },
        body: JSON.stringify(data)
    })
    const json = await response.json()
    if(response.ok){
        return json
    }
    const error = new Error(json.message)
    error.response = json
    console.log(error)
    throw error 
}