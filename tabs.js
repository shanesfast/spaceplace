 const fetchJson = async() => {
    try {
        const data = await fetch("./data.json");
        return await data.json();
    } catch (error) {
        console.log(error);
    }
 };

 const fillPlanetData = async(e) => {
    const data = await fetchJson();
    let planetIndex = 0;

    for (let i=0; i<data.destinations.length; ++i) {
        if (data.destinations[i].name.toUpperCase() === e.target.innerText.toUpperCase()) {
            planetIndex = i;
            i = data.destinations.length; // break the loop
        }
    }

    const planet = data.destinations[planetIndex];
    const article = document.getElementsByClassName("destination-info")[0];
    const meta = document.getElementsByClassName("destination-meta")[0];
    const title = article.getElementsByTagName("h2")[0];
    const desscription = article.getElementsByTagName("p")[0];
    const distance = meta.getElementsByTagName("p")[0];
    const travel = meta.getElementsByTagName("p")[1];
    const picture = document.getElementsByClassName("grid-container--destination")[0].getElementsByTagName("picture")[0];
    const pictureSource = picture.getElementsByTagName("source")[0];
    const pictureImage = picture.getElementsByTagName("img")[0];

    title.innerText = planet.name;
    desscription.innerText = planet.description;
    distance.innerText = planet.distance;
    travel.innerText = planet.travel;
    pictureSource.srcset = planet.images.webp;
    pictureImage.src = planet.images.png;
 }

const tabList = document.querySelector('[role="tablist"]');
const tabs = document.querySelectorAll('[role="tab"]');

let tabFocus = 0;
const changeTabFocus = (e) => {
    const keyLeft = 37;
    const keyRight = 39;

    if (e.keyCode === keyLeft || e.keyCode === keyRight) {
        tabs[tabFocus].classList.remove("active");
        tabs[tabFocus].setAttribute("tabindex", -1);
        tabs[tabFocus].setAttribute("aria-selected", false);

        if (e.keyCode === keyLeft) {
            --tabFocus;
            if (tabFocus < 0) tabFocus = tabs.length - 1;
        } else if (e.keyCode === keyRight) {
            ++tabFocus;
            if (tabFocus > tabs.length - 1) tabFocus = 0;
        }

        tabs[tabFocus].classList.add("active");
        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].setAttribute("aria-selected", true);
        tabs[tabFocus].focus();
    }
}

const changeActiveTab = (e) => {
    tabs.forEach(tab => {
        tab.classList.remove("active");
        tab.setAttribute("aria-selected", false);
    });
    e.target.classList.add("active");
    e.target.setAttribute("aria-selected", true);
}

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach(tab => {
    tab.addEventListener("click", changeActiveTab);
    tab.addEventListener("click", fillPlanetData);
    tab.addEventListener("focus", fillPlanetData);
});
