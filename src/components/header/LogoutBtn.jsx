import { Button } from '../index'
import authService from '../../appwrite-services/AuthenticationService';
import { useDispatch } from 'react-redux';
import { logout } from '../../state-management/authSlice';

function LogoutBtn({}) {

    const dispatch = useDispatch();

    const onButtonClick = () => {
        authService.logOut
            .then(() => dispatch(logout()))
    }

    return(
        <Button onClick={onButtonClick}>
            Log out
        </Button>
    )
}

export default LogoutBtn;