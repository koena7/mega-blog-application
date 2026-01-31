
function Button({
    children,
    bgColor='bg-pink-400',
    textColor='text-white',
    className='',
    onClick=()=>{},
    ...props
}){
    return(
        <button 
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
            onClick={onClick}
            >
            {children}
        </button>
    )
}

export default Button;