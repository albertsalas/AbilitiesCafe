This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
# Welcome to Abilities Cafe's codebase
Welcome to the Abilities Cafe Service Learning project! The goal of this project is to create an online coffee shop that caters to those with special needs and "abilities" to provide an opportunity of employment and training. For more information visit the [Abilities Cafe](https://abilitiescafe.org/) website!
### Prerequisites
Before you can begin to code, you should be familiar with Git, Github, React.js, NPM, and Firebase. Below are some technology requirements.
* [Node.js](https://nodejs.org/en/)
* [Visual Studio Code](https://code.visualstudio.com/) (or your own favorite IDE)
* [Git(Windows)](https://git-scm.com/download/win)
## Getting Started (First Time)
1. Clone the repository from [here](https://github.com/albertsalas/AbilitiesCafe), then delete `./git`
2. Paste in the `firebase.js` file you should have received from the Abilities Cafe site leader
3. Install dependencies using `npm install`
4. Run the project using `npm start`
5. Follow instructions [here](https://docs.github.com/en/github/importing-your-projects-to-github/adding-an-existing-project-to-github-using-the-command-line) to push your new repository to your Github account
If you are working with a team, it is recommended that you work on separate branches to reduce merge conflicts.
### Commands
When in github, if you create a different repository, make sure to not allow anyone to push directly to the main branch. 
| Commands ||
|---------|-|
| Run project | `npm start` |
| Install dependencies | `npm install` |
| Create and switch to new branch | `git checkout -b my_branch` |
| Switch to branch | `git checkout my_branch` |
| Stage your changes | `git add .` |
| Commit your changes | `git commit` |
| Push your changes to your branch | `git push origin my_branch` |
### Tips
If you're having trouble with running the app, try the following steps
1. `rm -rf node_modules`
2. `rm -rf package-lock.json`
3. `npm install`
4. `npm audit fix`
5. `npm audit fix --force`
6. `npm start`
## Resources
#### To understand material
* [Learn Material UI](https://material-ui.com/api/typography/)
	* This website helps teach, guide and helps the reader understand how to use some of the components that we use. 
	* This link is directly to "Typography API" which is very commonly used, browse through the site and look to see if you find anything else that is helpful)
* Getting started with React
	* [React JS Crash Course](https://www.youtube.com/watch?v=w7ejDZ8SWv8&ab_channel=TraversyMedia)
	* [React in 30 minutes](https://www.youtube.com/watch?v=hQAHSlTtcmY&t=111s&ab_channel=WebDevSimplified)
* [Learn about Firebase](https://firebase.google.com/docs)
	* Will help you work with firebase
* Learn about [context](https://reactjs.org/docs/context.html)
	* React context was used twice so far, for the authentication and for the cart. React context was really useful.
* Woring with [Git and GitHub](https://www.youtube.com/watch?v=SWYqp7iY_Tc&ab_channel=TraversyMedia)
#### Help build website
* [Build a Photo Gallery With React and Firebase](https://www.youtube.com/watch?v=vUe91uOx7R0)
	* This should help to build the menu.
* [Material Demo](https://codesandbox.io/s/c8hcu?file=/demo.js)
	* Used this to explain how to show and design how the products in the cart looked liked.
* [View Mobile Version](https://www.browserstack.com/guide/view-mobile-version-of-website-on-chrome)
	* Explains how to view what websites look like on a mobile device.
