import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { updateEntry } from '../api/API'

import './UpdateEntry.css'

const UpdateEntry = ({ entry, id, setFlag, setShowButton, onClose }) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState()
    const { register, handleSubmit } = useForm()

    const onSubmit = async(data) => {

        try {
            console.log(data)
            setLoading(true)
            const updatedEntry = await updateEntry(id, data);
            console.log(updatedEntry)
            onClose()
            setShowButton(false)
            setFlag(false)
        } catch (error) {
            console.log(error)
            setError(error.message)
            setLoading(false)
        }
    }


    return (
        <div className= 'updateEntry'>
            <form onSubmit={handleSubmit(onSubmit)} className='updateEntry__form'>
                <h3>{entry.title}</h3>
                <div className='updateEntry__info'>
                    { error && <h3 className="updateEntry__error">{error}</h3>}
                    <label htmlFor='apiKey'>PASSWORD KEY:*</label>
                    <input name='apiKey' type='password'className='updateEntry__apikey' required ref={register}/> 
                    <label htmlFor='sdescription'>Description:</label>
                    <textarea name='description' placeholder={`${entry.description}`} rows={3} ref={register} ></textarea>
                    <label htmlFor='image'>Image:</label>
                    <input name='image' placeholder='add url of the photo' ref={register}/>
                    <div className='updateEntry__rating'>
                        <label htmlFor='rating'>Rating:</label>
                        <input name='rating' type='number' placeholder={`${entry.rating}`} ref={register}/><small>*enter the value between 0 to 10</small>
                    </div>
                    <div className='updateEntry__date'>
                        <label htmlFor='visitDate'>Visit Date:</label>
                        <input  name='visitDate' type='date' ref={register}/>
                    </div>
                </div>
                <div className='updateEntry__button'>
                    <button disabled={loading} >{loading ? 'Loading...' : 'Save'}</button>
                    <button onClick={() =>(setFlag(false), setShowButton(false))}> Cancel</button>
                </div>
            </form>
        </div>     
    )
}

export default UpdateEntry
