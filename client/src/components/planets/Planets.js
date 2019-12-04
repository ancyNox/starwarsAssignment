import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { fetchPlanets, navigatePlanets, logout } from '../../actions/planetsActions';
import { connect } from "react-redux";
import { Table, Button, Input, ButtonGroup, Navbar, Nav, NavDropdown, Form } from 'react-bootstrap';

class Planets extends Component {
    
    parseTime(s) {
        var c = s.split(':');
        return parseInt(c[0]) * 60*60 + parseInt(c[1])*60 + parseInt(c[2]);
     }

    search(e, count, user, firstSearch) {
        
        var currentTime = Date().substring(15,24);
        var seconds = this.parseTime(currentTime) - this.parseTime(firstSearch);
        //alert(minutes);

        if (user != "Luke Skywalker"){
            if(count >= 15){
                if(seconds<60){
                    return alert("You have exceded your maximum search limit in a minute!!!");
                }
            }
        }
        this.props.fetchPlanets(e)
    }
    render() {
        let { planets } = this.props;
        let { login } = this.props;
        let { count } = this.props;
        let { people } = this.props;
        let { firstSearch } = this.props;
        if (!login) {
            return <Redirect to='/login' />
        }
        return (
            <div className="container">
                <Navbar expand="lg" sticky="top" className="bg-light">
                    {/* <Navbar.Brand href="#home">Search for Planets</Navbar.Brand> */}
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav className="mr-auto">
                            <NavDropdown title={people.results[0].name} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick={() => this.props.logout()}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        <Nav.Link>Search Count {count}</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <div className="searchBar">
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Search for Planets</Form.Label>
                            <Form.Control type="text" onChange={e => {
                                e.preventDefault()
                                this.search(e, count, people.results[0].name, firstSearch)
                            }} />
                        </Form.Group>
                    </Form>
                </div>

                <div className="planetsListContainer">
                    <Table striped bordered hover>
                        <thead>
                            <tr className="planetsHeading">
                                <th className="name" >NAME</th>
                                <th className="population">POPULATION</th>
                                <th width="10%">
                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant="outline-dark" disabled={planets.previous == null ? true : false} onClick={() => this.props.navigatePlanets(planets.previous)}>Prev</Button>
                                        <Button variant="outline-dark" disabled={planets.next == null ? true : false} onClick={() => this.props.navigatePlanets(planets.next)}>Next</Button>
                                    </ButtonGroup>
                                </th>
                            </tr>
                        </thead>


                        <tbody>

                            {
                                planets.results &&
                                planets.results.map(planet =>
                                    <tr key={planet.name}>
                                        <td className="name" >{planet.name}</td>
                                        <td colSpan="2" className="population" height={Math.log(planet.population) * 6} >{planet.population}</td>
                                    </tr>)
                            }


                        </tbody>

                    </Table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    planets: state.allReducer.planets,
    count: state.allReducer.count,
    login: state.allReducer.login,
    people: state.allReducer.people,
    firstSearch: state.allReducer.firstSearch,
});

const mapDispatchToProps = {
    fetchPlanets,
    navigatePlanets,
    logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Planets);
