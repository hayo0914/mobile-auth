import React from 'react';
import { View } from 'react-native';
import { reduxForm, Field, SubmissionError } from 'redux-form';
import { Transition } from 'react-navigation-fluid-transitions';
import {
  Content,
  Card,
  CardItem,
  Body,
  Form,
  Label,
  Button,
  Left,
  Text,
} from 'native-base';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import styles from './styles';
import InputItem from '../../components/Auth/InputItem';
import PrimaryButton from '../../components/common/PrimaryButton';

export interface Props {
  user: object
  signInError: boolean
  error: string;
  username: Number
  password: Number
  loading: boolean
  navigation: object
  signIn: Function
  handleSubmit: (handler: Function) => void
}

export class SignInScreen extends React.Component<Props, any> {
  onSubmit(values: {username: string, password: string} ) {
    if (values.username === undefined || values.username === '') {
      throw new SubmissionError({
        username: 'Please Input Username or E-mail Address',
        _error: 'Sign in Failed !',
      });
    }
    if (values.password === undefined || values.password === '') {
      throw new SubmissionError({
        password: 'Please Input Password',
        _error: 'Sign in Failed !',
      });
    }
    this.props.signIn(values, this.props.navigation);
  }

  renderError(error: string) {
    if (error === undefined || error === null || error === '') {
      return <View />;
    }
    return <Text style={{ color: 'red' }}>{error}</Text>;
  }

  render() {
    const { error, signInError } = this.props;
    return (
      <Content padder>
        <Card>
          <CardItem header bordered>
            <Left>
              <Body>
                <Transition shared="authTitle">
                  <View>
                    <Text>Welcome,</Text>
                    <Text note>Please Sign in to continue</Text>
                  </View>
                </Transition>
              </Body>
            </Left>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Form style={{ alignSelf: 'stretch' }}>
                <Field
                  name={'username'}
                  component={InputItem}
                  label="Username"
                />
                <Field
                  name={'password'}
                  component={InputItem}
                  label="Password"
                  secureTextEntry
                />
              </Form>
              <Transition shared="authSubmitButton" appear="scale">
                <View>
                  <PrimaryButton
                    onPress={this.props.handleSubmit(this.onSubmit.bind(this))}
                    loading={this.props.loading}
                    text="Sign In"
                  />
                </View>
              </Transition>
              {this.renderError(error)}
              {this.renderError(signInError)}
            </Body>
          </CardItem>
          <CardItem bordered>
            <Body>
              <Label style={styles.noticeLabelStyle}>
                Do you have no Account ?
              </Label>
              <Button
                bordered
                style={styles.singupButtonStyle}
                onPress={() => {
                  this.props.navigation.navigate('SignUp');
                }}
              >
                <Text style={styles.singupButtonLabelStyle}>Sign up</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  user: state.auth.user,
  signInError: state.auth.signInError,
  username: state.auth.username,
  password: state.auth.password,
  loading: state.auth.loading,
});

const connected = connect(
  mapStateToProps,
  { signIn }
)(SignInScreen);
export default reduxForm({ form: 'signIn' })(connected);
