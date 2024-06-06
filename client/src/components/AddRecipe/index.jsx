import {useState, useEffect} from "react"
import axios from "axios"
import {Link, useNavigate, useParams} from "react-router-dom"
import styles from "./styles.module.css"

const categories = ['Śniadanie', 'Zupa', 'Obiad', 'Kolacja', 'Deser'];

const AddRecipe = () => {
    const [data, setData] = useState({
        name: "",
        category: "",
        ingredients: "",
        instructions: "",
    })
    const [error, setError] = useState("")
    const navigate = useNavigate()
    const {id} = useParams();
    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]: input.value})
    }

    useEffect(() => {
        if (id) {
            const fetchRecipe = async () => {
                const token = localStorage.getItem("token");
                if (token) {
                    try {
                        const {data} = await axios.get(`http://localhost:8080/api/recipes/${id}`);
                        setData({
                            name: data.data.name,
                            category: data.data.category,
                            ingredients: data.data.ingredients,
                            instructions: data.data.instructions,
                        });
                        console.log({...data.data});
                    } catch (error) {
                        console.error('Error fetching recipe:', error.response || error.message);
                    }
                }
            };
            fetchRecipe();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const token = localStorage.getItem("token");
        if (token) {
            try {
                if (!id) {
                    const url = "http://localhost:8080/api/recipes"
                    const {data: res} = await axios.post(url, data)
                    console.log(res.message)
                    navigate("/")
                } else {
                    const url = `http://localhost:8080/api/recipes/${id}`
                    const {data: res} = await axios.put(url, data)
                    console.log(res.message)
                    navigate("/")
                }
            } catch (error) {
                if (
                    error.response &&
                    error.response.status >= 400 &&
                    error.response.status <= 500
                ) {
                    setError(error.response.data.message)
                }
            }
        }
    }
    return (
        <div className={styles.signup_container}>
            <div className={styles.signup_form_container}>
                <div className={styles.right}>
                    <form className={styles.form_container}
                          onSubmit={handleSubmit}>
                        <h1>{id ? "Edytuj przepis" : "Utwórz nowy przepis"}</h1>
                        <input
                            type="text"
                            placeholder="Nazwa potrawy"
                            name="name"
                            onChange={handleChange}
                            value={data.name}
                            required
                            className={styles.input}
                        />
                        <select name="category" value={data.category} onChange={handleChange} required
                                className={styles.input}>
                            <option value="">Wybierz kategorię</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            placeholder="Składniki"
                            name="ingredients"
                            onChange={handleChange}
                            value={data.ingredients}
                            required
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Instrukcje"
                            name="instructions"
                            onChange={handleChange}
                            value={data.instructions}
                            required
                            className={styles.input}
                        />
                        {error && <div
                            className={styles.error_msg}>{error}</div>}
                        <button type="submit"
                                className={styles.orange_btn}>
                            {id ? "Zapisz zmiany" : "Dodaj"}
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
        </div>);
};
export default AddRecipe
