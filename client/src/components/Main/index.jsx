// import styles from "./styles.module.css";
// import { useState, useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import FlightList from "../FlightList";
// import axios from "axios";
//
// const Main = () => {
//     const navigate = useNavigate();
//     const [filters, setFilters] = useState({
//         destCityName: "",
//         originCityName: "",
//         flightDelayType: ""
//     });
//     const [filterOptions, setFilterOptions] = useState({
//         destCityNames: [],
//         originCityNames: [],
//         flightDelayTypes: []
//     });
//
//     const handleChange = (e) => {
//         setFilters({
//             ...filters,
//             [e.target.name]: e.target.value
//         });
//     };
//
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         navigate("/login");
//     };
//
//     const fetchFilterOptions = async () => {
//         try {
//             const { data } = await axios.get("http://localhost:8080/api/flights/filters");
//             setFilterOptions({
//                 destCityNames: data.destCityNames,
//                 originCityNames: data.originCityNames,
//                 flightDelayTypes: data.flightDelayTypes
//             });
//         } catch (error) {
//             console.error("Error fetching filter options", error);
//         }
//     };
//
//     useEffect(() => {
//         fetchFilterOptions();
//     }, []);
//
//     return (
//         <div className={styles.main_container}>
//             <nav className={styles.navbar}>
//                 <h1>Moje Loty</h1>
//                 <div className={styles.nav_links}>
//                     <Link to="/addflight" className={styles.white_btn}>Nowy lot</Link>
//                     <button className={styles.white_btn} onClick={handleLogout}>Wyloguj</button>
//                 </div>
//             </nav>
//
//             <div className={styles.filters}>
//                 <select
//                     name="destCityName"
//                     value={filters.destCityName}
//                     onChange={handleChange}
//                     className={styles.input}
//                 >
//                     <option value="">Wybierz miasto docelowe</option>
//                     {filterOptions.destCityNames.map(option => (
//                         <option key={option} value={option}>{option}</option>
//                     ))}
//                 </select>
//                 <select
//                     name="originCityName"
//                     value={filters.originCityName}
//                     onChange={handleChange}
//                     className={styles.input}
//                 >
//                     <option value="">Wybierz miasto wylotu</option>
//                     {filterOptions.originCityNames.map(option => (
//                         <option key={option} value={option}>{option}</option>
//                     ))}
//                 </select>
//                 <select
//                     name="flightDelayType"
//                     value={filters.flightDelayType}
//                     onChange={handleChange}
//                     className={styles.input}
//                 >
//                     <option value="">Wybierz typ opóźnienia</option>
//                     {filterOptions.flightDelayTypes.map(option => (
//                         <option key={option} value={option}>{option}</option>
//                     ))}
//                 </select>
//             </div>
//             {<FlightList filters={filters}/>}
//         </div>
//     );
// };
//
// export default Main;

import styles from "./styles.module.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import FlightList from "../FlightList";
import axios from "axios";
import { Bar, Line, Pie } from "react-chartjs-2";
import Chart from 'chart.js/auto';

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
    const [chartData, setChartData] = useState(null);
    const [chartDataByHour, setChartDataByHour] = useState(null);
    const [chartDataByWeather, setChartDataByWeather] = useState(null);
    const [showBarChart, setShowBarChart] = useState(false);
    const [showLineChart, setShowLineChart] = useState(false);
    const [showPieChart, setShowPieChart] = useState(false);

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

    const fetchChartData = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/flights/chart-data");
            setChartData(data);
            setShowBarChart(true);
            setShowLineChart(false);
            setShowPieChart(false);
        } catch (error) {
            console.error("Error fetching chart data", error);
        }
    };

    const fetchChartDataByHour = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/flights/chart-data-by-hour");
            setChartDataByHour(data);
            setShowBarChart(false);
            setShowLineChart(true);
            setShowPieChart(false);
        } catch (error) {
            console.error("Error fetching chart data by hour", error);
        }
    };

    const fetchChartDataByWeather = async () => {
        try {
            const { data } = await axios.get("http://localhost:8080/api/flights/chart-data-by-weather");
            setChartDataByWeather(data);
            setShowBarChart(false);
            setShowLineChart(false);
            setShowPieChart(true);
        } catch (error) {
            console.error("Error fetching chart data by weather", error);
        }
    };

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
            <button className={styles.white_btn} onClick={fetchChartData}>Wykres średniej ceny biletów</button>
            <button className={styles.white_btn} onClick={fetchChartDataByHour}>Wykres ilości wylotów o danej godzinie</button>
            <button className={styles.white_btn} onClick={fetchChartDataByWeather}>Wykres pogody w miejscu docelowym</button>
            {showBarChart && chartData && (
                <div>
                    <h2>Wykres przedstawiający przedziały średnich cen biletów.</h2>
                    <div className={styles.chart_container}>
                        <Bar
                            data={{
                                labels: ["300-500", "500-700", "700-900", "900+"],
                                datasets: [
                                    {
                                        label: 'Liczba Biletów',
                                        data: [
                                            chartData["300-500"],
                                            chartData["500-700"],
                                            chartData["700-900"],
                                            chartData["900+"]
                                        ],
                                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                        borderColor: 'rgba(75, 192, 192, 1)',
                                        borderWidth: 1
                                    }
                                ]
                            }}
                            options={{
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            )}
            {showLineChart && chartDataByHour && (
                <div>
                    <h2>Wykres przedstawiający ilość wylotów o danej godzinie.</h2>
                    <div className={styles.chart_container}>
                        <Line
                            data={{
                                labels: Array.from({ length: 24 }, (_, i) => i.toString()),
                                datasets: [
                                    {
                                        label: 'Liczba Lotów',
                                        data: chartDataByHour,
                                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                                        borderColor: 'rgba(153, 102, 255, 1)',
                                        borderWidth: 1,
                                        fill: true
                                    }
                                ]
                            }}
                            options={{
                                scales: {
                                    y: {
                                        beginAtZero: true
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            )}
            {showPieChart && chartDataByWeather && (
                <div>
                    <h2>Wykres przedstawiający pogodę w miejscu docelowym.</h2>
                    <div className={styles.pie_chart_container}>
                        <Pie
                            data={{
                                labels: Object.keys(chartDataByWeather),
                                datasets: [
                                    {
                                        label: 'Procentowy udział pogody',
                                        data: Object.values(chartDataByWeather),
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)',
                                            'rgba(54, 162, 235, 0.2)',
                                            'rgba(255, 206, 86, 0.2)',
                                            'rgba(75, 192, 192, 0.2)',
                                            'rgba(153, 102, 255, 0.2)',
                                            'rgba(255, 159, 64, 0.2)',
                                            'rgba(0, 230, 0, 0.2)',
                                            'rgba(60, 25, 14, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)',
                                            'rgba(54, 162, 235, 1)',
                                            'rgba(255, 206, 86, 1)',
                                            'rgba(75, 192, 192, 1)',
                                            'rgba(153, 102, 255, 1)',
                                            'rgba(255, 159, 64, 1)',
                                            'rgba(0, 230, 0, 1)',
                                            'rgba(60, 25, 14, 1)'
                                        ],
                                        borderWidth: 1
                                    }
                                ]
                            }}
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: {
                                        position: 'top',
                                    },
                                    tooltip: {
                                        callbacks: {
                                            label: function (context) {
                                                const label = context.label || '';
                                                const value = context.raw || 0;
                                                return `${label}: ${value}%`;
                                            }
                                        }
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            )}
            <FlightList filters={filters} />
        </div>
    );
};

export default Main;
