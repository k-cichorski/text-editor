const textBox = document.getElementById('textbox-input');

const execCommand = (command, arguments, showDefaultUI=false) => {
  document.execCommand(command, showDefaultUI, arguments);
}

const boldButton = {
  el: document.getElementById('button-bold'),
  style: 'bold'
};

const italicButton = {
  el: document.getElementById('button-italic'),
  style: 'italic'
};

const bulletsButton = {
  el: document.getElementById('button-bullets'),
  style: 'insertUnorderedList'
};

let buttons = [boldButton, italicButton, bulletsButton];

buttons.forEach(button => {
  if (button.el) {
    button.el.onmousedown = e => e.preventDefault();
    button.style && (button.el.onclick = () => execCommand(button.style));
  }
});

// allows text indenting with Tab key
document.addEventListener('keydown', e => {
  if (e.code == 'Tab' && document.activeElement == textBox) {
    e.preventDefault();
    execCommand('insertText', '\t');
  }
});
