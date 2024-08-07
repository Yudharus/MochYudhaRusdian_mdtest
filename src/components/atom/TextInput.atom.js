import { TextInput as TextInputRn } from "react-native";
import Tailwind from "../../libs/tailwind/Tailwind.lib";

const TextInput = ({ className, value, ...rest }) => {
  return <TextInputRn style={Tailwind`${className}`} value={value} {...rest} />;
};


export default TextInput