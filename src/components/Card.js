import {React,useRef,useState,useEffect} from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
import './Card.css'
import { useNavigate } from 'react-router-dom';
export default function Card(props) {
  const navigate=useNavigate();
    const dispatch = useDispatchCart();
    let data = useCart();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const priceRef = useRef();
    const [qty, setQty] = useState(1)
    const [size, setSize] = useState("")
    const handleComment = async() =>{
      navigate("/mycomment")
    }
    const handleAddToCart = async () => {
      if(!sessionStorage.getItem("userEmail")){
        alert("Login to Select Food Items");
      }
      else{
        let food = []
        for (const it of data) {
          if (it.id === props.item._id) {
            food = it;
    
            break;
          }
        }
        console.log(food)
        console.log(new Date())
        if (food !== []) {
          if (food.size === size) {
            await dispatch({ type: "UPDATE", id: props.item._id, price: finalPrice, qty: qty })
            return
          }
          else if (food.size !== size) {
            await dispatch({ type: "ADD", id: props.item._id, name: props.item.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
            console.log("Size different so simply ADD one more to the list")
            return
          }
          return
        }
    
        await dispatch({ type: "ADD", id: props.item._id, name: props.item.name, price: finalPrice, qty: qty, size: size })
      }
    }
    //  console.log(data)
    const handleQty = (e) => {
        setQty(e.target.value);
      }
      const handleOptions = (e) => {
        setSize(e.target.value);
      }
      useEffect(() => {
        setSize(priceRef.current.value)
      }, [])
      let finalPrice = qty * parseInt(options[size]); 
    
    return (
        <div>
            <div>
                <div className="card mt-3 sm-3 resp " style={{ "width": "18rem", "maxHeight": "375px"}}>
                    <img src={props.ImgSrc} className="card-img-top" alt="..." style={{"height":"170px", "objectFit":"fill"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{props.foodName}</h5>
                        <div className='container w-100 p-0'>
                            <select className='m-2 h-100 bg-success rounded' style={{ select: '##FF0000' }} onChange={handleQty} >
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1} >{i + 1}</option>
                                    )
                                })}
                            </select>

                            <select className='m-2 h-100 w-20 text-black bg-success rounded' ref={priceRef} style={{ select: 'lightgreen' }} onChange={handleOptions}>
                                {priceOptions.map((i) => {
                                    return <option key={i} value={i}>{i}</option>
                                })}
                            </select>
                            <div className='d-inline h-100 fs-5'>  ₹{finalPrice}/-</div>
                        {/* <button className={`justify-center mb-n2 fs-5 text-success`} style={{"textDecorationLine":"none"}} onClick={handleComment}> Leave a comment.</button> */}
                        </div>
                        
                        <hr>
                        </hr>
                        <div className='me-1 mt-n2' style={{"marginTop":"-0.50rem !important"}}> 

                        <button className={`btn btn-success justify-center fw-bold`} onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}
