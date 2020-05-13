import React from 'react'
import PropTypes from 'prop-types'

/**
 * Компонент списка авторов.
 *
 * @param authorsData
 * @param showAuthorBooks
 * @return {*}
 * @constructor
 */
function Authors({ authorsData, showAuthorBooks }) {

    /**
     * Форматированный вывод количества книг со склонением.
     *
     * @param {number} count
     * @return {string}
     */
    const booksCountString = (count) => {
        const n1 = count % 100
        const n2 = count % 10
        let textForm = ''

        if (n1 > 10 && n1 < 20) textForm = 'книг'
        else if (n2 > 1 && n2 < 5) textForm = 'книги'
        else if (n2 === 1) textForm = 'книга'
        else textForm = 'книг'

        return count +' '+ textForm
    }

    /**
     * Отрисовывем компонент.
     */
    return (
        authorsData.map((author) => {
            return(
                <div className='author-row' key={author.id} onClick={() => { showAuthorBooks(author.id) }}>
                    {author.name} ({ booksCountString(author.books.length) })
                </div>
            )
        })
    )
}

/**
 * Настраиваем валидацию типов
 * @type {{authorsData: *, showAuthorBooks: function}}
 */
Authors.propTypes = {
    authorsData: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        books: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        }))
    })).isRequired,
    showAuthorBooks: PropTypes.func.isRequired
}

export default Authors