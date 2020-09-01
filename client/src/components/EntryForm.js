import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { createEntry } from '../api/API'

import './EntryForm.css'

const EntryForm = ({ addEntryLocation, onClose }) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const { register, handleSubmit } = useForm()

    const onSubmit = async(data) => {
        try {
            setLoading(true)
            data.latitude = addEntryLocation.latitude
            data.longitude = addEntryLocation.longitude
            await createEntry(data);
            onClose()
        } catch (error) {
            console.log(error)
            setError(error.message)
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='entryForm'>
            { error && <h3 className='entryForm__error'>{error}</h3>}
           <label htmlFor='apiKey'>PASSWORD KEY:*</label>
            <input name='apiKey' type='password' required ref={register}/> 
            <label htmlFor='title'>Title:*</label>
            <input name='title' required ref={register}/>
            <label>Description:</label>
            <textarea name='description' rows={3} ref={register}></textarea>
            <label>Image:</label>
            <input name='image' placeholder='add url of the photo' ref={register}/>
            <label htmlFor='rating'>Rating:</label><small>*enter the value between 0 to 10</small>
            <input name='rating' ref={register}/>
            <label htmlFor='visitDate'>Vist Date:*</label>
            <input name='visitDate' type='date' required ref={register}/>
            <button disabled={loading}>{loading ? 'Loading...' : 'Add your Place'}</button>
        </form>
        

    )
}

export default EntryForm
