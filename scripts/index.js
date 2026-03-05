// fetch levels
const loadLevels = () =>
{
    // response er promise dey
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(response => response.json())
        .then(jsonData => displayLessons(jsonData.data));
};

// je function data display er jonno kaj korbe 
const displayLessons = (lessons) =>{
    // 1. get the main container & initialize empty
    const lessonsContainer = document.getElementById("lessons-container")
    lessonsContainer.innerHTML = "";

    // 2. proti ta lesson dhoro
    lessons.forEach(lesson => {

        // 3. create element - proti ta lesson er jonno
        const lessonDiv = document.createElement("div");
        lessonDiv.innerHTML = `
            <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i>Lesson-${lesson.level_no}</button>
        `
        // design korar jonno parent container er kase jao 
        // 4. append in main container 
        lessonsContainer.appendChild(lessonDiv);
        console.log(lesson);
    });

}
loadLevels();

