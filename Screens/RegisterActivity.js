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

export default class RegisterActivity extends Component {
    render() {
        return (
            <Form>
                <FieldsContainer>
                    <Fieldset label="Contact details">
                        <FormGroup>
                            <Label>First name</Label>
                            <Input placeholder="Esben" onChangeText={this.onFirstNameChange} />
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
