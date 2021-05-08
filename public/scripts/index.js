const textBox = document.getElementById('textbox');

const execCommand = (button, arguments=null, showDefaultUI=false) => {
  document.execCommand(button.action, showDefaultUI, arguments);
};

const getButtons = (container) => {
  return [...document.getElementById(container).children].map(node => {
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

const applyButtonHandlers = (buttons, handler, prevDefault=false) => {
  buttons.forEach(button => {
    if (button.el) {
      prevDefault && (button.el.onmousedown = e => e.preventDefault());
      button.action && (button.el.onclick = () => handler(button));
    }
  });
};

const handleKeyDown = e => {
  if (e.code == 'Tab' && document.activeElement == textBox && !e.shiftKey) {
    e.preventDefault();
    document.execCommand('insertText', false, '\t');
  }
  if (e.code == 'Backspace') {
    /* 
      Timeout necessary because document.queryCommandState() returns old state without it.
      Not sure if 50ms isn't too low for older machines, but gives a very smooth feeling.
    */
    setTimeout(() => adjustButtonPressed(formatButtons), 50);
  }
};

const removeLoadingMask = () => {
  const loadingMask = document.getElementById('loading-mask');
  loadingMask.classList.add('fadeOut');
  setTimeout(() => {
    loadingMask.remove();
  }, 400);
};

const adjustButtonPressed = (buttons) => {
  if (document.activeElement != textBox) return
  const adjustButton = (button) => {
    const hasStyling = document.queryCommandState(button.action);
    if (hasStyling != button.pressed) {
      toggleButtonPressed(button);
    }
  };
  buttons.forEach(adjustButton);
};

// TODO: nicer dialog boxes
const fileOperation = (button) => {
  if (!confirm(`Are you sure you want to ${button.action} file?`)) return
  let sendParams;
  let handleResponse;
  if (button.action == 'save') {
    sendParams = {
      method: 'POST',
      body: JSON.stringify({
        content: textBox.innerHTML
      }),
    };
    handleResponse = (data) => alert(`File saved!`);
  } else if (button.action == 'load') {
    sendParams = {
      method: 'GET'
    };
    handleResponse = async (data) => {
      data = await data.json();
      textBox.innerHTML = JSON.parse(data.content);
    };
  }
  fetch(`api/v1/${button.action}`, {
    ...sendParams,
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(async (data) => {
    if (data.ok) {
      handleResponse(data);
    } else {
      data = await data.json();
      alert(`An error ocurred :( Message: ${data.statusText}`);
    }
  });
};

const formatButtonHandler = (button) => {
  toggleButtonPressed(button);
  textBox.focus();
  execCommand(button);
};

let formatButtons = getButtons('format-buttons');
let fileButtons = getButtons('file-buttons');

// handlers
applyButtonHandlers(formatButtons, formatButtonHandler, true);
applyButtonHandlers(fileButtons, fileOperation);
document.onkeydown = e => handleKeyDown(e);
document.onselectionchange = () => adjustButtonPressed(formatButtons);
window.onload = removeLoadingMask;
