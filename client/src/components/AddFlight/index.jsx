import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./styles.module.css";

const AddFlight = () => {
    const [flightData, setFlightData] = useState({
        AvgTicketPrice: "",
        Cancelled: "",
        Dest: "",
        DestAirportID: "",
        DestCityName: "",
        DestCountry: "",
        DestLocation: {
            lat: "",
            lon: ""
        },
        DestRegion: "",
        DestWeather: "",
        DistanceKilometers: "",
        DistanceMiles: "",
        FlightDelay: "",
        FlightDelayMin: "",
        FlightDelayType: "",
        FlightNum: "",
        FlightTimeHour: "",
        FlightTimeMin: "",
        Origin: "",
        OriginAirportID: "",
        OriginCityName: "",
        OriginCountry: "",
        OriginLocation: {
            lat: "",
            lon: ""
        },
        OriginRegion: "",
        OriginWeather: "",
        dayOfWeek: "",
        hour_of_day: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            const fetchFlight = async () => {
                try {
                    const { data } = await axios.get(`http://localhost:8080/api/flights/${id}`);
                    setFlightData(data.data);
                } catch (error) {
                    console.error('Error fetching flight:', error.response || error.message);
                }
            };
            fetchFlight();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFlightData({
            ...flightData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!id) {
                await axios.post("http://localhost:8080/api/flights", flightData);
                navigate("/");
            } else {
                await axios.put(`http://localhost:8080/api/flights/${id}`, flightData);
                navigate("/");
            }
        } catch (error) {
            if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                setError(error.response.data.message);
            }
        }
    };

    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.right}>
                    <form className={styles.form_container} onSubmit={handleSubmit}>
                        <h1>{id ? "Edytuj lot" : "Dodaj nowy lot"}</h1>
                        <input
                            type="text"
                            placeholder="Średnia cena biletu"
                            name="AvgTicketPrice"
                            value={flightData.AvgTicketPrice}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Anulowany lot"
                            name="Cancelled"
                            value={flightData.Cancelled}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Miasto docelowe"
                            name="Dest"
                            value={flightData.Dest}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="ID lotniska docelowego"
                            name="DestAirportID"
                            value={flightData.DestAirportID}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Miasto docelowe"
                            name="DestCityName"
                            value={flightData.DestCityName}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Kraj docelowy"
                            name="DestCountry"
                            value={flightData.DestCountry}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Latitudę lotniska docelowego"
                            name="DestLocation.lat"
                            value={flightData.DestLocation.lat}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Longitudę lotniska docelowego"
                            name="DestLocation.lon"
                            value={flightData.DestLocation.lon}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Region docelowy"
                            name="DestRegion"
                            value={flightData.DestRegion}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Pogoda w miejscu docelowym"
                            name="DestWeather"
                            value={flightData.DestWeather}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Odległość (kilometry)"
                            name="DistanceKilometers"
                            value={flightData.DistanceKilometers}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Odległość (mile)"
                            name="DistanceMiles"
                            value={flightData.DistanceMiles}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Opóźnienie lotu"
                            name="FlightDelay"
                            value={flightData.FlightDelay}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="number"
                            placeholder="Opóźnienie lotu (minuty)"
                            name="FlightDelayMin"
                            value={flightData.FlightDelayMin}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Typ opóźnienia"
                            name="FlightDelayType"
                            value={flightData.FlightDelayType}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Numer lotu"
                            name="FlightNum"
                            value={flightData.FlightNum}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Godzina lotu (godziny)"
                            name="FlightTimeHour"
                            value={flightData.FlightTimeHour}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Godzina lotu (minuty)"
                            name="FlightTimeMin"
                            value={flightData.FlightTimeMin}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Miasto wylotu"
                            name="Origin"
                            value={flightData.Origin}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="ID lotniska wylotowego"
                            name="OriginAirportID"
                            value={flightData.OriginAirportID}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Miasto wylotu"
                            name="OriginCityName"
                            value={flightData.OriginCityName}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Kraj wylotu"
                            name="OriginCountry"
                            value={flightData.OriginCountry}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Latitudę lotniska wylotowego"
                            name="OriginLocation.lat"
                            value={flightData.OriginLocation.lat}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Longitudę lotniska wylotowego"
                            name="OriginLocation.lon"
                            value={flightData.OriginLocation.lon}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Region wylotowy"
                            name="OriginRegion"
                            value={flightData.OriginRegion}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="text"
                            placeholder="Pogoda w miejscu wylotowym"
                            name="OriginWeather"
                            value={flightData.OriginWeather}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="number"
                            placeholder="Dzień tygodnia"
                            name="dayOfWeek"
                            value={flightData.dayOfWeek}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        <input
                            type="number"
                            placeholder="Godzina wylotu"
                            name="hour_of_day"
                            value={flightData.hour_of_day}
                            onChange={handleChange}
                            className={styles.input}
                        />

                        {error && <div className={styles.error_msg}>{error}</div>}
                        <button type="submit" className={styles.orange_btn}>
                            {id ? "Zapisz zmiany" : "Dodaj lot"}
                        </button>
                        <div className={styles.login_prompt}>
                            Jest ok?{" "}
                            <Link to="/" className={styles.login_link}>
                                Powrót
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddFlight;


// import { useState, useEffect } from "react";
// import axios from "axios";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import styles from "./styles.module.css";
//
// const AddFlight = () => {
//     const [flightData, setFlightData] = useState({
//         AvgTicketPrice: "",
//         Cancelled: "",
//         Dest: "",
//         DestAirportID: "",
//         DestCityName: "",
//         DestCountry: "",
//         DestLocation: {
//             lat: "",
//             lon: ""
//         },
//         DestRegion: "",
//         DestWeather: "",
//         DistanceKilometers: "",
//         DistanceMiles: "",
//         FlightDelay: "",
//         FlightDelayMin: 0,
//         FlightDelayType: "",
//         FlightNum: "",
//         FlightTimeHour: "",
//         FlightTimeMin: "",
//         Origin: "",
//         OriginAirportID: "",
//         OriginCityName: "",
//         OriginCountry: "",
//         OriginLocation: {
//             lat: "",
//             lon: ""
//         },
//         OriginRegion: "",
//         OriginWeather: "",
//         dayOfWeek: 0,
//         hour_of_day: 0,
//     });
//     const [error, setError] = useState("");
//     const navigate = useNavigate();
//     const { id } = useParams();
//
//     useEffect(() => {
//         if (id) {
//             const fetchFlight = async () => {
//                 try {
//                     const { data } = await axios.get(`http://localhost:8080/api/flights/${id}`);
//                     setFlightData(data.data);
//                 } catch (error) {
//                     console.error('Error fetching flight:', error.response || error.message);
//                 }
//             };
//             fetchFlight();
//         }
//     }, [id]);
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFlightData({
//             ...flightData,
//             [name]: value
//         });
//     };
//
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             if (!id) {
//                 await axios.post("http://localhost:8080/api/flights", flightData);
//                 navigate("/");
//             } else {
//                 await axios.put(`http://localhost:8080/api/flights/${id}`, flightData);
//                 navigate("/");
//             }
//         } catch (error) {
//             if (error.response && error.response.status >= 400 && error.response.status <= 500) {
//                 setError(error.response.data.message);
//             }
//         }
//     };
//
//     return (
//         <div className={styles.signup_container}>
//             <div className={styles.signup_form_container}>
//                 <div className={styles.right}>
//                     <form className={styles.form_container} onSubmit={handleSubmit}>
//                         <h1>{id ? "Edytuj lot" : "Dodaj nowy lot"}</h1>
//                         <input
//                             type="text"
//                             placeholder="Miasto docelowe"
//                             name="DestCityName"
//                             value={flightData.DestCityName}
//                             onChange={handleChange}
//                             required
//                             className={styles.input}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Miasto wylotu"
//                             name="OriginCityName"
//                             value={flightData.OriginCityName}
//                             onChange={handleChange}
//                             required
//                             className={styles.input}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Typ opóźnienia"
//                             name="FlightDelayType"
//                             value={flightData.FlightDelayType}
//                             onChange={handleChange}
//                             className={styles.input}
//                         />
//                         {/* Dodaj pozostałe pola formularza */}
//                         <input
//                             type="text"
//                             placeholder="Średnia cena biletu"
//                             name="AvgTicketPrice"
//                             value={flightData.AvgTicketPrice}
//                             onChange={handleChange}
//                             className={styles.input}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Czas lotu (godziny)"
//                             name="FlightTimeHour"
//                             value={flightData.FlightTimeHour}
//                             onChange={handleChange}
//                             className={styles.input}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Czas lotu (minuty)"
//                             name="FlightTimeMin"
//                             value={flightData.FlightTimeMin}
//                             onChange={handleChange}
//                             className={styles.input}
//                         />
//                         {/* Dodaj pozostałe pola formularza */}
//                         {error && <div className={styles.error_msg}>{error}</div>}
//                         <button type="submit" className={styles.orange_btn}>
//                             {id ? "Zapisz zmiany" : "Dodaj lot"}
//                         </button>
//                         <div className={styles.login_prompt}>
//                             Jest ok?{" "}
//                             <Link to="/" className={styles.login_link}>
//                                 Powrót
//                             </Link>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };
//
// export default AddFlight;


// import {useState, useEffect} from "react"
// import axios from "axios"
// import {Link, useNavigate, useParams} from "react-router-dom"
// import styles from "./styles.module.css"
//
//
// const AddFlight = () => {
//     const [data, setData] = useState({
//         name: "",
//         ingredients: "",
//         instructions: "",
//     })
//     const [error, setError] = useState("")
//     const navigate = useNavigate()
//     const {id} = useParams();
//     const handleChange = ({currentTarget: input}) => {
//         setData({...data, [input.name]: input.value})
//     }
//
//     useEffect(() => {
//         if (id) {
//             const fetchRecipe = async () => {
//                 const token = localStorage.getItem("token");
//                 if (token) {
//                     try {
//                         const {data} = await axios.get(`http://localhost:8080/api/recipes/${id}`);
//                         setData({
//                             name: data.data.name,
//                             ingredients: data.data.ingredients,
//                             instructions: data.data.instructions,
//                         });
//                         console.log({...data.data});
//                     } catch (error) {
//                         console.error('Error fetching recipe:', error.response || error.message);
//                     }
//                 }
//             };
//             fetchRecipe();
//         }
//     }, [id]);
//
//     const handleSubmit = async (e) => {
//         e.preventDefault()
//         const token = localStorage.getItem("token");
//         if (token) {
//             try {
//                 if (!id) {
//                     const url = "http://localhost:8080/api/recipes"
//                     const {data: res} = await axios.post(url, data)
//                     console.log(res.message)
//                     navigate("/")
//                 } else {
//                     const url = `http://localhost:8080/api/recipes/${id}`
//                     const {data: res} = await axios.put(url, data)
//                     console.log(res.message)
//                     navigate("/")
//                 }
//             } catch (error) {
//                 if (
//                     error.response &&
//                     error.response.status >= 400 &&
//                     error.response.status <= 500
//                 ) {
//                     setError(error.response.data.message)
//                 }
//             }
//         }
//     }
//     return (
//         <div className={styles.signup_container}>
//             <div className={styles.signup_form_container}>
//                 <div className={styles.right}>
//                     <form className={styles.form_container}
//                           onSubmit={handleSubmit}>
//                         <h1>{id ? "Edytuj przepis" : "Utwórz nowy przepis"}</h1>
//                         <input
//                             type="text"
//                             placeholder="Nazwa potrawy"
//                             name="name"
//                             onChange={handleChange}
//                             value={data.name}
//                             required
//                             className={styles.input}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Składniki"
//                             name="ingredients"
//                             onChange={handleChange}
//                             value={data.ingredients}
//                             required
//                             className={styles.input}
//                         />
//                         <input
//                             type="text"
//                             placeholder="Instrukcje"
//                             name="instructions"
//                             onChange={handleChange}
//                             value={data.instructions}
//                             required
//                             className={styles.input}
//                         />
//                         {error && <div
//                             className={styles.error_msg}>{error}</div>}
//                         <button type="submit"
//                                 className={styles.orange_btn}>
//                             {id ? "Zapisz zmiany" : "Dodaj"}
//                         </button>
//                         <div className={styles.login_prompt}>
//                             Jest ok?{" "}
//                             <Link to="/" className={styles.login_link}>
//                                 Powrót
//                             </Link>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>);
// };
// export default AddFlight
