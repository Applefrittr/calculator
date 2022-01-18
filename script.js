let memory = [0]                                    //array that will hold arguments and funtion type


const digits = document.querySelectorAll('.number')     // listens for when the user clicks or presses any of the digits

digits.forEach((number) => {
    number.addEventListener('click', () => {
        //console.log(number.id)
        print(number.id)
        memory[0] += number.id                          //appends user input instead of adding number together, creates string of numbers
        memory[0] = parseInt(memory)                    //converts string to integers
        //console.log(memory[0])
    })
})

function print(x)   {                                 //function that will displays input as well as funtion results
    const screen = document.querySelector('#display')

    const div = document.createElement('div')
    div.textContent = x

    screen.appendChild(div)
}

function clear()    {                                  //CE, clear display function and wipes memory array
    memory[0] = 0
    
    while (display.firstChild)  {
        display.removeChild(display.firstChild)
    }
}

const ce = document.querySelector('.CE')               //listens for when user htis the CE button

ce.addEventListener('click', () => {
    clear()
})