import { Pressable  , View , Text} from "react-native"
import { forwardRef } from 'react';


type ButtonProps = {
  text: string;
} & React.ComponentPropsWithoutRef<typeof Pressable>;


const CustomButton = forwardRef<View | null, ButtonProps>(
    ({ text, ...pressableProps }, ref) => {
      return (
        <Pressable className="bg-blue-500 mr-3 ml-3 p-3 rounded-full items-center my-5 " ref={ref} {...pressableProps}>
          <Text className="font-bold text-white text-lg">{text}</Text>
        </Pressable>
      );
    }
  );


export default CustomButton; 