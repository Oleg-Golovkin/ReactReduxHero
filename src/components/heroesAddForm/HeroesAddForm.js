import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {useHttp} from '../../hooks/http.hook';
import { filterFetched } from '../../actions';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
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
//     const [stateHeroes, setStateHeroes] = useState({
//         "name": "",
//         "distription": "",
//         "element": ""        
//     })   
    

//     let schema = yup.object().shape({
//         name: yup.string().required(),
//         distription: yup.number(),
//         element: yup.number().required(),
//     });  

//     const addHeroes = (e, title)=> {
//         setStateHeroes({...stateHeroes, [title]: e.target.value})
// }   
    const {request} = useHttp(); 
    // const addHeroesServer = (e)=> {}


    // Получение фильтров
    // const dispatch = useDispatch();
    // const getFilters = async ()=> {
    //     await request("http://localhost:3001/filters")
    //         .then(data=> dispatch(filterFetched(data)))        
    // }

    // useEffect(()=>{
    //     getFilters(); 
    // }, [])

    // // Создание option
    // const options = useSelector(state=> {
    //     return state.filters.map((item)=> {
    //         return(
    //             <option 
    //             value={item}
    //             key={item}>{item}</option> 
    //         )
    //     })        
    // })
    // console.log(options);

    return (
        <Formik
            initialValues = {{
                "name": "",
                "distription": "",
                "element": ""   
            }}        
            validationSchema = {Yup.object({
                name: Yup.string()
                        .min(2, 'Минимум три символа')
                        .required('Обязательное поле'),
                distription: Yup.string()
                        .email('Неверный формат email')
                        .required('Обязательное поле'),
                element: Yup.string()
                })}
            onSubmit = {async values => await request("http://localhost:3001/heroes", "POST", JSON.stringify(values, null, 2))
                        .then(data=> console.log(data))}
        >
            <Form 
                className="border p-4 shadow-lg rounded"
            >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                    <Field 
                        required
                        type="text" 
                        name="name" 
                        className="form-control" 
                        id="name" 
                        placeholder="Как меня зовут?"/>
                    <ErrorMessage 
                    name="name" 
                    component="div" 
                    />  
                </div>

                <div className="mb-3">
                    <label htmlFor="text" className="form-label fs-4">Описание</label>
                    <Field 
                        required
                        type="text" 
                        name="text" 
                        className="form-control" 
                        id="text" 
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}/>
                    <ErrorMessage 
                        name="text" 
                        component="div" 
                        />
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                    <Field  
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    as="select">
                        <option >Я владею элементом...</option>
                        <option value="fire">Огонь</option>
                        <option value="water">Вода</option>
                        <option value="wind">Ветер</option>
                        <option value="earth">Земля</option>        
                    </Field>
                    <ErrorMessage 
                    name="element" 
                    component="div" 
                    />
                </div>

                <button 
                type="submit"
                name="submit"
                id="submit"
                className="btn btn-primary">
                    Создать
                </button>
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;