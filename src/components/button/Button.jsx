import {BaseButton, GoogleSignInButton, InvertedButton} from './button.styles.jsx';

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted',
}

//In JavaScript, "hashmaps" and "map objects" are similar but not exactly the same thing.

//A hashmap is a general programming concept that refers to a data structure that maps keys to values, where each key is unique. A hashmap is typically implemented using an array and a hashing function to map keys to array indices.

//In JavaScript, the closest equivalent to a hashmap is an object literal ({}), which allows you to define key-value pairs, and where keys must be unique strings or symbols. You can access and modify object properties using dot notation or bracket notation.

// On the other hand, a Map object is a built-in data structure in JavaScript that is similar to a hashmap, but with a few key differences. Unlike object literals, Map objects allow keys of any data type, not just strings or symbols. Additionally, Map objects maintain the order of key-value pairs, whereas object properties do not have a guaranteed order.

// So while they share some similarities, a "hashmap" generally refers to a more general concept of a data structure, whereas a "Map object" is a specific implementation of a hashmap-like data structure in JavaScript.

//////////////////////////////////////////////////////////////////////////////////////////////

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base) => 
    //This function takes an optional buttonType argument (defaulting to 'base') and returns a styled component based on the button type. It does this by creating a map object that maps each button type to its corresponding styled component, and then accessing the appropriate value based on the provided buttonType. The returned value is then assigned to the variable CustomButton.
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseButton, // 'base' : BaseButton
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInButton, // 'google-sign-in' : GoogleSignInButton
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton, // 'inverted' : InvertedButton
    }[buttonType]);
    //In the getButton function, the object literal inside the parentheses is using COMPUTED PROPERTY NAMES to map the values in the BUTTON_TYPE_CLASSES object to their corresponding styled components. For example, BUTTON_TYPE_CLASSES.base comes from the BUTTON_TYPE_CLASSES object, and the .base returns value of string 'base'

    //So, if the buttonType argument is 'base', then getButton will return the BaseButton styled component, because the expression [BUTTON_TYPE_CLASSES.base] evaluates to 'base' which is the same as the variable name for the BaseButton styled component.

    //The buttonType argument / placehodler is used to dynamically compute the property name of the styled component that should be returned by the function. 
    
    //The [buttonType] syntax is used to access the property in the object literal with the key that matches the value of buttonType.

    //So, for example, if buttonType is 'inverted', the expression [buttonType] would evaluate to 'inverted', and the function would return the InvertedButton styled component.


const Button = ({children, buttonType, ...otherProps}) => { // children aka props.children = content to be displayed inside of button, buttonType aka. props.buttonType = type of button, otherProps aka props.otherProps = any additional props which are spread into the otherProps object
    const CustomButton = getButton(buttonType);
    return (
        <CustomButton {...otherProps}>
            {children}
        </CustomButton>
    );
};

export default Button;