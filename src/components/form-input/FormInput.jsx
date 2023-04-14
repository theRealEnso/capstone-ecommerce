import {FormInputLabel, Input, Group} from './formInput.styles.jsx';

const FormInput = ({label, ...otherProps}) => { // destructuring label and otherProps directly off of props => spread operator to spread out other props such as onClick/name/value/type/required properties
    return (
        <Group>
            <Input {...otherProps} />

            {/* if label exists, then render label */}
            {
                label &&
                <FormInputLabel shrink={otherProps.value.length}>{label}</FormInputLabel>
            }
        </Group>
    );
};

export default FormInput;