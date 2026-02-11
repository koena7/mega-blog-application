import { useNavigate, Link } from 'react-router-dom';
import { Button, Container, Logo, LogoutBtn } from '../index'
import { useSelector } from 'react-redux';

function Header() {
    const isLoggedIn = useSelector((state) => state.loggedIn)
    const navigate = useNavigate();

    const navItems = [
        {
            name: 'home',
            path: '/',
            active: true
        },
        {
            name: 'login',
            path: '/login',
            active: !isLoggedIn
        },
        {
            name: 'signup',
            path: '/signup',
            active: !isLoggedIn
        },
        {
            name: 'allPosts',
            path: '/allPosts',
            active: isLoggedIn
        },
        {
            name: 'myPosts',
            path: '/myPosts',
            active: isLoggedIn
        },
        {
            name: 'addPosts',
            path: '/addPosts',
            active: isLoggedIn
        }
    ]

    return(
        <header>
            <Container>
                <nav>
                    <div>
                        <Link to='/'><Logo/></Link>
                    </div>
                    <div>
                        <ul>
                            {navItems.map((navItem) => {
                                navItem.active ? (
                                    <li key = {navItem.name}>
                                        <Button 
                                            onClick={() => {
                                                navigate(navItem.path)
                                            }}
                                        >
                                            {navItem.name}
                                        </Button>
                                    </li>
                                ) : (null)
                            })}
                            {
                                isLoggedIn && (
                                    <li>
                                        <LogoutBtn/>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </nav>
            </Container>
        </header>
    )
}

export default Header;