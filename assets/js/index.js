// récupérer les input depuis le DOM

let pseudoCTN = document.querySelector('div#pseudoCtn')
let emailCTN = document.querySelector('div#emailCtn')
let passCTN = document.querySelector('div#passwordCtn')
let confirmCTN = document.querySelector('div#confirmPasswordCtn')

let pseudo = document.querySelector('input#pseudo')
let email = document.querySelector('input#mail')
let pass = document.querySelector('input#password')
let confirmPass = document.querySelector('input#confirm')

let warnings = []

let submitBtn = document.querySelector('button')

let isValid = false

let checkPseudo = ()=>{
    warnings[0] = document.createElement('p')  
    //check pseudo is minimum 6 char
    if(pseudo.value.length < 6){
        warnings[0].textContent = "Attention ! Votre pseudo : \""+pseudo.value+"\" doit contenir au minimum 6 caractères"
        
        pseudoCTN.lastElementChild.textContent=warnings[0].textContent
        return false;
    } 
    else{
        warnings[0].textContent = ""
        pseudoCTN.replaceChild(warnings[0],pseudoCTN.lastChild);  
        return true;
    }
}

let checkEmail = ()=>{
    warnings[1] = document.createElement('p')
    const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
    if(!reg.test(email.value)){
        warnings[1].textContent = "Attention ! Votre email n'est pas valide !"
        emailCTN.lastElementChild.textContent=warnings[1].textContent
        return false;
    }else{
        warnings[1].textContent = ""
        emailCTN.replaceChild(warnings[1],emailCTN.lastChild)
        return true;
    }
    
}

let checkPass = ()=>{
    /*  from geeks for geeks
        ^ represents the starting of the string.
        (?=.*[a-z]) represent at least one lowercase character.
        (?=.*[A-Z]) represents at least one uppercase character.
        (?=.*\\d) represents at least one numeric value.
        (?=.*[-+_!@#$%^&*., ?]) represents at least one special character.
        . represents any character except line break.
        + represents one or more times.
    */
    const reg = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*., ?]).+$" ) ;
    warnings[2] = document.createElement('p')
    if(!reg.test(pass.value)){
        let warnSuffix = ""
        const reg1 = new RegExp("(?=.*[a-z])") // lower case char
        const reg2 = new RegExp("(?=.*[A-Z])") // upper case char
        const reg3 = new RegExp("(?=.*\\d)") // numeric value
        const reg4 = new RegExp("(?=.*[-+_!@#$%^&*., ?])") // special char
        
        if(!reg1.test(pass.value)) warnSuffix+= " une minuscule "
        if(!reg2.test(pass.value))  warnSuffix += " une majuscule "
        if(!reg3.test(pass.value)) warnSuffix += " un chiffre "
        if(!reg4.test(pass.value)) warnSuffix += " un symbole "

        warnings[2].textContent = " Votre mot de passe doit contenir au moins :"+warnSuffix
        passCTN.lastElementChild.textContent = warnings[2].textContent;
        return false;
    } else {
        warnings[2].textContent = ""
        passCTN.replaceChild(warnings[2], passCTN.lastChild)
        return true;
    }

}

let checkConfirmPass= ()=>{
    warnings[3] = document.createElement('p')
    if(confirmPass.value === pass.value) {
        warnings[3].textContent =""
        confirmCTN.replaceChild(warnings[3],confirmCTN.lastChild)
        return true;
    }
    else{
        warnings[3].textContent = " Vos Mots de passe ne correspondent pas !"
        confirmCTN.lastElementChild.textContent=warnings[3].textContent
        return false;
    }
}


let verifyForm = () => {
    //check pseudo is minimum x char
    checkPseudo()

    //check email with a regexp
    checkEmail()

    //check password contains min, maj , number , symbol 
    checkPass()
    
    //check password is the same as confirm
    checkConfirmPass()

    if( (!checkPseudo() || !checkEmail() || !checkPass() || !checkConfirmPass() ) ) submitBtn.disabled = true;
    else{
        submitBtn.disabled = false;
    }
   
}

let init = ()=>{
    let inputs =[];
    inputs.push(pseudo)
    inputs.push(email)
    inputs.push(pass)
    inputs.push(confirmPass)
    
    inputs.forEach( elem => {
        elem.addEventListener('keyup',verifyForm)
    })

    submitBtn.addEventListener('click', ()=>{
        alert("you managed to successfully fill up the form !")
    })
    console.log(warnings)
}

init()
