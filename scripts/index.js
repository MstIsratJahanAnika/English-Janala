// fetch levels
const loadLevels = () => {
    // response er promise dey
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(response => response.json())
        .then(jsonData => displayLessons(jsonData.data));
};

// onclick function
const loadLevelWords = (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/level/${id}`; //level wise url make
    fetch(url)
        .then(response => response.json())
        .then(Data => displayLevelWords(Data.data));
}

// array of object er object gula dekhanor jonno function 
const displayLevelWords = (words) => {  //data property full 
    const wordsContainer = document.getElementById("words-container");

    // if(wordsContainer.innerHTML = ""){
        wordsContainer.innerHTML = `
            <div class=" text-center col-span-full py-16 space-y-3">
                <p class="text-[#79716B] text-[14px] font-bangla">আপনি এখনো কোন Lesson Select করেন নি</p>
                <h3 class="font-[#292524] text-[34px] font-medium font-bangla">একটি Lesson Select করুন।</h3>
            </div>
        `
    // }

    if(words.length == 0){
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
    }

    // id: 90
    // level:1
    // meaning:"পানি"
    // pronunciation:"ওয়াটার"
    // word:"Water"

    words.forEach(word => {
        console.log(word);
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
                            <button class="btn btn-active bg-[#1A91FF]/10 hover:bg-[#1A91FF]/50 border-none"><i
                                    class="fa-solid fa-circle-info"></i></button>
                            <button class="btn btn-active bg-[#1A91FF]/10 hover:bg-[#1A91FF]/50 border-none rounded-lg"><i
                                    class="fa-solid fa-volume-high"></i></button>
                        </div>
                    </div>
                </div> 
            </div>
        `;

        wordsContainer.appendChild(card);
    })
}

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
            <button onclick="loadLevelWords(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `
        // design korar jonno parent container er kase jao 
        // 4. append in main container 
        lessonsContainer.appendChild(lessonDiv);
        console.log(lesson);
    });

}
loadLevels();

