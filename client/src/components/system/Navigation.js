import React, { Component } from 'react';

import {NavLink,Link} from "react-router-dom";
import './navigation.css';


class Navigation extends Component {
	render() {
		return(
			<div className="navContainer">
				<NavLink to="/" className="navTab">Products</NavLink>
				<Link to={{ 
                        pathname: '/addEditProduct', 
                        state: { isEdit: false, product: null } 
                      }} className="navTab">Add Product</Link>
			</div>
		);
	}
}

export default Navigation;