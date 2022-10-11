
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid';
import { 
    onActiveBTN } from '../../actions';
import {createSelector} from "reselect"


const HeroesFilters = () => {
    const activeBTN = useSelector(state=> state.onActiveBTN);

    const dispatch = useDispatch();

    
    const filterMemo = createSelector(
        (state) => state.filters,
        (filters) => filters.map(filter => {
            console.log(filters);
            const active = filter.name === activeBTN
            const clazzName = active ? "active" : null
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
                <div className="btn-group">
                    {filters}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;