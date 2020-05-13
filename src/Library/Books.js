import React from 'react'
import PropTypes from 'prop-types'

/**
 * Компонент отображения списка книг автора.
 *
 * @param author
 * @param showAuthors
 * @return {*}
 * @constructor
 */
function Books({ author, showAuthors }) {
    return (
        <div>
            <div style={{ marginBottom: '.5rem' }}>
                <button onClick={showAuthors}>&laquo; Назад</button>
                &nbsp;
                <strong>{author.name}:</strong>
            </div>
            {author.books.length
                ? author.books.map(a => <div className='author-row' key={a.id}>{a.name}</div>)
                : <em>К сожалению у нас нет ни одной книги этого автора :(</em>
            }
        </div>
    )
}

/**
 * Настраиваем валидацию типов
 * @type {{showAuthors: function, author: *}}
 */
Books.propTypes = {
    author: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        books: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        }))
    }).isRequired,
    showAuthors: PropTypes.func.isRequired
}

export default Books
