import { useState } from 'react';
import { Logo, Button, Input } from '../index'
import { useForm } from 'react-hook-form';
import authService from '../../appwrite-services/AuthenticationService';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';

function SignUp() {

    const [error, setError] = useState('');
    const {handleSubmit, register} = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignUp = () => {
        setError('')
        try {
            const session = authService.signUp();
            if(session){
                const userData = authService.getCurrentUser();
                if(userData){
                    dispatch(login(userData));
                    navigate('/');
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return(
        <div className="w-full">
            <div>
                <Logo/>
            </div>

            <div>
                {error && <div className='text-red-500'>{error}</div>}
            </div>

            <form onSubmit={handleSubmit(handleSignUp)}>
                <div>
                    <Input
                        placeholder='Jane Doe'
                        label='Name'
                        {...register('name', {
                            required: true
                        })}
                    />
                    <Input 
                        placeholder='janedoe@gmail.com' 
                        label='Email ID'
                        {...register('email', {
                            required: true,
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                        })}
                    />
                    <Input
                        label='Password'
                        type='password'
                        {...register('password', {
                            required: true
                        })}
                    />
                    <Button type='submit'>Submit</Button>
                </div>
            </form>

            <div>Already have an account? 
                <Link to='/login'>Login.</Link> 
            </div>
        </div>
    )
}

export default SignUp;