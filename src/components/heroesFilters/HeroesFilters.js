
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { 
    onActiveBTN } from '../../reducers/activeBTNSlice.js';
import {createSelector} from "@reduxjs/toolkit"


const HeroesFilters = () => {
    const dispatch = useDispatch(); 

    const filterMemo = createSelector(
        (state) => state.heroes.filters,
        (state) => state.activeBTN.activeBTN,
        (filters, activeBTN) => filters.map(filter => {
                const active = filter.name === activeBTN
                const clazzName = active ? "active" : null
                console.log("render");
                return(
                    <button 
                    className={filter.className + " " + clazzName}
                    key={uuidv4()}
                    onClick={()=> dispatch(onActiveBTN(filter.name))}>{filter.name}</button>
                )
            })  
    )

    

    const filters = useSelector(filterMemo)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div
                className="btn-group">
                    {filters}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;