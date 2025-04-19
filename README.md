
# 🌎 Countries of the World

In this challenge, we will use the [REST Countries API](https://restcountries.com/).

In this repository, you will find `index.html`, `style.css`, and `index.js`.

In `index.html`, there is a `<div id="countries"></div>` where you must add the 150 countries retrieved from the API.

Some parts already have styling, which is why `style.css` is not empty; feel free to add properties if you wish.

In `index.js`, there is a function called `cardTemplate(data)` that takes a parameter and returns a string, which you can use to print the countries to the DOM.

## Tasks 📝

1 - Implement the `fetch()` function, passing the URL string as a parameter to retrieve all countries. You can find it at this [URL](https://restcountries.com/#endpoints-all).

2 - Create a loop to iterate through the Array received as the API response.

3 - Add each country to the DOM using `cardTemplate()`.

The final result should look something like this:

![image](https://github.com/TheBridge-FullStackDeveloper/restcountries-api/assets/33903092/ce52b8be-42f0-416d-883d-9729be19f32e)

## Bonus 🎁

4 - Create a filter that allows the user to select only countries from the same continent. For this iteration, there are no pre-existing elements or code, so it’s all up to you 😜.
