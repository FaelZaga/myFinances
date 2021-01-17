import React, { useState, useEffect } from 'react'

import axios from 'axios'

import SelectMenu from '../../components/selectMenu/SelectMenu'
import Input from '../../components/input/Input'
import Card from '../../components/card/Card'
import CardHidden from '../../components/card/CardHidden'
import { months, types, status } from '../../components/selectMenu/SelectMenuData'

import './Finances.css'

export default function Finances() {
    const [create,setCreate] = useState(false);

    const [description, setDescription] = useState("");
    const [type, setType] = useState("");
    const [statuss, setStatuss] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [value, setValue] = useState("");

    const [payments,setPayments] = useState([]);

    useEffect(() => {
        loadPayments()
    }, [])

    async function loadPayments() {
        await axios.get('http://localhost:8080/api/payments', {
            params: {
                user: 10
            }
        }).then(res=> {
            setPayments(res.data)
        }).catch(err=> {
            console.log(err.response.data)
        })
    }

    const createActive = () => {
        setCreate(!create)
    }

    return (
        <div className="container-body">
            <div className="search-panel">
                <div className="search-panel-group">
                    <div className="panel-group button">
                        <button className="button-span" onClick={createActive}><span>New</span></button>
                        <button className="button-span"><span>Search</span></button>
                    </div>
                </div>
                <div div className="search-panel-group">
                    <div className="panel-group description">
                        <Input className="input-field first" type="text" placeholder="Description" />   
                    </div>
                    <div className="panel-group select">
                        <SelectMenu className="select-field" options={months}/>
                        <SelectMenu className="select-field" options={types}/>
                        <SelectMenu className="select-field" options={status}/>
                    </div>
                    <div className="panel-group year">
                        <Input className="input-field last" type="number" placeholder="Year" />
                    </div>
                </div>
            </div>

            <div className="finances-panel">
                <div className={create ? "create-panel active" : "create-panel"}>
                    <CardHidden new={create}
                        type={type}
                        setType={setType}
                        status={statuss}
                        setStatus={setStatuss}
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
                <div className={create ? "edit-panel active" : "edit-panel"}>
                    {payments.map((payment) => {
                        return (
                            <Card key={payment.id} onClick={createActive}
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