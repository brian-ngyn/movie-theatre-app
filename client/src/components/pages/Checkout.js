import { Formik, Field, ErrorMessage } from 'formik';
import { Form, Button, Input, Select, Card, InputNumber, message } from 'antd';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";
import KoolContainer from "../KoolContainer/KoolContainer";
import { Typography } from "@material-tailwind/react";
import { useUserAuth } from '../authentication/UserAuthContext';
import moment from 'moment';



const Checkout = () => {
    const { user } = useUserAuth();
    const location = useLocation();

    const [guestUser, setGuestUser] = useState({
        name: '',
        email: '',
        cardnumber: '',
        expirationdate: '',
        cvv: '',
    });

    const handleSubmitGuest = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget); // this is the form data
        console.log({
            name: data.get('name'),
            email: data.get('email'),
            cardnumber: data.get('cardnumber'),
            expirationdate: data.get('expirationdate'),
            cvv: data.get('cvv'),
        });

        // redirect to the another page is yet to made, just send to home page for now
        window.location.href = '/';
        // show a success message
        message.success('Thank you for your purchase!').then(r => console.log(r));

    };

    const handleSubmitRegisteredUser = (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget); // this is the form data
        console.log({
            name: data.get('name'),
            email: data.get('email'),
            cardnumber: data.get('cardnumber'),
            expirationdate: data.get('expirationdate'),
            cvv: data.get('cvv'),
        });

        // redirect to the another page is yet to made, just send to home page for now
        window.location.href = '/';
        // show a success message
        message.success('Thank you for your purchase!').then(r => console.log(r));

    };

    const showFormGuest = () => {
        return (
            <Form onSubmit={handleSubmitGuest}>
                <Typography color="blue-gray" size="4xl" style={{ textAlign: "center", fontSize: 36, fontWeight: "700", textShadow: "2px 2px 4px #000000" }}>Checkout</Typography>

                <Typography

                    Typography color="blue-gray" size="2xl" style={{ textAlign: "left", paddingLeft: 25, paddingBottom: 10, fontSize: 24, fontWeight: "700", textShadow: "2px 2px 4px #000000" }}>Personal Information</Typography>
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
                    <Button type="primary" htmlType="submit" style={{ marginRight: 10 }}>
                        Submit
                    </Button>
                    <Button type="primary" htmlType="submit" onClick={handleCancel}>
                        Cancel
                    </Button>

                </Form.Item>
            </Form>
        );
    }

    const showFormRegistered = () => {
        return (<p>BIG DICK</p>);
    }

    const handleCancel = (e) => {
        e.preventDefault();
        window.location.href = '/seats';
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
                                    {location.state.seats_number.map((seat) => (
                                        <div className='grid grid-cols-5'>
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
                    {user ? showFormRegistered() : showFormGuest()}
                </div>
                <div className='grid col-span-1'></div>
            </div>

        </KoolContainer>
    );
};

export default Checkout;