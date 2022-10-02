import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHttp} from '../../hooks/http.hook';
import { filterFetched } from '../../actions';
import * as yup from 'yup';


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
    // Создание состояния по умолчанию
    const [stateHeroes, setStateHeroes] = useState({
        "name": "",
        "distription": "",
        "element": ""        
    })
    // Cообщение о пройденной валидации
    const [stateErrorMessage, setStateErrorMessage] = useState({ 
        "name": false,
        "distription": false,
        "element": false
    })    
    //  // Верстка сообщения об ошибке
    const ErrorMessage = ({title})=> {
        return (
            <div style={{color: "red"}}>{stateErrorMessage[title]}</div>
            )
    };

    const onSubmitAllValidate = () => {
        // return (stateErrorMessage.name 
        //     || stateErrorMessage.distription
        //     || stateErrorMessage.element) == false 
        //     ? true
        //     : (stateErrorMessage.name 
        //     || stateErrorMessage.distription
        //     || stateErrorMessage.element) == ""
        //     ? true
        //     : false    
        console.log((stateErrorMessage.name || stateErrorMessage.distription) == "")  
        // console.log( 
        //          stateErrorMessage.distription
        //         );   
        // console.log(
        //         stateErrorMessage.element);   
    }

    // Изменение состояния для данных из input. 
    const onAddHeroes = (value) => setStateHeroes({...stateHeroes, ...value})
    // Отправка данных после валидации на сервер
    const {request} = useHttp();
    const addHeroesServer = ()=> {
            request("http://localhost:3001/heroes", "POST", JSON.stringify(stateHeroes))
            .then(data=> console.log(data))    
    }

    // Валидация с библиотекой yup
    // При вводе
    let schemaOnChange = yup.object().shape({
        name: yup.string(),
        distription: yup.string(),
        element: yup.string(),        
    });
    const onValidateChange = async (e, title)=> {
        await schemaOnChange.validate({ 
            [title]: e.target.value,
            })
            .then(value => {
                onAddHeroes(value);
                setStateErrorMessage({...stateErrorMessage, [title] : true}) 
            })
            .catch(err=> {                
                let errors = String(...err.errors) 
                setStateErrorMessage({...stateErrorMessage, [title] : errors})
            })
        }

    // При смене фокуса
    let schemaOnBlur = yup.object().shape({
        name: yup.string().max(30, "Максимум 30 символов").matches(/^[а-яё -]+$/i, "Введите кириллицей"),
        distription: yup.string().max(30, "Максимум 30 символов").matches(/^[а-яё -]+$/i, "Введите кириллицей"),
    });  
    const onValidateBlur = async (e, title)=>{
        await schemaOnBlur.validate({ 
            [title]: e.target.value,
            })
            .then(value => {
                onAddHeroes(value);
                setStateErrorMessage({...stateErrorMessage, [title] : true}) 
                
            })
            .catch(err=> {                
                let errors = String(...err.errors) 
                setStateErrorMessage({...stateErrorMessage, [title] : errors})
            })
            console.log(onSubmitAllValidate());
        }
    

    
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

    
    // Создание option
    const options = useSelector(state=> {
        return state.filters.map((item)=> {
            return(
                <option 
                value={item}
                key={item}>{item}</option> 
            )
        })        
    })   
    return (
        <form 
        className="border p-4 shadow-lg rounded"
        onSubmit={addHeroesServer}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    onChange={(e)=> onValidateChange(e, "name")}
                    onBlur={(e)=> onValidateBlur(e, "name")}
                    value={stateHeroes.name}
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"/>
                <ErrorMessage title= {"name"}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    onChange={(e)=> onValidateChange(e, "distription")}
                    onBlur={(e)=> onValidateBlur(e, "distription")}
                    value={stateHeroes.distription}
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
                <ErrorMessage title= {"distription"}/>

            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    onChange={(e)=> onValidateChange(e, "element")}
                    onBlur={(e)=> onValidateBlur(e, "element")}
                    value={stateHeroes.element}
                    required
                    className="form-select" 
                    id="element" 
                    name="element">
                    {options}
                </select>
            </div>

            <button 
            type="submit" 
            // disabled = {}
            className="btn btn-primary">
                Создать 
            </button>
        </form>
    )
}

export default HeroesAddForm;