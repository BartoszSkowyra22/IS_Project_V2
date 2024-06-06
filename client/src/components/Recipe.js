import React, {useEffect, useState} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import axios from 'axios';
import styles from "./Main/styles.module.css"

const Recipe = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [recipe, setRecipe] = useState(null);

    const handleGetRecipe = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const config = {
                    method: 'get',
                    url: `http://localhost:8080/api/recipes/${id}`,
                    headers: {'Content-Type': 'application/json', 'x-access-token': token}
                }
                const {data: res} = await axios(config);
                setRecipe(res.data);
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    window.location.reload();
                }
            }
        }
    }

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            var windowChecked = window.confirm("Czy na pewno chcesz usunąć?");
            if (windowChecked) {
                try {
                    const config = {
                        method: 'delete',
                        url: `http://localhost:8080/api/recipes/${id}`,
                        headers: {'Content-Type': 'application/json', 'x-access-token': token}
                    }
                    await axios(config);
                    navigate('/');
                } catch (error) {
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
        handleGetRecipe();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {hour: '2-digit', minute: '2-digit'};
        const time = date.toLocaleTimeString('pl-PL', options);
        const formattedDate = date.toLocaleDateString('pl-PL').replace(/\//g, '.');
        return `${time} ${formattedDate}`;
    };

    if (!recipe) return <div>Loading...</div>;
    return (
        <div className={styles.main_container}>
            <nav className={styles.navbar}>
                <h1>Moje przepisy</h1>
                <div className={styles.nav_links}>
                    <Link to="/" className={styles.white_btn}>Lista przepisów</Link>
                    <Link to="/addrecipe" className={styles.white_btn}>Nowy przepis</Link>
                    <button className={styles.white_btn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>
            <div className={styles.recipe_container}>
                <h2 className={styles.recipe_header}>{recipe.name}</h2>
                <div className={styles.recipe_details}>
                    <h3>Kategoria: {recipe.category}</h3>
                    <p>Składniki: {recipe.ingredients}</p>
                    <p>Instrukcja wykonania: {recipe.instructions}</p>
                    <p>Data dodania: {formatDate(recipe.createdAt)}</p>
                </div>
                <div className={styles.recipe_buttons}>
                    <Link to="/" className={styles.recipe_button}>Powrót</Link>
                    <Link to={`/recipes/${recipe._id}/edit`} className={styles.recipe_button}>Edytuj</Link>
                    <button onClick={handleDelete} className={styles.recipe_button}>Usuń</button>
                </div>
            </div>
        </div>
    );
};

export default Recipe;