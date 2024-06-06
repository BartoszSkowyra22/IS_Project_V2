import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import styles from './styles.module.css'

const RecipeList = ({selectedCategory}) => {
    const [recipes, setRecipes] = useState([]);

    const handleGetRecipes = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const config = {
                    method: 'get',
                    url: 'http://localhost:8080/api/recipes',
                    headers: {'Content-Type': 'application/json', 'x-access-token': token}
                }
                const {data: res} = await axios(config);
                setRecipes(res.data);
                console.log(res.data)
            } catch (error) {
                if (error.response && error.response.status >= 400 && error.response.status <= 500) {
                    localStorage.removeItem("token");
                    window.location.reload();
                }
            }
        }
    };

    useEffect(() => {
        handleGetRecipes();
    }, []);

    const filteredRecipes = selectedCategory
        ? recipes.filter(recipe => recipe.category === selectedCategory)
        : recipes;

    return (
        <div className={styles.recipe_list}>
            <h2>Lista przepisów</h2>
            <ul>
                {filteredRecipes.map(recipe => (
                    <li key={recipe._id}>
                        <Link to={`/recipes/${recipe._id}`}>{recipe.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecipeList;
