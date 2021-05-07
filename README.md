# Text Editor
This is a simple text editor, which allows users to:
- add bullet points
- ****embolden**** and **italicize** text
- save to and load from file
## Installation
```bash
git clone https://github.com/k-cichorski/text-editor
```
Go to project directory and run:
```bash
npm install
```
## Configuration
Default ****port**** on which the server runs is:
```bash
const port = process.env.PORT || 3000;
```
If that doesn't suit you, modify the ****port**** variable in ****server.js****
## Usage
Go to project directory, run:
```bash
npm start
```
and follow the ****link**** printed to the console.