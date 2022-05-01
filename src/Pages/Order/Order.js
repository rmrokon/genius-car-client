import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import axiosPrivate from '../../api/axiosPrivate';
import auth from '../../firebase.init';

const Order = () => {
    const [user] = useAuthState(auth);
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getOrders = async () => {
            const email = user.email;
            try {
                const { data } = await axiosPrivate.get(`http://powerful-thicket-98593.herokuapp.com/order?email=${email}`)
                setOrders(data);

            }
            catch (error) {
                console.log(error.message);
                if (error.response.status === 403 || error.response.status === 401) {
                    signOut(auth);
                    navigate('/login');
                }
            }
        }
        getOrders();
    }, [user])

    return (
        <div>
            <h2>Your Orders : {orders.length}</h2>
            {/* {
                orders.map(order => )
            } */}
        </div>
    );
};

export default Order;