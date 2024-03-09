import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Carousel from '../components/Carousel'
import axios from 'axios';
export default function Home() {
    const navigate = useNavigate();
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [search, setSearch] = useState('')

    //     const loadData = async()=>{
    //         const headers = {
    //             "Content-Type": "application/json",
    //             // Authorization: apiKey,
    //           };
    //         await axios.post('http://localhost:5000/api/foodData').then(res=>{

    //         //   alert("Invalid");
    //         // setFoodCat(res.data[1]);
    //         const response =  res.data[0];
    //             setFoodCat(response);
    //         // let response =  res.data;
    //         // setFoodCat(res.data[0]);
    //         console.log(response);

    //         //   setFoodItem(res.data[0]);
    //         //   console.log(foodItem);
    //     })
    //     .catch(function(error) {
    //         // console.log(error);
    //     });
    //     //   console.log(res[0]);
    //     console.log(foodCat);

    //         // console.log(res.data[0]);
    //     }

    //     useEffect(()=>{
    //         loadData();
    //     //  axios.post('http://localhost:5000/api/foodData').then(res=>{

    //     //     //   alert("Invalid");
    //     //     // setFoodCat(res.data);
    //     //     const response =  res.data[0];
    //     //     setFoodCat(response);
    //     //     // console.log(res.data[1]);

    //     //     //   setFoodItem(res.data[0]);
    //     //     //   console.log(response);
    // },[]);
    // // console.log(foodCat);





    const loadFoodItems = async () => {
        let response = await fetch("http://localhost:5000/api/foodData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        });
        response = await response.json()
        // console.log(response[1][0].CategoryName)
        setFoodItem(response[0])
        setFoodCat(response[1])
        console.log(foodCat);
    

    }

    const handleComments = async() =>{
        if(!sessionStorage.getItem("userName")){
              alert('You need to login to post a comment')
              navigate("/login")
          }else{
            
          
        navigate("/mycomment")
          }
      }
    useEffect(() => {
        loadFoodItems();
        // sessionStorage.removeItem("userEmail");
        // console.log(sessionStorage.getItem("userName"));
    }, [])






    return (
        <div className='bg-dark' style={{"overflow":"hidden"}}>
            <div><Navbar /></div>
            <div> 
                <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel">

                <div className="carousel-inner " id='carousel'>
                    <div className=" carousel-caption  " style={{ zIndex: "9" }}>
                        <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
                            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Search in here..." aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                            <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
                        </div>
                    </div>
                    <div className="carousel-item active" >
                        <img src="https://source.unsplash.com/random/900x700/?burger" className="d-block w-100  " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?pastry" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900x700/?barbeque" className="d-block w-100 " style={{ filter: "brightness(30%)" }} alt="..." />
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div></div>
             <div className='container'>
              {
                    foodCat != []
                        ? foodCat.map((data) => {
                            return (
                                // justify-content-center
                                <div className='row mb-3'>
                                    <div key={data._id}  className='fs-3 m-3 text-white'>
                                        {data.CategoryName}
                                    </div>
                                    <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                                    {foodItem != [] ? foodItem.filter(
                                        (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-4 text-center'>
                                                    {console.log(filterItems.url)}
                                                    <Card foodName={filterItems.name} item={filterItems} options={filterItems.options[0]} ImgSrc={filterItems.img} ></Card>
                                                </div>
                                            )
                                        }) : <div className='text-white'> No Such Data </div>}
                                </div>
                            )
                        })
                    : ""}
            </div> 
            <div>
            <div className='container'>
     <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
    <div className="col-md-4 d-flex align-items-center text-center " >
  
  <button className={`justify-center mb-1 fs-5 text-white mt-4 p-3`} style={{"textDecorationLine":"none","backgroundColor":"#00bcd4" , "border":"2px solid #00bcd4", "borderRadius":"15px"}} onClick={handleComments}> Post a comment...</button>

  <Link to="/reviews">
  <button className={`justify-center mb-1 fs-5 text-white mt-4 p-3 ms-4`} style={{"textDecorationLine":"none","backgroundColor":"#00bcd4" , "border":"2px solid #00bcd4", "borderRadius":"15px"}}> Review Comments</button>
  </Link>  
    </div>
  </footer>
    </div>
            </div>
            <div><Footer /></div>
        </div>
    )
}
