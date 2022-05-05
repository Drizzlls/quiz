function _radioButton(arr) {
    arr.forEach(el => {
        el.addEventListener('click', addActive)
    })

    function addActive() {
        arr.forEach(el => {
            el.classList.remove('_active')
        })
        this.classList.add('_active')
    }
}

function _checkboxButton(arr) {
    arr.forEach(el => {
        el.addEventListener('click', function () {
            this.classList.toggle('_active')
        })
    })
}

function _scrollDown() {
    let el = $('html, body')
    el.animate({scrollTop: el.get(0).scrollHeight}, 700);
}

function _setAnswerContentActive(content) {
    setTimeout(() => {
        content.querySelector('.answer__content').classList.add('_active')
    }, 1000)
}

function _showWarning() {
    document.querySelector('.warning').classList.add('_active')
}

function _hideWarning() {
    document.querySelector('.warning').classList.remove('_active')
}

window.addEventListener('load', () => {
    let content = document.querySelector('.content'),
        askContent = document.querySelector('.ask__content'),
        askWriting = document.createElement('div')

    let windowInnerWidth = window.innerWidth,
        delay = 2000, //2000
        ms = 0
    windowInnerWidth > 760 ? ms = 2000 : ms = 4000

    askWriting.className = 'ask__writing'
    askWriting.innerHTML = `
        <p class="ask__writing-text">Менеджер печатает</p>
        <div class="ask__writing-dots"><span></span><span></span><span></span></div>
    `
    setTimeout(() => {
        document.querySelector('.main__preloader').classList.add('_hide')
    }, ms - 300)

    let promise = new Promise(resolve => {
        setTimeout(() => {
            content.classList.add('_show')
            askContent.insertAdjacentElement('beforeend', askWriting)
            _scrollDown()
            resolve()
        }, ms)
    })

    promise.then(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                let askText = document.createElement('div')
                askText.className = 'ask__text mb-2'
                askText.innerText = 'Здравствуйте! Меня зовут Юлия Викторовна.\n' + 'Я онлайн-консультант  компании Списать-долги.'
                askWriting.insertAdjacentElement('beforebegin', askText)
                setTimeout(() => {
                    askText.classList.add('_active')
                }, 100)
                _scrollDown()
                resolve()
            }, delay)
        })
    }).then(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                let askText = document.createElement('div')
                askText.className = 'ask__text mb-2'
                askText.innerText = 'Ответьте, пожалуйста, на пару вопросов и я подберу для Вас 1-3 лучших варианта списания кредитов и долгов.'
                askWriting.insertAdjacentElement('beforebegin', askText)
                setTimeout(() => {
                    askText.classList.add('_active')
                }, 100)
                _scrollDown()
                resolve()
            }, delay + 1000)
        })
    }).then(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                let askText = document.createElement('div')
                askText.className = 'ask__text mb-2'
                askText.innerHTML = `
                    <p class="mb-1">Подскажите, какая у Вас общая сумма ВСЕХ кредитов и долгов?</p>
                    <p>Выберите соответствущий вариант из списка ниже, нажав на него:</p>
                `
                askWriting.insertAdjacentElement('beforebegin', askText)
                setTimeout(() => {
                    askText.classList.add('_active')
                }, 100)
                _scrollDown()
                resolve()
            }, delay + 1000)
        })
    }).then(() => {
        return new Promise(resolve => {
            setTimeout(() => {
                let askGrid = document.createElement('div')
                askGrid.className = 'ask__grid _first-grid'
                askGrid.innerHTML = `
                    <div data="11"><p></p>Менее <span class="semi-bold">200 000</span> рублей</div>
                    <div data="12"><p></p>От <span class="semi-bold">200 000</span> до <span class="semi-bold">500 000</span> рублей</div>
                    <div data="13"><p></p>От <span class="semi-bold">500 000</span> до <span class="semi-bold">1 000 000</span> рублей</div>
                    <div data="14"><p></p>От <span class="semi-bold">1 000 000</span> до <span class="semi-bold">5 000 000</span> рублей</div>
                    <div data="15"><p></p>Более <span class="semi-bold">5 000 000</span> рублей</div>
                `
                askWriting.insertAdjacentElement('beforebegin', askGrid)
                askWriting.remove()
                setTimeout(() => {
                    askGrid.classList.add('_active')
                }, 100)
                let buttons = askGrid.querySelectorAll('div')
                _radioButton(buttons)
                _scrollDown()
                resolve()
            }, delay)
        })
    })


    document.addEventListener('click', (e) => {
        let isClicked = e.target.closest('.ask__grid._first-grid div')

        if (isClicked) {
            var answerdata = $(isClicked).attr('data')
//            $.ajax({
//                type: 'POST',
//                url: 'handler.php',
//                data: 'action='+'answer'+'&value='+answerdata,
//                success: function(html){ }
//            });
            
            let clientText = isClicked.innerText,
                bodyContent = document.querySelector('.body-content'),
                answer = document.createElement('div')

            let askBox = isClicked.closest('.ask')

            answer.className = 'body-content__answer answer _first'
            answer.innerHTML = `
                <input type="text" name="1" class="answer__content"></input>
                <div class="answer__user"></div>
            `
            answer.querySelector('.answer__content').value = clientText

            let isExist = document.querySelector('.answer._first')
            if (isExist) {
                isExist.remove()
                askBox.insertAdjacentElement('afterend', answer)
                _setAnswerContentActive(answer)
            } else {
                bodyContent.insertAdjacentElement('beforeend', answer)
                _setAnswerContentActive(answer)

                _scrollDown()

                let promise = new Promise(resolve => {
                    setTimeout(() => {
                        let ask = document.createElement('div')
                        ask.className = 'body-content__ask ask'
                        ask.innerHTML = `
                            <div class="ask__user"></div>
                            <div class="ask__content"></div>
                        `
                        let askContent = ask.querySelector('.ask__content')

                        bodyContent.insertAdjacentElement('beforeend', ask)
                        askContent.insertAdjacentElement('beforeend', askWriting)
                        _scrollDown()
                        resolve()
                    }, 1500)
                })
                promise.then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askText = document.createElement('div')
                            askText.className = 'ask__text mb-2'
                            askText.innerText = 'Пожалуйста, укажите что это за кредиты и долги:'
                            askWriting.insertAdjacentElement('beforebegin', askText)
                            setTimeout(() => {
                                askText.classList.add('_active')
                            }, 100)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                }).then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askGridWrapper = document.createElement('div'),
                                askGridBtn = document.createElement('div'),
                                askGrid = document.createElement('div')

                            askGridBtn.className = 'ask__button _first _ns'
                            askGridBtn.innerText = 'подтвердить'

                            askGrid.className = 'ask__grid mb-2'
                            askGrid.innerHTML = `
                                <div data="21"><p></p>Потребительские кредиты</div>
                                <div data="22"><p></p>Кредитные карты</div>
                                <div data="23"><p></p>Микрозаймы</div>
                                <div data="24"><p></p>ЖКХ</div>
                                <div data="25"><p></p>Алименты</div>
                                <div data="26"><p></p>Штрафы</div>
                                <div data="27"><p></p>Ипотека</div>
                                <div data="28"><p></p>Другой вариант</div>
                            `

                            askGridWrapper.insertAdjacentElement('beforeend', askGrid)
                            askGridWrapper.insertAdjacentElement('beforeend', askGridBtn)

                            askWriting.insertAdjacentElement('beforebegin', askGridWrapper)
                            askWriting.remove()
                            setTimeout(() => {
                                askGrid.classList.add('_active')
                            }, 100)
                            let buttons = askGrid.querySelectorAll('div')
                            _checkboxButton(buttons)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                })
            }
        }
    })

    document.addEventListener('click', (e) => {
        let isClicked = e.target.closest('.ask__button._first'),
            values = []
        if (isClicked) {
            
            isClicked.previousElementSibling.querySelectorAll('.ask__grid div._active').forEach(
                el => {
                    values.push(el.innerText)
//                    var answerdata = $(el).attr('data')
//                    $.ajax({
//                        type: 'POST',
//                        url: 'handler.php',
//                        data: 'action='+'answer'+'&value='+answerdata,
//                        success: function(html){
//                        }
//                    });
                }
            )

            let askBox = isClicked.closest('.ask')

            if (values.length === 0) {
                _showWarning()
            } else {
                _hideWarning()
                let clientText = values.join(', '),
                    bodyContent = document.querySelector('.body-content'),
                    answer = document.createElement('div')

                answer.className = 'body-content__answer answer _second'
                answer.innerHTML = `
                <input type="text" name="2" class="answer__content"></div>
                <div class="answer__user"></div>
            `
                answer.querySelector('.answer__content').value = clientText

                let isExist = document.querySelector('.answer._second')
                if (isExist) {
                    isExist.remove()
                    askBox.insertAdjacentElement('afterend', answer)
                    _setAnswerContentActive(answer)
                } else {
                    bodyContent.insertAdjacentElement('beforeend', answer)
                    _setAnswerContentActive(answer)

                    _scrollDown()

                    let promise = new Promise(resolve => {
                        setTimeout(() => {
                            let ask = document.createElement('div')
                            ask.className = 'body-content__ask ask'
                            ask.innerHTML = `
                        <div class="ask__user"></div>
                        <div class="ask__content"></div>
                    `
                            let askContent = ask.querySelector('.ask__content')

                            bodyContent.insertAdjacentElement('beforeend', ask)
                            askContent.insertAdjacentElement('beforeend', askWriting)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })

                    promise.then(() => {
                        return new Promise(resolve => {
                            setTimeout(() => {
                                let askText = document.createElement('div')
                                askText.className = 'ask__text mb-2'
                                askText.innerText = 'Какой у Вас ежемесячный платеж по ВСЕМ кредитам?'
                                askWriting.insertAdjacentElement('beforebegin', askText)
                                setTimeout(() => {
                                    askText.classList.add('_active')
                                }, 100)
                                _scrollDown()
                                resolve()
                            }, delay)
                        })
                    }).then(() => {
                        return new Promise(resolve => {
                            setTimeout(() => {
                                let askGrid = document.createElement('div')

                                askGrid.className = 'ask__grid _third-grid'
                                askGrid.innerHTML = `
                                    <div data='31'><p></p>Менее <span class="semi-bold">10 000</span> рублей</div>
                                    <div data='32'><p></p>От <span class="semi-bold">10 000</span> до <span class="semi-bold">20 000</span> рублей</div>
                                    <div data='33'><p></p>От <span class="semi-bold">20 000</span> до <span class="semi-bold">50 000</span> рублей</div>
                                    <div data='34'><p></p>Более <span class="semi-bold">50 000</span> рублей</div>
                                `

                                askWriting.insertAdjacentElement('beforebegin', askGrid)
                                askWriting.remove()
                                setTimeout(() => {
                                    askGrid.classList.add('_active')
                                }, 100)
                                let buttons = askGrid.querySelectorAll('div')
                                _radioButton(buttons)
                                _scrollDown()
                                resolve()
                            }, delay)
                        })
                    })
                }
            }
        }
    })

    document.addEventListener('click', (e) => {
        let isClicked = e.target.closest('.ask__grid._third-grid div')
        if (isClicked) {
            
            var answerdata = $(isClicked).attr('data')
//            $.ajax({
//                type: 'POST',
//                url: 'handler.php',
//                data: 'action='+'answer'+'&value='+answerdata,
//                success: function(html){
//                }
//            });
            
            let clientText = isClicked.innerText,
                bodyContent = document.querySelector('.body-content'),
                answer = document.createElement('div')

            let askBox = isClicked.closest('.ask')

            answer.className = 'body-content__answer answer _third'
            answer.innerHTML = `
                <input type="text" name="3" class="answer__content"></input>
                <div class="answer__user"></div>
            `
            answer.querySelector('.answer__content').value = clientText

            let isExist = document.querySelector('.answer._third')
            if (isExist) {
                isExist.remove()
                askBox.insertAdjacentElement('afterend', answer)
                _setAnswerContentActive(answer)
            } else {
                bodyContent.insertAdjacentElement('beforeend', answer)

                _setAnswerContentActive(answer)

                _scrollDown()

                let promise = new Promise(resolve => {
                    setTimeout(() => {
                        let ask = document.createElement('div')
                        ask.className = 'body-content__ask ask'
                        ask.innerHTML = `
                            <div class="ask__user"></div>
                            <div class="ask__content"></div>
                        `
                        let askContent = ask.querySelector('.ask__content')

                        bodyContent.insertAdjacentElement('beforeend', ask)
                        askContent.insertAdjacentElement('beforeend', askWriting)
                        _scrollDown()
                        resolve()
                    }, delay)
                })

                promise.then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askText = document.createElement('div')
                            askText.className = 'ask__text mb-2'
                            askText.innerText = 'Есть ли у Вас просрочки хотя бы по одному кредиту?'
                            askWriting.insertAdjacentElement('beforebegin', askText)
                            setTimeout(() => {
                                askText.classList.add('_active')
                            }, 100)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                }).then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askGrid = document.createElement('div')

                            askGrid.className = 'ask__grid _fourth-grid'
                            askGrid.innerHTML = `
                                <div data='41'><p></p>Нет</div>
                                <div data='42'><p></p>До <span class="semi-bold">3х</span> месяцев</div>
                                <div data='43'><p></p>Более <span class="semi-bold">3х</span> месяцев</div>
                            `

                            askWriting.insertAdjacentElement('beforebegin', askGrid)
                            askWriting.remove()
                            setTimeout(() => {
                                askGrid.classList.add('_active')
                            }, 100)
                            let buttons = askGrid.querySelectorAll('div')
                            _radioButton(buttons)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                })
            }
        }
    })

    document.addEventListener('click', (e) => {
        let isClicked = e.target.closest('.ask__grid._fourth-grid div')
        if (isClicked) {
            
//            var answerdata = $(isClicked).attr('data')
//            $.ajax({
//                type: 'POST',
//                url: 'handler.php',
//                data: 'action='+'answer'+'&value='+answerdata,
//                success: function(html){
//                }
//            });
            
            let clientText = isClicked.innerText,
                bodyContent = document.querySelector('.body-content'),
                answer = document.createElement('div')

            let askBox = isClicked.closest('.ask')

            answer.className = 'body-content__answer answer _fourth'
            answer.innerHTML = `
                <div class="answer__content"></div>
                <div class="answer__user"></div>
            `
            answer.querySelector('.answer__content').value = clientText

            let isExist = document.querySelector('.answer._fourth')
            if (isExist) {
                isExist.remove()
                askBox.insertAdjacentElement('afterend', answer)
                _setAnswerContentActive(answer)
            } else {
                bodyContent.insertAdjacentElement('beforeend', answer)

                _setAnswerContentActive(answer)

                _scrollDown()

                let promise = new Promise(resolve => {
                    setTimeout(() => {
                        let ask = document.createElement('div')
                        ask.className = 'body-content__ask ask'
                        ask.innerHTML = `
                            <div class="ask__user"></div>
                            <div class="ask__content"></div>
                        `
                        let askContent = ask.querySelector('.ask__content')

                        bodyContent.insertAdjacentElement('beforeend', ask)
                        askContent.insertAdjacentElement('beforeend', askWriting)
                        _scrollDown()
                        resolve()
                    }, delay)
                })

                promise.then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askText = document.createElement('div')
                            askText.className = 'ask__text mb-2'
                            askText.innerText = 'Подскажите, какой Ваш официальный доход?'
                            askWriting.insertAdjacentElement('beforebegin', askText)
                            setTimeout(() => {
                                askText.classList.add('_active')
                            }, 100)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                }).then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askGrid = document.createElement('div')

                            askGrid.className = 'ask__grid _fifth-grid'
                            askGrid.innerHTML = `
                                <div data='51'><p></p>Менее <span class="semi-bold">10 000</span> рублей</div>
                                <div data='52'><p></p>От <span class="semi-bold">10 000</span> до <span class="semi-bold">20 000</span> рублей</div>
                                <div data='53'><p></p>От <span class="semi-bold">20 000</span> до <span class="semi-bold">50 000</span> рублей</div>
                                <div data='54'><p></p>Более <span class="semi-bold">50 000</span> рублей</div>
                            `

                            askWriting.insertAdjacentElement('beforebegin', askGrid)
                            askWriting.remove()
                            setTimeout(() => {
                                askGrid.classList.add('_active')
                            }, 100)
                            let buttons = askGrid.querySelectorAll('div')
                            _radioButton(buttons)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                })
            }
        }
    })

    document.addEventListener('click', (e) => {
        let isClicked = e.target.closest('.ask__grid._fifth-grid div')
        if (isClicked) {
            
//            var answerdata = $(isClicked).attr('data')
//            $.ajax({
//                type: 'POST',
//                url: 'handler.php',
//                data: 'action='+'answer'+'&value='+answerdata,
//                success: function(html){
//                }
//            });
            
            let clientText = isClicked.innerText,
                bodyContent = document.querySelector('.body-content'),
                answer = document.createElement('div')

            let askBox = isClicked.closest('.ask')

            answer.className = 'body-content__answer answer _fifth'
            answer.innerHTML = `
                <input type="text"  name="4" class="answer__content"></input>
                <div class="answer__user"></div>
            `
            answer.querySelector('.answer__content').value = clientText

            let isExist = document.querySelector('.answer._fifth')
            if (isExist) {
                isExist.remove()
                askBox.insertAdjacentElement('afterend', answer)
                _setAnswerContentActive(answer)
            } else {
                bodyContent.insertAdjacentElement('beforeend', answer)

                _setAnswerContentActive(answer)

                _scrollDown()

                let promise = new Promise(resolve => {
                    setTimeout(() => {
                        let ask = document.createElement('div')
                        ask.className = 'body-content__ask ask'
                        ask.innerHTML = `
                            <div class="ask__user"></div>
                            <div class="ask__content"></div>
                        `
                        let askContent = ask.querySelector('.ask__content')

                        bodyContent.insertAdjacentElement('beforeend', ask)
                        askContent.insertAdjacentElement('beforeend', askWriting)
                        _scrollDown()
                        resolve()
                    }, delay)
                })

                promise.then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askText = document.createElement('div')
                            askText.className = 'ask__text mb-2'
                            askText.innerText = 'Какой вариант, по Вашему мнению, Вам точно поможет?'
                            askWriting.insertAdjacentElement('beforebegin', askText)
                            setTimeout(() => {
                                askText.classList.add('_active')
                            }, 100)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                }).then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askGrid = document.createElement('div')

                            askGrid.className = 'ask__grid ask__grid-single _sixth-grid mb-2'

                            askGrid.innerHTML = `
                                <div data="61"><p></p>Списание кредитов и долгов <span class="semi-bold">полностью</span></div>
                                <div data="62"><p></p>Уменьшение платежей по кредитам хотя бы до <span class="semi-bold">12 500руб./мес.</span></div>
                                <div data="63"><p></p>Процедура банкротства</div>
                            `

                            askWriting.insertAdjacentElement('beforebegin', askGrid)
                            askWriting.remove()
                            setTimeout(() => {
                                askGrid.classList.add('_active')
                            }, 100)
                            let buttons = askGrid.querySelectorAll('div')
                            _radioButton(buttons)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                })
            }
        }
    })

    document.addEventListener('click', (e) => {
        let isClicked = e.target.closest('.ask__grid._sixth-grid div')
        if (isClicked) {
            
            var answerdata = $(isClicked).attr('data')
//            $.ajax({
//                type: 'POST',
//                url: 'handler.php',
//                data: 'action='+'answer'+'&value='+answerdata,
//                success: function(html){
//                }
//            });
            
            let clientText = isClicked.innerText,
                bodyContent = document.querySelector('.body-content'),
                answer = document.createElement('div')

            let askBox = isClicked.closest('.ask')

            answer.className = 'body-content__answer answer _sixth'
            answer.innerHTML = `
                <input type="text" name="5" class="answer__content"></input>
                <div class="answer__user"></div>
            `
            answer.querySelector('.answer__content').value = clientText

            let isExist = document.querySelector('.answer._sixth')
            if (isExist) {
                isExist.remove()
                askBox.insertAdjacentElement('afterend', answer)
                _setAnswerContentActive(answer)
            } else {
                bodyContent.insertAdjacentElement('beforeend', answer)

                _setAnswerContentActive(answer)

                _scrollDown()

                let promise = new Promise(resolve => {
                    setTimeout(() => {
                        let ask = document.createElement('div')
                        ask.className = 'body-content__ask ask'
                        ask.innerHTML = `
                                <div class="ask__user"></div>
                                <div class="ask__content"></div>
                            `
                        let askContent = ask.querySelector('.ask__content')

                        bodyContent.insertAdjacentElement('beforeend', ask)
                        askContent.insertAdjacentElement('beforeend', askWriting)
                        _scrollDown()
                        resolve()
                    }, delay)
                })

                promise.then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askText = document.createElement('div')
                            askText.className = 'ask__text mb-2'
                            askText.innerHTML = `Вы знакомы с <span class="semi-bold">127-ФЗ, ст. 333 ГК РФ, 227-ФЗ</span>?`
                            askWriting.insertAdjacentElement('beforebegin', askText)
                            setTimeout(() => {
                                askText.classList.add('_active')
                            }, 100)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                }).then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askGrid = document.createElement('div')

                            askGrid.className = 'ask__grid ask__grid-single _seventh-grid'
                            askGrid.innerHTML = `
                                    <div data="71"><p></p>Да, я бы хотел списать кредиты по закону</div>
                                    <div data="72"><p></p>Что-то слышал, но не знаю деталей</div>
                                    <div data="73"><p></p>Нет, а что это за законы?</div>
                                `

                            askWriting.insertAdjacentElement('beforebegin', askGrid)
                            askWriting.remove()
                            setTimeout(() => {
                                askGrid.classList.add('_active')
                            }, 100)
                            let buttons = askGrid.querySelectorAll('div')
                            _radioButton(buttons)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                })
            }
        }

    })

    document.addEventListener('click', (e) => {
        let isClicked = e.target.closest('.ask__grid._seventh-grid div')
        if (isClicked) {
            
            var answerdata = $(isClicked).attr('data')
//            $.ajax({
//                type: 'POST',
//                url: 'handler.php',
//                data: 'action='+'answer'+'&value='+answerdata,
//                success: function(html){
//                }
//            });
            
            let clientText = isClicked.innerText,
                bodyContent = document.querySelector('.body-content'),
                answer = document.createElement('div')

            let askBox = isClicked.closest('.ask')

            answer.className = 'body-content__answer answer _seventh'
            answer.innerHTML = `
                <input type="text" name="6" class="answer__content"></input>
                <div class="answer__user"></div>
            `
            answer.querySelector('.answer__content').value = clientText

            let isExist = document.querySelector('.answer._seventh')
            if (isExist) {
                isExist.remove()
                askBox.insertAdjacentElement('afterend', answer)
                _setAnswerContentActive(answer)
            } else {
                bodyContent.insertAdjacentElement('beforeend', answer)

                _setAnswerContentActive(answer)

                _scrollDown()

                let promise = new Promise(resolve => {
                    setTimeout(() => {
                        let ask = document.createElement('div')
                        ask.className = 'body-content__ask ask'
                        ask.innerHTML = `
                            <div class="ask__user"></div>
                            <div class="ask__content"></div>
                        `
                        let askContent = ask.querySelector('.ask__content')

                        bodyContent.insertAdjacentElement('beforeend', ask)
                        askContent.insertAdjacentElement('beforeend', askWriting)
                        _scrollDown()
                        resolve()
                    }, delay)
                })

                promise.then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askText = document.createElement('div')
                            askText.className = 'ask__text mb-2'
                            askText.innerText = 'Если мы законно освободим Вас от обязанности платить кредиты уже сегодня, Вас это устроит?'
                            askWriting.insertAdjacentElement('beforebegin', askText)
                            setTimeout(() => {
                                askText.classList.add('_active')
                            }, 100)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                }).then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askGrid = document.createElement('div')

                            askGrid.className = 'ask__grid ask__grid-single _eighth-grid'
                            askGrid.innerHTML = `
                                <div data="81"><p></p>Ну конечно устроит</div>
                                <div data="82"><p></p>Не знаю, я хотел(ла) бы платить кредиты</div>
                            `

                            askWriting.insertAdjacentElement('beforebegin', askGrid)
                            askWriting.remove()
                            setTimeout(() => {
                                askGrid.classList.add('_active')
                            }, 100)
                            let buttons = askGrid.querySelectorAll('div')
                            _radioButton(buttons)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                })
            }
        }
    })

    document.addEventListener('click', (e) => {
        let isClicked = e.target.closest('.ask__grid._eighth-grid div')
        if (isClicked) {
            
            var answerdata = $(isClicked).attr('data')
//            $.ajax({
//                type: 'POST',
//                url: 'handler.php',
//                data: 'action='+'answer'+'&value='+answerdata,
//                success: function(html){
//                }
//            });
            
            let clientText = isClicked.innerText,
                bodyContent = document.querySelector('.body-content'),
                answer = document.createElement('div')

            let askBox = isClicked.closest('.ask')

            answer.className = 'body-content__answer answer _eighth'
            answer.innerHTML = `
                <input type="text" name="7" class="answer__content"></input>
                <div class="answer__user"></div>
            `
            answer.querySelector('.answer__content').value = clientText

            let isExist = document.querySelector('.answer._eighth')
            if (isExist) {
                isExist.remove()
                askBox.insertAdjacentElement('afterend', answer)
                _setAnswerContentActive(answer)
            } else {
                bodyContent.insertAdjacentElement('beforeend', answer)

                _setAnswerContentActive(answer)

                _scrollDown()

                let promise = new Promise(resolve => {
                    setTimeout(() => {
                        let ask = document.createElement('div')
                        ask.className = 'body-content__ask ask'
                        ask.innerHTML = `
                            <div class="ask__user"></div>
                            <div class="ask__content"></div>
                        `
                        let askContent = ask.querySelector('.ask__content')

                        bodyContent.insertAdjacentElement('beforeend', ask)
                        askContent.insertAdjacentElement('beforeend', askWriting)
                        _scrollDown()
                        resolve()
                    }, delay)
                })

                promise.then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askText = document.createElement('div')
                            askText.className = 'ask__text mb-2'
                            askText.innerText = 'Отлично! Укажите из какого Вы города:'
                            askWriting.insertAdjacentElement('beforebegin', askText)
                            setTimeout(() => {
                                askText.classList.add('_active')
                            }, 100)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                }).then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askGrid = document.createElement('div')
                            askGrid.className = 'ask__box mb-2'
                            askGrid.innerHTML = `
                                <input placeholder="Город.." class="ask__input"/>
                                <div class="ask__box-hidden">
                                    <div class="ask__box-item">Абаза</div>
                                    <div class="ask__box-item">Абакан</div>
                                    <div class="ask__box-item">Абдулино</div>
                                    <div class="ask__box-item">Абинск</div>
                                    <div class="ask__box-item">Агидель</div>
                                    <div class="ask__box-item">Агрыз</div>
                                    <div class="ask__box-item">Адыгейск</div>
                                    <div class="ask__box-item">Азнакаево</div>
                                    <div class="ask__box-item">Азов</div>
                                    <div class="ask__box-item">Ак-Довурак</div>
                                    <div class="ask__box-item">Аксай</div>
                                    <div class="ask__box-item">Алагир</div>
                                    <div class="ask__box-item">Алапаевск</div>
                                    <div class="ask__box-item">Алатырь</div>
                                    <div class="ask__box-item">Алдан</div>
                                    <div class="ask__box-item">Алейск</div>
                                    <div class="ask__box-item">Александров</div>
                                    <div class="ask__box-item">Александровск</div>
                                    <div class="ask__box-item">Александровск-Сахалинский</div>
                                    <div class="ask__box-item">Алексеевка</div>
                                    <div class="ask__box-item">Алексин</div>
                                    <div class="ask__box-item">Алзамай</div>
                                    <div class="ask__box-item">Алупка</div>
                                    <div class="ask__box-item">Алушта</div>
                                    <div class="ask__box-item">Альметьевск</div>
                                    <div class="ask__box-item">Амурск</div>
                                    <div class="ask__box-item">Анадырь</div>
                                    <div class="ask__box-item">Анапа</div>
                                    <div class="ask__box-item">Ангарск</div>
                                    <div class="ask__box-item">Андреаполь</div>
                                    <div class="ask__box-item">Анжеро-Судженск</div>
                                    <div class="ask__box-item">Анива</div>
                                    <div class="ask__box-item">Апатиты</div>
                                    <div class="ask__box-item">Апрелевка</div>
                                    <div class="ask__box-item">Апшеронск</div>
                                    <div class="ask__box-item">Арамиль</div>
                                    <div class="ask__box-item">Аргун</div>
                                    <div class="ask__box-item">Ардатов</div>
                                    <div class="ask__box-item">Ардон</div>
                                    <div class="ask__box-item">Арзамас</div>
                                    <div class="ask__box-item">Аркадак</div>
                                    <div class="ask__box-item">Армавир</div>
                                    <div class="ask__box-item">Армянск</div>
                                    <div class="ask__box-item">Арсеньев</div>
                                    <div class="ask__box-item">Арск</div>
                                    <div class="ask__box-item">Артем</div>
                                    <div class="ask__box-item">Артёмовск</div>
                                    <div class="ask__box-item">Артёмовский</div>
                                    <div class="ask__box-item">Архангельск</div>
                                    <div class="ask__box-item">Асбест</div>
                                    <div class="ask__box-item">Асино</div>
                                    <div class="ask__box-item">Астрахань</div>
                                    <div class="ask__box-item">Аткарск</div>
                                    <div class="ask__box-item">Ахтубинск</div>
                                    <div class="ask__box-item">Ачинск</div>
                                    <div class="ask__box-item">Аша</div>
                                    <div class="ask__box-item">Бабаево</div>
                                    <div class="ask__box-item">Бабушкин</div>
                                    <div class="ask__box-item">Бавлы</div>
                                    <div class="ask__box-item">Багратионовск</div>
                                    <div class="ask__box-item">Байкальск</div>
                                    <div class="ask__box-item">Баймак</div>
                                    <div class="ask__box-item">Бакал</div>
                                    <div class="ask__box-item">Баксан</div>
                                    <div class="ask__box-item">Балабаново</div>
                                    <div class="ask__box-item">Балаково</div>
                                    <div class="ask__box-item">Балахна</div>
                                    <div class="ask__box-item">Балашиха</div>
                                    <div class="ask__box-item">Балашов</div>
                                    <div class="ask__box-item">Балей</div>
                                    <div class="ask__box-item">Балтийск</div>
                                    <div class="ask__box-item">Барабинск</div>
                                    <div class="ask__box-item">Барнаул</div>
                                    <div class="ask__box-item">Барыш</div>
                                    <div class="ask__box-item">Батайск</div>
                                    <div class="ask__box-item">Бахчисарай</div>
                                    <div class="ask__box-item">Бежецк</div>
                                    <div class="ask__box-item">Белая Калитва</div>
                                    <div class="ask__box-item">Белая Холуница</div>
                                    <div class="ask__box-item">Белгород</div>
                                    <div class="ask__box-item">Белебей</div>
                                    <div class="ask__box-item">Белёв</div>
                                    <div class="ask__box-item">Белинский</div>
                                    <div class="ask__box-item">Белово</div>
                                    <div class="ask__box-item">Белозерск</div>
                                    <div class="ask__box-item">Белокуриха</div>
                                    <div class="ask__box-item">Беломорск</div>
                                    <div class="ask__box-item">Белорецк</div>
                                    <div class="ask__box-item">Белореченск</div>
                                    <div class="ask__box-item">Белоусово</div>
                                    <div class="ask__box-item">Белоярский</div>
                                    <div class="ask__box-item">Белый</div>
                                    <div class="ask__box-item">Бердск</div>
                                    <div class="ask__box-item">Березники</div>
                                    <div class="ask__box-item">Берёзовский</div>
                                    <div class="ask__box-item">Беслан</div>
                                    <div class="ask__box-item">Бийск</div>
                                    <div class="ask__box-item">Бикин</div>
                                    <div class="ask__box-item">Билибино</div>
                                    <div class="ask__box-item">Биробиджан</div>
                                    <div class="ask__box-item">Бирск</div>
                                    <div class="ask__box-item">Бирюсинск</div>
                                    <div class="ask__box-item">Бирюч</div>
                                    <div class="ask__box-item">Благовещенск</div>
                                    <div class="ask__box-item">Благодарный</div>
                                    <div class="ask__box-item">Бобров</div>
                                    <div class="ask__box-item">Богданович</div>
                                    <div class="ask__box-item">Богородицк</div>
                                    <div class="ask__box-item">Богородск</div>
                                    <div class="ask__box-item">Боготол</div>
                                    <div class="ask__box-item">Богучар</div>
                                    <div class="ask__box-item">Бодайбо</div>
                                    <div class="ask__box-item">Бокситогорск</div>
                                    <div class="ask__box-item">Болгар</div>
                                    <div class="ask__box-item">Бологое</div>
                                    <div class="ask__box-item">Болотное</div>
                                    <div class="ask__box-item">Болохово</div>
                                    <div class="ask__box-item">Болхов</div>
                                    <div class="ask__box-item">Большой Камень</div>
                                    <div class="ask__box-item">Бор</div>
                                    <div class="ask__box-item">Борзя</div>
                                    <div class="ask__box-item">Борисоглебск</div>
                                    <div class="ask__box-item">Боровичи</div>
                                    <div class="ask__box-item">Боровск</div>
                                    <div class="ask__box-item">Бородино</div>
                                    <div class="ask__box-item">Братск</div>
                                    <div class="ask__box-item">Бронницы</div>
                                    <div class="ask__box-item">Брянск</div>
                                    <div class="ask__box-item">Бугульма</div>
                                    <div class="ask__box-item">Бугуруслан</div>
                                    <div class="ask__box-item">Будённовск</div>
                                    <div class="ask__box-item">Бузулук</div>
                                    <div class="ask__box-item">Буинск</div>
                                    <div class="ask__box-item">Буй</div>
                                    <div class="ask__box-item">Буйнакск</div>
                                    <div class="ask__box-item">Бутурлиновка</div>
                                    <div class="ask__box-item">Валдай</div>
                                    <div class="ask__box-item">Валуйки</div>
                                    <div class="ask__box-item">Велиж</div>
                                    <div class="ask__box-item">Великие Луки</div>
                                    <div class="ask__box-item">Великий Новгород</div>
                                    <div class="ask__box-item">Великий Устюг</div>
                                    <div class="ask__box-item">Вельск</div>
                                    <div class="ask__box-item">Венёв</div>
                                    <div class="ask__box-item">Верещагино</div>
                                    <div class="ask__box-item">Верея</div>
                                    <div class="ask__box-item">Верхнеуральск</div>
                                    <div class="ask__box-item">Верхний Тагил</div>
                                    <div class="ask__box-item">Верхний Уфалей</div>
                                    <div class="ask__box-item">Верхняя Пышма</div>
                                    <div class="ask__box-item">Верхняя Салда</div>
                                    <div class="ask__box-item">Верхняя Тура</div>
                                    <div class="ask__box-item">Верхотурье</div>
                                    <div class="ask__box-item">Верхоянск</div>
                                    <div class="ask__box-item">Весьегонск</div>
                                    <div class="ask__box-item">Ветлуга</div>
                                    <div class="ask__box-item">Видное</div>
                                    <div class="ask__box-item">Вилюйск</div>
                                    <div class="ask__box-item">Вилючинск</div>
                                    <div class="ask__box-item">Вихоревка</div>
                                    <div class="ask__box-item">Вичуга</div>
                                    <div class="ask__box-item">Владивосток</div>
                                    <div class="ask__box-item">Владикавказ</div>
                                    <div class="ask__box-item">Владимир</div>
                                    <div class="ask__box-item">Волгоград</div>
                                    <div class="ask__box-item">Волгодонск</div>
                                    <div class="ask__box-item">Волгореченск</div>
                                    <div class="ask__box-item">Волжск</div>
                                    <div class="ask__box-item">Волжский</div>
                                    <div class="ask__box-item">Вологда</div>
                                    <div class="ask__box-item">Володарск</div>
                                    <div class="ask__box-item">Волоколамск</div>
                                    <div class="ask__box-item">Волосово</div>
                                    <div class="ask__box-item">Волхов</div>
                                    <div class="ask__box-item">Волчанск</div>
                                    <div class="ask__box-item">Вольск</div>
                                    <div class="ask__box-item">Воркута</div>
                                    <div class="ask__box-item">Воронеж</div>
                                    <div class="ask__box-item">Ворсма</div>
                                    <div class="ask__box-item">Воскресенск</div>
                                    <div class="ask__box-item">Воткинск</div>
                                    <div class="ask__box-item">Всеволожск</div>
                                    <div class="ask__box-item">Вуктыл</div>
                                    <div class="ask__box-item">Выборг</div>
                                    <div class="ask__box-item">Выкса</div>
                                    <div class="ask__box-item">Высоковск</div>
                                    <div class="ask__box-item">Высоцк</div>
                                    <div class="ask__box-item">Вытегра</div>
                                    <div class="ask__box-item">Вышний Волочёк</div>
                                    <div class="ask__box-item">Вяземский</div>
                                    <div class="ask__box-item">Вязники</div>
                                    <div class="ask__box-item">Вязьма</div>
                                    <div class="ask__box-item">Вятские Поляны</div>
                                    <div class="ask__box-item">Гаврилов Посад</div>
                                    <div class="ask__box-item">Гаврилов-Ям</div>
                                    <div class="ask__box-item">Гагарин</div>
                                    <div class="ask__box-item">Гаджиево</div>
                                    <div class="ask__box-item">Гай</div>
                                    <div class="ask__box-item">Галич</div>
                                    <div class="ask__box-item">Гатчина</div>
                                    <div class="ask__box-item">Гвардейск</div>
                                    <div class="ask__box-item">Гдов</div>
                                    <div class="ask__box-item">Геленджик</div>
                                    <div class="ask__box-item">Георгиевск</div>
                                    <div class="ask__box-item">Глазов</div>
                                    <div class="ask__box-item">Голицыно</div>
                                    <div class="ask__box-item">Горбатов</div>
                                    <div class="ask__box-item">Горно-Алтайск</div>
                                    <div class="ask__box-item">Горнозаводск</div>
                                    <div class="ask__box-item">Горняк</div>
                                    <div class="ask__box-item">Городец</div>
                                    <div class="ask__box-item">Городище</div>
                                    <div class="ask__box-item">Городовиковск</div>
                                    <div class="ask__box-item">Гороховец</div>
                                    <div class="ask__box-item">Горячий Ключ</div>
                                    <div class="ask__box-item">Грайворон</div>
                                    <div class="ask__box-item">Гремячинск</div>
                                    <div class="ask__box-item">Грозный</div>
                                    <div class="ask__box-item">Грязи</div>
                                    <div class="ask__box-item">Грязовец</div>
                                    <div class="ask__box-item">Губаха</div>
                                    <div class="ask__box-item">Губкин</div>
                                    <div class="ask__box-item">Губкинский</div>
                                    <div class="ask__box-item">Гудермес</div>
                                    <div class="ask__box-item">Гуково</div>
                                    <div class="ask__box-item">Гулькевичи</div>
                                    <div class="ask__box-item">Гурьевск</div>
                                    <div class="ask__box-item">Гусев</div>
                                    <div class="ask__box-item">Гусиноозёрск</div>
                                    <div class="ask__box-item">Гусь-Хрустальный</div>
                                    <div class="ask__box-item">Давлеканово</div>
                                    <div class="ask__box-item">Дагестанские Огни</div>
                                    <div class="ask__box-item">Далматово</div>
                                    <div class="ask__box-item">Дальнегорск</div>
                                    <div class="ask__box-item">Дальнереченск</div>
                                    <div class="ask__box-item">Данилов</div>
                                    <div class="ask__box-item">Данков</div>
                                    <div class="ask__box-item">Дегтярск</div>
                                    <div class="ask__box-item">Дедовск</div>
                                    <div class="ask__box-item">Демидов</div>
                                    <div class="ask__box-item">Дербент</div>
                                    <div class="ask__box-item">Десногорск</div>
                                    <div class="ask__box-item">Джанкой</div>
                                    <div class="ask__box-item">Дзержинск</div>
                                    <div class="ask__box-item">Дзержинский</div>
                                    <div class="ask__box-item">Дивногорск</div>
                                    <div class="ask__box-item">Дигора</div>
                                    <div class="ask__box-item">Димитровград</div>
                                    <div class="ask__box-item">Дмитриев</div>
                                    <div class="ask__box-item">Дмитров</div>
                                    <div class="ask__box-item">Дмитровск</div>
                                    <div class="ask__box-item">Дно</div>
                                    <div class="ask__box-item">Добрянка</div>
                                    <div class="ask__box-item">Долгопрудный</div>
                                    <div class="ask__box-item">Долинск</div>
                                    <div class="ask__box-item">Домодедово</div>
                                    <div class="ask__box-item">Донецк</div>
                                    <div class="ask__box-item">Донской</div>
                                    <div class="ask__box-item">Дорогобуж</div>
                                    <div class="ask__box-item">Дрезна</div>
                                    <div class="ask__box-item">Дубна</div>
                                    <div class="ask__box-item">Дубовка</div>
                                    <div class="ask__box-item">Дудинка</div>
                                    <div class="ask__box-item">Духовщина</div>
                                    <div class="ask__box-item">Дюртюли</div>
                                    <div class="ask__box-item">Дятьково</div>
                                    <div class="ask__box-item">Евпатория</div>
                                    <div class="ask__box-item">Егорьевск</div>
                                    <div class="ask__box-item">Ейск</div>
                                    <div class="ask__box-item">Екатеринбург</div>
                                    <div class="ask__box-item">Елабуга</div>
                                    <div class="ask__box-item">Елец</div>
                                    <div class="ask__box-item">Елизово</div>
                                    <div class="ask__box-item">Ельня</div>
                                    <div class="ask__box-item">Еманжелинск</div>
                                    <div class="ask__box-item">Емва</div>
                                    <div class="ask__box-item">Енисейск</div>
                                    <div class="ask__box-item">Ермолино</div>
                                    <div class="ask__box-item">Ершов</div>
                                    <div class="ask__box-item">Ессентуки</div>
                                    <div class="ask__box-item">Ефремов</div>
                                    <div class="ask__box-item">Железноводск</div>
                                    <div class="ask__box-item">Железногорск (Курская обл)</div>
                                    <div class="ask__box-item">Железногорск-Илимский</div>
                                    <div class="ask__box-item">Жердевка</div>
                                    <div class="ask__box-item">Жигулёвск</div>
                                    <div class="ask__box-item">Жиздра</div>
                                    <div class="ask__box-item">Жирновск</div>
                                    <div class="ask__box-item">Жуков</div>
                                    <div class="ask__box-item">Жуковка</div>
                                    <div class="ask__box-item">Жуковский</div>
                                    <div class="ask__box-item">Завитинск</div>
                                    <div class="ask__box-item">Заводоуковск</div>
                                    <div class="ask__box-item">Заволжск</div>
                                    <div class="ask__box-item">Заволжье</div>
                                    <div class="ask__box-item">Задонск</div>
                                    <div class="ask__box-item">Заинск</div>
                                    <div class="ask__box-item">Закаменск</div>
                                    <div class="ask__box-item">Заозёрный</div>
                                    <div class="ask__box-item">Заозёрск</div>
                                    <div class="ask__box-item">Западная Двина</div>
                                    <div class="ask__box-item">Заполярный</div>
                                    <div class="ask__box-item">Зарайск</div>
                                    <div class="ask__box-item">Заречный</div>
                                    <div class="ask__box-item">Заринск</div>
                                    <div class="ask__box-item">Звенигово</div>
                                    <div class="ask__box-item">Звенигород</div>
                                    <div class="ask__box-item">Зверево</div>
                                    <div class="ask__box-item">Зеленогорск</div>
                                    <div class="ask__box-item">Зеленоградск</div>
                                    <div class="ask__box-item">Зеленодольск</div>
                                    <div class="ask__box-item">Зеленокумск</div>
                                    <div class="ask__box-item">Зеленчукская</div>
                                    <div class="ask__box-item">Зерноград</div>
                                    <div class="ask__box-item">Зея</div>
                                    <div class="ask__box-item">Зима</div>
                                    <div class="ask__box-item">Златоуст</div>
                                    <div class="ask__box-item">Злынка</div>
                                    <div class="ask__box-item">Змеиногорск</div>
                                    <div class="ask__box-item">Знаменск</div>
                                    <div class="ask__box-item">Зубцов</div>
                                    <div class="ask__box-item">Зуевка</div>
                                    <div class="ask__box-item">Ивангород</div>
                                    <div class="ask__box-item">Иваново</div>
                                    <div class="ask__box-item">Ивантеевка</div>
                                    <div class="ask__box-item">Ивдель</div>
                                    <div class="ask__box-item">Игарка</div>
                                    <div class="ask__box-item">Ижевск</div>
                                    <div class="ask__box-item">Избербаш</div>
                                    <div class="ask__box-item">Изобильный</div>
                                    <div class="ask__box-item">Иланский</div>
                                    <div class="ask__box-item">Инза</div>
                                    <div class="ask__box-item">Иннополис</div>
                                    <div class="ask__box-item">Инсар</div>
                                    <div class="ask__box-item">Инта</div>
                                    <div class="ask__box-item">Ипатово</div>
                                    <div class="ask__box-item">Ирбит</div>
                                    <div class="ask__box-item">Иркутск</div>
                                    <div class="ask__box-item">Исилькуль</div>
                                    <div class="ask__box-item">Искитим</div>
                                    <div class="ask__box-item">Истра</div>
                                    <div class="ask__box-item">Ишим</div>
                                    <div class="ask__box-item">Ишимбай</div>
                                    <div class="ask__box-item">Йошкар-Ола</div>
                                    <div class="ask__box-item">Кадников</div>
                                    <div class="ask__box-item">Казань</div>
                                    <div class="ask__box-item">Калач</div>
                                    <div class="ask__box-item">Калач-на-Дону</div>
                                    <div class="ask__box-item">Калачинск</div>
                                    <div class="ask__box-item">Калининград</div>
                                    <div class="ask__box-item">Калининск</div>
                                    <div class="ask__box-item">Калтан</div>
                                    <div class="ask__box-item">Калуга</div>
                                    <div class="ask__box-item">Калязин</div>
                                    <div class="ask__box-item">Камбарка</div>
                                    <div class="ask__box-item">Каменка</div>
                                    <div class="ask__box-item">Каменногорск</div>
                                    <div class="ask__box-item">Каменск-Уральский</div>
                                    <div class="ask__box-item">Каменск-Шахтинский</div>
                                    <div class="ask__box-item">Камень-на-Оби</div>
                                    <div class="ask__box-item">Камешково</div>
                                    <div class="ask__box-item">Камызяк</div>
                                    <div class="ask__box-item">Камышин</div>
                                    <div class="ask__box-item">Камышлов</div>
                                    <div class="ask__box-item">Канаш</div>
                                    <div class="ask__box-item">Кандалакша</div>
                                    <div class="ask__box-item">Канск</div>
                                    <div class="ask__box-item">Карабаново</div>
                                    <div class="ask__box-item">Карабаш</div>
                                    <div class="ask__box-item">Карабулак</div>
                                    <div class="ask__box-item">Карасук</div>
                                    <div class="ask__box-item">Карачаевск</div>
                                    <div class="ask__box-item">Карачев</div>
                                    <div class="ask__box-item">Каргат</div>
                                    <div class="ask__box-item">Каргополь</div>
                                    <div class="ask__box-item">Карпинск</div>
                                    <div class="ask__box-item">Карталы</div>
                                    <div class="ask__box-item">Касимов</div>
                                    <div class="ask__box-item">Касли</div>
                                    <div class="ask__box-item">Каспийск</div>
                                    <div class="ask__box-item">Катав-Ивановск</div>
                                    <div class="ask__box-item">Катайск</div>
                                    <div class="ask__box-item">Качканар</div>
                                    <div class="ask__box-item">Кашин</div>
                                    <div class="ask__box-item">Кашира</div>
                                    <div class="ask__box-item">Кедровый</div>
                                    <div class="ask__box-item">Кемерово</div>
                                    <div class="ask__box-item">Кемь</div>
                                    <div class="ask__box-item">Керчь</div>
                                    <div class="ask__box-item">Кизел</div>
                                    <div class="ask__box-item">Кизилюрт</div>
                                    <div class="ask__box-item">Кизляр</div>
                                    <div class="ask__box-item">Кимовск</div>
                                    <div class="ask__box-item">Кимры</div>
                                    <div class="ask__box-item">Кингисепп</div>
                                    <div class="ask__box-item">Кинель</div>
                                    <div class="ask__box-item">Кинешма</div>
                                    <div class="ask__box-item">Киреевск</div>
                                    <div class="ask__box-item">Киренск</div>
                                    <div class="ask__box-item">Киржач</div>
                                    <div class="ask__box-item">Кириллов</div>
                                    <div class="ask__box-item">Кириши</div>
                                    <div class="ask__box-item">Киров</div>
                                    <div class="ask__box-item">Кировград</div>
                                    <div class="ask__box-item">Кирово-Чепецк</div>
                                    <div class="ask__box-item">Кировск</div>
                                    <div class="ask__box-item">Кирс</div>
                                    <div class="ask__box-item">Кирсанов</div>
                                    <div class="ask__box-item">Киселёвск</div>
                                    <div class="ask__box-item">Кисловодск</div>
                                    <div class="ask__box-item">Клин</div>
                                    <div class="ask__box-item">Клинцы</div>
                                    <div class="ask__box-item">Княгинино</div>
                                    <div class="ask__box-item">Ковдор</div>
                                    <div class="ask__box-item">Ковров</div>
                                    <div class="ask__box-item">Ковылкино</div>
                                    <div class="ask__box-item">Когалым</div>
                                    <div class="ask__box-item">Кодинск</div>
                                    <div class="ask__box-item">Козельск</div>
                                    <div class="ask__box-item">Козловка</div>
                                    <div class="ask__box-item">Козьмодемьянск</div>
                                    <div class="ask__box-item">Кола</div>
                                    <div class="ask__box-item">Кологрив</div>
                                    <div class="ask__box-item">Коломна</div>
                                    <div class="ask__box-item">Колпашево</div>
                                    <div class="ask__box-item">Кольчугино</div>
                                    <div class="ask__box-item">Коммунар</div>
                                    <div class="ask__box-item">Комсомольск</div>
                                    <div class="ask__box-item">Комсомольск-на-Амуре</div>
                                    <div class="ask__box-item">Конаково</div>
                                    <div class="ask__box-item">Кондопога</div>
                                    <div class="ask__box-item">Кондрово</div>
                                    <div class="ask__box-item">Константиновск</div>
                                    <div class="ask__box-item">Копейск</div>
                                    <div class="ask__box-item">Кораблино</div>
                                    <div class="ask__box-item">Кореновск</div>
                                    <div class="ask__box-item">Коркино</div>
                                    <div class="ask__box-item">Королёв</div>
                                    <div class="ask__box-item">Короча</div>
                                    <div class="ask__box-item">Корсаков</div>
                                    <div class="ask__box-item">Коряжма</div>
                                    <div class="ask__box-item">Костерёво</div>
                                    <div class="ask__box-item">Костомукша</div>
                                    <div class="ask__box-item">Кострома</div>
                                    <div class="ask__box-item">Котельники</div>
                                    <div class="ask__box-item">Котельниково</div>
                                    <div class="ask__box-item">Котельнич</div>
                                    <div class="ask__box-item">Котлас</div>
                                    <div class="ask__box-item">Котово</div>
                                    <div class="ask__box-item">Котовск</div>
                                    <div class="ask__box-item">Кохма</div>
                                    <div class="ask__box-item">Красавино</div>
                                    <div class="ask__box-item">Красноармейск</div>
                                    <div class="ask__box-item">Красновишерск</div>
                                    <div class="ask__box-item">Красногорск</div>
                                    <div class="ask__box-item">Краснодар</div>
                                    <div class="ask__box-item">Краснозаводск</div>
                                    <div class="ask__box-item">Краснознаменск</div>
                                    <div class="ask__box-item">Краснокаменск</div>
                                    <div class="ask__box-item">Краснокамск</div>
                                    <div class="ask__box-item">Красноперекопск</div>
                                    <div class="ask__box-item">Краснослободск</div>
                                    <div class="ask__box-item">Краснотурьинск</div>
                                    <div class="ask__box-item">Красноуральск</div>
                                    <div class="ask__box-item">Красноуфимск</div>
                                    <div class="ask__box-item">Красноярск</div>
                                    <div class="ask__box-item">Красный Кут</div>
                                    <div class="ask__box-item">Красный Сулин</div>
                                    <div class="ask__box-item">Красный Холм</div>
                                    <div class="ask__box-item">Кремёнки</div>
                                    <div class="ask__box-item">Кропоткин</div>
                                    <div class="ask__box-item">Крымск</div>
                                    <div class="ask__box-item">Кстово</div>
                                    <div class="ask__box-item">Кубинка</div>
                                    <div class="ask__box-item">Кувандык</div>
                                    <div class="ask__box-item">Кувшиново</div>
                                    <div class="ask__box-item">Кудымкар</div>
                                    <div class="ask__box-item">Кузнецк</div>
                                    <div class="ask__box-item">Куйбышев</div>
                                    <div class="ask__box-item">Кулебаки</div>
                                    <div class="ask__box-item">Кумертау</div>
                                    <div class="ask__box-item">Кунгур</div>
                                    <div class="ask__box-item">Купино</div>
                                    <div class="ask__box-item">Курган</div>
                                    <div class="ask__box-item">Курганинск</div>
                                    <div class="ask__box-item">Курильск</div>
                                    <div class="ask__box-item">Курлово</div>
                                    <div class="ask__box-item">Куровское</div>
                                    <div class="ask__box-item">Курск</div>
                                    <div class="ask__box-item">Куртамыш</div>
                                    <div class="ask__box-item">Курчатов</div>
                                    <div class="ask__box-item">Куса</div>
                                    <div class="ask__box-item">Кушва</div>
                                    <div class="ask__box-item">Кызыл</div>
                                    <div class="ask__box-item">Кыштым</div>
                                    <div class="ask__box-item">Кяхта</div>
                                    <div class="ask__box-item">Лабинск</div>
                                    <div class="ask__box-item">Лабытнанги</div>
                                    <div class="ask__box-item">Лагань</div>
                                    <div class="ask__box-item">Ладушкин</div>
                                    <div class="ask__box-item">Лаишево</div>
                                    <div class="ask__box-item">Лакинск</div>
                                    <div class="ask__box-item">Лангепас</div>
                                    <div class="ask__box-item">Лахденпохья</div>
                                    <div class="ask__box-item">Лебедянь</div>
                                    <div class="ask__box-item">Лениногорск</div>
                                    <div class="ask__box-item">Ленинск</div>
                                    <div class="ask__box-item">Ленинск-Кузнецкий</div>
                                    <div class="ask__box-item">Ленск</div>
                                    <div class="ask__box-item">Лермонтов</div>
                                    <div class="ask__box-item">Лесной</div>
                                    <div class="ask__box-item">Лесозаводск</div>
                                    <div class="ask__box-item">Лесосибирск</div>
                                    <div class="ask__box-item">Ливны</div>
                                    <div class="ask__box-item">Ликино-Дулёво</div>
                                    <div class="ask__box-item">Липецк</div>
                                    <div class="ask__box-item">Липки</div>
                                    <div class="ask__box-item">Лиски</div>
                                    <div class="ask__box-item">Лихославль</div>
                                    <div class="ask__box-item">Лобня</div>
                                    <div class="ask__box-item">Лодейное Поле</div>
                                    <div class="ask__box-item">Лосино-Петровский</div>
                                    <div class="ask__box-item">Луга</div>
                                    <div class="ask__box-item">Луза</div>
                                    <div class="ask__box-item">Лукоянов</div>
                                    <div class="ask__box-item">Луховицы</div>
                                    <div class="ask__box-item">Лысково</div>
                                    <div class="ask__box-item">Лысьва</div>
                                    <div class="ask__box-item">Лыткарино</div>
                                    <div class="ask__box-item">Льгов</div>
                                    <div class="ask__box-item">Любань</div>
                                    <div class="ask__box-item">Люберцы</div>
                                    <div class="ask__box-item">Любим</div>
                                    <div class="ask__box-item">Людиново</div>
                                    <div class="ask__box-item">Лянтор</div>
                                    <div class="ask__box-item">Магадан</div>
                                    <div class="ask__box-item">Магас</div>
                                    <div class="ask__box-item">Магнитогорск</div>
                                    <div class="ask__box-item">Майкоп</div>
                                    <div class="ask__box-item">Майский</div>
                                    <div class="ask__box-item">Макаров</div>
                                    <div class="ask__box-item">Макарьев</div>
                                    <div class="ask__box-item">Макушино</div>
                                    <div class="ask__box-item">Малая Вишера</div>
                                    <div class="ask__box-item">Малгобек</div>
                                    <div class="ask__box-item">Малмыж</div>
                                    <div class="ask__box-item">Малоархангельск</div>
                                    <div class="ask__box-item">Малоярославец</div>
                                    <div class="ask__box-item">Мамадыш</div>
                                    <div class="ask__box-item">Мамоново</div>
                                    <div class="ask__box-item">Мантурово</div>
                                    <div class="ask__box-item">Мариинск</div>
                                    <div class="ask__box-item">Мариинский Посад</div>
                                    <div class="ask__box-item">Маркс</div>
                                    <div class="ask__box-item">Махачкала</div>
                                    <div class="ask__box-item">Мглин</div>
                                    <div class="ask__box-item">Мегион</div>
                                    <div class="ask__box-item">Медвежьегорск</div>
                                    <div class="ask__box-item">Медногорск</div>
                                    <div class="ask__box-item">Медынь</div>
                                    <div class="ask__box-item">Межгорье</div>
                                    <div class="ask__box-item">Междуреченск</div>
                                    <div class="ask__box-item">Мезень</div>
                                    <div class="ask__box-item">Меленки</div>
                                    <div class="ask__box-item">Мелеуз</div>
                                    <div class="ask__box-item">Менделеевск</div>
                                    <div class="ask__box-item">Мензелинск</div>
                                    <div class="ask__box-item">Мещовск</div>
                                    <div class="ask__box-item">Миасс</div>
                                    <div class="ask__box-item">Микунь</div>
                                    <div class="ask__box-item">Миллерово</div>
                                    <div class="ask__box-item">Минеральные Воды</div>
                                    <div class="ask__box-item">Минусинск</div>
                                    <div class="ask__box-item">Миньяр</div>
                                    <div class="ask__box-item">Мирный (Архангельская область)</div>
                                    <div class="ask__box-item">Михайлов</div>
                                    <div class="ask__box-item">Михайловка</div>
                                    <div class="ask__box-item">Михайловск</div>
                                    <div class="ask__box-item">Мичуринск</div>
                                    <div class="ask__box-item">Могоча</div>
                                    <div class="ask__box-item">Можайск</div>
                                    <div class="ask__box-item">Можга</div>
                                    <div class="ask__box-item">Моздок</div>
                                    <div class="ask__box-item">Мончегорск</div>
                                    <div class="ask__box-item">Морозовск</div>
                                    <div class="ask__box-item">Моршанск</div>
                                    <div class="ask__box-item">Мосальск</div>
                                    <div class="ask__box-item">Москва</div>
                                    <div class="ask__box-item">Муравленко</div>
                                    <div class="ask__box-item">Мураши</div>
                                    <div class="ask__box-item">Мурманск</div>
                                    <div class="ask__box-item">Муром</div>
                                    <div class="ask__box-item">Мценск</div>
                                    <div class="ask__box-item">Мыски</div>
                                    <div class="ask__box-item">Мытищи</div>
                                    <div class="ask__box-item">Мышкин</div>
                                    <div class="ask__box-item">Набережные Челны</div>
                                    <div class="ask__box-item">Навашино</div>
                                    <div class="ask__box-item">Наволоки</div>
                                    <div class="ask__box-item">Надым</div>
                                    <div class="ask__box-item">Назарово</div>
                                    <div class="ask__box-item">Назрань</div>
                                    <div class="ask__box-item">Называевск</div>
                                    <div class="ask__box-item">Нальчик</div>
                                    <div class="ask__box-item">Нариманов</div>
                                    <div class="ask__box-item">Наро-Фоминск</div>
                                    <div class="ask__box-item">Нарткала</div>
                                    <div class="ask__box-item">Нарьян-Мар</div>
                                    <div class="ask__box-item">Находка</div>
                                    <div class="ask__box-item">Невель</div>
                                    <div class="ask__box-item">Невельск</div>
                                    <div class="ask__box-item">Невинномысск</div>
                                    <div class="ask__box-item">Невьянск</div>
                                    <div class="ask__box-item">Нелидово</div>
                                    <div class="ask__box-item">Неман</div>
                                    <div class="ask__box-item">Нерехта</div>
                                    <div class="ask__box-item">Нерчинск</div>
                                    <div class="ask__box-item">Нерюнгри</div>
                                    <div class="ask__box-item">Нестеров</div>
                                    <div class="ask__box-item">Нефтегорск</div>
                                    <div class="ask__box-item">Нефтекамск</div>
                                    <div class="ask__box-item">Нефтекумск</div>
                                    <div class="ask__box-item">Нефтеюганск</div>
                                    <div class="ask__box-item">Нея</div>
                                    <div class="ask__box-item">Нижневартовск</div>
                                    <div class="ask__box-item">Нижнекамск</div>
                                    <div class="ask__box-item">Нижнеудинск</div>
                                    <div class="ask__box-item">Нижние Серги</div>
                                    <div class="ask__box-item">Нижний Ломов</div>
                                    <div class="ask__box-item">Нижний Новгород</div>
                                    <div class="ask__box-item">Нижний Тагил</div>
                                    <div class="ask__box-item">Нижняя Салда</div>
                                    <div class="ask__box-item">Нижняя Тура</div>
                                    <div class="ask__box-item">Николаевск</div>
                                    <div class="ask__box-item">Николаевск-на-Амуре</div>
                                    <div class="ask__box-item">Никольск</div>
                                    <div class="ask__box-item">Никольское</div>
                                    <div class="ask__box-item">Новая Ладога</div>
                                    <div class="ask__box-item">Новая Ляля</div>
                                    <div class="ask__box-item">Новоалександровск</div>
                                    <div class="ask__box-item">Новоалтайск</div>
                                    <div class="ask__box-item">Новоаннинский</div>
                                    <div class="ask__box-item">Нововоронеж</div>
                                    <div class="ask__box-item">Новодвинск</div>
                                    <div class="ask__box-item">Новозыбков</div>
                                    <div class="ask__box-item">Новокубанск</div>
                                    <div class="ask__box-item">Новокузнецк</div>
                                    <div class="ask__box-item">Новокуйбышевск</div>
                                    <div class="ask__box-item">Новомичуринск</div>
                                    <div class="ask__box-item">Новомосковск</div>
                                    <div class="ask__box-item">Новопавловск</div>
                                    <div class="ask__box-item">Новоржев</div>
                                    <div class="ask__box-item">Новороссийск</div>
                                    <div class="ask__box-item">Новосибирск</div>
                                    <div class="ask__box-item">Новосиль</div>
                                    <div class="ask__box-item">Новосокольники</div>
                                    <div class="ask__box-item">Новотроицк</div>
                                    <div class="ask__box-item">Новоузенск</div>
                                    <div class="ask__box-item">Новоульяновск</div>
                                    <div class="ask__box-item">Новоуральск</div>
                                    <div class="ask__box-item">Новохопёрск</div>
                                    <div class="ask__box-item">Новочебоксарск</div>
                                    <div class="ask__box-item">Новочеркасск</div>
                                    <div class="ask__box-item">Новошахтинск</div>
                                    <div class="ask__box-item">Новый Оскол</div>
                                    <div class="ask__box-item">Новый Уренгой</div>
                                    <div class="ask__box-item">Ногинск</div>
                                    <div class="ask__box-item">Нолинск</div>
                                    <div class="ask__box-item">Норильск</div>
                                    <div class="ask__box-item">Ноябрьск</div>
                                    <div class="ask__box-item">Нурлат</div>
                                    <div class="ask__box-item">Нытва</div>
                                    <div class="ask__box-item">Нюрба</div>
                                    <div class="ask__box-item">Нягань</div>
                                    <div class="ask__box-item">Нязепетровск</div>
                                    <div class="ask__box-item">Няндома</div>
                                    <div class="ask__box-item">Облучье</div>
                                    <div class="ask__box-item">Обнинск</div>
                                    <div class="ask__box-item">Обоянь</div>
                                    <div class="ask__box-item">Обь</div>
                                    <div class="ask__box-item">Одинцово</div>
                                    <div class="ask__box-item">Озёрск</div>
                                    <div class="ask__box-item">Озёры</div>
                                    <div class="ask__box-item">Октябрьск</div>
                                    <div class="ask__box-item">Октябрьский</div>
                                    <div class="ask__box-item">Окуловка</div>
                                    <div class="ask__box-item">Олёкминск</div>
                                    <div class="ask__box-item">Оленегорск</div>
                                    <div class="ask__box-item">Олонец</div>
                                    <div class="ask__box-item">Омск</div>
                                    <div class="ask__box-item">Омутнинск</div>
                                    <div class="ask__box-item">Онега</div>
                                    <div class="ask__box-item">Опочка</div>
                                    <div class="ask__box-item">Орёл</div>
                                    <div class="ask__box-item">Оренбург</div>
                                    <div class="ask__box-item">Орехово-Зуево</div>
                                    <div class="ask__box-item">Орлов</div>
                                    <div class="ask__box-item">Орск</div>
                                    <div class="ask__box-item">Оса</div>
                                    <div class="ask__box-item">Осинники</div>
                                    <div class="ask__box-item">Осташков</div>
                                    <div class="ask__box-item">Остров</div>
                                    <div class="ask__box-item">Островной</div>
                                    <div class="ask__box-item">Острогожск</div>
                                    <div class="ask__box-item">Отрадное</div>
                                    <div class="ask__box-item">Отрадный</div>
                                    <div class="ask__box-item">Оха</div>
                                    <div class="ask__box-item">Оханск</div>
                                    <div class="ask__box-item">Очёр</div>
                                    <div class="ask__box-item">Павлово</div>
                                    <div class="ask__box-item">Павловск</div>
                                    <div class="ask__box-item">Павловский Посад</div>
                                    <div class="ask__box-item">Палласовка</div>
                                    <div class="ask__box-item">Партизанск</div>
                                    <div class="ask__box-item">Певек</div>
                                    <div class="ask__box-item">Пенза</div>
                                    <div class="ask__box-item">Первомайск</div>
                                    <div class="ask__box-item">Первоуральск</div>
                                    <div class="ask__box-item">Перевоз</div>
                                    <div class="ask__box-item">Пересвет</div>
                                    <div class="ask__box-item">Переславль-Залесский</div>
                                    <div class="ask__box-item">Пермь</div>
                                    <div class="ask__box-item">Пестово</div>
                                    <div class="ask__box-item">Петров Вал</div>
                                    <div class="ask__box-item">Петровск</div>
                                    <div class="ask__box-item">Петровск-Забайкальский</div>
                                    <div class="ask__box-item">Петрозаводск</div>
                                    <div class="ask__box-item">Петропавловск-Камчатский</div>
                                    <div class="ask__box-item">Петухово</div>
                                    <div class="ask__box-item">Петушки</div>
                                    <div class="ask__box-item">Печора</div>
                                    <div class="ask__box-item">Печоры</div>
                                    <div class="ask__box-item">Пикалёво</div>
                                    <div class="ask__box-item">Пионерский</div>
                                    <div class="ask__box-item">Питкяранта</div>
                                    <div class="ask__box-item">Плавск</div>
                                    <div class="ask__box-item">Пласт</div>
                                    <div class="ask__box-item">Плёс</div>
                                    <div class="ask__box-item">Поворино</div>
                                    <div class="ask__box-item">Подольск</div>
                                    <div class="ask__box-item">Подпорожье</div>
                                    <div class="ask__box-item">Покачи</div>
                                    <div class="ask__box-item">Покров</div>
                                    <div class="ask__box-item">Покровск</div>
                                    <div class="ask__box-item">Полевской</div>
                                    <div class="ask__box-item">Полесск</div>
                                    <div class="ask__box-item">Полысаево</div>
                                    <div class="ask__box-item">Полярные Зори</div>
                                    <div class="ask__box-item">Полярный</div>
                                    <div class="ask__box-item">Поронайск</div>
                                    <div class="ask__box-item">Порхов</div>
                                    <div class="ask__box-item">Похвистнево</div>
                                    <div class="ask__box-item">Почеп</div>
                                    <div class="ask__box-item">Починок</div>
                                    <div class="ask__box-item">Пошехонье</div>
                                    <div class="ask__box-item">Правдинск</div>
                                    <div class="ask__box-item">Приволжск</div>
                                    <div class="ask__box-item">Приморск</div>
                                    <div class="ask__box-item">Приморско-Ахтарск</div>
                                    <div class="ask__box-item">Приозерск</div>
                                    <div class="ask__box-item">Прокопьевск</div>
                                    <div class="ask__box-item">Пролетарск</div>
                                    <div class="ask__box-item">Протвино</div>
                                    <div class="ask__box-item">Прохладный</div>
                                    <div class="ask__box-item">Псков</div>
                                    <div class="ask__box-item">Пугачёв</div>
                                    <div class="ask__box-item">Пудож</div>
                                    <div class="ask__box-item">Пустошка</div>
                                    <div class="ask__box-item">Пучеж</div>
                                    <div class="ask__box-item">Пушкино</div>
                                    <div class="ask__box-item">Пущино</div>
                                    <div class="ask__box-item">Пыталово</div>
                                    <div class="ask__box-item">Пыть-Ях</div>
                                    <div class="ask__box-item">Пятигорск</div>
                                    <div class="ask__box-item">Радужный</div>
                                    <div class="ask__box-item">Райчихинск</div>
                                    <div class="ask__box-item">Раменское</div>
                                    <div class="ask__box-item">Рассказово</div>
                                    <div class="ask__box-item">Ревда</div>
                                    <div class="ask__box-item">Реж</div>
                                    <div class="ask__box-item">Реутов</div>
                                    <div class="ask__box-item">Ржев</div>
                                    <div class="ask__box-item">Родники</div>
                                    <div class="ask__box-item">Рославль</div>
                                    <div class="ask__box-item">Россошь</div>
                                    <div class="ask__box-item">Ростов</div>
                                    <div class="ask__box-item">Ростов-на-Дону</div>
                                    <div class="ask__box-item">Рошаль</div>
                                    <div class="ask__box-item">Ртищево</div>
                                    <div class="ask__box-item">Рубцовск</div>
                                    <div class="ask__box-item">Рудня</div>
                                    <div class="ask__box-item">Руза</div>
                                    <div class="ask__box-item">Рузаевка</div>
                                    <div class="ask__box-item">Рыбинск</div>
                                    <div class="ask__box-item">Рыбное</div>
                                    <div class="ask__box-item">Рыльск</div>
                                    <div class="ask__box-item">Ряжск</div>
                                    <div class="ask__box-item">Рязань</div>
                                    <div class="ask__box-item">Саки</div>
                                    <div class="ask__box-item">Салават</div>
                                    <div class="ask__box-item">Салаир</div>
                                    <div class="ask__box-item">Салехард</div>
                                    <div class="ask__box-item">Сальск</div>
                                    <div class="ask__box-item">Самара</div>
                                    <div class="ask__box-item">Санкт-Петербург</div>
                                    <div class="ask__box-item">Саранск</div>
                                    <div class="ask__box-item">Сарапул</div>
                                    <div class="ask__box-item">Саратов</div>
                                    <div class="ask__box-item">Саров</div>
                                    <div class="ask__box-item">Сасово</div>
                                    <div class="ask__box-item">Сатка</div>
                                    <div class="ask__box-item">Сафоново</div>
                                    <div class="ask__box-item">Саяногорск</div>
                                    <div class="ask__box-item">Саянск</div>
                                    <div class="ask__box-item">Светлогорск</div>
                                    <div class="ask__box-item">Светлоград</div>
                                    <div class="ask__box-item">Светлый</div>
                                    <div class="ask__box-item">Светогорск</div>
                                    <div class="ask__box-item">Свирск</div>
                                    <div class="ask__box-item">Свободный</div>
                                    <div class="ask__box-item">Себеж</div>
                                    <div class="ask__box-item">Севастополь</div>
                                    <div class="ask__box-item">Северо-Курильск</div>
                                    <div class="ask__box-item">Северобайкальск</div>
                                    <div class="ask__box-item">Северодвинск</div>
                                    <div class="ask__box-item">Североморск</div>
                                    <div class="ask__box-item">Североуральск</div>
                                    <div class="ask__box-item">Северск</div>
                                    <div class="ask__box-item">Севск</div>
                                    <div class="ask__box-item">Сегежа</div>
                                    <div class="ask__box-item">Сельцо</div>
                                    <div class="ask__box-item">Семёнов</div>
                                    <div class="ask__box-item">Семикаракорск</div>
                                    <div class="ask__box-item">Семилуки</div>
                                    <div class="ask__box-item">Сенгилей</div>
                                    <div class="ask__box-item">Серафимович</div>
                                    <div class="ask__box-item">Сергач</div>
                                    <div class="ask__box-item">Сергиев Посад</div>
                                    <div class="ask__box-item">Сердобск</div>
                                    <div class="ask__box-item">Серов</div>
                                    <div class="ask__box-item">Серпухов</div>
                                    <div class="ask__box-item">Сертолово</div>
                                    <div class="ask__box-item">Сибай</div>
                                    <div class="ask__box-item">Сим</div>
                                    <div class="ask__box-item">Симферополь</div>
                                    <div class="ask__box-item">Сковородино</div>
                                    <div class="ask__box-item">Скопин</div>
                                    <div class="ask__box-item">Славгород</div>
                                    <div class="ask__box-item">Славск</div>
                                    <div class="ask__box-item">Славянск-на-Кубани</div>
                                    <div class="ask__box-item">Сланцы</div>
                                    <div class="ask__box-item">Слободской</div>
                                    <div class="ask__box-item">Слюдянка</div>
                                    <div class="ask__box-item">Смоленск</div>
                                    <div class="ask__box-item">Снежинск</div>
                                    <div class="ask__box-item">Снежногорск</div>
                                    <div class="ask__box-item">Собинка</div>
                                    <div class="ask__box-item">Советск (Тульская обл)</div>
                                    <div class="ask__box-item">Советская Гавань</div>
                                    <div class="ask__box-item">Советский</div>
                                    <div class="ask__box-item">Сокол</div>
                                    <div class="ask__box-item">Солигалич</div>
                                    <div class="ask__box-item">Соликамск</div>
                                    <div class="ask__box-item">Солнечногорск</div>
                                    <div class="ask__box-item">Соль-Илецк</div>
                                    <div class="ask__box-item">Сольвычегодск</div>
                                    <div class="ask__box-item">Сольцы</div>
                                    <div class="ask__box-item">Сорочинск</div>
                                    <div class="ask__box-item">Сорск</div>
                                    <div class="ask__box-item">Сортавала</div>
                                    <div class="ask__box-item">Сосенский</div>
                                    <div class="ask__box-item">Сосновка</div>
                                    <div class="ask__box-item">Сосновоборск</div>
                                    <div class="ask__box-item">Сосновый Бор</div>
                                    <div class="ask__box-item">Сосногорск</div>
                                    <div class="ask__box-item">Сочи</div>
                                    <div class="ask__box-item">Спас-Деменск</div>
                                    <div class="ask__box-item">Спас-Клепики</div>
                                    <div class="ask__box-item">Спасск</div>
                                    <div class="ask__box-item">Спасск-Дальний</div>
                                    <div class="ask__box-item">Спасск-Рязанский</div>
                                    <div class="ask__box-item">Среднеколымск</div>
                                    <div class="ask__box-item">Среднеуральск</div>
                                    <div class="ask__box-item">Сретенск</div>
                                    <div class="ask__box-item">Ставрополь</div>
                                    <div class="ask__box-item">Старая Купавна</div>
                                    <div class="ask__box-item">Старая Русса</div>
                                    <div class="ask__box-item">Старица</div>
                                    <div class="ask__box-item">Стародуб</div>
                                    <div class="ask__box-item">Старый Крым</div>
                                    <div class="ask__box-item">Старый Оскол</div>
                                    <div class="ask__box-item">Стерлитамак</div>
                                    <div class="ask__box-item">Стрежевой</div>
                                    <div class="ask__box-item">Строитель</div>
                                    <div class="ask__box-item">Струнино</div>
                                    <div class="ask__box-item">Ступино</div>
                                    <div class="ask__box-item">Суворов</div>
                                    <div class="ask__box-item">Судак</div>
                                    <div class="ask__box-item">Суджа</div>
                                    <div class="ask__box-item">Судогда</div>
                                    <div class="ask__box-item">Суздаль</div>
                                    <div class="ask__box-item">Сунжа</div>
                                    <div class="ask__box-item">Суоярви</div>
                                    <div class="ask__box-item">Сураж</div>
                                    <div class="ask__box-item">Сургут</div>
                                    <div class="ask__box-item">Суровикино</div>
                                    <div class="ask__box-item">Сурск</div>
                                    <div class="ask__box-item">Сусуман</div>
                                    <div class="ask__box-item">Сухиничи</div>
                                    <div class="ask__box-item">Сухой Лог</div>
                                    <div class="ask__box-item">Сызрань</div>
                                    <div class="ask__box-item">Сыктывкар</div>
                                    <div class="ask__box-item">Сысерть</div>
                                    <div class="ask__box-item">Сычёвка</div>
                                    <div class="ask__box-item">Сясьстрой</div>
                                    <div class="ask__box-item">Тавда</div>
                                    <div class="ask__box-item">Таганрог</div>
                                    <div class="ask__box-item">Тайга</div>
                                    <div class="ask__box-item">Тайшет</div>
                                    <div class="ask__box-item">Талдом</div>
                                    <div class="ask__box-item">Талица</div>
                                    <div class="ask__box-item">Тамбов</div>
                                    <div class="ask__box-item">Тара</div>
                                    <div class="ask__box-item">Тарко-Сале</div>
                                    <div class="ask__box-item">Таруса</div>
                                    <div class="ask__box-item">Татарск</div>
                                    <div class="ask__box-item">Таштагол</div>
                                    <div class="ask__box-item">Тверь</div>
                                    <div class="ask__box-item">Теберда</div>
                                    <div class="ask__box-item">Тейково</div>
                                    <div class="ask__box-item">Темников</div>
                                    <div class="ask__box-item">Темрюк</div>
                                    <div class="ask__box-item">Терек</div>
                                    <div class="ask__box-item">Тетюши</div>
                                    <div class="ask__box-item">Тимашёвск</div>
                                    <div class="ask__box-item">Тихвин</div>
                                    <div class="ask__box-item">Тихорецк</div>
                                    <div class="ask__box-item">Тобольск</div>
                                    <div class="ask__box-item">Тогучин</div>
                                    <div class="ask__box-item">Тольятти</div>
                                    <div class="ask__box-item">Томари</div>
                                    <div class="ask__box-item">Томмот</div>
                                    <div class="ask__box-item">Томск</div>
                                    <div class="ask__box-item">Топки</div>
                                    <div class="ask__box-item">Торжок</div>
                                    <div class="ask__box-item">Торопец</div>
                                    <div class="ask__box-item">Тосно</div>
                                    <div class="ask__box-item">Тотьма</div>
                                    <div class="ask__box-item">Трёхгорный</div>
                                    <div class="ask__box-item">Троицк</div>
                                    <div class="ask__box-item">Трубчевск</div>
                                    <div class="ask__box-item">Туапсе</div>
                                    <div class="ask__box-item">Туймазы</div>
                                    <div class="ask__box-item">Тула</div>
                                    <div class="ask__box-item">Тулун</div>
                                    <div class="ask__box-item">Туран</div>
                                    <div class="ask__box-item">Туринск</div>
                                    <div class="ask__box-item">Тутаев</div>
                                    <div class="ask__box-item">Тында</div>
                                    <div class="ask__box-item">Тырныауз</div>
                                    <div class="ask__box-item">Тюкалинск</div>
                                    <div class="ask__box-item">Тюмень</div>
                                    <div class="ask__box-item">Уварово</div>
                                    <div class="ask__box-item">Углегорск</div>
                                    <div class="ask__box-item">Углич</div>
                                    <div class="ask__box-item">Удачный</div>
                                    <div class="ask__box-item">Удомля</div>
                                    <div class="ask__box-item">Ужур</div>
                                    <div class="ask__box-item">Узловая</div>
                                    <div class="ask__box-item">Улан-Удэ</div>
                                    <div class="ask__box-item">Ульяновск</div>
                                    <div class="ask__box-item">Унеча</div>
                                    <div class="ask__box-item">Урай</div>
                                    <div class="ask__box-item">Урень</div>
                                    <div class="ask__box-item">Уржум</div>
                                    <div class="ask__box-item">Урус-Мартан</div>
                                    <div class="ask__box-item">Урюпинск</div>
                                    <div class="ask__box-item">Усинск</div>
                                    <div class="ask__box-item">Усмань</div>
                                    <div class="ask__box-item">Усолье</div>
                                    <div class="ask__box-item">Усолье-Сибирское</div>
                                    <div class="ask__box-item">Уссурийск</div>
                                    <div class="ask__box-item">Усть-Джегута</div>
                                    <div class="ask__box-item">Усть-Илимск</div>
                                    <div class="ask__box-item">Усть-Катав</div>
                                    <div class="ask__box-item">Усть-Кут</div>
                                    <div class="ask__box-item">Усть-Лабинск</div>
                                    <div class="ask__box-item">Устюжна</div>
                                    <div class="ask__box-item">Уфа</div>
                                    <div class="ask__box-item">Ухта</div>
                                    <div class="ask__box-item">Учалы</div>
                                    <div class="ask__box-item">Уяр</div>
                                    <div class="ask__box-item">Фатеж</div>
                                    <div class="ask__box-item">Феодосия</div>
                                    <div class="ask__box-item">Фокино</div>
                                    <div class="ask__box-item">Фролово</div>
                                    <div class="ask__box-item">Фрязино</div>
                                    <div class="ask__box-item">Фурманов</div>
                                    <div class="ask__box-item">Хабаровск</div>
                                    <div class="ask__box-item">Хадыженск</div>
                                    <div class="ask__box-item">Ханты-Мансийск</div>
                                    <div class="ask__box-item">Харабали</div>
                                    <div class="ask__box-item">Харовск</div>
                                    <div class="ask__box-item">Хасавюрт</div>
                                    <div class="ask__box-item">Хвалынск</div>
                                    <div class="ask__box-item">Хилок</div>
                                    <div class="ask__box-item">Химки</div>
                                    <div class="ask__box-item">Холм</div>
                                    <div class="ask__box-item">Холмск</div>
                                    <div class="ask__box-item">Хотьково</div>
                                    <div class="ask__box-item">Цивильск</div>
                                    <div class="ask__box-item">Цимлянск</div>
                                    <div class="ask__box-item">Чадан</div>
                                    <div class="ask__box-item">Чайковский</div>
                                    <div class="ask__box-item">Чапаевск</div>
                                    <div class="ask__box-item">Чаплыгин</div>
                                    <div class="ask__box-item">Чебаркуль</div>
                                    <div class="ask__box-item">Чебоксары</div>
                                    <div class="ask__box-item">Чегем</div>
                                    <div class="ask__box-item">Чекалин</div>
                                    <div class="ask__box-item">Челябинск</div>
                                    <div class="ask__box-item">Чердынь</div>
                                    <div class="ask__box-item">Черемхово</div>
                                    <div class="ask__box-item">Черепаново</div>
                                    <div class="ask__box-item">Череповец</div>
                                    <div class="ask__box-item">Черкесск</div>
                                    <div class="ask__box-item">Чёрмоз</div>
                                    <div class="ask__box-item">Черноголовка</div>
                                    <div class="ask__box-item">Черногорск</div>
                                    <div class="ask__box-item">Чернушка</div>
                                    <div class="ask__box-item">Черняховск</div>
                                    <div class="ask__box-item">Чехов</div>
                                    <div class="ask__box-item">Чистополь</div>
                                    <div class="ask__box-item">Чита</div>
                                    <div class="ask__box-item">Чкаловск</div>
                                    <div class="ask__box-item">Чудово</div>
                                    <div class="ask__box-item">Чулым</div>
                                    <div class="ask__box-item">Чусовой</div>
                                    <div class="ask__box-item">Чухлома</div>
                                    <div class="ask__box-item">Шагонар</div>
                                    <div class="ask__box-item">Шадринск</div>
                                    <div class="ask__box-item">Шали</div>
                                    <div class="ask__box-item">Шарыпово</div>
                                    <div class="ask__box-item">Шарья</div>
                                    <div class="ask__box-item">Шатура</div>
                                    <div class="ask__box-item">Шахты</div>
                                    <div class="ask__box-item">Шахунья</div>
                                    <div class="ask__box-item">Шацк</div>
                                    <div class="ask__box-item">Шебекино</div>
                                    <div class="ask__box-item">Шелехов</div>
                                    <div class="ask__box-item">Шенкурск</div>
                                    <div class="ask__box-item">Шилка</div>
                                    <div class="ask__box-item">Шимановск</div>
                                    <div class="ask__box-item">Шиханы</div>
                                    <div class="ask__box-item">Шлиссельбург</div>
                                    <div class="ask__box-item">Шумерля</div>
                                    <div class="ask__box-item">Шумиха</div>
                                    <div class="ask__box-item">Шуя</div>
                                    <div class="ask__box-item">Щекино</div>
                                    <div class="ask__box-item">Щёлкино</div>
                                    <div class="ask__box-item">Щёлково</div>
                                    <div class="ask__box-item">Щигры</div>
                                    <div class="ask__box-item">Щучье</div>
                                    <div class="ask__box-item">Электрогорск</div>
                                    <div class="ask__box-item">Электросталь</div>
                                    <div class="ask__box-item">Электроугли</div>
                                    <div class="ask__box-item">Элиста</div>
                                    <div class="ask__box-item">Энгельс</div>
                                    <div class="ask__box-item">Энем</div>
                                    <div class="ask__box-item">Эртиль</div>
                                    <div class="ask__box-item">Югорск</div>
                                    <div class="ask__box-item">Южа</div>
                                    <div class="ask__box-item">Южно-Сахалинск</div>
                                    <div class="ask__box-item">Южно-Сухокумск</div>
                                    <div class="ask__box-item">Южноуральск</div>
                                    <div class="ask__box-item">Юрга</div>
                                    <div class="ask__box-item">Юрьев-Польский</div>
                                    <div class="ask__box-item">Юрьевец</div>
                                    <div class="ask__box-item">Юрюзань</div>
                                    <div class="ask__box-item">Юхнов</div>
                                    <div class="ask__box-item">Яблоновский</div>
                                    <div class="ask__box-item">Ядрин</div>
                                    <div class="ask__box-item">Якутск</div>
                                    <div class="ask__box-item">Ялта</div>
                                    <div class="ask__box-item">Ялуторовск</div>
                                    <div class="ask__box-item">Янаул</div>
                                    <div class="ask__box-item">Яранск</div>
                                    <div class="ask__box-item">Яровое</div>
                                    <div class="ask__box-item">Ярославль</div>
                                    <div class="ask__box-item">Ярцево</div>
                                    <div class="ask__box-item">Ясногорск</div>
                                    <div class="ask__box-item">Ясный</div>
                                    <div class="ask__box-item">Яхрома</div>
                                    <div class="ask__box-item">Кудрово</div>
                                    <div class="ask__box-item">Кукмор</div>
                                    <div class="ask__box-item">Курчалой</div>
                                    <div class="ask__box-item">Бея</div>
                                    <div class="ask__box-item">Игра</div>
                                    <div class="ask__box-item">Пеники</div>
                                    <div class="ask__box-item">Омсукчан</div>
                                    <div class="ask__box-item">Кысыл-Сыр</div>
                                    <div class="ask__box-item">Биджан</div>
                                    <div class="ask__box-item">Турочак</div>
                                    <div class="ask__box-item">Львовский</div>
                                    <div class="ask__box-item">Тахтамукай</div>
                                    <div class="ask__box-item">Нижний Одес</div>
                                    <div class="ask__box-item">Киргиз-Мияки</div>
                                    <div class="ask__box-item">Зеленоград</div>
                                    <div class="ask__box-item">Яренск</div>
                                    <div class="ask__box-item">Вурнары</div>
                                    <div class="ask__box-item">Атяшево</div>
                                    <div class="ask__box-item">Смирных</div>
                                    <div class="ask__box-item">Малая Пурга</div>
                                    <div class="ask__box-item">Коротчаево (пуровский)</div>
                                    <div class="ask__box-item">Красногорское</div>
                                    <div class="ask__box-item">Кизнер</div>
                                    <div class="ask__box-item">Пиндуши</div>
                                    <div class="ask__box-item">Кокошкино</div>
                                    <div class="ask__box-item">Комарово</div>
                                    <div class="ask__box-item">Караваево</div>
                                    <div class="ask__box-item">Пангоды</div>
                                    <div class="ask__box-item">Ижморский</div>
                                    <div class="ask__box-item">Усть-Баргузин</div>
                                    <div class="ask__box-item">Нур-Тухум</div>
                                    <div class="ask__box-item">Выкатной</div>
                                    <div class="ask__box-item">Раздольный</div>
                                    <div class="ask__box-item">Аксубаево</div>
                                    <div class="ask__box-item">Яшалта</div>
                                    <div class="ask__box-item">Федоровский</div>
                                    <div class="ask__box-item">Автуры</div>
                                    <div class="ask__box-item">Энгель-Юрт</div>
                                    <div class="ask__box-item">Новомихайловка</div>
                                    <div class="ask__box-item">Нижнее Казанище</div>
                                    <div class="ask__box-item">Мирный (Якутия)</div>
                                    <div class="ask__box-item">Усть-Элегест</div>
                                    <div class="ask__box-item">Мари-Турек</div>
                                    <div class="ask__box-item">Морки</div>

                                </div>
                            `

                            askWriting.insertAdjacentElement('beforebegin', askGrid)
                            askWriting.remove()
                            setTimeout(() => {
                                askGrid.classList.add('_active')
                            }, 100)
                            document.querySelector('.ask__input').addEventListener('input', (e) => {
                                [...document.querySelectorAll('.ask__box-item')].forEach(item => {
                                    if (item.textContent.toLowerCase().includes(e.target.value.toLowerCase())) {
                                        item.style.display = 'block'
                                    } else {
                                        item.style.display = 'none'
                                    }
                                })
                            })

                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                })
            }
        }
    })

    document.addEventListener('click', (e) => {
        let isClicked = e.target.closest('.ask__box-item')

        if (isClicked) {
            
//            var answerdata = isClicked.innerText
//            $.ajax({
//                type: 'POST',
//                url: 'handler.php',
//                data: 'action='+'city'+'&value='+answerdata,
//                success: function(html){
//                }
//            });
            
            let input = document.querySelector('.ask__input')
            input.value = isClicked.innerText
            input.blur()

            let askBox = isClicked.closest('.ask')

            let clientText = isClicked.innerText,
                bodyContent = document.querySelector('.body-content'),
                answer = document.createElement('div')

            answer.className = 'body-content__answer answer _ninth'
            answer.innerHTML = `
                <input type="text" name="8" class="answer__content"></input>
                <div class="answer__user"></div>
            `
            answer.querySelector('.answer__content').value = clientText

            let isExist = document.querySelector('.answer._ninth')
            if (isExist) {
                isExist.remove()
                askBox.insertAdjacentElement('afterend', answer)
                _setAnswerContentActive(answer)
            } else {
                bodyContent.insertAdjacentElement('beforeend', answer)

                _setAnswerContentActive(answer)

                _scrollDown()

                let promise = new Promise(resolve => {
                    setTimeout(() => {
                        let ask = document.createElement('div')
                        ask.className = 'body-content__ask ask'
                        ask.innerHTML = `
                            <div class="ask__user"></div>
                            <div class="ask__content"></div>
                        `
                        let askContent = ask.querySelector('.ask__content')

                        bodyContent.insertAdjacentElement('beforeend', ask)
                        askContent.insertAdjacentElement('beforeend', askWriting)
                        _scrollDown()
                        resolve()
                    }, delay)
                })

                promise.then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askText = document.createElement('div')
                            askText.className = 'ask__text mb-2'
                            askText.innerHTML = `Ну и последний вопрос! \n Если через 6-12 месяцев Ваш долг будет <span style="white-space: nowrap">0 руб 00 коп,</span> Вас это устроит?`
                            askWriting.insertAdjacentElement('beforebegin', askText)
                            setTimeout(() => {
                                askText.classList.add('_active')
                            }, 100)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                }).then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askGrid = document.createElement('div')

                            askGrid.className = 'ask__grid ask__grid-triple _tenth-grid'
                            askGrid.innerHTML = `
                                <div data="91"><p></p>Да</div>
                                <div data="92"><p></p>Нет</div>
                                <div data="93"><p></p>Затрудняюсь ответить</div>
                            `

                            askWriting.insertAdjacentElement('beforebegin', askGrid)
                            askWriting.remove()
                            setTimeout(() => {
                                askGrid.classList.add('_active')
                            }, 100)
                            let buttons = askGrid.querySelectorAll('div')
                            _radioButton(buttons)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                })
            }
        }
    })

    document.addEventListener('click', (e) => {
        let isClicked = e.target.closest('.ask__grid._tenth-grid div')

        if (isClicked) {
            
            var answerdata = $(isClicked).attr('data')
//            $.ajax({
//                type: 'POST',
//                url: 'handler.php',
//                data: 'action='+'answer'+'&value='+answerdata,
//                success: function(html){
//                }
//            });
            
            let clientText = isClicked.innerText,
                bodyContent = document.querySelector('.body-content'),
                answer = document.createElement('div')

            let askBox = isClicked.closest('.ask')

            answer.className = 'body-content__answer answer _tenth'
            answer.innerHTML = `
                <input type="text" name="9" class="answer__content"></input>
                <div class="answer__user"></div>
            `
            answer.querySelector('.answer__content').value = clientText

            let isExist = document.querySelector('.answer._tenth')
            if (isExist) {
                isExist.remove()
                askBox.insertAdjacentElement('afterend', answer)
                _setAnswerContentActive(answer)
            } else {
                bodyContent.insertAdjacentElement('beforeend', answer)

                _setAnswerContentActive(answer)

                _scrollDown()

                let promise = new Promise(resolve => {
                    setTimeout(() => {
                        let ask = document.createElement('div')
                        ask.className = 'body-content__ask ask'
                        ask.innerHTML = `
                            <div class="ask__user"></div>
                            <div class="ask__content"></div>
                        `
                        let askContent = ask.querySelector('.ask__content')

                        bodyContent.insertAdjacentElement('beforeend', ask)
                        askContent.insertAdjacentElement('beforeend', askWriting)
                        _scrollDown()
                        resolve()
                    }, delay)
                })

                promise.then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askText = document.createElement('div')
                            askText.className = 'ask__text mb-2'
                            askText.innerHTML = `
                                <span class="semi-bold">Благодарю за Ваши ответы!</span> <br>
                                Остался всего один шаг. Оставьте свои данные и я подберу для Вас 1-3 лучших варианта списания долгов!
                            `
                            askWriting.insertAdjacentElement('beforebegin', askText)
                            setTimeout(() => {
                                askText.classList.add('_active')
                            }, 100)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                }).then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let askText = document.createElement('div')
                            askText.className = 'ask__text mb-2'
                            askText.innerHTML = `
                                <span class="semi-bold">Невероятная удача!</span> <br>
                                Сразу после заполнения формы вы получите бонусы! 
                            `
                            askWriting.insertAdjacentElement('beforebegin', askText)
                            setTimeout(() => {
                                askText.classList.add('_active')
                            }, 100)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                }).then(() => {
                    return new Promise(resolve => {
                        setTimeout(() => {
                            let banners = document.createElement('div')
                            banners.className = 'ask__banners mb-2'
                            banners.innerHTML = `
                                <div class="ask__banners-item banner mb-1">
                                    <div class="banner__img"></div>
                                    <div class="banner__text">
                                        <p>Бесплатная</p>
                                        <p>консультация</p>
                                    </div>
                                </div>
                                <div class="ask__banners-item banner">
                                    <div class="banner__text">
                                        <p>Скидка</p>
                                        <p>5 000 рублей</p>
                                    </div>
                                    <div class="banner__img"></div>
                                </div>
                            `
                            askWriting.insertAdjacentElement('beforebegin', banners)
                            setTimeout(() => {
                                banners.classList.add('_active')
                            }, 100)
                            _scrollDown()
                            resolve()
                        }, delay)
                    })
                }).then(() => {
                    setTimeout(() => {
                        let askForm = document.createElement('div')
                        askForm.className = 'ask__form _ns'
                        askForm.innerHTML = `
                            <input onchange="editcontact(this)" data="name" type="text" class="ask__field mb-1" placeholder="ФИО">
                            <input id="inputemail" onchange="editcontact(this)" data="email" type="email" class="ask__field mb-2" placeholder="Email">
                            <label onclick="agree()" class="ask__label-wrapper mb-1_5">
                                <label class="ask__label">
                                    <input id="agreecheckbox" checked type="checkbox" class="ask__label-input sr-only">
                                    <p class="ask__checkbox"></p>
                                </label>
                                <p class="ask__label-text">
                                    С
                                    <a class="ask__label-link" href="javascript:void(0)" onclick="$('#politic').toggle(300)">политикой конфеденциальности</a>
                                    ознакомлен(а)
                                </p>
                            </label>
                            <button type="submit" id="finishbt" class="ask__form-btn _ns">Узнать результат</button>
                        `

                        askWriting.insertAdjacentElement('beforebegin', askForm)
                        askWriting.remove()
                        setTimeout(() => {
                            askForm.classList.add('_active')

                            let inputsTel = document.querySelectorAll('.ask__field._tel')

                            Inputmask({
                                "mask": "+7 (x99) 999-99-99",
                                definitions: {
                                    "x": {
                                        validator: '[0-7 9]'
                                    }
                                },
                                showMaskOnHover: false
                            }).mask(inputsTel);
                        }, 100)
                        _scrollDown()
                    }, delay)
                })
            }
        }
    })
})
//function send(el) {
//    $(el).attr('onclick','')
//    $.ajax({
//        type: 'POST',
//        url: '/',
//        data: 'action='+'finish',
//        success: function(html){
//            $('#result').html(html)
//        }
//    });
//}
//function agree() {
//    if ($('#agreecheckbox').is(':checked')){
//    	$('#finishbt').css('opacity','1')
//    	$('#finishbt').attr('onclick','send(this)')
//    } else {
//    	$('#finishbt').css('opacity','0.5')
//    	$('#finishbt').attr('onclick','')
//    }
//}
//function editcontact(el) {
//    var what = $(el).attr('data')
//    var value = $(el).val()
//    $.ajax({
//        type: 'POST',
//        url: '/',
//        data: 'action='+'editcontact'+'&value='+value+'&what='+what,
//        success: function(html){
//            if (html == 'error') {
//                $('.warning').html('Введите корректный<br> Email')
//                $('.warning').addClass('_active')
//                $('#inputemail').val('')
//                setTimeout(function(){
//                    $('.warning').removeClass('_active')
//                }, 3000);
//            }
//        }
//    });
//}
