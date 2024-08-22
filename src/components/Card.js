import React, { useRef, useState, useEffect } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';
import './Card.css';

export default function Card(props) {
    const dispatch = useDispatchCart();
    let data = useCart();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const priceRef = useRef();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddToCart = async () => {
        if (!sessionStorage.getItem("userEmail")) {
            alert("Login to Select Food Items");
        } else {
            let food = [];
            for (const it of data) {
                if (it.id === props.item._id) {
                    food = it;
                    break;
                }
            }

            if (food.size === size) {
                await dispatch({ type: "UPDATE", id: props.item._id, price: finalPrice, qty: qty });
            } else if (food.size !== size) {
                await dispatch({ type: "ADD", id: props.item._id, name: props.item.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
            }
        }
    };

    const handleQty = (e) => {
        setQty(e.target.value);
    };

    const handleOptions = (e) => {
        setSize(e.target.value);
    };

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    let finalPrice = qty * parseInt(options[size]);

    return (
        <div>
            <div className="card mt-5 sm-3 resp"
                style={{
                    width: "18rem",
                    maxHeight: "375px",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            >
                <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "170px", objectFit: "fill", borderRadius: "10px 10px 0 0" }} />
                <div className="card-body">
                    <h5 className="card-title">{props.foodName}</h5>
                    <div className='container w-100 p-0'>
                        <select className='m-2 h-100 bg-success rounded' onChange={handleQty}>
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                );
                            })}
                        </select>

                        <select className='m-2 h-100 w-20 text-black bg-success rounded' ref={priceRef} onChange={handleOptions}>
                            {priceOptions.map((i) => {
                                return <option key={i} value={i}>{i}</option>
                            })}
                        </select>
                        <div className='d-inline h-100 fs-5'>  ₹{finalPrice}/-</div>
                        <button className="justify-center mb-n2 fs-5 text-success" style={{ textDecorationLine: "none" }} onClick={handleAddToCart}> Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
