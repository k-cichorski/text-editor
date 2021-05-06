const textBox = document.getElementById('textbox-input');

const execCommand = (command, arguments, showDefaultUI=false) => {
  document.execCommand(command, showDefaultUI, arguments);
}

const getButtons = () => {
  return [...document.getElementById('editor-toolbar').children].map(node => {
    return {
      el: node,
      action: node.dataset.command
    };
  });
};

const applyHandlers = buttons => {
  buttons.forEach(button => {
    if (button.el) {
      button.el.onmousedown = e => e.preventDefault();
      button.action && (button.el.onclick = () => execCommand(button.action));
    }
  });
};

let buttons = getButtons();
applyHandlers(buttons);

// allows text indenting with Tab key
document.addEventListener('keydown', e => {
  if (e.code == 'Tab' && document.activeElement == textBox) {
    e.preventDefault();
    execCommand('insertText', '\t');
  }
});
