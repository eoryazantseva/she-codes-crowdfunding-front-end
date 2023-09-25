import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import postPledge from '../../api/post-pledge'

function CreatePledge(props) {

    const navigate = useNavigate()

    const [isLoading, setIsLoading] = useState(false)

    const [pledgeData, setPledgeData] = useState({
        project: props.projectId,
        amount: 0,
        comment: '',
        anonymous: false
    })

    const handleChange = (e) => {
        setPledgeData({
        ...pledgeData, 
        [e.target.id]: e.target.value
        })
    }

    const handleChecked = (e) => {
        setPledgeData({
        ...pledgeData,
        [e.target.id]: e.target.checked
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)

    postPledge(pledgeData)
        .then(() => {
            navigate(0)
        })
        .catch(() => {
            setIsLoading(false)
        })
    }

    if(isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit}>
            <div>
                <label className='form-label' htmlFor="amount">Amount</label>
                <input 
                type="text" 
                id="amount" 
                placeholder='$' 
                onChange={handleChange} 
                className='form-input'
                />
            </div>
            <div>
                <label className='form-label' htmlFor="comment">Comment</label>
                <textarea 
                type="text" 
                id="comment" 
                placeholder='Enter a comment' 
                onChange={handleChange} 
                className='form-input'
                />
            </div>
            <div>
                <label className='form-label' htmlFor='anonymous'>Anonymous Pledge</label>
                <input
                type='checkbox'
                id='anonymous'
                onChange={handleChecked}
                className='form-input'
                />
            </div>
            <input className='submit-button' type="submit" value="Contribute" />
            </form>
        </div>
    )
    }

export default CreatePledge