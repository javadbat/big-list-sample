import React , {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import 'jb-date-input';
import { useEvent } from '../UseEvent';
function JBDateInput(props) {
    const element = useRef();
    const [refChangeCount, refChangeCountSetter] = useState(0);
    useEffect(() => {
        refChangeCountSetter(refChangeCount + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [element.current]);
    useEvent(element.current,'change',props.onChange,true);
    useEvent(element.current,'onKeyup',props.onKeyup,true);
    useEvent(element.current,'select',props.onSelect,true);
    useEffect(()=>{
        element.current.setAttribute('format',props.format)
    },[props.format]);
    useEffect(() => {
        element.current.value = props.value;
    }, [props.value])
    return (
        <jb-date-input label={props.label} value-type={props.valueType?props.valueType:'GREGORIAN'} min={props.min} max={props.max} ref={element} ></jb-date-input>
    );
}
JBDateInput.propTypes = {
    label: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    format: PropTypes.string,
    onKeyup: PropTypes.func,
    onChange: PropTypes.func,
    onSelect: PropTypes.func,
    valueType: PropTypes.string,
    value: PropTypes.string
};
export default JBDateInput;
