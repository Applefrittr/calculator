let memory = ['0', '0', '0']                                    //array that will hold arguments and funtion type, memeory[0] & memory[2] to hold numbers, memory[1] holds operator


const digits = document.querySelectorAll('.number')     // listens for when the user clicks or presses any of the digits

digits.forEach((number) => {
    number.addEventListener('click', () => {
        numbers(number.id)
    })
})

const funcs = document.querySelectorAll('.func')        //listens for when user selects specific function, adds to memory[1]

funcs.forEach((func) => {
    func.addEventListener('click', () => {              
       if (func.id == '√')  {
        clear()
        memory[0] = parseFloat(memory[0])
        subPrintSqr()
        memory[0] = sqrRoot(memory[0]).toString()
        print(memory[0])
        memory[1] = '0'
       }
       else operators(func.id)
    })
})

const ce = document.querySelector('.CE')               //listens for when user hits the CE button and wipes memory array

ce.addEventListener('click', () => {
    memory = ['0', '0', '0']
    display.classList.remove('smaller')
    clear()
})

const del = document.querySelector('.backspace')

del.addEventListener('click', () => {
    display.removeChild(display.lastChild)
    backspace()    
})

const equals = document.querySelector('#Enter')         //listens for when user clicks equals button

equals.addEventListener('click', () =>  {
    memory[0] = parseFloat(memory[0])
    memory[2] = parseFloat(memory[2])
    clear()
    subPrint()
    memory[0] = equate(memory[0], memory[2]).toString()            //executes equate function and returns anser in memory[0]
    memory[1] = '0'
    memory[2] = '0'
    print(memory[0])
})

window.addEventListener('keydown', (e) => {                 //Keyboard support, listens for when the users either numbers or function symbols only.  Enter is used for equals.  Used Event keys to identify whihc button is pressed
   const button = document.querySelector(`button[id="${e.key}"]`)
   console.log(e)
   console.log(button.id)

   if (!button) return
   
   if (button.id == 0 || button.id == 1 || button.id == 2 || button.id == 3 || button.id == 4 || button.id == 5 || button.id == 6 || button.id == 7 || button.id == 8 || button.id == 9 || button.id == `.`)    {
        numbers(button.id)
   }
   else if (button.id === `+`|| button.id == `-` || button.id == `*` || button.id == `/` || button.id == `^` )    {
       operators(button.id)
   }
    else if (button.id == `Enter`)   {
    memory[0] = parseFloat(memory[0])
    memory[2] = parseFloat(memory[2])
    clear()
    subPrint()
    memory[0] = equate(memory[0], memory[2]).toString()            //executes equate function and returns anser in memory[0]
    memory[1] = '0'
    memory[2] = '0'
    print(memory[0])
    }
    else if (button.id == `Delete`)  {                   //Delete key is the keyboard support for the CE
        memory = ['0', '0', '0']
        display.classList.remove('smaller')
        clear()
    }
    else if (button.id == `Backspace`)  {
        display.removeChild(display.lastChild)
        backspace()
    }
})

///////////////////////////FUNCTIONS//////////////////////////////////

function print(x)   {                                 //function that will displays input as well as funtion results
    
    x = x.toString()
    const screen = document.querySelector('#display')

    for (let i = 0; i < x.length; i++)  {              // implemented for loop to print out solution as individual divs instead of 1 div for large answers. ie. answer = 25, print 2 sperate divs for 2 AND 5, instead of 1 div for 25.  Necessary for backspace functionality
        const div = document.createElement('div')
        div.textContent = x.charAt(i)
        screen.appendChild(div)
    }

    if (display.childElementCount > 10) {               //shrink and wraps divs if #display gets full
        display.classList.add('smaller')
    }
}

function clear()    {                                  //CE, clear display function.  Deletes divs whihc represent the numbers and funcs selected by user
   
    while (display.firstChild)  {
        display.removeChild(display.firstChild)
    }
    while (subdisplay.firstChild)  {
        subdisplay.removeChild(subdisplay.firstChild)
    }
}

function numbers(input)    {
    
    if  (memory[1] == 0)    {
        
        if (input == '.' && isFloat(memory[0]) == true)   {
            return
        }
        else    {
            print(input)
            memory[0] += input      //appends user input instead of adding number together, creates string of numbers                          
        }
    }
    else if (memory[1] != 0  && memory[2] == 0)    {    //conditional to see whether memory[2] contains anything, will clear display much like a real calculator to take second number input by user
        display.classList.remove('smaller')
        clear()
        print(input)
        memory[2] += input
    }
    else if (memory[1] != 0  && memory[2] != 0)     {
        
        if (input == '.' && isFloat(memory[2]) == true)   {
            return
        }
        else    {
            print(input)
            memory[2] += input
        }
    }
}

function operators(input)   {
    if (memory[1] == 0)     {                       //case if user selects a function without a prior function slected, memory[1] is empty
        memory[1] = input
        print(input)
    }
    else    {                                       //case when the user will "chain" functions together instead of using the equals button
        memory[0] = parseFloat(memory[0])
        memory[2] = parseFloat(memory[2])
        memory[0] = equate(memory[0], memory[2])
        memory[1] = input
        memory[2] = '0'
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

function backspace()    {                               //backspace/delele function, will delete off last string character in memory

    if (display.childElementCount < 11) {
        display.classList.remove('smaller')
    }

    if (memory[0] != 0 && memory[2] == 0 && memory[1] == 0)  {
        if (memory[0].length > 1)    {
            memory[0] = memory[0].slice(0, -1)
        }
        else memory[0] = '0'
    }
    else if (memory[0] != 0 && memory[2] != 0)  {
        if (memory[2].length > 1)    {
            memory[2] = memory[2].slice(0, -1)
        }
        else memory[2] = '0'
    }
    else  if (memory[0] != 0 && memory[2] == 0 && memory[1] != 0)  {
        memory[1] = '0'
    }
    else return
}

function isFloat(x)    {                              // function to check if argument is a floating number
    if (x.indexOf('.') > -1) return true
    
    else return false
}

function subPrint() {                                   // subdsiplay that will display the current memory values which yeilds answer in main display
    const subScreen = document.querySelector('#subdisplay')

    const div = document.createElement('div')
    div.textContent = `${memory[0]} ${memory[1]} ${memory[2]}`
    subScreen.appendChild(div)
}

function sqrRoot(a)  {                                  // square root funtion, stand alone as this function does nto take a 2nd paramenter
    return a**(1/2)
}

function subPrintSqr()  {
    const subScreen = document.querySelector('#subdisplay')

    const div = document.createElement('div')
    div.textContent = `√ ${memory[0]}`
    subScreen.appendChild(div)
}