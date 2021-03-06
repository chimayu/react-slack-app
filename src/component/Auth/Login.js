import React, {Component} from 'react';
import {Grid, Form, Segment, Button, Header, Message, Icon} from 'semantic-ui-react';
import {Link} from 'react-router-dom';
import firebase from '../../firebase';
// import md5 from 'md5';

class Login extends Component {
    // 状態管理
    state={
        email:'',
        password:'',
        errors:[],
        loading: false
        // usersRef: firebase.database().ref('users')
    }

    // メソッド
    displayErrors = errors => errors.map(
        (error, i) => <p key={i}>{error.message}</p>
    )
    handleChange = (event)=> {
        this.setState({
            [event.target.name]:event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if(this.isFormValid(this.state)){
            this.setState({ 
                errors: [],
                loading: true
            })
            firebase
                .auth()
                .signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(signedInUser => {
                    console.log(signedInUser);
                })
                .catch(err=>{
                    console.log(err);
                    this.setState({
                        errors: this.state.errors.concat(err),
                        loading: false
                    })
                })
        }
    }

    handleInputError = (errors, inputName) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(inputName)
        ) ? 'error' : '' ;
    }
    isFormValid = ({email, password}) => email && password;

    handleInputError = (errors, inputName) => {
        return errors.some(error =>
            error.message.toLowerCase().includes(inputName)
        ) ? 'error' : '' ;
    }

    // レンダー
    render(){
        const { email, password, errors, loading } = this.state;
        return(
            <Grid textAlign="center" verticalAlign="middle" className="app">
                <Grid.Column style={{maxWidth: 450}}>
                    <Header as="h2" icon color="violet" textAlign="center">
                        <Icon name="code branch" color="violet" />
                        Login for devChat
                    </Header>
                    <Form size="large" onSubmit={this.handleSubmit}>
                        <Segment stacked>

                            <Form.Input fluid name="email" icon="mail" iconPosition="left" placeholder="Email Address" type="email" onChange={this.handleChange} value={email} />

                            <Form.Input fluid name="password" icon="lock" iconPosition="left" placeholder="password" type="password" onChange={this.handleChange} 
                            value={password} className={this.handleInputError(errors, 'password')} />
                            
                            <Button disabled={loading} className={loading ? 'loading' : ''} color="violet" fluid size="large">Login</Button>
                        </Segment>
                        { errors.length > 0 && (
                            <Message>
                                <h3>Error</h3>
                                {this.displayErrors(errors)}
                            </Message>
                        )}
                    </Form>
                    <Message>Don't have an account? <Link to="/register">Register</Link></Message>
                </Grid.Column>
            </Grid>
        )
  }
}

export default Login;
