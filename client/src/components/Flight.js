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

                {/*<div className={styles.flight_details}>*/}
                {/*    <h3>Miasto docelowe: {flight.DestCityName}</h3>*/}
                {/*    <h3>Miasto wylotu: {flight.OriginCityName}</h3>*/}
                {/*    <p>Typ opóźnienia: {flight.FlightDelayType}</p>*/}
                {/*    <p>Średnia cena biletu: {flight.AvgTicketPrice}</p>*/}
                {/*    <p>Opóźnienie lotu: {flight.FlightDelay}</p>*/}
                {/*    <p>Data dodania: {new Date(flight.createdAt).toLocaleDateString('pl-PL')}</p>*/}
                {/*</div>*/}
                <div className={styles.flight_buttons}>
                    <Link to="/" className={styles.flight_button}>Powrót</Link>
                    <Link to={`/flights/${flight._id}/edit`} className={styles.flight_button}>Edytuj</Link>
                    <button onClick={handleDelete} className={styles.flight_button}>Usuń</button>
                </div>
            </div>
        </div>
    );
};

export default Flight;


// import React, { useEffect, useState } from 'react';
// import { useNavigate, useParams, Link } from 'react-router-dom';
// import axios from 'axios';
// import styles from "./Main/styles.module.css";
//
// const Flight = () => {
//     const navigate = useNavigate();
//     const { id } = useParams();
//     const [flight, setFlight] = useState(null);
//
//     const handleGetFlight = async () => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             try {
//                 const config = {
//                     method: 'get',
//                     url: `http://localhost:8080/api/flights/${id}`,
//                     headers: { 'Content-Type': 'application/json', 'x-access-token': token }
//                 };
//                 const { data: res } = await axios(config);
//                 setFlight(res.data.data);
//             } catch (error) {
//                 if (error.response && error.response.status >= 400 && error.response.status <= 500) {
//                     window.location.reload();
//                 }
//             }
//         }
//     };
//
//     const handleDelete = async () => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             var windowChecked = window.confirm("Czy na pewno chcesz usunąć?");
//             if (windowChecked) {
//                 try {
//                     const config = {
//                         method: 'delete',
//                         url: `http://localhost:8080/api/flights/${id}`,
//                         headers: { 'Content-Type': 'application/json', 'x-access-token': token }
//                     };
//                     await axios(config);
//                     navigate('/');
//                 } catch (error) {
//                     if (error.response && error.response.status >= 400 && error.response.status <= 500) {
//                         window.location.reload();
//                     }
//                 }
//             }
//         }
//     };
//
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//     };
//
//     useEffect(() => {
//         handleGetFlight();
//     }, [id]);
//
//     if (!flight) return <div>Loading...</div>;
//     return (
//         <div className={styles.main_container}>
//             <nav className={styles.navbar}>
//                 <h1>Moje Loty</h1>
//                 <div className={styles.nav_links}>
//                     <Link to="/" className={styles.white_btn}>Lista lotów</Link>
//                     <Link to="/addflight" className={styles.white_btn}>Nowy lot</Link>
//                     <button className={styles.white_btn} onClick={handleLogout}>
//                         Wyloguj
//                     </button>
//                 </div>
//             </nav>
//             <div className={styles.flight_container}>
//                 <h2 className={styles.flight_header}>{flight.FlightNum}</h2>
//                 <div className={styles.flight_details}>
//                     <h3>Miasto docelowe: {flight.DestCityName}</h3>
//                     <h3>Miasto wylotu: {flight.OriginCityName}</h3>
//                     <p>Typ opóźnienia: {flight.FlightDelayType}</p>
//                     <p>Średnia cena biletu: {flight.AvgTicketPrice}</p>
//                     <p>Opóźnienie lotu: {flight.FlightDelay}</p>
//                     <p>Data dodania: {new Date(flight.createdAt).toLocaleDateString('pl-PL')}</p>
//                 </div>
//                 <div className={styles.flight_buttons}>
//                     <Link to="/" className={styles.flight_button}>Powrót</Link>
//                     <Link to={`/flights/${flight._id}/edit`} className={styles.flight_button}>Edytuj</Link>
//                     <button onClick={handleDelete} className={styles.flight_button}>Usuń</button>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Flight;




// import React, {useEffect, useState} from 'react';
// import {useNavigate, useParams, Link} from 'react-router-dom';
// import axios from 'axios';
// import styles from "./Main/styles.module.css"
//
// const Recipe = () => {
//     const navigate = useNavigate();
//     const {id} = useParams();
//     const [recipe, setRecipe] = useState(null);
//
//     const handleGetRecipe = async () => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             try {
//                 const config = {
//                     method: 'get',
//                     url: `http://localhost:8080/api/recipes/${id}`,
//                     headers: {'Content-Type': 'application/json', 'x-access-token': token}
//                 }
//                 const {data: res} = await axios(config);
//                 setRecipe(res.data);
//             } catch (error) {
//                 if (error.response && error.response.status >= 400 && error.response.status <= 500) {
//                     window.location.reload();
//                 }
//             }
//         }
//     }
//
//     const handleDelete = async () => {
//         const token = localStorage.getItem("token");
//         if (token) {
//             var windowChecked = window.confirm("Czy na pewno chcesz usunąć?");
//             if (windowChecked) {
//                 try {
//                     const config = {
//                         method: 'delete',
//                         url: `http://localhost:8080/api/recipes/${id}`,
//                         headers: {'Content-Type': 'application/json', 'x-access-token': token}
//                     }
//                     await axios(config);
//                     navigate('/');
//                 } catch (error) {
//                     if (error.response && error.response.status >= 400 && error.response.status <= 500) {
//                         window.location.reload();
//                     }
//                 }
//             }
//         }
//     };
//
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//     };
//
//     useEffect(() => {
//         handleGetRecipe();
//     }, [id]);
//
//     const formatDate = (dateString) => {
//         const date = new Date(dateString);
//         const options = {hour: '2-digit', minute: '2-digit'};
//         const time = date.toLocaleTimeString('pl-PL', options);
//         const formattedDate = date.toLocaleDateString('pl-PL').replace(/\//g, '.');
//         return `${time} ${formattedDate}`;
//     };
//
//     if (!recipe) return <div>Loading...</div>;
//     return (
//         <div className={styles.main_container}>
//             <nav className={styles.navbar}>
//                 <h1>Moje przepisy</h1>
//                 <div className={styles.nav_links}>
//                     <Link to="/" className={styles.white_btn}>Lista przepisów</Link>
//                     <Link to="/addrecipe" className={styles.white_btn}>Nowy przepis</Link>
//                     <button className={styles.white_btn} onClick={handleLogout}>
//                         Logout
//                     </button>
//                 </div>
//             </nav>
//             <div className={styles.recipe_container}>
//                 <h2 className={styles.recipe_header}>{recipe.name}</h2>
//                 <div className={styles.recipe_details}>
//                     <h3>Kategoria: {recipe.category}</h3>
//                     <p>Składniki: {recipe.ingredients}</p>
//                     <p>Instrukcja wykonania: {recipe.instructions}</p>
//                     <p>Data dodania: {formatDate(recipe.createdAt)}</p>
//                 </div>
//                 <div className={styles.recipe_buttons}>
//                     <Link to="/" className={styles.recipe_button}>Powrót</Link>
//                     <Link to={`/recipes/${recipe._id}/edit`} className={styles.recipe_button}>Edytuj</Link>
//                     <button onClick={handleDelete} className={styles.recipe_button}>Usuń</button>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default Recipe;