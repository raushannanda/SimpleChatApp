import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js'
  const button = document.querySelector('#emoji')
  const tooltip = document.querySelector('.tooltip')
  Popper.createPopper(button, tooltip)

  document.querySelector('#emoji').onclick = () => {
    tooltip.classList.toggle('shown')
    tooltip.setAttribute('data-popper-placement','top')
  }
  document.querySelector('emoji-picker').addEventListener('emoji-click',e=>{
    document.querySelector('#message').value += e.detail.unicode
  })