import ghpages from "gh-pages";

ghpages.publish("src", (err) => {
  if (err) {
    console.error(err);
  }
});
