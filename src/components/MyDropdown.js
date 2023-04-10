import {Dropdown, DropdownButton} from 'react-bootstrap'
import {useState, useRef} from 'react'
import React from 'react'

const MyDropdown = (props) => {
    
    const [selectedOption, setSelectedOption] = useState(props.type)
    const dropdownRef = useRef(null)

    const handleOptionSelect = (option) => {
        setSelectedOption(option)
        dropdownRef.current.hide();
    }

    return (
        <DropdownButton variant='secondary' ref={dropdownRef} id="dropdown-basic-button" title={selectedOption} onSelect={handleOptionSelect}>
            {props.options.map(choice => {
                return <Dropdown.Item eventKey={choice}>{choice}</Dropdown.Item>
            })}
        </DropdownButton>
    )

}

export default MyDropdown