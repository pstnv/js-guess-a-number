// если экран меньше 700px, правила автоматически сворачиваются
let lastWidth = window.innerWidth;
function attributeChange() {
    const details = document.querySelector('details'); 
    if (window.innerWidth <= '700') {       
        details.open= false;
    }
    else {        
        details.open= true;
		animateStrings();
    }
}
// первый раз проверяем при запуске
attributeChange();
// дальше - при изменении размеров окна
window.addEventListener('resize', () => {
    if (window.innerWidth !== lastWidth) {
        attributeChange();
        lastWidth = window.innerWidth;
    }
});

    const input = document.querySelector('#inputField');
    const help = document.querySelector('.help');
    const addNumber = document.querySelector('#addNumber');
// создаем массив из чисел, которыми будем заполнять кнопки
    const roof = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    const buttons = document.querySelectorAll('.cell');

// Если содержимое кнопок пустое, деактивируем кнопки
    if (buttons[0].textContent === '') {
        blockCells();
        input.disabled = true;
        input.classList.add('disabled');
        addNumber.disabled = true;
        addNumber.classList.add('disabled');
    }

// объявляем переменную, которая будет хранить рандомное число
    let randomNumber

// описываем процедуру подслушки на кнопку "Играть"
const buttonPlay = document.querySelector('#btnPlay');
buttonPlay.addEventListener('click', () => {

    function fillArray () {
        // 0. Активировали input и кнопку Ok, очистили поле с подсказкой
            input.disabled = false;
            input.classList.remove('disabled');
            addNumber.disabled = false;
            addNumber.classList.remove('disabled');
            help.textContent = '';
        // 1. Скопировали массив
            let numbers = roof.map(item => item);
            buttons.forEach(item => {
        // 2. С каждой кнопки сняли свойство "неактивная" (после предыдущей игры)
            item.disabled = false;
            item.classList.remove('disabled');

        // 3. В произвольном порядке заполнили кнопки - рандом на индекс, получили по индексу число, вставили его
        // в кнопку, использованное число удалили из массива
            let randomIndex = Math.floor(Math.random()*numbers.length);
            item.innerText = numbers[randomIndex];
            numbers.splice(randomIndex, 1);
            
        // 4.1 На каждую кнопку добавили два ребенка - изображение ошибки и изображение победы, скрыли их display:none
            const iconWrong = document.createElement('img');
            iconWrong.src="https://cdn.glitch.global/4dee0b90-b324-484c-93d5-f2efa2a92450/iconWrong.svg?v=1646894350536";
            iconWrong.classList.add('iconWrong');
            item.appendChild(iconWrong);
            iconWrong.style.display = 'none';

        // 4.2 На каждую кнопку добавили два ребенка - изображение ошибки и изображение победы, скрыли их display:none
            const iconWin = document.createElement('img');
            iconWin.src="https://cdn.glitch.global/4dee0b90-b324-484c-93d5-f2efa2a92450/iconWin.svg?v=1646894347364";
            iconWin.classList.add('iconWin');
            item.appendChild(iconWin);
            iconWin.style.display = 'none';
        })
    }

    fillArray();
    // 5. Делаем запрос на рандомное число
    randomNumber = Math.floor(Math.random()*roof.length) + 1;
    // console.log(randomNumber, typeof randomNumber); 
    // 6. Возвращаем рандомное число, чтобы оно было видимым для других функций и методов
    return randomNumber
})

// 7. Устанавливаем подслушку на кнопки
// Кнопку кликнули - сравнили содержимое с рандомным числом
// При совпадении - победа и отображение значка победы, вызываем функцию деактивации всех кнопок
// При несовпадении - отображение значка ошибки, деактивациянажатой кнопки
buttons.forEach(item => {
    
    item.addEventListener('click', () => {
    // Так как innerText имеет тип String, а randomNumber имеет тип Number, то сравниваем только значения (==)
        if (item.innerText == randomNumber) {
            help.textContent = 'Игра завершена.'
            item.querySelector('.iconWin').style.display = 'block';
            blockCells();
            input.disabled = true;
            input.classList.add('disabled');
            addNumber.disabled = true;
            addNumber.classList.add('disabled');
            showModal();
            }
        else if (item.innerText <= randomNumber) {
            help.textContent = 'Попробуй число повыше!'
            item.querySelector('.iconWrong').style.display = 'block';
            item.disabled = true;
            item.classList.add('disabled');
        }   
        else {
            help.textContent = 'Попробуй число пониже!'
            item.querySelector('.iconWrong').style.display = 'block';
            item.disabled = true;
            item.classList.add('disabled');
        }  
    })
})

 //функция блокировки всех кнопок в случае победы
    function blockCells() {
        buttons.forEach(item => {            
            item.disabled = true;
            item.classList.add('disabled');
        })
    }

// 8. Ставим прослушку на и input и кнопку Ok
    input.addEventListener('keypress', function(e) {
        if (e.keyCode === 13) play();
    
    })
    addNumber.addEventListener('click', play);
// 9. Функция проверки введённого содержимого
// 9.1 Если число не в диапазон 1-20 - сообщение
// 9.2 Если введенные символы не являются числами - isNan = false
// 9.3 Проверка введённых чисел на соответствие загаданному


// 10. Модальное окно-поздравление при выигрыше
    function play () {
        const userNumber = input.value;
        if (userNumber < 1 || userNumber > 20) {
            input.value = '';
            help.textContent = 'Введи число от 1 до 20.'
        }
        else if (isNaN(userNumber)) {
            input.value = '';
            help.textContent = 'Нужно ввести число.'
        }
        else {
            if (userNumber == randomNumber) {
                input.value = '';
                help.textContent = 'Игра завершена.!'
                buttons.forEach(item => {
                    if (item.textContent === userNumber) {
                        item.querySelector('.iconWin').style.display = 'block';
                        input.disabled = true;
                        input.classList.add('disabled');
                        addNumber.disabled = true;
                        addNumber.classList.add('disabled');
                    }
                })            
                blockCells();
                showModal ();
                }
            else if (userNumber <= randomNumber) {
                input.value = '';
                help.textContent = 'Попробуй число повыше!'
                buttons.forEach(item => {
                    if (item.textContent === userNumber) {
                        item.querySelector('.iconWrong').style.display = 'block';
                        item.disabled = true;
                        item.classList.add('disabled');
                    }
                })
                
            }   
            else {
                input.value = '';
                help.textContent = 'Попробуй число пониже!'
                buttons.forEach(item => {
                    if (item.textContent === userNumber) {
                        item.querySelector('.iconWrong').style.display = 'block';
                        item.disabled = true;
                        item.classList.add('disabled');
                    }
                })
            }
        }        
}

const images = ['https://cdn.glitch.global/4dee0b90-b324-484c-93d5-f2efa2a92450/win-1.gif?v=1646907884090', 'https://cdn.glitch.global/4dee0b90-b324-484c-93d5-f2efa2a92450/win-2.gif?v=1646907893717', 'https://cdn.glitch.global/4dee0b90-b324-484c-93d5-f2efa2a92450/win-3.gif?v=1646907899913', 'https://cdn.glitch.global/4dee0b90-b324-484c-93d5-f2efa2a92450/win-4.gif?v=1646907906923', 'https://cdn.glitch.global/4dee0b90-b324-484c-93d5-f2efa2a92450/win-5.gif?v=1646907919200', 'https://cdn.glitch.global/4dee0b90-b324-484c-93d5-f2efa2a92450/win-6.gif?v=1646907990504', 'https://cdn.glitch.global/4dee0b90-b324-484c-93d5-f2efa2a92450/win-7.jpg?v=1646907995812', 'https://cdn.glitch.global/4dee0b90-b324-484c-93d5-f2efa2a92450/win-8.jpg?v=1646908001958', 'https://cdn.glitch.global/4dee0b90-b324-484c-93d5-f2efa2a92450/win-9.jpg?v=1646908007465']

function showModal (){
    let oneSide;
    let imageIndex = Math.floor(Math.random()*images.length);
    if (window.innerWidth <= '350') {
        oneSide = 200;
        scaleModal(oneSide);
    }
    else if (window.innerWidth > '350' &&  window.innerWidth <= '500') {
        oneSide = 300;
        scaleModal(oneSide);
    }
    else {
        oneSide = 400;
        scaleModal(oneSide);
    }
    function scaleModal (oneSide) {
        Swal.fire({
            title: 'В яблочко!',
            text: randomNumber + ' - твоё счастливое число!',
            imageUrl: images[imageIndex],
            imageWidth: oneSide,
            imageHeight: oneSide,
        })
    }
};

function animateStrings() {
	gsap.from ("li", {
		opacity: 0,
		duration: .5,
		stagger: .5
	});
}