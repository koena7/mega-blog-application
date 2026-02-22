import { useNavigate, Link } from 'react-router-dom';
import { Button, Container, Logo, LogoutBtn } from '../index'
import { useSelector } from 'react-redux';

function Header() {
    const isLoggedIn = useSelector((state) => state.auth.loggedIn)
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
            name: 'allBlogs',
            path: '/allBlogs',
            active: isLoggedIn
        },
        {
            name: 'myBlogs',
            path: '/myBlogs',
            active: isLoggedIn
        },
        {
            name: 'addBlog',
            path: '/addBlog',
            active: isLoggedIn
        }
    ]

    return(
        <header>
            <Container>
                <nav className='flex flex-row justify-between'>
                    <div>
                        <Link to='/'><Logo/></Link>
                    </div>
                    <div className='flex flex-row'>
                        <ul className='flex flex-row'>
                            {navItems.map((navItem) => {
                                return navItem.active ? (
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