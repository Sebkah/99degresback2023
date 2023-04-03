const axios = require("axios");
const fs = require("fs");
const path = require("path");

const getDirectors = async () => {
  try {
    const data = await axios.get("http://localhost:1337/directors");

    fs.writeFileSync(
      path.join(__dirname, "data", "directors.json"),
      JSON.stringify(data.data)
    );

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
const getMovies = async () => {
  try {
    const data = await axios.get("http://localhost:1337/projects");

    fs.writeFileSync(
      path.join(__dirname, "data", "movies.json"),
      JSON.stringify(data.data)
    );

    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

const testServer = async () => {
  const data = await axios.get("http://localhost:1337/api/directors");
  console.log(data);
};

/* testServer(); */

const uploadDirectorSimpleData = async () => {
  let data = fs.readFileSync(path.join(__dirname, "data", "directors.json"));
  data = JSON.parse(data);

  data.forEach(
    async ({ Nom, descFr, descEng, instaUrl, websiteUrl, email, movies }) => {
      /*  console.log(instaUrl, websiteUrl, email, movies); */

      axios.post("http://localhost:1337/api/directors", {
        data: {
          name: Nom,
          descFR: descFr,
          descEN: descEng,
          instaUrl: instaUrl,
          websiteUrl: websiteUrl,
          email: email,
        },
      });
    }
  );
};

/* getDirectors(); */
/* getMovies(); */

uploadDirectorSimpleData();
