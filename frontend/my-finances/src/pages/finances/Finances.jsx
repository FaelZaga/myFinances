import React from 'react'

import SelectMenu from '../../components/selectMenu/SelectMenu'
import Input from '../../components/input/Input'
import Card from '../../components/card/Card'
import { months, types, status } from '../../components/selectMenu/SelectMenuData'

import './Finances.css'

export default function Finances() {
    return (
        <div className="container-body">
            <div className="search-panel">
                <label className="input-label">Search</label>
                <Input className="input-field first" type="text" placeholder="Description" />        
                <SelectMenu className="select-field" options={months}/>
                <SelectMenu className="select-field" options={types}/>
                <SelectMenu className="select-field" options={status}/>
                <Input className="input-field last" type="number" placeholder="Year" />
            </div>

            <div className="finances-panel">
                <Card disabled={true}></Card>
                <Card disabled={true}></Card>
                <Card disabled={true}></Card>
                <Card disabled={true}></Card>

            </div>
        </div>
    )
}