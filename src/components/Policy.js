import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

class Policy extends Component {
    render() {
        return (
            <View style={{ flex: 1 }}>

                <ScrollView>
                    <Text>{`
 Policy
            ในการใช้งานตู้ล็อกเกอร์ ผู้ใช้งานไม่สามารถนำสิ่งของดังต่อไปนี้ เก็บไว้ในตู้ล็อกเกอร์
            
        1. อาหาร และ ของกินที่มีความสดใหม่ และหมดอายุได้ในเวลาสั้น
        2. สิ่งของผิดกฎหมาย เช่น ยาเสพติด 
        3. สิ่งที่เป็นอันตราย เช่น อาวุธ ระเบิด
        4. สิ่งของที่มีกลิ่นไม่พึงประสงค์
        5. ทรัพย์สินที่มีค่า เช่น เครื่องเพชร เงิน
            ทางผู้ให้บริการ ไม่ขอรับผิดชอบ ในกรณีสิ่งของมีความเสียหาย หรือชำรุด 
                        `}
                    </Text>
                </ScrollView>

            </View>


        );
    }
}


export default Policy;
