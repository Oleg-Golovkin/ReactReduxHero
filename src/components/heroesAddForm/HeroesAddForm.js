import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHttp} from '../../hooks/http.hook';
import { filterFetched } from '../../actions';
import * as yup from 'yup';


const HeroesAddForm = () => {
    // Создание состояния по умолчанию
    const [stateHeroes, setStateHeroes] = useState({
        "name": "",
        "distription": "",
        "element": ""        
    })
    // Cообщение о пройденной валидации. Это же состояние использую
    // для проверки наличия ошибок во всех инпутах сразу, чтобы активировать
    // кнопку отправки данных. Если сделать одно свойство для всех input , то 
    // это свойство будет перезаписываться, а нужна исторя валидации каждого input
    const [stateErrorMessage, setStateErrorMessage] = useState({ 
        "name": true,
        "distription": true,
        "element": true
    })  
    
    //  // Верстка сообщения об ошибке
    const ErrorMessage = ({title})=> {
        return (
            <div style={{color: "red"}}>{stateErrorMessage[title]}</div>
            )
    };

    // Если все input прошли валидацию, то кнопка включается
    const onSubmitAllValidate = () => {
        return stateErrorMessage.name === false 
            && stateErrorMessage.distription === false
            && stateErrorMessage.element === false
            ? false
            : true
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
    // При вводе. Это событие также использую для наполнения
    // состояния
    let schemaOnChange = yup.object().shape({
        name: yup.string(),
        distription: yup.string(),
        element: yup.string()
    });
    const onValidateChange = async (e, title)=> {
        await schemaOnChange.validate({
            // Чтобы не переписывать схему валидации, использую
            // имя инпута
            [title]: e.target.value,
            })
            // При пройденной валидации. Возврат объекта с инф. из инпута
            .then(value => {
                // Наполнение состояния.
                onAddHeroes(value);
                // Записываю отсутствие ошибки. Создаю такой же объек. Только 
                // наполняю его инф. об ошибках. Т.е. для каждого инпута свое
                // свойство об ошибке. Чтобы можно было проверить наличие ошибки 
                // в каждом инпуте
                setStateErrorMessage({...stateErrorMessage, [title] : false}) 
            })
            .catch(err=> {    
                // Библиотека yup дает сведения об ошибке в массиве. Потому его и извлекаю            
                let errors = String(...err.errors) 
                setStateErrorMessage({...stateErrorMessage, [title] : errors})
            })
        }

    // При смене фокуса
    let schemaOnBlur = yup.object().shape({
        name: yup.string().max(30, "Максимум 30 символов").matches(/^[а-яё -]+$/i, "Введите кириллицей"),
        distription: yup.string().max(30, "Максимум 30 символов").matches(/^[а-яё -]+$/i, "Введите кириллицей"),
        element: yup.string().matches(/(Огонь|Вода|Ветер|Земля)/g, "Выберите элемент героя")
    });  
    const onValidateBlur = async (e, title)=>{
        await schemaOnBlur.validate({ 
            [title]: e.target.value,
            })
            .then(value => {
                // Наполнение состояния
                onAddHeroes(value);
                setStateErrorMessage({...stateErrorMessage, [title] : false}) 
                
            })
            .catch(err=> {
                let errors = String(...err.errors)
                setStateErrorMessage({...stateErrorMessage, [title] : errors})
            })
            console.log(e.target.value);
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
    const filters = useSelector(state=> {
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
                    className="form-select" 
                    id="element" 
                    name="element">
                    {filters}
                </select>
                <ErrorMessage title= {"element"}/>
            </div>

            <button 
            type="submit" 
            disabled = {onSubmitAllValidate()}
            className="btn btn-primary">
                Создать 
            </button>
        </form>
    )
}

export default HeroesAddForm;