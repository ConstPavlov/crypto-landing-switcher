document.addEventListener('DOMContentLoaded', function() {

  const dom = {
    answerHTML: document.querySelectorAll('.question__customCheckbox'),
    answerinputs: document.querySelectorAll('.email__input'),
    modalItemBtn: document.querySelectorAll('[data-trigger-modal]'),
    inputsText: document.querySelectorAll('input'),
    // inputsPass: document.querySelectorAll('input[type=password]'),
    labels: document.querySelectorAll('.label-main'),
  }

    const form = document.querySelector('#formQuiz');


  // console.log(dom.inputsMain)
  
  // Нажатие на блок отмечает текущий чекбокс
  dom.answerHTML.forEach(ans => {
    ans.addEventListener("click", () => {
      ans.classList.toggle('checkedAns')
    })
  });



  // Нажатие на блок отмечает текущий чекбокс

    // Нажатие на блок отмечает текущий чекбокс
  dom.inputsText.forEach(input => {
    input.onclick = (e) => {
      console.log()
      dom.labels.forEach(label => {
        if (label.getAttribute('for') === e.target.id) {
          label.classList.add('on-input')
        }
      })
    }
    input.onblur = (e) => {
      console.log()
      dom.labels.forEach(label => {
        if (label.getAttribute('for') === e.target.id && e.target.value == '') {
          label.classList.remove('on-input')
        }
      })
    }
  })


  // Логика модальных окон 

  if(dom.modalItemBtn)  {
    let window = document.body
    let modals = document.querySelectorAll('[data-modal]')
    let closeModal = document.querySelectorAll('[data-close]')
    let modalContent = document.querySelectorAll('.modal__content')
    let targetBtn

    function openModal() {
      dom.modalItemBtn.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          targetBtn = btn.dataset.labelModal

          modals.forEach(mod => {
            if (targetBtn == mod.id) {
              mod.classList.add('active')
              window.style.overflow = 'hidden'
            }
          })

          hidePlaceholder()

          
        })
      })
    }
    function closeModalF() {
      closeModal.forEach(close => {
        close.addEventListener('click', () => {

          modals.forEach(modal => {
            modal.classList.remove('active')
            window.style.overflow = 'initial';
          })
          if (close.dataset.triggerModal){
            openModal()
          }
        })
      })
    }
  }

  openModal()
  closeModalF()

  function hidePlaceholder(){
    let formInput = document.querySelectorAll('.form-input')
    for (let obj of formInput){
      obj.addEventListener('click', () => {
        let savePlaceholder = obj.getAttribute('placeholder');

        obj.setAttribute('placeholder', ' ');
        document.addEventListener('mouseup', () => [
          obj.setAttribute('placeholder', savePlaceholder)
        ])
      })
    }
  }

  // QUIZ Логика и отрисовка

  const quiz = document.getElementById('formQuiz');
  let btnSub = document.querySelector('.btn__sub');

  let quizParams = {
    questions: document.querySelectorAll('.question'),
    progressLine: document.querySelector('.progress'),
    currentQ: document.querySelector('.currentQ'),
    btnNext: document.querySelector('.btn__next'),
    btnPrev: document.querySelector('.btn__prev'),
    titleQuiz: document.querySelector('.quiz__form-title'),
    quizEmail: document.querySelector('.quiz_email')
  }

  let progress = 0;
  let count = 0;
  let progressPercent = 100 / (quizParams.questions.length - 1)

  progressInit()
  removeBtn()
  checkEmailQuiz()


  // Кнопка вперёд start
  quizParams.btnNext.addEventListener('click', () => {
    count++
    quizParams.currentQ.textContent++
    progress+= Number(progressPercent.toFixed(3))
    progressInit()
    renderQuestion()
    removeBtn()
  })
  // Кнопка вперёд end

  quizParams.btnPrev.addEventListener('click', () => {
    count--
    quizParams.currentQ.textContent--
    progress-= Number(progressPercent.toFixed(3))
    progressInit()
    renderQuestion()
    removeBtn()
  })

  btnSub.addEventListener('click', () => {
    count++
    quizParams.currentQ.textContent++
    progress+= Number(progressPercent.toFixed(3))
    progressInit()
    renderQuestion()
    removeBtn()
  })


  function blockNextButton() {
    quizParams.btnNext.classList.add('disable')
  }
  function unlockNextButton() {
    quizParams.btnNext.classList.remove('disable')
  }

  function checkEmailQuiz() {
    quizParams.quizEmail.oninput = () => validateQuiz(form)
  }

  function validateQuiz(form) {
    let quizReq = document.querySelectorAll('.quiz_email');

    for (let index = 0; index < quizReq.length; index++) {
      const input = quizReq[index];
      formAddError(input)
      blockNextButton()

      if (input.classList.contains('_email')){
        if (!emailTest(input)) {
          formRemoveError(input);
          unlockNextButton()
        }
      }  else {
          formAddError(input)
          blockNextButton()
        }
    }
  }




  function renderQuestion() {
    quizParams.questions.forEach((que, index) =>{
      que.classList.remove('active');

      if (index === count) {
        que.classList.add('active');
      }
    })
  }

  function progressInit() {
  quizParams.progressLine.style.width = progress + '%'
  }
  
  document.querySelector('.allQ').textContent = `${quizParams.questions.length}`



  function removeBtn() {
    if (count === 0) {
      quizParams.btnPrev.style.display = 'none'
    } else if (count > 0) {
      quizParams.btnPrev.style.display = 'block'
    }
    if (count === quizParams.questions.length - 1) {
      quizParams.btnNext.style.display = 'none'
      quizParams.btnPrev.style.display = 'none'
      btnSub.style.display = 'none';
      btnSub.style.position = 'absolute';

      quizParams.titleQuiz.textContent = `Благодарим вас за раннюю регистрацию`

    } else if (count < quizParams.questions.length - 1){
      quizParams.btnNext.style.display = 'block'
    }
    if (count === quizParams.questions.length - 2){
      quizParams.btnNext.style.display = 'none';
      btnSub.style.display = 'block';
    } else if (count < quizParams.questions.length - 2){
      quizParams.btnNext.style.display = 'block';
      btnSub.style.display = 'none';
    }
  }


  let checkboxes = document.querySelectorAll('input[type=checkbox]')
  console.log(checkboxes)

  checkboxes.forEach(ch => {
    ch.addEventListener('change', (e) => {
      let currentCheck = e.target.value

      console.log(currentCheck)
    })
  })




  // ОТПРАВКА ФОРМЫ 


  form.addEventListener('submit', formSend)

  async function formSend(e) {
    e.preventDefault()

    const formData = new FormData(form);
    let error = formValidate(form);
	
    if (error === 0) {
      form.classList.add('_sending')
      let response = await fetch('./sendmail.php', {
        method: 'POST',
        body: formData
      })

      if (response.status == 200) {
        let result = await response.json();
        alert('Отправлено Успешно', result.textContent)
        form.classList.remove('_sending')
        form.reset()
      } else {
        form.classList.add('_sending')
        alert('Что-то пошло не так')
      }

    }
    else {
      form.classList.remove('_sending')
      alert('Где-то ошибка')
    }

  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('.quiz_email');

    for (let index = 0; index < formReq.length; index++) {
      const input = formReq[index];
      formRemoveError(input);

      if (input.classList.contains('_email')){
        if (emailTest(input)) {
          formAddError(input)
          error++;
        }
      } else{
        error = 0
        }
      
    }
    return error;
  }
  function formAddError(input) {
    input.parentNode.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentNode.classList.remove('_error');
    input.classList.remove('_error');
  }
  // Функция теста email
  function emailTest(input) {
    return  !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }




})