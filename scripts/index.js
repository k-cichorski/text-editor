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

// TODO: code ability to leave textBox using Tab key for accessibility
const insertTabIfEditing = e => {
  if (e.code == 'Tab' && document.activeElement == textBox) {
    e.preventDefault();
    execCommand('insertText', '\t');
  }
};

document.addEventListener('keydown', insertTabIfEditing);

let buttons = getButtons();
applyHandlers(buttons);
