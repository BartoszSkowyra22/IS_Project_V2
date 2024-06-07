import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import FlightList from "../FlightList";
import axios from "axios";

const Main = () => {
    const navigate = useNavigate();
    const [filters, setFilters] = useState({
        destCityName: "",
        originCityName: "",
        flightDelayType: ""
    });
    const [filterOptions, setFilterOptions] = useState({
        destCityNames: [],
        originCityNames: [],
        flightDelayTypes: []
    });

    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value
        });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const fetchFilterOptions = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/flights/filters");
            setFilterOptions({
                destCityNames: data.destCityNames,
                originCityNames: data.originCityNames,
                flightDelayTypes: data.flightDelayTypes
            });
        } catch (error) {
            console.error("Error fetching filter options", error);
        }
    };

    useEffect(() => {
        fetchFilterOptions();
    }, []);

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Moje Loty</h1>
                <div className={styles.nav_links}>
                    <Link to="/addflight" className={styles.white_btn}>Nowy lot</Link>
                    <button className={styles.white_btn} onClick={handleLogout}>Wyloguj</button>
                </div>
            </nav>

            <div className={styles.filters}>
                <select
                    name="destCityName"
                    value={filters.destCityName}
                    onChange={handleChange}
                    className={styles.input}
                >
                    <option value="">Wybierz miasto docelowe</option>
                    {filterOptions.destCityNames.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <select
                    name="originCityName"
                    value={filters.originCityName}
                    onChange={handleChange}
                    className={styles.input}
                >
                    <option value="">Wybierz miasto wylotu</option>
                    {filterOptions.originCityNames.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
                <select
                    name="flightDelayType"
                    value={filters.flightDelayType}
                    onChange={handleChange}
                    className={styles.input}
                >
                    <option value="">Wybierz typ opóźnienia</option>
                    {filterOptions.flightDelayTypes.map(option => (
                        <option key={option} value={option}>{option}</option>
                    ))}
                </select>
            </div>
            {<FlightList filters={filters}/>}
        </div>
    );
};

export default Main;