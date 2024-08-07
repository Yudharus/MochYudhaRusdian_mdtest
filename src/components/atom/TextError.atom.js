import React, { Fragment } from "react";
import { Text } from "react-native";
import Tailwind from "../../libs/tailwind/Tailwind.lib";

const TextError = ({ text }) => {
    return (
        <Fragment>
            <Text style={Tailwind`font-robotoRegular text-xs text-red-500 italic mt-1`}>
                {text}
            </Text>
        </Fragment>
    )
}

export default TextError