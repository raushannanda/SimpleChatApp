const sendbutton = document.getElementById('send')
const input = document.getElementById('message')
const textbox = document.getElementById('chats')
const file_button = document.getElementById('add_file')
const input2 = document.createElement('input')
const picmo_container = document.getElementById('picmo_container')
const picmo_button = document.getElementById('emoji')
const tooltip = document.querySelector('.tooltip')

input2.type = 'file'
input2.accept = 'image/jpg , image/avif , image/png , image/gif , image/jpeg'

var socket = io()

sendbutton.addEventListener('click',(e)=>{
if(input.value){
    socket.emit('chat',input.value)
    var ele = document.createElement('p')
    ele.innerText = input.value
    ele.setAttribute('class','mymessage')
    textbox.append(ele)
    input.value = ''
    textbox.scrollTop = textbox.scrollHeight
}

if(tooltip.classList.contains('shown')){
    tooltip.classList.toggle('shown')
}
})

file_button.addEventListener('click',(e)=>{
    if(tooltip.classList.contains('shown')){
        tooltip.classList.toggle('shown')
    }
    input2.click()
})

input2.addEventListener('change',(e)=>{
    var file = input2.files[0]
    socket.emit('upload',file,(status)=>{
        console.log(file)
    })
    var reader = new FileReader()
    reader.addEventListener('load',()=>{
    var image = new Image()
    var random = Math.random().toString(5).substring(2.9)
    const imgDiv = document.createElement('div')
    imgDiv.setAttribute('class',random+' leftImg')
    image.width = 200
    image.height = 250
    image.src=reader.result
    textbox.appendChild(imgDiv).appendChild(image)
    textbox.scrollTop = textbox.scrollHeight
    })
   
   reader.readAsDataURL(file)
   input.value = ''
})
    

socket.on('chat',(msg)=>{
    var ele = document.createElement('p')
    ele.innerText = msg
    ele.setAttribute('class','clientmessage')
    textbox.append(ele)
    textbox.scrollTop = textbox.scrollHeight
})

socket.on('upload',(file)=>{ 
   var image = new Image()
   var binary = ''
   var bytes = new Uint8Array(file)
   for(var i=0;i<bytes.byteLength;i++){
    binary+=String.fromCharCode(bytes[i])
   }
   const random = Math.random().toString(5).substring(2.9)
   const imgDiv = document.createElement('div')
   imgDiv.setAttribute('class',random+' rightImg')
   image.src = 'data:image/avif;image/jpeg;image/jpg;base64,'+window.btoa(binary)
   image.style.objectFit = 'contain'
   image.style.maxWidth = '250px'
   image.style.maxHeight = '250px'
   textbox.appendChild(imgDiv).appendChild(image)
   textbox.scrollTop = textbox.scrollHeight
   input.value=''
})
input.addEventListener('keypress',(e)=>{
    if(e.code==='Enter'){
        sendbutton.click()
    }
})