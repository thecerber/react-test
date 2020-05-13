import React from 'react'
import Loader from './Loader'
import AddAuthor from './Library/AddAuthor'
import Authors from './Library/Authors'
import Books from './Library/Books'

/**
 * Simple React Application
 */
class App extends React.Component {

    /**
     * Инициализируем состояние компонента.
     *
     * @param {object} props
     * @return {void}
     */
    constructor(props) {
        super(props);
        this.state = {
            authorsData: [],
            showLoader: true,
            selectedAuthorID: 0
        }
    }

    /**
     * Сортировка массива объектов по значению их свойства `name`
     *
     * @param {[]} arrayOfObjects
     * @return {[]}
     */
    sortByName(arrayOfObjects) {
        arrayOfObjects.sort((a, b) => a.name > b.name ? 1 : -1)
    }

    /**
     * Компонент отрисован и готов к работе (смотнирован в DOM),
     * подгружаем информацию об авторах и инициализируем ре-рендеринг.
     *
     * @return {void}
     */
    componentDidMount() {
        fetch('/authors.json')
            .then(response => response.json())
            .then(authors => {

                // сортируем список авторов по имени
                this.sortByName(authors)

                // имитируем задержку ответа от сервера (2сек) и перерисовывем компонент списка авторов
                setTimeout(() => this.setState({authorsData: authors, showLoader: false}), 2000)
            })
    }

    /**
     * Отрисовка компонента
     * @returns {*}
     */
    render() {
        // Проверяем был ли выбран какой-либо автор
        const isAuthorSelected = (this.state.selectedAuthorID > 0)
        let selectedAuthorData = {}

        if (isAuthorSelected) {
            // извлекаем из State объект выбранного автора
            this.state.authorsData.map(author => {
                if (author.id === this.state.selectedAuthorID) {
                    selectedAuthorData = author
                }
                return author
            })
        }

        // Запоминаем идентификатор выбранного автора и отрисовываем список его книг
        const showAuthorBooks = authorID => {
            this.setState({ selectedAuthorID: authorID})
        }
        // Сбрасываем идентификатор автора и отрисовываем список авторов
        const showAuthors = () => {
            this.setState({ selectedAuthorID: 0 });
        }

        const addAuthor = (authorName) => {
            // Демонстрируем индикатор загрузки
            this.setState({ showLoader: true })

            // имитируем задержку ответа сервера (2сек)
            setTimeout(() => {
                fetch('/add-author.json?authorName='+ authorName)
                    .then(response => response.json())
                    .then(response => {

                        if (response.status === 'ok') {
                            // получаем обновленный список авторов
                            let authorsData = this.state.authorsData.concat([{
                                id: this.state.authorsData.length + 1,
                                name: authorName,
                                books: []
                            }])

                            // сортируем список авторов по имени
                            this.sortByName(authorsData)

                            // перерисовывем новый обновленный список авторов
                            this.setState({ authorsData: authorsData, showLoader: false })
                        }
                    })
            }, 2000);
        }

        // Отрисовывем необходимые компоненты приложения
        return (
            <div className='wrapper'>
                <h1>React App</h1>
                {isAuthorSelected ? (
                    <Books author={selectedAuthorData} showAuthors={showAuthors}/>
                ) : (
                    <div>
                        <AddAuthor addAuthor={addAuthor}/>
                        {this.state.showLoader
                            ? <Loader/>
                            : <Authors authorsData={this.state.authorsData} showAuthorBooks={showAuthorBooks}/>}
                    </div>
                )}
            </div>
        )
    }
}

export default App;
