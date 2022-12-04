import { Formik, Field, ErrorMessage } from 'formik';
import { Form, Button, Input, Select, Card, InputNumber, message } from 'antd';
import { useLocation, Link, navigate, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import KoolContainer from "../KoolContainer/KoolContainer";
import { Typography } from "@material-tailwind/react";
import { useUserAuth } from '../authentication/UserAuthContext';
import moment from 'moment';
import axios from 'axios';

const Checkout = () => {
    const { user } = useUserAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [paid, setPaid] = useState(false);
    const [paymentResponse, setPaymentResponse] = useState(null);

    const [guestUser, setGuestUser] = useState({
        name: '',
        email: '',
        cardnumber: '',
        expirationdate: '',
        cvv: '',
    });

    const showFormGuest = () => {
        return (
            <Form onFinish={handleSubmitGuest}>
                <Typography color="blue-gray" size="4xl" style={{ textAlign: "center", fontSize: 36, fontWeight: "700", textShadow: "2px 2px 4px #000000" }}>Checkout</Typography>
                <Typography
                    color="blue-gray"
                    size="2xl" style={{
                        textAlign: "center",
                        fontSize: 24,
                        fontWeight: "700",
                        textShadow: "2px 2px 4px #000000"
                    }}
                >
                    Personal Information
                </Typography>

                <Form.Item style={{ textAlign: "left", paddingLeft: 25, paddingRight: 25 }}>
                    <label htmlFor="name">Name:</label>
                    <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={guestUser.name}
                        onChange={(e) => setGuestUser({ ...guestUser, name: e.target.value })}
                        required
                    />
                </Form.Item>
                <Form.Item style={{ textAlign: "left", paddingLeft: 25, paddingRight: 25 }}>
                    <label htmlFor="email">Email:</label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={guestUser.email}
                        onChange={(e) => setGuestUser({ ...guestUser, email: e.target.value })}
                        required
                    />
                </Form.Item>
                <Typography color="blue-gray" size="2xl" style={{ textAlign: "left", paddingLeft: 25, paddingBottom: 10, fontSize: 24, fontWeight: "700", textShadow: "2px 2px 4px #000000" }}>Payment Information</Typography>
                <Form.Item style={{ textAlign: "left", paddingLeft: 25, paddingRight: 25 }}>
                    <label htmlFor="cardnumber">Card Number:</label>
                    <Input
                        id="cardnumber"
                        name="cardnumber"
                        type="text"
                        placeholder="Card Number"
                        value={guestUser.cardnumber}
                        onChange={(e) => setGuestUser({ ...guestUser, cardnumber: e.target.value })}
                        required
                    />
                </Form.Item>
                <Form.Item style={{ textAlign: "left", paddingLeft: 25, paddingRight: 25 }}>
                    <label htmlFor="expirationdate">Expiration Date:</label>
                    <Input
                        id="expirationdate"
                        name="expirationdate"
                        type="text"
                        placeholder="Expiration Date"
                        value={guestUser.expirationdate}
                        onChange={(e) => setGuestUser({ ...guestUser, expirationdate: e.target.value })}
                        required
                    />
                </Form.Item>
                <Form.Item style={{ textAlign: "left", paddingLeft: 25, paddingRight: 25 }}>
                    <label htmlFor="cvv">CVC:</label>
                    <Input
                        id="cvc"
                        name="cvc"
                        type="text"
                        placeholder="CVC"
                        value={guestUser.cvv}
                        onChange={(e) => setGuestUser({ ...guestUser, cvv: e.target.value })}
                        required
                    />

                </Form.Item>
                <Form.Item style={{ textAlign: "center", paddingLeft: 25, paddingRight: 25 }}>
                    <Button type="default" htmlType="submit" style={{ marginRight: 10 }}>
                        Purchase
                    </Button>
                    <Button type="default" htmlType="submit" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        );
    }


    const showFormRegistered = () => {
        return (
            <Form onFinish={handleSubmitRegisteredUser}>
                <Typography color="blue-gray" size="4xl" style={{ textAlign: "center", fontSize: 36, fontWeight: "700", textShadow: "2px 2px 4px #000000" }}>Checkout</Typography>
                <Typography
                     color="blue-gray"
                    size="2xl" style={{
                        textAlign: "center",
                        fontSize: 24,
                        fontWeight: "700",
                        textShadow: "2px 2px 4px #000000"
                    }}
                >
                    Personal Information
                </Typography>
                <br />
                <Typography
                     color="blue-gray"
                    size="xl" style={{
                        textAlign: "left",
                        fontSize: 16,
                        fontWeight: "700",
                        textShadow: "2px 2px 4px #000000"
                    }}
                >
                    Using saved information from profile
                </Typography>
                <Typography
                     color="blue-gray"
                    size="xl" style={{
                        textAlign: "left",
                        paddingleft: 25,
                        fontSize: 16,
                        textShadow: "2px 2px 4px #000000"
                    }}
                >
                    Name - {user.fullname}
                    <br />
                    Email - {user.email}
                    <br />
                    <br />
                    Credit Card - ending in {user.creditcardnumber.slice(-4)}
                    <br />
                    Expiry Date - {user.expirydate}
                </Typography>
                <br />
                <Form.Item style={{ textAlign: "center", paddingLeft: 25, paddingRight: 25 }}>
                    <Button type="default" htmlType="submit" style={{ marginRight: 10 }}>
                        Purchase
                    </Button>
                    <Button type="default" htmlType="submit" onClick={handleCancel}>
                        Cancel
                    </Button>
                </Form.Item>
            </Form>
        );
    }

    const handleSubmitGuest = (e) => {
        console.log("guest checkout");
        axios.post("http://localhost:3001/server/endpoints/post/checkout.php", {
            isGuestCheckout: 1,
            user_email: guestUser.email,
            card_number: guestUser.cardnumber,
            expiry_date: guestUser.expirationdate,
            cvc: guestUser.cvv,
            payment_amount: location.state.seats_ids.length * 10,
            seats_ids: location.state.seats_ids,
            seats_number: location.state.seats_number
        }).then((response) => {
            if (response.data.status === 200) {
                setPaid(true);
                setPaymentResponse(response.data.body);
            }
            console.log(response);
        });
    };

    const handleSubmitRegisteredUser = (e) => {
        console.log("registered user checkout");
        axios.post("http://localhost:3001/server/endpoints/post/checkout.php", {
            isGuestCheckout: 0,
            user_email: user.email,
            card_number: user.creditcardnumber,
            expiry_date: user.expirydate,
            cvc: user.cvc,
            payment_amount: location.state.seats_ids.length * 10,
            seats_ids: location.state.seats_ids,
            seats_number: location.state.seats_number
        }).then((response) => {
            if (response.data.status === 200) {
                setPaid(true);
                setPaymentResponse(response.data.body);
            }
            console.log(response);
        });
    };

    const handleCancel = (e) => {
        e.preventDefault();
        navigate("/");
    }

    useEffect(() => {
        console.log(location);
    }, [location])


    return (
        <KoolContainer>
            <div className='grid grid-cols-12 space-y-8'>
                <div className='grid col-span-1'></div>
                <div className='grid col-span-5'>
                    <div className='w-full h-full grid grid-cols-5 mt-2 space-x-20'>
                        <div className='grid col-span-2'>
                            <img src={location.state.movie_image} alt="Movie Poster" className='h-5/12' />
                            <div>{location.state.movie_name}</div>
                            <div>{location.state.theatre_name}</div>
                            <div>{location.state.show_date}</div>
                            <div>At {moment(location.state.show_start, [moment.ISO_8601, 'HH:mm:ss']).format('LT')}</div>
                        </div>
                        <div className='grid col-span-1 bg-white rounded-xl w-1/12'></div>
                        <div className='grid col-span-2 w-4/5'>
                            <div>
                                <div className="flex flex-col space-y-3 h-3/4">
                                    {location.state.seats_number.map((seat, index) => (
                                        <div key={index} className='grid grid-cols-5'>
                                            <div className='grid col-span-3 border border-block rounded-xl w-full m-auto'>
                                                <p>{seat}</p>
                                            </div>
                                            <div className='grid col-span-1'></div>
                                            <div className='grid col-span-1  rounded-xl w-full m-auto'>
                                                <p>$10</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className='grid h-1/4'>
                                    <div>
                                        <div>{location.state.seats_ids.length} x General Admission</div>
                                        <div>Total cost: ${location.state.seats_ids.length * 10} CAD </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
                <div className='grid col-span-1'></div>
                <div className='grid col-span-4'>
                    {paid ?
                        <div>
                            <Typography
                             color="blue-gray"
                                size="2xl" style={{
                                    textAlign: "center",
                                    fontSize: 24,
                                    fontWeight: "700",
                                    textShadow: "2px 2px 4px #000000"
                                }}
                            >
                                Payment Received
                            </Typography>
                            <p>We have recieved your payment succesfully. Please check your email for a copy of your tickets. Your Order ID is: {paymentResponse.lastinsertId}</p>
                            <p>Thank you for using KoolTickets!</p>
                            <h4 className='mt-36'>Cancellation Policy:</h4>
                            <p>You may cancel your ticket 72 hours before the showtime.</p>
                            <p className='text-red-500'>Please note a 15% cancellation will apply if you are not a registered user. Consider signing up today!</p>
                        </div>
                        : user ? showFormRegistered()
                            : showFormGuest()}
                </div>
                <div className='grid col-span-1'></div>
            </div>

        </KoolContainer>
    );
};

export default Checkout;