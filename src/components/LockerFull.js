
import React, { Component } from 'react';
import { View, Image, Picker, Text, StyleSheet, TouchableOpacity, Dimensions, Container } from 'react-native';

const items = ['Simon Mignolet', 'Nathaniel Clyne', 'Dejan Lovren', 'Mama Sakho', 'Emre Can'];

var BUTTONS = ['Option 0', 'Option 1', 'Option 2', 'Delete', 'Cancel',];

export default class testBase2 extends Component {

    constructor(props) {

        super(props);
        this.state = {
            selected1: 'key1'
        }
    }

    getItems(val) {
        if (val === 'key1') {
            return items;        
        }
        else if(val === 'key2') {
            return items;
        }
        else {
            return BUTTONS;
        }    }

    onValueChange(value) {
        this.setState({
            selected1: value
        });
    }

    onValueChange2(value) {
        this.setState({
            selected2: value
        });
    }

    render() {

        return (

            <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name="heart" size={20} color='red' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Hello</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder>
                    <Picker
                        iosHeader="Select one"
                        mode="dropdown"
                        selectedValue={this.state.selected1}
                        onValueChange={this.onValueChange.bind(this)}>
                        <Item label="Wallet" value="key0" />
                        <Item label="ATM Card" value="key1" />
                        <Item label="Debit Card" value="key2" />
                        <Item label="Credit Card" value="key3" />
                        <Item label="Net Banking" value="key4" />
                    </Picker>
                    <Picker
                        iosHeader="Select one"
                        mode="dropdown"
                        defaultLabel={"waiting"}
                        selectedValue={this.state.selected2}
                        onValueChange={this.onValueChange2.bind(this)}>
                        {this.getItems(this.state.selected1).map((item, i) => {
                            console.log('item', item);
                            return <Item label={item} key={`${i}+1`} value={i} />
                        })}
                    </Picker>
                </Content>
            </Container>
        );
    }
}