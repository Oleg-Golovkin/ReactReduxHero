import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHttp} from '../../hooks/http.hook';
import { fitersFetched } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    // Добавление героя
    const [stateHeroes, setStateHeroes] = useState({
        "name": "",
        "distription": "",
        "element": ""        
    })
    const addHeroes = (e, title = [e.target.name])=> {
        setStateHeroes({...stateHeroes, [title]: e.target.value})
    }
    const {request} = useHttp();
    const addHeroesServer = (e)=> {
        e.preventDefault();
        request("http://localhost:3001/heroes", "POST", JSON.stringify(stateHeroes))
            .then(data=> console.log(data))
    }


    // Получение фильтров
    const dispatch = useDispatch();
    const getFilters = ()=> {
        request("http://localhost:3001/filters")
            .then(data=> dispatch(fitersFetched(data)))        
    }
    const filters = useSelector(state=> state.filters)
    console.log(filters);

    

    return (
        <form 
        className="border p-4 shadow-lg rounded"
        onSubmit={(e)=> {addHeroesServer(e)}}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    onChange={addHeroes}
                    value={stateHeroes.name}
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    onChange={(e)=> addHeroes(e, "distription")}
                    value={stateHeroes.distription}
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    onChange={addHeroes}
                    value={stateHeroes.element}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button 
            type="submit" 
            className="btn btn-primary">
                Создать
            </button>
        </form>
    )
}

export default HeroesAddForm;