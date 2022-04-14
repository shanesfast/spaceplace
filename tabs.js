const fetchJson = async () => {
    try {
        const data = await fetch("./data.json");
        const response = await data.json();

        return response;
    } catch (error) {
        console.log(error);
    }
 };

const data = fetchJson();
const tabList = document.querySelector('[role="tablist"]');
const tabs = document.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', (e) => {
    console.log(tabList);
    console.log(tabs);
});