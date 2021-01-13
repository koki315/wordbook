(() => {

  const input = document.getElementById('input-name');
  const inputMeaning = document.getElementById('input-meaning');
  const btn = document.getElementById('btn-add');
  const list = document.getElementById('list');
  const shuffle = document.getElementById('shuffle');
  const quizContainer = document.getElementById('quiz-container');
  const words = [];
  const labels = document.getElementsByTagName('label');
  let currentIndexOfQuiz = 0;
  const quizOffItems = document.querySelectorAll('.quiz-off');
  console.log(quizOffItems);
  btn.addEventListener('click', (event) => {
    const word = {
      name : input.value,
      meaning : inputMeaning.value,
      indexOfWord :''
    };
    console.log(word);
    if(word){
      words.push(word);
      showWord();
    }
    
    input.value = '';
    inputMeaning.value = '';
  })

  const showWord = () => {
    while(list.firstChild){
      list.removeChild(list.firstChild);
    }
    quizOffItems.forEach((item) => {
      item.style.display = "block";
    });
    words.forEach((word, index) => {
    const wordElement = document.createElement('div');
    const nameElement = document.createElement('h1');
    nameElement.textContent = `単語: ${word.name} `;
    word.indexOfWord = index;
    console.log(words);
    console.log(word.indexOfWord);
    const meaningElement = document.createElement('p');
    meaningElement.textContent = `意味 : ${word.meaning} `;
    wordElement.appendChild(nameElement);
    wordElement.appendChild(meaningElement);
    const liElement = document.createElement('li');
    liElement.appendChild(wordElement);
    const deleteElement = document.createElement('button');
    deleteElement.textContent = 'delete';
    liElement.appendChild(deleteElement);
    list.appendChild(liElement);
    // list.style.display = "block";
    // input.style.display = "block";
    // inputMeaning.style.display = "block";
    // btn.style.display = "block";
    // shuffle.style.display = "block";
    // labels[0].style.display = "block";
    // labels[1].style.display = "block";

    deleteElement.addEventListener('click', () => {
      liElement.parentNode.removeChild(liElement);
      deleteWord(index);
    })
    })
  }

  const deleteWord = ((index) => {
    console.log(index);
    words.splice(index, 1);
    showWord();
    console.log(words);
  })
  shuffle.addEventListener('click', ()=> {
    if(words.length >= 2){
    console.log(words);
    // list.style.display = "none";
    // input.style.display = "none";
    // inputMeaning.style.display = "none";
    // btn.style.display = "none";
    // shuffle.style.display = "none";
    // labels[0].style.display = "none";
    // labels[1].style.display = "none";
    quizOffItems.forEach((item) => {
      item.style.display = "none";
    });

    let copiedArray = words.slice();
    newWords = [];
    while(copiedArray.length > 0){
      n = copiedArray.length;
      k = Math.floor(Math.random() * n);
      newWords.push(copiedArray[k]);
      copiedArray.splice(k, 1);
    }
    console.log(newWords);
    setQuiz(newWords);
    }
  })

  const setQuiz = (() => {
    while(quizContainer.firstChild){
      quizContainer.removeChild(quizContainer.firstChild);
    }
    if(currentIndexOfQuiz < newWords.length){
      const quiz = newWords[currentIndexOfQuiz];
      console.log(currentIndexOfQuiz);
      showQuiz(quiz);
    }else{
      finishShuffle();
    }
  })

  const showQuiz = ((quiz) => {
    const answerBtn = document.createElement('button');
    const finishBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    const quizElement = document.createElement('div');
    const wordOfQuiz = document.createElement('div');
    const quizWord = document.createElement('p');
    const answerElement = document.createElement('p');
    quizWord.textContent = `単語: ${quiz.name} `;
    answerElement.textContent = `意味 : ${quiz.meaning} `;
    answerElement.style.display = 'none';
    finishBtn.textContent = 'finish';
    answerBtn.textContent = 'meaning';
    nextBtn.textContent = 'next';

    quizContainer.appendChild(quizElement);
    wordOfQuiz.appendChild(quizWord);
    wordOfQuiz.appendChild(answerElement);
    quizElement.appendChild(wordOfQuiz);
    quizElement.appendChild(answerBtn);
    quizElement.appendChild(finishBtn);
    quizElement.appendChild(nextBtn);
      answerBtn.addEventListener('click', ()=> {
        console.log(answerElement);
        answerElement.style.display ="block";
      })
      finishBtn.addEventListener('click', () => {
        while(quizContainer.firstChild){
          quizContainer.removeChild(quizContainer.firstChild);
        }
        finishShuffle();
      })
      nextBtn.addEventListener('click', () => {
        currentIndexOfQuiz ++;
        setQuiz();
      })
  })

  const finishShuffle = (() => {
    console.log(words);
    currentIndexOfQuiz = 0;
    newWords = [];
    showWord();
  })
  
})();

