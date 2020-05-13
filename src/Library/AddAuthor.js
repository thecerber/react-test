import React from 'react'
import PropTypes from 'prop-types'

/**
 * Компонент формы добавления нового автора.
 *
 * @param addAuthor
 * @return {*}
 * @constructor
 */
function AddAuthor({ addAuthor }) {

    const [inputValue, setInputValue] = React.useState('')

    /**
     * Обрабочик отправки формы.
     *
     * @param event
     * @return void
     */
    const submitHandler = event => {
        event.preventDefault()
        const value = inputValue.trim()

        if (value) {
            addAuthor(value)
            setInputValue('')
        }
    }

    /**
     * Отрисовываем форму
     */
    return (
        <form style={{ marginBottom: '1rem' }} onSubmit={submitHandler}>
            <input className='form-input' value={inputValue} onChange={event => setInputValue(event.target.value)} />
            <button className='form-input' type='submit'>Добавить автора</button>
        </form>
    )
}

/**
 * Настраиваем валидацию типов
 * @type {{addAuthor: function}}
 */
AddAuthor.propTypes = {
    addAuthor: PropTypes.func.isRequired
}

export default AddAuthor
