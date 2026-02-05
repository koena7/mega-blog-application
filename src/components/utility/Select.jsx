import { forwardRef, useId } from "react"


function Select({options=[],label,...props}, ref) {

    const id = useId();

    return(
        <div>
            {label && <label>{label}</label>}
            <select
                id={id}
                {...props}
                ref={ref}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default forwardRef(Select);