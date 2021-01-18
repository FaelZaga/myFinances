import React, { useState, useEffect } from 'react'

import axios from 'axios'

import SelectMenu from '../../components/selectMenu/SelectMenu'
import Input from '../../components/input/Input'
import Card from '../../components/card/Card'
import CardHidden from '../../components/card/CardHidden'
import { months, types, status } from '../../components/selectMenu/SelectMenuData'

import './Finances.css'

export default function Finances() {
    const [hidden,setHidden] = useState(false);
    const [newMode,setNewMode] = useState(false);

    const [id,setId] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [stat, setStat] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [value, setValue] = useState("");

    const [payments,setPayments] = useState([]);

    useEffect(() => {
        loadPayments()
    }, [hidden])

    async function create() {
        await axios.post('http://localhost:8080/api/payments', {
            "description": description,
            "month": month,
            "year": year,
            "value": value,
            "type": type,
            "status": stat,
            "user": {
                "id": 10,
                "name": "Usuario um",
                "email": "usuario1@email.com",
                "password": "um23456"
            }
        }).then(res=> {
            console.log("saved with success")
            setHidden(!hidden)
        }).catch(err=> {
            console.log(err.response.data)
        })
    }

    async function edit() {
        await axios.put('http://localhost:8080/api/payments/'+id, {
            "description": description,
            "month": month,
            "year": year,
            "value": value,
            "type": type,
            "status": stat,
            "user": {
                "id": 10,
                "name": "Usuario um",
                "email": "usuarioum@email.com",
                "password": "user123"
            }
        }).then(res=> {
            console.log("edited with success")
            setHidden(!hidden)
        }).catch(err=> {
            console.log(err.response.data)
        })
    }

    async function remove() {
        await axios.delete('http://localhost:8080/api/payments/'+id)
        .then(res=> {
            console.log("removed with success")
            setHidden(!hidden)
        }).catch(err=> {
            console.log(err.response.data)
        })
    }

    async function loadPayment(id) {
        await axios.get('http://localhost:8080/api/payments/'+id
        ).then(res=> {
            setDescription(res.data.description);
            setType(res.data.type);
            setStat(res.data.status);
            setMonth(res.data.month);
            setYear(res.data.year);
            setValue(res.data.value);

            if (!hidden) {changeHidden()}
        }).catch(err=> {
            console.log(err.response.data)
        })
    }

    async function loadPayments() {
        await axios.get('http://localhost:8080/api/payments', {
            params: {
                user: 10
            }
        }).then(res=> {
            setPayments((res.data).reverse())
        }).catch(err=> {
            console.log(err.response.data)
        })
    }

    const changeHidden = () => {
        setHidden(!hidden)
        if (hidden === true && newMode === true) {
            setNewMode(false)
        }
    }

    const handleNew = () => {
        if (!hidden) {
            changeHidden()
        }
        setNewMode(true)
        clear()
    }

    const handleLoad = (id) => {
        setId(id)
        setNewMode(false)
        loadPayment(id)
    }

    const clear = () => {
        setDescription("");
        setType("");
        setStat("");
        setMonth("");
        setYear("");
        setValue("");
    }

    return (
        <div className="container-body">
            <div className="search-panel">
                <div className="search-panel-group">
                    <div className="panel-group button">
                        {newMode ? <button className="button-span" onClick={changeHidden}><span>Close</span></button>
                        : <button className="button-span" onClick={handleNew}><span>New</span></button>}
                    </div>
                </div>
                <div div className="search-panel-group">
                    <div className="panel-group description">
                        <Input className="input-field first" type="text" placeholder="Description" autocomplete="off"/>   
                    </div>
                    <div className="panel-group select">
                        <SelectMenu className="select-field" options={months}/>
                        <SelectMenu className="select-field" options={types}/>
                        <SelectMenu className="select-field" options={status}/>
                    </div>
                    <div className="panel-group year">
                        <Input className="input-field last" type="number" placeholder="Year" autocomplete="off"/>
                    </div>
                    <div className="panel-group button">
                        <button className="button-span"><span>Search</span></button>
                    </div>
                </div>
            </div>

            <div className="finances-panel">
                <div className={hidden ? "create-panel active" : "create-panel"}>
                    <CardHidden new={newMode} create={create} edit={edit} delete={remove} cancel={changeHidden}
                        type={type}
                        setType={setType}
                        status={stat}
                        setStatus={setStat}
                        month={month}
                        setMonth={setMonth}
                        year={year}
                        setYear={setYear}
                        description={description}
                        setDescription={setDescription}
                        value={value}
                        setValue={setValue}
                    ></CardHidden>
                </div>
                <div className={hidden ? "edit-panel active" : "edit-panel"}>
                    {payments.map((payment,i) => {
                        return (
                            <Card key={i} onClick={() => handleLoad(payment.id)}
                                type={payment.type}
                                status={payment.status}
                                month={payment.month}
                                year={payment.year}
                                description={payment.description}
                                value={payment.value}
                            />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}