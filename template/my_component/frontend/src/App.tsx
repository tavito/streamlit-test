import React, { useState } from "react"

import {
    Streamlit,
} from "streamlit-component-lib"

function App({ style, name, uploaded_file }: { readonly style: any, readonly name: any, readonly uploaded_file: any }) {

    const [numClicks, setNumClicks] = useState(0);
    const [isFocused, setIsFocused] = useState(false);

    /** Click handler for our "Click Me!" button. */
    const onClicked = (): void => {
        // Increment state.numClicks, and pass the new value back to
        // Streamlit via `Streamlit.setComponentValue`.
        setNumClicks(prevNumClicks => prevNumClicks + 1);
        Streamlit.setComponentValue(numClicks);
        console.log("uploaded_file", uploaded_file)
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(data => {
                console.log('Datos recibidos:', data);
                // Puedes hacer algo con los datos aquí
                // Ocultar el spinner después de recibir los datos
                // document.getElementById('spinner').style.display = 'none';
            })
            .catch(error => {
                console.error('Error en la llamada Ajax:', error);

                // Ocultar el spinner en caso de error
                // document.getElementById('spinner').style.display = 'none';
            });
    };

    /** Focus handler for our "Click Me!" button. */
    const _onFocus = (): void => {
        setIsFocused(true);
    };

    /** Blur handler for our "Click Me!" button. */
    const _onBlur = (): void => {
        setIsFocused(false);
    };
    return (
        <span>
            Hello, {name}! &nbsp;
            <button
                style={style}
                onClick={onClicked}
                // disabled={disabled}
                onFocus={_onFocus}
                onBlur={_onBlur}
            >
                Click Me!
            </button>
        </span>
    );
}

export default App;