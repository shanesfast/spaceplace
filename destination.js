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

console.log(data);
