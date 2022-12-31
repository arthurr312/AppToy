import React, { useState } from "react";
import { View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import * as S from './styles';
export const ClusteringField = ({ value, setValue }) => {
    const [items, setItems] = useState([
        { label: 'Mês', value: 'month' },
        { label: 'Dia', value: 'day' },
        { label: 'Semana', value: 'year' },
    ]);
    const [openCluseringOptions, setOpenClusteringOptions] = useState(false);

    return (
        <View style={{ width: '80%' }}>
            <S.Label>Agrupado por:</S.Label>
            <DropDownPicker
                dropDownDirection="TOP"
                placeholder=''
                style={{ border: '2px solid gray', backgroundColor: 'transparent', borderRadius: 6, width: '100%', padding: 10, paddingTop: 7 }}
                open={openCluseringOptions}
                dropDownContainerStyle={{
                    backgroundColor: "#dfdfdf",
                    width: '100%'
                }}
                value={value}
                items={items}
                setOpen={setOpenClusteringOptions}
                setValue={setValue}
                setItems={setItems}
            />
        </View>
    )
}