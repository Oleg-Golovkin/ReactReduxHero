import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';
import { filterFetched } from '../../actions';
import {useDispatch } from "react-redux";
import { useEffect } from "react";
import {useHttp} from '../../hooks/http.hook';

import './app.scss';

const App = () => {
    const {request} = useHttp();
    // Получение фильтров
    const dispatch = useDispatch();
    const getFilters = ()=> {
        request("http://localhost:3001/filters")
            .then(data=> dispatch(filterFetched(data)))        
    }
    useEffect(()=>{
        getFilters();
 // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    return (
        <main className="app">
            <div className="content">
                <HeroesList/>
                <div className="content__interactive">
                    <HeroesAddForm/>
                    <HeroesFilters/>
                </div>
            </div>
        </main>
    )
}

export default App;