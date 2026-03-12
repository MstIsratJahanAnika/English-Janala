// modal call function 
const createElements = (arr) =>
// map jehetu ase, array return korbe
{
    const htmlElements = arr.map(elem => `<span class ="btn">${elem}</span>`);
    return (htmlElements.join(" ")); //convert to string, seperated with space
}

// pronounce word function
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// fetch levels
const loadLevels = () => {
    // response er promise dey
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(response => response.json())
        .then(jsonData => displayLessons(jsonData.data));
};

// remove activeBtn
const removeActiveBtn = () => {
    const lessonBtns = document.querySelectorAll(".lesson-btn");
    // console.log(lessonBtns);
    lessonBtns.forEach(btn => btn.classList.remove("activeBtn"));
}

// onclick function
const loadLevelWords = (id) => {
    // console.log(id);
    manageSpinner(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`; //level wise url make
    fetch(url)
        .then(response => response.json())
        .then(Data => {
            removeActiveBtn(); //shob gula theke active class remove 
            const btnClick = document.getElementById(`lesson-btn-${id}`);
            // console.log(btnClick);
            btnClick.classList.add("activeBtn"); //jeta dorkar shekhane add
            displayLevelWords(Data.data);

        });
}

// modal -> load word detail
const loadWordDetail = async (id) => {
    const wordURL = `https://openapi.programming-hero.com/api/word/${id}`;
    // console.log(wordURL);
    const res = await fetch(wordURL);
    const detail = await res.json();
    displayWordDetail(detail.data); //word er detail paoa jabe, id-wise
}


// "word": "Eager",
// "meaning": "আগ্রহী",
// "pronunciation": "ইগার",
// "level": 1,
// "sentence": "The kids were eager to open their gifts.",
// "points": 1,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "enthusiastic",
// "excited",
// "keen"
// ],
// "id": 5


// load word er detail object hishebe dekhabe 
const displayWordDetail = (word) => {
    console.log(word);
    const modalBox = document.getElementById("modalDetail-container");
    modalBox.innerHTML = `
                    <div class="rounded-3xl">
                        <div class="space-y-8 p-6 rounded-xl shadow-md">
                            <h3 class="font-semibold text-4xl">${word.word} ( <i class="fa-solid fa-microphone-lines"></i>
                                :${word.pronunciation})</h3>
                            <div class="space-y-2.5">
                                <p class="font-semibold text-2xl">Meaning</p>
                                <p class="text-2xl">${word.meaning}</p>
                            </div>
                            <div class="space-y-2.5">
                                <p class="font-semibold text-2xl">Example</p>
                                <p class="text-2xl">${word.sentence}</p>
                            </div>
                            <div class="space-y-2.5">
                                <p class="text-2xl">সমার্থক শব্দ গুলো</p>
                                <div class="flex justify-start gap-4.5">
                                    ${checkSynonyms(word.synonyms)}
                                </div>
                            </div>
                        </div>
                        <div class="py-6 ">
                            <button class="btn btn-soft btn-primary text-2xl">Complete Learning</button>
                        </div>
                    </div>
    `;   //modal box appearance

    const showModalBox = document.getElementById("my_modal_5");
    showModalBox.showModal(); //daisy built in function 
}

// manage spinner - true hole word-container er jaygay spinner dekhao 
const manageSpinner = (status)=>{
    if(status == true){
        document.getElementById("loading-spinner").classList.remove("hidden");
        document.getElementById("words-container").classList.add("hidden");
    }
    else{
        document.getElementById("loading-spinner").classList.add("hidden");
        document.getElementById("words-container").classList.remove("hidden");
    }
}

// check synonyms, if have or not
const checkSynonyms = (synonyms) =>{
    if(synonyms.length === 0){
        return `<span class ="text-gray-400 text-[20px] font-semibold">No Synonyms</span>`;
    }
    else{
        return synonyms.map(word => `<span class = "bg-[#EDF7FF] px-4 py-1 rounded-md">${word}</span>`).join("");
    }
};

// array of object er object gula dekhanor jonno function 
const displayLevelWords = (words) => {  //data property full 
    const wordsContainer = document.getElementById("words-container");

    wordsContainer.innerHTML = "";


    if (words.length == 0) {
        // alert('no word found');
        wordsContainer.innerHTML =
            `
            <div class=" text-center col-span-full py-[74px] space-y-4">
                    <div class="flex justify-center items-center">
                        <img src="./assets/alert-error.png" alt="">
                    </div>
                    <p class="text-[#79716B] text-[14px] font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h3 class="font-[#292524] text-[34px] font-medium font-bangla">নেক্সট Lesson এ যান</h3>
                 </div>
        `
        manageSpinner(false);
        return;
    }

    // id: 90
    // level:1
    // meaning:"পানি"
    // pronunciation:"ওয়াটার"
    // word:"Water"

    words.forEach(word => {
        // console.log(word);
        const card = document.createElement("div");
        card.innerHTML = `
            <div class ="">
                <div class="bg-white mx-auto rounded-xl shadow-sm">
                    <div class="p-14">
                        <div class="space-y-6 mx-auto pb-14">
                            <h3 class="text-[32px] font-bold">${word.word ? word.word : "শব্দ পাওয়া যায় নি"}</h3>
                            <p class="text-[20px]">Meaning /Pronunciation</p>
                            <h2 class="font-bangla text-[32px] font-semibold text-[#18181B]/80">"${word.meaning ? word.meaning : "শব্দার্থ পাওয়া যায় নি"} / ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যায় নি"}"</h2>
                        </div>
                        <div class="flex justify-between items-center">
                            <button onclick="loadWordDetail(${word.id})" class="btn btn-active bg-[#1A91FF]/10 hover:bg-[#1A91FF]/50 border-none"><i
                                    class="fa-solid fa-circle-info"></i></button>
                            <button class="btn btn-active bg-[#1A91FF]/10 hover:bg-[#1A91FF]/50 border-none rounded-lg" onclick="pronounceWord('${word.word}')"><i
                                    class="fa-solid fa-volume-high"></i></button>
                        </div>
                    </div>
                </div> 
            </div>
        `;

        wordsContainer.appendChild(card);
    });
    manageSpinner(false);
};

// je function data display er jonno kaj korbe 
const displayLessons = (lessons) => {
    // 1. get the main container & initialize empty
    const lessonsContainer = document.getElementById("lessons-container")
    lessonsContainer.innerHTML = "";

    // 2. proti ta lesson dhoro
    lessons.forEach(lesson => {

        // 3. create element - proti ta lesson er jonno
        const lessonDiv = document.createElement("div");
        lessonDiv.innerHTML = `
            <button id = "lesson-btn-${lesson.level_no}" onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `
        // design korar jonno parent container er kase jao 
        // 4. append in main container 
        lessonsContainer.appendChild(lessonDiv);
        console.log(lesson);
    });

}
loadLevels();

document.getElementById("search-btn").addEventListener("click", async ()=>{
    removeActiveBtn();
    const inputTable = document.getElementById("input-search");
    const searchValue = inputTable.value.trim().toLowerCase();
    console.log(searchValue);

    const response = await fetch("https://openapi.programming-hero.com/api/words/all")
    const data = await response.json();
    // console.log(data);
    const allWords = data.data
    console.log(allWords);
    const filterWords = allWords.filter(word => word.word.toLowerCase().includes(searchValue));
    console.log(filterWords);

    displayLevelWords(filterWords);
        // .then(res => res.json())
        // .then (data => console.log(data))
});