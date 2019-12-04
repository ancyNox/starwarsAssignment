import React, { Component } from 'react';
import loignStyle from './login.scss'
import { onSubmit } from '../../actions/peopleActions';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Button, Table, Form, Row, Col, Container } from 'react-bootstrap';

class Login extends Component {


    render() {
        let { people } = this.props;
        let { login } = this.props;
        if (login) {
            return <Redirect to='/viewPlanets' />
        }
        return (
            <Container>
                <Row className="">
                    <Col md={{ span: 6, offset: 3 }}>
                        <div className="formContainer">
                            {
                                (people == null || people.length == 0) ?
                                    <div>"Invalid User"</div> : null
                            }

                            <Form onSubmit={e => {
                                e.preventDefault()
                                this.props.onSubmit(e)
                            }}>
                                <Form.Group controlId="">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control type="text" id="username" name="username" />
                                </Form.Group>

                                <Form.Group controlId="">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" id="password" name="password" />
                                </Form.Group>
                                <Row className="">
                                    <Col md={{ span: 6, offset: 3 }}>
                                        <Button variant="outline-success" type="submit" block>
                                            Login
                    </Button>
                                    </Col></Row>
                            </Form>

                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }


}

const mapStateToProps = state => ({
    people: state.allReducer.people,
    login: state.allReducer.login
});

const mapDispatchToProps = {
    //fetchPeople,
    onSubmit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
