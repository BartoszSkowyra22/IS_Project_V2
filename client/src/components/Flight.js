import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import styles from "./Main/styles.module.css";

const Flight = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [flight, setFlight] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleGetFlight = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const config = {
                    method: 'get',
                    url: `http://localhost:8080/api/flights/${id}`,
                    headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                };
                const { data: res } = await axios(config);
                console.log(res.data);
                setFlight(res.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching flight data:", error);
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    window.location.reload();
                }
            }
        }
    };

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            var windowChecked = window.confirm("Czy na pewno chcesz usunąć?");
            if (windowChecked) {
                try {
                    const config = {
                        method: 'delete',
                        url: `http://localhost:8080/api/flights/${id}`,
                        headers: { 'Content-Type': 'application/json', 'x-access-token': token }
                    };
                    await axios(config);
                    navigate('/');
                } catch (error) {
                    console.error("Error deleting flight:", error);
                    if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                        window.location.reload();
                    }
                }
            }
        }
    };

    const handleDownloadJSON = () => {
        const destLocation = JSON.parse(flight.DestLocation);
        const originLocation = JSON.parse(flight.OriginLocation);

        const flightData = {
            ...flight,
            DestLocation: destLocation,
            OriginLocation: originLocation
        };
        const jsonFlightData = JSON.stringify(flightData, null, 2);
        const blob = new Blob([jsonFlightData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `flight_${id}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // const handleDownloadJSON = () => {
    //     const jsonFlightData = JSON.stringify(flight, null, 2); // 2 - liczba spacji wcięcia
    //     const blob = new Blob([jsonFlightData], { type: 'application/json' });
    //     const url = URL.createObjectURL(blob);
    //     const a = document.createElement('a');
    //     a.href = url;
    //     a.download = `flight_${id}.json`;
    //     document.body.appendChild(a);
    //     a.click();
    //     document.body.removeChild(a);
    //     URL.revokeObjectURL(url);
    // };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    useEffect(() => {
        handleGetFlight();
    }, [id]);

    function formatFlightTime(hours, minutes) {
        const totalMinutes = parseInt(minutes);
        const formattedHours = Math.floor(totalMinutes / 60);
        const formattedMinutes = totalMinutes % 60;
        return `${formattedHours} godz. ${formattedMinutes} min.`;
    }

    if (loading) return <div>Loading...</div>;
    if (!flight) return <div>Flight not found</div>;

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Moje Loty</h1>
                <div className={styles.nav_links}>
                    <Link to="/" className={styles.white_btn}>Lista lotów</Link>
                    <Link to="/addflight" className={styles.white_btn}>Nowy lot</Link>
                    <button className={styles.white_btn} onClick={handleLogout}>
                        Wyloguj
                    </button>
                </div>
            </nav>
            <div className={styles.flight_container}>
                <h2 className={styles.flight_header}>{flight.FlightNum}</h2>
                <div className={styles.flight_details}>
                    <h3>Miasto docelowe: {flight.DestCityName}</h3>
                    <h3>Miasto wylotu: {flight.OriginCityName}</h3>
                    <p>Typ opóźnienia: {flight.FlightDelayType}</p>
                    <p>Średnia cena biletu: {flight.AvgTicketPrice}</p>
                    <p>Opóźnienie lotu: {flight.FlightDelay}</p>
                    <p>Anulowany lot: {flight.Cancelled}</p>
                    <p>Numer lotu: {flight.FlightNum}</p>
                    <p>Odległość (kilometry): {flight.DistanceKilometers}</p>
                    <p>Czas lotu: {formatFlightTime(flight.FlightTimeHour, flight.FlightTimeMin)}</p>
                    <p>Dzień tygodnia: {flight.dayOfWeek}</p>
                    <p>Godzina: {flight.hour_of_day}</p>
                    <p>Pogoda w miejscu docelowym: {flight.DestWeather}</p>
                    <p>Pogoda w miejscu wylotu: {flight.OriginWeather}</p>
                    <p>Data dodania do bazy: {new Date(flight.createdAt).toLocaleDateString('pl-PL')}</p>
                </div>
                <div className={styles.flight_buttons}>
                    <Link to="/" className={styles.flight_button}>Powrót</Link>
                    <Link to={`/flights/${flight._id}/edit`} className={styles.flight_button}>Edytuj</Link>
                    <button onClick={handleDelete} className={styles.flight_button}>Usuń</button>
                    <button onClick={handleDownloadJSON} className={styles.flight_button}>Pobierz JSON</button>
                </div>
            </div>
        </div>
    );
};

export default Flight;