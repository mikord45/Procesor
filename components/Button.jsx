const Button = ({ order, dst, src, onClick }) => {
    return (
        <button className="btn" order={order} dst={dst} src={src} onClick={(event)=>onClick(event)}>
            {`${order} ${dst}, ${src}`}
        </button>
    );
}

export default Button;
