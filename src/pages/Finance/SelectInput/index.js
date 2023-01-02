import React, {useState} from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as S from './styles';
export const SelectInput = ({ value, setValue, items, setItems, label, dropDownDirection }) => {
    const [openToyOptions, setOpenToyOptions] = useState(false);
    return (
        <View style={{ width: '100%' }}>
            <S.Label>{label}</S.Label>
            <DropDownPicker
                dropDownDirection={dropDownDirection}
                placeholder=''
                style={{ border: '2px solid gray', backgroundColor: 'transparent', borderRadius: 6, width: '100%', padding: 10, paddingTop: 7 }}
                open={openToyOptions}
                dropDownContainerStyle={{
                    backgroundColor: "white",
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