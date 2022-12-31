import React, {useState} from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as S from './styles';
export const ToyField = ({ value, setValue, items, setItems }) => {
    const [openToyOptions, setOpenToyOptions] = useState(false);
    // const [items, setItems] = useState([
    //     { label: 'Mês', value: 'month' },
    //     { label: 'Dia', value: 'day' },
    //     { label: 'Semana', value: 'year' },
    // ]);
    return (
        <View style={{ width: '80%' }}>
            <S.Label>Escolha um brinquedo:</S.Label>
            <DropDownPicker
                placeholder=''
                style={{ border: '2px solid gray', backgroundColor: 'transparent', borderRadius: 6, width: '100%', padding: 10, paddingTop: 7 }}
                open={openToyOptions}
                dropDownContainerStyle={{
                    backgroundColor: "#dfdfdf",
                    width: '100%'
                }}
                value={value}
                items={items}
                setOpen={setOpenToyOptions}
                setValue={setValue}
                setItems={setItems}
            />
        </View>
    )
};