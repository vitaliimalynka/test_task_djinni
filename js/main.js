const cards = [
    {
        id: 1,
        title: 'Heading',
        text: 'Here goes some sample, example text that is relatively short.',
        img: 'thumbnail_1.png',
        alt: 'some image'
    },
    {
        id: 2,
        title: 'Heading',
        text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.',
        img: 'thumbnail_2.png',
        alt: 'some image'
    },
    {
        id: 3,
        title: 'Heading',
        text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content. We need more words in this description! Test different length of the text in the cards',
        img: 'thumbnail_3.png',
        alt: 'some image'
    },
    {
        id: 4,
        title: 'Heading',
        text: 'Here goes some sample, example text that is relatively short.',
        img: 'thumbnail_4.png',
        alt: 'some image'
    },
    {
        id: 5,
        title: 'Heading',
        text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content. We need more words in this description! Test different length of the text in the cards',
        img: 'thumbnail_3.png',
        alt: 'some image'
    },
]

const checkResult = (result, selector) => {
    if (!result || (result).length === 0) {
        console.error(`Can't find element with selector "${selector}"`)
        return null
    } else {
        return result
    }
}

const getElement = (selector) => {
    return checkResult(document.querySelector(selector), selector)
}
const getAll = (selector) => {
    return checkResult(document.querySelectorAll(selector), selector)
}

class Card {
    #card

    #alt
    #id
    #img
    #text
    #title

    constructor({ id, title, text, img, alt } = obj) {
        this.#id = id
        this.#title = title
        this.#text = text
        this.#img = `assets/images/${img}`
        this.#alt = alt ? alt : 'photo'
    }

    static cardTemplate = getElement('#cardsTemplate')
    static cardsWrapper = document.getElementById('cardsWrapper')

    #fillCard() {
        const cardElement = this.#card.querySelector('[data-card]')
        const imgElement = this.#card.querySelector('[data-card-image]')
        const textElement = this.#card.querySelector('[data-card-text]')
        const titleElement = this.#card.querySelector('[data-card-title]')

        cardElement.id = `cardId-${this.#id}`
        imgElement.alt = this.#alt
        imgElement.src = this.#img
        textElement.innerText = this.#text
        titleElement.innerText = this.#title
    }

    #updateTextRendering() {
        const card = Card.cardsWrapper.lastElementChild
        const textElement = card.querySelector('[data-card-text]')
        const showBtn = card.querySelector('[data-card-show-btn]')
        const textHeight = textElement.clientHeight

        if (textHeight < 50) {
            return
        }
        
        const textClassList = textElement.classList

        showBtn.classList.toggle('show')
        textClassList.toggle('show')

        showBtn.addEventListener('click', () => {
            textClassList.add('animate')
            textClassList.toggle('show')
            if (textClassList.contains('show')) {
                textElement.style.height = textHeight + 'px'
            } else {
                textElement.style.height = ''
            }

        })

    }

    addCardsToDOM() {
        const template = Card.cardTemplate
        if (!template) {
            return
        }

        this.#card = document.importNode(template.content, true)
        this.#fillCard()
        Card.cardsWrapper.appendChild(this.#card)
        this.#updateTextRendering()
    }
}




function init() {
    if (cards.length > 0) {
        cards.forEach(card => (new Card(card)).addCardsToDOM())
    }
}

window.addEventListener('DOMContentLoaded', init)
