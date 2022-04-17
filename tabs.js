 async function fetchJson() {
    try {
        const data = await fetch("./data.json");
        return await data.json();
    } catch (error) {
        console.log(error);
    }
 };

 const fillPlanetData = async (planet) => {
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

tabList.addEventListener('keydown', (e) => {
    const keyLeft = 37;
    const keyRight = 39;
    const currentTab = tabList.getElementsByClassName("active")[0];

    if (e.keyCode === keyLeft || e.keyCode === keyRight) {
        currentTab.classList.remove("active");
        currentTab.setAttribute("tabindex", -1);
        
        if (e.keyCode === keyLeft) {
            if (currentTab.previousElementSibling) {
                currentTab.previousElementSibling.classList.add("active");
            } else {
                tabList.children[tabList.children.length - 1].classList.add("active");
            }
        } else if (e.keyCode === keyRight) {
            if (currentTab.nextElementSibling) {
                currentTab.nextElementSibling.classList.add("active");
            } else {
                tabList.children[0].classList.add("active");
            }
        }
    }
});

tabs.forEach(tab => {
    switch (tab.innerText)
    {
        case "MOON":
            tab.addEventListener("focus", async () => {
                const data = await fetchJson();
                const moon = data.destinations[0];
                fillPlanetData(moon);
            });
            break;
        case "MARS":
            tab.addEventListener("focus", async () => {
                const data = await fetchJson();
                const mars = data.destinations[1];
                fillPlanetData(mars);
            });
            break;
        case "EUROPA":
            tab.addEventListener("focus", async () => {
                const data = await fetchJson();
                const europa = data.destinations[2];
                fillPlanetData(europa);
            });
            break;
        case "TITAN":
            tab.addEventListener("focus", async () => {
                const data = await fetchJson();
                const titan = data.destinations[3];
                fillPlanetData(titan);
            });
            break;
        default:
            console.log("No matches from switch statement....");
    }
});
