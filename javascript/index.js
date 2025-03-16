navBar = document.getElementById('nav-bar');
document.getElementById('nav-bar').classList.add('hidden');
document.getElementById('FAQ').classList.add('hidden');


document.getElementById('logout-btn').addEventListener('click',function(){
    document.getElementById('banner').classList.remove('hidden');
    document.getElementById('nav-bar').classList.add('hidden');
    document.getElementById('FAQ').classList.add('hidden');
    document.getElementById('vocabulary').classList.add('hidden');
    document.getElementById('idle-div').classList.add('hidden');


})



getStartedBtn = document.getElementById('get-started-btn')
    .addEventListener('click', function () {

        // Password Check And Validation
        const password = parseInt(document.getElementById('password').value);

        // name check & validation
        const name = document.getElementById('name').value;
        if (name.length === 0) {
            alert('You Must Enter a Name')
        }

        if (password === 123456 && name.length !== 0) {
            alert('Success!!')
        }

        // matched Password Hides Banner
        if (password === 123456 && name.length !== 0) {
            document.getElementById('banner').classList.add('hidden')
            navBar.classList.remove('hidden')
            document.getElementById('vocabulary').classList.remove('hidden');
            document.getElementById('idle-div').classList.remove('hidden');
            document.getElementById('word-container').classList.remove('hidden');
            document.getElementById('FAQ').classList.remove('hidden');

        }

        else {
            alert("Wrong Password, Contact admin to get your Login Password")
        }


    })

const showLoader = ()=>{
    document.getElementById('show-loader').classList.remove('hidden');
    document.getElementById('word-container').classList.add('hidden');

}
const hideLoader = ()=>{
    document.getElementById('show-loader').classList.add('hidden');
    document.getElementById('word-container').classList.remove('hidden');

}

// Doing the button colorful when clicked
function removeActiveClass(){
    activeClass=document.getElementsByClassName('active');

    for(let btn of activeClass){

        btn.classList.remove('active');
    }

}

    // loading The Levels
function loadLevels(){
    // fetching the data
    fetch('https://openapi.programming-hero.com/api/levels/all')
    .then((response) =>response.json())
    .then((data)=>showLevels(data.data))

    
}

// Loading Modal Details
function loadCardDetails(cardID){
    console.log(cardID)
    const url=`https://openapi.programming-hero.com/api/word/${cardID}`
    fetch (url)
    .then((response)=>response.json())
    .then((data)=>{
        displayModalDetails(data.data)

    })

    console.log(url)


}

// Displaying the modal Data
function displayModalDetails(modalData){
    // console.log(modalData.word)
    document.getElementById('word_modal').showModal()
    detailsContainer=document.getElementById('details-container');
    const synContainer = document.getElementById('synonym-container');
    synContainer.innerHTML='';


    if(modalData.meaning==null || modalData.meaning==undefined){
        modalData.meaning='অর্থ খুঁজে পাওয়া যায়নি'
    }

    for(let i=1; i< modalData.synonyms.length;i++){
        div=document.createElement('div');
        div.innerHTML=`<p class="px-2 py-1 text-center mx-2 bg-[#D7E4EF] rounded ">${modalData.synonyms[i]}</p>`
        synContainer.append(div);

        // synContainer.innerHTML`<p class="p-1 bg-[#D7E4EF] rounded ">${modalData.synonyms[i]}</p>`


}

    

    
    detailsContainer.innerHTML=`
    <div>
    <h1 class="text-md font-bold">${modalData.word} (<i class="fa-solid fa-microphone"></i>:${modalData.pronunciation})</h1>

    <h1 class="font-bold text-sm pt-2">Meaning</h1>
    <p class="font-bold-pt-2">${modalData.meaning}</p>

    <h1 class='pt-4 font-bold'>Example</h1>
    <p class='pt-2 text-sm'>${modalData.sentence}</p>

    <h1 class='pt-4 pb-2 font-bold'>সমার্থক শব্দ গুলো</h1>
    <div id='syn-container' class='flex gap-2'>
    


    </div>
</div>
    `

   

}

// Showing The levels from Fetch
function showLevels(levels){
    

    // console.log(levels)
    // Getting the levels Container
    const levelContainer = document.getElementById("level-container");

    // lopping through the levels to extract single levels
     for(let level of levels){
        // Creating Buttons for every level
        const singleButton = document.createElement('div');
        singleButton.innerHTML=`
        <button id= 'btn-${level.id}' onclick=loadIDWiseVideo(${level.id}) class="btn btn-sm border-[#422AD5] text-[#422AD5] rounded border-2 hover:bg-[#422AD5] hover:text-white"><span class=''><svg  xmlns="http://www.w3.org/2000/svg" fill="#422AD5" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
</svg>
</span> Lesson -${level.level_no}</button>

        `
        // Appending the buttons to level container
        levelContainer.append(singleButton);
       
     }
}

// Getting the ids of individual buttons
loadIDWiseVideo = function (id){
    showLoader()
    // const newId=parseInt(id.toString().slice(-1));
    document.getElementById('idle-div').classList.add('hidden');
    // console.log(id)
    // console.log(newId)
    const url =`https://openapi.programming-hero.com/api/level/${parseInt(id.toString().slice(-1))}`
    // Now fetch the url Element
    // console.log(url)
    fetch(url).then((response)=>response.json())
        .then((data)=>{
        displayWords(data.data);
        const clickedBtn=document.getElementById(`btn-${id}`);
        

        removeActiveClass();
        // Creating Active class
        clickedBtn.classList.add('active');
    })
    
}

function displayWords(words){
    const wordContainer = document.getElementById('words-container');
    wordContainer.innerHTML='';
    if(words.length==0){
        hideLoader();
        wordContainer.innerHTML=`
        <div class="col-span-full flex flex-col p-10 justify-center items-center">
                <img src="assets/alert-error.png" alt="">
                <p class="text-[#79716B] my-4">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                <h1 class="font-bold text-xl">নেক্সট Lesson এ যান</h1>
            </div>
        `
    }
    // console.log(words)
    
    for (let word of words){
        wordContainer.classList.add('p-4');
        
        if(word.meaning==null || word.meaning==undefined){
            word.meaning='অর্থ নেই';
        
        }
        wordCard=document.createElement('div');
        wordCard.innerHTML=`
        <div class="bg-white rounded-xl p-2">

        <h1 class="text-center text-3xl py-4 font-semibold">${word.word}</h1>
        <p class=" text-center text-lg">Meaning /Pronounciation</p>
        <h1 class="text-center text-xl py-4 font-bold">${word.meaning}/${word.pronunciation}</h1>
        <div class="flex justify-between p-6">
            <div onclick='loadCardDetails(${word.id})' class="h-8 w-8 bg-sky-100 flex items-center justify-center rounded-md"><i class="fa-solid fa-circle-info"></i></div>
            <div class="h-8 w-8 bg-sky-100 flex items-center justify-center rounded-md"><i class="fa-solid fa-volume-high"></i></div>
        </div>

       </div>
        `
        wordContainer.append(wordCard)
        hideLoader()
    }
    
}

loadLevels()

