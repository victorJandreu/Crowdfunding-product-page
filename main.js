const burgerBtn = document.getElementById("burger-btn")
const xBtn = document.getElementById("x-btn")
const modalNav = document.getElementById("modal-nav")
const modalSelectBtnX = document.getElementById("modal-select-btn-X")
const modalSelect = document.getElementById("modal-select")
const modalThank = document.getElementById("thank-modal")
const background = document.getElementById("background")
const bar = document.getElementById("bar")
const actualMoneySpan = document.getElementById("actualMoney")
const bookMarkBtn = document.getElementById("bookmark")
let actuarMoneyRecauded = Number(actualMoneySpan.textContent)
checkMoneyAndShowBar()



bookMarkBtn.addEventListener("click", function(){
   bookMarkBtn.querySelector("circle").classList.toggle("active-circle")
   bookMarkBtn.querySelector("path").classList.toggle("active-path")
   
   const root = document.querySelector(":root")
   const rootStyle = getComputedStyle(root)
   let valueVariable = rootStyle.getPropertyValue("--transparent")
   if(valueVariable === "transparent") return

   bookMarkBtn.querySelector("span").classList.toggle("active-text")
   bookMarkBtn.classList.toggle("active-background")



})


//relate with the navbar
document.querySelector("[data-button-div]").addEventListener("click", function(){
    burgerBtn.classList.toggle("noDisplayed")
    xBtn.classList.toggle("noDisplayed")
    modalNav.classList.toggle("show")
})

// relate with the main
document.querySelectorAll("[data-main-continueBtn]").forEach(btn => {
    btn.addEventListener("click", function(){
        modalSelect.classList.add("show")
        background.classList.remove("noDisplayed")
    })
})




// relate with the modal-select
modalSelectBtnX.addEventListener("click", function(){
    removeAllDataStayleAndSelectedInput("data-input-box")
    modalSelect.classList.remove("show")
    background.classList.add("noDisplayed")
})

document.querySelectorAll("[data-input-box]").forEach(inputBox => {
    inputBox.addEventListener("click", function(){
        let typeNumber = inputBox.querySelector("input[type=number]")
        if(typeNumber){
            typeNumber.value = typeNumber.min
        }

        removeAllDataStayleAndSelectedInput("data-input-box")
        inputBox.querySelector("input[name=box]").setAttribute("checked", true)
        inputBox.style.border = "2px solid hsl(176, 50%, 47%)"
       inputBox.querySelector("[data-continue]").classList.remove("noDisplayed")
    })
}
)

document.querySelectorAll("[data-form]").forEach(form => {
    form.addEventListener("submit", function(e){
        e.preventDefault()
        const inputNumber = e.target.closest("form").querySelector("input[type=number]")
        if(inputNumber){
           
            if(inputNumber.value <= 74) {
              let numero = Number (document.getElementById("twentyFiveOrMore").textContent)
              numero--
              document.getElementById("twentyFiveOrMore").textContent = numero
              document.getElementById("number-left-25").textContent = numero
            } else{
                let numero = Number (document.getElementById("seventyFiveOrMore").textContent)
                numero--
                document.getElementById("seventyFiveOrMore").textContent = numero
               
                document.getElementById("number-left-75").textContent = numero
            }

            actuarMoneyRecauded += Number(inputNumber.value)
            checkMoneyAndShowBar()
            addBackers()

            showModalThank()
            removeAllDataStayleAndSelectedInput("data-input-box")
            modalSelect.classList.remove("show")
           
        } else{
            removeAllDataStayleAndSelectedInput("data-input-box")
            modalSelect.classList.remove("show")
            showModalThank()
            modalSelect.classList.remove("show")
            bookMarkBtn.querySelector("circle").classList.add("active-circle")
            bookMarkBtn.querySelector("path").classList.add("active-path")
            
            const root = document.querySelector(":root")
            const rootStyle = getComputedStyle(root)
            let valueVariable = rootStyle.getPropertyValue("--transparent")
            if(valueVariable === "transparent") return

            bookMarkBtn.querySelector("span").classList.add("active-text")
            bookMarkBtn.classList.add("active-background")
        }
    })
})


// general
document.addEventListener("click", function(e){
    // menu-modal for mobile version -> check if your inside or no and 
    //restaured if your are not
    if(e.target.closest("#modal-nav") || 
        e.target.closest("[data-button-div]")) return
  
    burgerBtn.classList.remove("noDisplayed")
    xBtn.classList.add("noDisplayed")
    modalNav.classList.remove("show")

    // modal select part
    if(e.target.closest("#modal-select") ||
        e.target.closest("[data-main-continueBtn]")) return
    
    modalSelect.classList.remove("show")
    removeAllDataStayleAndSelectedInput("data-input-box")

    // modal thank part
    if(!e.target.closest("#thank-modal") ||
        e.target.closest("#got-it"))  {
            background.classList.add("noDisplayed")
            eliminateModalThank()
        }
})



function removeAllDataStayleAndSelectedInput(data){
    document.querySelectorAll(`[${data}]`).forEach(box => { 
        box.removeAttribute("style")
        box.querySelector("input[name=box]").removeAttribute("checked")
      box.querySelector("[data-continue]").classList.add("noDisplayed")

    }
)}

function checkMoneyAndShowBar(){
    actualMoneySpan.textContent = actuarMoneyRecauded
    const moneyTarget = 1000
    let widthBar = (actuarMoneyRecauded / moneyTarget) * 100
    if(widthBar > 100) {
        bar.style.width = "100%"
    } else{
        bar.style.width = `${widthBar}%`
    }
}



function addBackers(){
   let backer = Number(document.getElementById("backers").textContent)
   backer++
   document.getElementById("backers").textContent = backer
}

function showModalThank(){
    modalThank.classList.remove("noDisplayed")
}

function eliminateModalThank(){
    modalThank.classList.add("noDisplayed")
}
