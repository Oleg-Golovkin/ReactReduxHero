import HeroesList from '../heroesList/HeroesList';
import HeroesAddForm from '../heroesAddForm/HeroesAddForm';
import HeroesFilters from '../heroesFilters/HeroesFilters';
import { filterReduxThunk } from '../../actions';
import {useDispatch } from "react-redux";
import { useEffect } from "react";
import {useHttp} from '../../hooks/http.hook';

import './app.scss';

const App = () => {
    const {request} = useHttp();
    // Получение фильтров
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(filterReduxThunk(request))
 // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    return (
        <main className="app">
            <div className="content">
                <HeroesList/>
                <div className="content__interactive">
                    {/* <HeroesAddForm/> */}
                    <HeroesFilters/>
                </div>
            </div>
        </main>
    )
}

export default App;