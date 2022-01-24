let memory = [0, 0, 0]                                    //array that will hold arguments and funtion type, memeory[0] & memory[2] to hold numbers, memory[1] holds operator


const digits = document.querySelectorAll('.number')     // listens for when the user clicks or presses any of the digits

digits.forEach((number) => {
    number.addEventListener('click', () => {
        numbers(number.id)
    })
})

const funcs = document.querySelectorAll('.func')        //listens for when user selects specific function, adds to memory[1]

funcs.forEach((func) => {
    func.addEventListener('click', () => {              
       operators(func.id)
    })
})

const ce = document.querySelector('.CE')               //listens for when user hits the CE button and wipes memory array

ce.addEventListener('click', () => {
    memory = [0, 0, 0]
    clear()
})

const equals = document.querySelector('#equal')         //listens for when user presses equals button

equals.addEventListener('click', () =>  {
    memory[0] = equate(memory[0], memory[2])            //executes equate function and returns anser in memory[0]
    memory[1] = 0
    memory[2] = 0
    clear()
    print(memory[0])
})

window.addEventListener('keydown', (e) => {
   const button = document.querySelector(`button[id="${e.key}"]`)
   console.log(button.id)

   if (!button) return
   
   if (button.id == 0 || button.id == 1 || button.id == 2 || button.id == 3 || button.id == 4 || button.id == 5 || button.id == 6 || button.id == 7 || button.id == 8 || button.id == 9)    {
        numbers(button.id)
   }
   else if(button.id === `+`|| button.id == `-` || button.id == `*` || button.id == `/`  )    {
       operators(button.id)
   }
})

///////////////////////////FUNCTIONS//////////////////////////////////

function print(x)   {                                 //function that will displays input as well as funtion results
    const screen = document.querySelector('#display')

    const div = document.createElement('div')
    div.textContent = x

    screen.appendChild(div)
}

function clear()    {                                  //CE, clear display function.  Deletes divs whihc represent the numbers and funcs selected by user
   
    while (display.firstChild)  {
        display.removeChild(display.firstChild)
    }
}

function numbers(input)    {
    
    if  (memory[1] == 0)    {
        print(input)
        memory[0] += input                          //appends user input instead of adding number together, creates string of numbers
        memory[0] = parseInt(memory[0])                 //converts string to integers
    }
    else if (memory[1] != 0  && memory[2] == 0)    {    //conditional to see whether memory[2] contains anything, will clear display much like a real calculator to take second number input by user
        clear()
        print(input)
        memory[2] += input
        memory[2] = parseInt(memory[2])
    }
    else if (memory[1] != 0  && memory[2] != 0)     {
        print(input)
        memory[2] += input
        memory[2] = parseInt(memory[2])
    }
}

function operators(input)   {
    if (memory[1] == 0)     {                       //case if user selects a function without a prior function slected, memory[1] is empty
        memory[1] = input
        print(input)
    }
    else    {                                       //case when the user will "chain" functions together instead of using the equals button
        memory[0] = equate(memory[0], memory[2])
        memory[1] = input
        memory[2] = 0
        clear()
        print(memory[0])
        print(input)
    }   
}

function equate(a,b)   {                    // equals funtion, looks at func operator in memory[1] and executes based on func
    if (memory[1] === "+")   {
        return a+b
    }
    else if (memory[1] === "-")     {
        return a-b
    }
    else if (memory[1] === "*")     {
        return a*b
    }
    else if (memory[1] === "/")     {
        return a/b
    }
    else if (memory[1] === "^")     {
        return a**b
    }
    else {
        console.log('ERROR!')
    }    
}