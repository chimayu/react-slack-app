import React from 'react';
import {Grid, Header, Icon, Dropdown, Image} from 'semantic-ui-react';
import {connect} from 'react-redux';
import firebase from '../../firebase';

class UserPanel extends React.Component {
    state = {
        user:this.props.currentUser
    }
    dropdownOptions = () => [
        {
            key:'user',
            text:<span>Signed as<strong>{this.state.user.displayName}</strong></span>,
            disabled: true
        },
        {
            key:'avatar',
            text:<span>Change Avatar</span>
        },
        {
            key:'signout',
            text:<span onClick={this.handleSingout}>Signout</span>
        }
    ]

    handleSingout = () => {
        firebase
            .auth()
            .signOut()
            .then(()=>console.log('signout'));
    }

    render(){
        const {user} = this.state;
        return(
            <Grid.Column>
                <Grid.Row style={{ padding: '1.2em', margin: 0 }}>
                    <Header inverted floated="left" as="h2">
                        <Icon name="code"/>
                        <Header.Content>
                            Sun*Chat
                        </Header.Content>
                    </Header>
                </Grid.Row>
                <Header style={{ padding: '0.25em' }} as="h4" inverted>
        <Dropdown trigger={
            <span>
                <Image src={user.photoURL} spaced="right" avatar />
                {user.displayName}
            </span>
        } options={this.dropdownOptions()}/>
                </Header>
            </Grid.Column>
        )
    }
}
const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(UserPanel);