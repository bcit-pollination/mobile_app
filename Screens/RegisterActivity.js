import React, { Component } from 'react'
import { Text, View } from 'react-native'

import {
    ActionsContainer,
    Button,
    FieldsContainer,
    Fieldset,
    Form,
    FormGroup,
    Input,
    Label,
    Switch
} from 'react-native-clean-form'




// Checks if the date is in the correct format
function checkDateFormat(date_string) {
    {

        let reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
        if (date_string.match(reg)) {
            return true;
        }
        else {
            alert("Please enter dd/mm/yyyy");
            return false;
        }
    }
}



const onSubmit = (values, dispatch) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(values.toJS())
            resolve()
        }, 1500)
    })
}

export default class RegisterActivity extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstname: '',
            dateOfBirth: '',
        }
    }

    onChangeFirstName(firstname) {
        // console.log(firstname)
        this.setState({ firstname });
        console.log(firstname);
    }

    onDateOfBirthChange(date_of_birth) {
        console.log("onDateOfBirthChange")
        // checkFormat(date_of_birth)
        this.setState({ date_of_birth });
        console.log(date_of_birth);
    }
    render() {
        const { handleSubmit, submitting } = this.props
        return (
            <Form>
                <FieldsContainer>
                    <Fieldset label="Contact details">
                        <FormGroup>
                            <Label>First name</Label>
                            <Input placeholder="John" onChangeText={(firstname) => this.onChangeFirstName(firstname)} value={this.state.firstname} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Last name</Label>
                            <Input placeholder="Doe" onChangeText={this.onLastNameChange} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Date of Birth</Label>
                            <Input placeholder="dd-mm-yyyy" onChangeText={(date_of_birth) => this.onDateOfBirthChange(date_of_birth)} value={this.state.date} />
                        </FormGroup>

                        <FormGroup>
                            <Label>Email</Label>
                            <Input placeholder="esbenspetersen@gmail.com" onChangeText={this.onEmailChange} />
                        </FormGroup>
                    </Fieldset>
                    <Fieldset label="Password" last>
                        <FormGroup>
                            <Label>Password</Label>
                            <Input placeholder="Enter a password" onChangeText={this.onPasswordChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label>Repeat password</Label>
                            <Input placeholder="Repeat your password" onChangeText={this.onRepeatPasswordChange} />
                        </FormGroup>
                        <FormGroup border={false} >
                            <Label>Save my password</Label>
                            <Switch onValueChange={this.toggleSaveMyPassword} />
                        </FormGroup>
                    </Fieldset>
                </FieldsContainer>
                <ActionsContainer>
                    <Button icon="md-checkmark" iconPlacement="right" onPress={this.save}>Save</Button>
                </ActionsContainer>
            </Form>
        )
    }
}
