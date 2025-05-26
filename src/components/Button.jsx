

function Button({children , classVal , onClickHandler}) {
    return (
        <>
            <button onClick={onClickHandler} className={classVal}>{children}</button>
        </>
    )
}

export default Button
