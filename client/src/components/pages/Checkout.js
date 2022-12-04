import {Formik,Field, ErrorMessage} from 'formik';
import {Form, Button, Input, Select, Card, InputNumber, message} from 'antd';
import {useState} from "react";
import KoolContainer from "../KoolContainer/KoolContainer";
import {Typography} from "@material-tailwind/react";
import { useUserAuth } from '../authentication/UserAuthContext';



const Checkout = () => {
    const { user } = useUserAuth();
    const [guestUser, setGuestUser] = useState({
        name: '',
        email: '',
        cardnumber: '',
        expirationdate: '',
        cvv: '',
    });

    const handleSubmit = (e) => {
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
            <Form onSubmit={handleSubmit}>
                <Typography color="blue-gray" size="4xl" style={{textAlign: "center",fontSize: 36, fontWeight: "700", textShadow: "2px 2px 4px #000000", padding:20 }}>Checkout</Typography>

                <Typography

                    Typography color="blue-gray" size="2xl" style={{textAlign: "left" ,paddingLeft: 25, paddingBottom:10 ,fontSize: 24, fontWeight: "700", textShadow: "2px 2px 4px #000000"}}>Personal Information</Typography>
                <Form.Item style={{textAlign: "left" ,paddingLeft: 25, paddingRight: 25}}>
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
                <Form.Item style={{textAlign: "left" ,paddingLeft: 25, paddingRight: 25}}>
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
                <Typography color="blue-gray" size="2xl" style={{textAlign: "left" ,paddingLeft: 25, paddingBottom:10, fontSize: 24, fontWeight: "700", textShadow: "2px 2px 4px #000000"}}>Payment Information</Typography>
                <Form.Item style={{textAlign: "left" ,paddingLeft: 25, paddingRight: 25}}>
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
                <Form.Item style={{textAlign: "left" ,paddingLeft: 25, paddingRight: 25}}>
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
                <Form.Item style={{textAlign: "left" ,paddingLeft: 25, paddingRight: 25}}>
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
                <Form.Item style={{textAlign: "center" ,paddingLeft: 25, paddingRight: 25}}>
                    <Button type="primary" htmlType="submit" style={{marginRight: 10}}>
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
        return (<p>hi</p>);
    }

    const checkifLoggedIn = () => {

    };

    const handleCancel = (e) => {
        e.preventDefault();
        window.location.href = '/seats';
    }

    return (
        <KoolContainer>
            {user ? showFormRegistered() : showFormGuest()}
        </KoolContainer>
    );
};

export default Checkout;