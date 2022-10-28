import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";


function ActionMenu() {
   
    const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
        
        <Link
            to=""
            ref={ref}
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
        </Link>
    ))
   
    CustomToggle.propTypes = {
        children: PropTypes.element.isRequired,
        onClick: PropTypes.func.isRequired
    };


    return (
            <div>
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle}>
                        <i className="fe fe-more-vertical text-muted"></i>
                    </Dropdown.Toggle>
                    <Dropdown.Menu align="end">
                        <Dropdown.Header>SETTINGS</Dropdown.Header>
                        <Dropdown.Item eventKey="1">
                            <i className="fe fe-edit dropdown-item-icon"></i> Edit
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                            <i className="fe fe-trash dropdown-item-icon"></i> Remove
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        );
    
}

export default ActionMenu