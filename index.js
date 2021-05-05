const applyStyle = style => {
  document.execCommand(style);
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
    button.style && (button.el.onclick = () => applyStyle(button.style));
  }
});