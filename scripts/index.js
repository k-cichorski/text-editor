const textBox = document.getElementById('textbox-input');

const execCommand = (button, arguments=null, showDefaultUI=false) => {
  document.execCommand(button.action, showDefaultUI, arguments);
};

const getButtons = () => {
  return [...document.getElementById('editor-toolbar').children].map(node => {
    return {
      el: node,
      action: node.dataset.command,
      pressed: false
    };
  });
};

const toggleButtonPressed = (button) => {
  button.pressed = !button.pressed;
  button.el.classList.toggle('pressed');
};

const applyHandlers = buttons => {
  buttons.forEach(button => {
    if (button.el) {
      button.el.onmousedown = e => e.preventDefault();
      button.action && (button.el.onclick = () => {
        toggleButtonPressed(button);
        textBox.focus();
        execCommand(button);
      });
    }
  });
};

// TODO: code ability to leave textBox using Tab key for accessibility
const insertTabIfEditing = e => {
  if (e.code == 'Tab' && document.activeElement == textBox) {
    e.preventDefault();
    document.execCommand('insertText', false, '\t');
  }
};

const removeLoadingMask = () => {
  const loadingMask = document.getElementById('loading-mask');
  loadingMask.classList.add('fadeOut');
  setTimeout(() => {
    loadingMask.remove();
  }, 400);
};

const adjustButtonPressed = () => {
  if (document.activeElement != textBox) return
  const adjustButton = (button) => {
    const hasStyling = document.queryCommandState(button.action);
    if ((hasStyling && !button.pressed) || (!hasStyling && button.pressed)) {
      toggleButtonPressed(button);
    }
  };
  buttons.forEach(adjustButton);
}

let buttons = getButtons();
applyHandlers(buttons);

document.addEventListener('keydown', insertTabIfEditing);
document.onselectionchange = adjustButtonPressed;
window.onload = removeLoadingMask;
