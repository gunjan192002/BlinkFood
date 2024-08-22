import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
    const navigate = useNavigate();
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);
    const [search, setSearch] = useState('');

    const handleComments = async () => {
        if (!sessionStorage.getItem("userName")) {
            alert('You need to login to post a comment');
            navigate("/login");
        } else {
            navigate("/mycomment");
        }
    };

    useEffect(() => {
        const loadFoodItems = async () => {
            let response = await fetch("https://gofood-1-jhy3.onrender.com/api/foodData", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            response = await response.json();

            setFoodItem(response[0]);
            setFoodCat(response[1]);
        };

        loadFoodItems();
    }, []);

    return (
        <div className='bg-dark' style={{ overflow: "hidden" }}>
            <div><Navbar /></div>
            <div>
                <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner" id='carousel'>
                        <div className="carousel-caption" style={{ zIndex: "9" }}>
                            <div className="d-flex justify-content-center">
                                <input
                                    className="form-control me-2 h-10 w-50 bg-white text-dark"
                                    type="search"
                                    placeholder="Search in here..."
                                    aria-label="Search"
                                    value={search}
                                    onChange={(e) => { setSearch(e.target.value) }}
                                />
                                <button className="btn text-white bg-danger" onClick={() => { setSearch('') }}>X</button>
                            </div>
                        </div>
                        <div className="carousel-item active">
                            <img src="https://images.unsplash.com/photo-1593504049359-74330189a345?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D"
                                className="d-block w-100"
                                style={{ filter: "brightness(30%)", objectFit: "cover", height: "500px" }} 
                                alt="..." 
                            />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1551782450-a2132b4ba21d?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="d-block w-100"
                                style={{ filter: "brightness(30%)", objectFit: "cover", height: "500px" }} 
                                alt="..." 
                            />
                        </div>
                        <div className="carousel-item">
                            <img src="https://images.unsplash.com/photo-1565976469782-7c92daebc42e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                className="d-block w-100"
                                style={{ filter: "brightness(30%)", objectFit: "cover", height: "500px" }} 
                                alt="..." 
                            />
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
                </div>
            </div>
            <div className='container'>
                {
                    foodCat !== []
                        ? foodCat.map((data) => {
                            return (
                                <div className='row mb-3' key={data._id}>
                                    <div className='fs-3 m-3 text-white'>
                                        {data.CategoryName}
                                    </div>
                                    <hr id="hr-success" style={{ height: "4px", backgroundImage: "-webkit-linear-gradient(left,rgb(0, 255, 137),rgb(0, 0, 0))" }} />
                                    {foodItem !== [] ? foodItem.filter(
                                        (items) => (items.CategoryName === data.CategoryName) && (items.name.toLowerCase().includes(search.toLowerCase())))
                                        .map(filterItems => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-4 text-center'>
                                                    <Card 
                                                        foodName={filterItems.name} 
                                                        item={filterItems} 
                                                        options={filterItems.options[0]} 
                                                        ImgSrc={filterItems.img} 
                                                        style={{
                                                            borderRadius: '10px',
                                                            transition: 'transform 0.3s ease',
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                                    />
                                                </div>
                                            );
                                        }) : <div className='text-white'> No Such Data </div>}
                                </div>
                            )
                        })
                        : ""}
            </div>
            <div className='container'>
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <div className="col-md-4 d-flex align-items-center text-center">
                        <button 
                            className="justify-center mb-1 fs-5 text-white mt-4 p-3" 
                            style={{
                                textDecorationLine: "none",
                                backgroundColor: "#00bcd4", 
                                border: "2px solid #00bcd4", 
                                borderRadius: "15px"
                            }} 
                            onClick={handleComments}>
                            Post a comment...
                        </button>

                        <Link to="/reviews">
                            <button 
                                className="justify-center mb-1 fs-5 text-white mt-4 p-3 ms-4" 
                                style={{
                                    textDecorationLine: "none",
                                    backgroundColor: "#00bcd4", 
                                    border: "2px solid #00bcd4", 
                                    borderRadius: "15px"
                                }}>
                                Review Comments
                            </button>
                        </Link>  
                    </div>
                </footer>
            </div>
            <div><Footer /></div>
        </div>
    );
}
