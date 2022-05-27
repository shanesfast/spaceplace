 const getSpaceJson = async() => {
    try {
        const data = await fetch("./data.json");
        return await data.json();
    } catch (error) {
        console.log(error);
    }
 };

 const fillPlanetData = async(e) => {
    let planetIndex = parseInt(e.target.getAttribute("data-index"));

    const planet = spaceTourismData.destinations[planetIndex];
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

 const fillCrewData = async(e) => {
    let crewIndex = parseInt(e.target.getAttribute("data-index"));

    const member = spaceTourismData.crew[crewIndex];
    const article = document.getElementsByClassName("crew-details")[0];
    const title = article.getElementsByTagName("h2")[0];
    const name = article.getElementsByTagName("p")[0];
    const description = article.getElementsByTagName("p")[1];

    const imageContainer = document.getElementsByClassName("crew-img-container")[0];
    const pictureSource = imageContainer.getElementsByTagName("picture")[0].getElementsByTagName("source")[0];
    const image = imageContainer.getElementsByTagName("picture")[0].getElementsByTagName("img")[0];

    title.innerText = member.role;
    name.innerText = member.name;
    description.innerText = member.bio;
    pictureSource.srcset = member.images.webp;
    image.src = member.images.png;
 }

 const fillTechData = async(e) => {
    let techIndex = parseInt(e.target.getAttribute("data-index"));

    const tech = spaceTourismData.technology[techIndex];
    const article = document.getElementsByClassName("tech-details")[0];
    const title = article.getElementsByTagName("p")[0];
    const description = article.getElementsByTagName("p")[1];

    const imageContainer = document.getElementsByClassName("tech-img-container")[0];
    const image = imageContainer.getElementsByTagName("picture")[0].getElementsByTagName("img")[0];

    title.innerText = tech.name;
    description.innerText = tech.description;
    image.src = tech.images.portrait;
    console.log(image);
 }

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

const initializeTabs = async () => {
    spaceTourismData = await getSpaceJson();

    tabList.addEventListener('keydown', changeTabFocus);

    tabs.forEach(tab => {
        let fillFunction;

        if (window.location.pathname.includes('crew')) fillFunction = fillCrewData;
        else if (window.location.pathname.includes('destination')) fillFunction = fillPlanetData;
        else fillFunction = fillTechData;

        tab.addEventListener("focusin", changeActiveTab);
        tab.addEventListener("focusin", fillFunction);
    });
}

let spaceTourismData;
const tabList = document.querySelector('[role="tablist"]');
const tabs = document.querySelectorAll('[role="tab"]');
let tabFocus = 0;

initializeTabs();   
