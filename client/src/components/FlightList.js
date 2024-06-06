import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles.module.css';

const FlightList = ({ filters }) => {
    const [flights, setFlights] = useState([]);

    const handleGetFlights = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/flights',
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                };
                const { data: res } = await axios(config);
                setFlights(res.data);
                console.log(res.data);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    localStorage.removeItem("token");
                    window.location.reload();
                }
            }
        }
    };

    useEffect(() => {
        handleGetFlights();
    }, []);

    const filteredFlights = flights.filter(flight =>
        (!filters.destCityName || flight.DestCityName === filters.destCityName) &&
        (!filters.originCityName || flight.OriginCityName === filters.originCityName) &&
        (!filters.flightDelayType || flight.FlightDelayType === filters.flightDelayType)
    );

    return (
        <div className={styles.flight_list}>
            <h2>Lista Lotów</h2>
            <ul>
                {filteredFlights.map(flight => (
                    <li key={flight._id}>
                        <Link to={`/flights/${flight._id}`}>{flight.FlightNum}</Link> - {flight.OriginCityName} to {flight.DestCityName}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FlightList;