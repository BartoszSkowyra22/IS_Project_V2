import styles from "./styles.module.css";
import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import RecipeList from "../RecipeList";

const categories = ['Śniadanie', 'Zupa', 'Obiad', 'Kolacja', 'Deser'];

const Main = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Moje przepisy</h1>
                <Link to="/addrecipe" className={styles.white_btn}>Nowy przepis</Link>
                <button className={styles.white_btn} onClick={handleLogout}>
                    Wyloguj
                </button>
            </nav>
            <select
                name="category"
                value={selectedCategory}
                onChange={handleChange}
                required
                className={styles.input}
            >
                <option value="">Wybierz kategorię</option>
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
            <RecipeList selectedCategory={selectedCategory}/>
        </div>
    );
};

export default Main;