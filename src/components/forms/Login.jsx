import Logo from "../footer/Logo";
import { useForm } from "react-hook-form";
import Input from "../utility/Input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../state-management/authSlice";
import authService from "../../appwrite-services/AuthenticationService";
import { useNavigate } from "react-router-dom";
import Button from "../utility/Button";

function Login(){

    const {register, handleSubmit} = useForm();
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async(formData) => {
        setError('');
        try {
            const session = await authService.logIn(formData.email, formData.password);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData){
                    dispatch(login(userData))
                    navigate('/')
                }
            }
        } catch (error) {
            setError(error.message)
        }
    } 

    return(
        <div className="w-full h-">
            {/* Logo */}
            <div>
                <Logo></Logo>
            </div>

            {/* Errors */}
            <div>
                {error && <div className="text-red-500">{error}</div>}
            </div>

            {/* form */}
            <form onSubmit={handleSubmit(handleLogin)}>
                <div>
                    <Input
                        label='Email ID'
                        placeholder='janedoe@gmail.com'
                        {...register('email',{
                            required: true,
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                        })}
                    />
                    <Input
                        label='Password'
                        type='password'
                        {...register('password',{
                            required: true
                        })}
                    />
                    <Button type='submit'>Submit</Button>
                </div>
            </form>

            {/* not a user?Sign up. */}
            <div>
                Don't have an account?
                <Link to='/signup'>SignUp</Link>
            </div>
        </div>
    )
}

export default Login;