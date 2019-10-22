$(function(){
$('#name').focus();
$('#other-title').hide();
$('#design option:first-child').hide();


$('#title').on('change',function(event){
    if($(event.target).val()==='other'){
        $('#other-title').show();
    }
    else
        $('#other-title').hide();
});

$('#color').prepend('<option>Please select a tshirt theme</option>');
$('#color option').eq(1).attr('selected',true);
$('#color').each(function(){
    $('#colors-js-puns').hide();
});


$('#design').on('change',function(event){
    $('#color').each(function(){       
        if ($(event.target).val() === "js puns"){
            $('#colors-js-puns').show();
            $("#color option:contains('Please select')").hide();
            $("#color option:contains('I ♥ JS')").hide();     
            $("#color option:contains('JS Puns')").show(); 
        } else if ($(event.target).val() === "heart js"){
            $('#color option').eq(4).attr('selected', true);
            $('#colors-js-puns').show();
            $("#color option:contains('Please select')").hide();        
            $("#color option:contains('JS Puns')").hide();
            $("#color option:contains('I ♥ JS')").show();           
        }
        else {
            $('#colors-js-puns').hide();
        }
    });

        
});

const $totCost = $('<p>');
$('.activities').append($totCost);
let totActivityCost = 0;
$('.activities').on('change',function(event){
    $(".error").remove();
    const checkbox = event.target;
    const dataCost = $(event.target).attr('data-cost');
    if(checkbox.checked === true)
        totActivityCost+= parseInt(dataCost.substring(1));
    else
        totActivityCost-= parseInt(dataCost.substring(1));
    $totCost.text('Total: $'+totActivityCost.toString());
    const data = $(event.target).attr('data-day-and-time');
    if(checkbox.checked === true)
    {
        const checkboxes = $('input[type="checkbox"]');
        for(let i=0;i<checkboxes.length;i++){
            if(checkboxes[i]!=checkbox){
                if(data === $(checkboxes[i]).attr('data-day-and-time'))
                {
                    console.log($(checkboxes[i]).attr('data-day-and-time')+i.toString());
                    checkboxes[i].disabled = true;
                }
            }
        }
    }
    else{
        const checkboxes = $('input[type="checkbox"]');
        for(let i=0;i<checkboxes.length;i++){
            if(checkboxes[i]!=checkbox){
                if(data === $(checkboxes[i]).attr('data-day-and-time'))
                {
                    console.log($(checkboxes[i]).attr('data-day-and-time')+i.toString());
                    checkboxes[i].disabled = false;
                }
            }
        }

    }
});

$('#payment option:contains("Select Payment Method")').prop('disabled', true);
$('#payment option:contains("Credit Card")').prop('selected', true);

$('#paypal').hide();
$('#bitcoin').hide()

$('#payment').on('change',function(event){
    const currOption = event.target.value;
    if(currOption === 'Credit Card')
    {
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();
    }
    else if(currOption === 'PayPal')
    {
        $('#paypal').show();
        $('#credit-card').hide();
        $('#bitcoin').hide();
    }
    else{
        $('#bitcoin').show();
        $('#credit-card').hide();
        $('#paypal').hide();
    }
});
function validName() {
    const inputName = $('#name');
    const regexName = /^[a-zA-Z]+$/;

    if (!(regexName.test($("#name").val()))) {
        
        inputName.css('border-color', '#B20000');
        $('[for="name"] span').remove(); 
        $('[for="name"]').append('<span><b> Please type your name </b></span>').css('color', '#B20000');
        return false;
    } else {
        inputName.css('border-color', '#794880'); 
        $('[for="name"] span').remove(); 
        $('[for="name"]').css('color', '#000000');
        return true;
    }
}

//Event handler listens for changes in Name field
//Displays error message if validation rejected
//Displays error message if user clicks out of blank textbox (will engage before user submits form)

$('#name').on('focusout', function () {
    validName();
});

//A validly formatted email address is required
//If it does not pass validation the Email field text and border will turn red, error message generated
//Displays tooltip in box if input is not valid (will engage before user submits form)

function validEmail() {
    const regexEmail = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

    if (!(regexEmail.test($("#mail").val()))) {
        $('#mail').css('border-color', '#B20000');
        $('[for="mail"] span').remove();
        $('[for="mail"]').append('<span><b> Valid email address required to proceed </b></span>').css('color', '#B20000');
        return false;
    } else {
        $('#mail').css('border-color', '#794880');
        $('[for="mail"] span').remove();
        $('[for="mail"]').css('color', '#000000');
        return true;
    }
}

//Event handler listens for changes in Email field
//Displays error message if a valid email is not provided
//Displays error message as user types, until valid format is supplied 
//Displays error message if user clicks out of blank textbox (will engage before user submits form)

$('#mail').on('focusout keyup', function () {
    validEmail();
});


//At least one item from Activities list must be selected
//If criteria not met the Activities text will turn red, error message generated
//If user deselects all activities, error message will occur until new selection is made (will engage before user submits form)

function validActivities() {
    if($('input[type="checkbox"]').is(':checked')) {
        $('.activities legend span').remove();
        $('.activities legend').css('color', '#000000');
        return true;
    } else {
        $('.activities legend span').remove();
        $('.activities legend').append('<span><b>: Please select at least one activity from list </b></span>').css('color', '#B20000');
        return false;
    }

}


//Event handler listens for changes in Activities list
//Displays error message if validation rejected

$('.activities').on('click', function () {
    validActivities();
});


//CC requires >= 13 numbers, <= 16 numbers
//If validation not passed, CC text and border will turn red, error messages generated
    //Seperate errors for: < 13 nums, > 16 nums, and input left blank

function validCC() {
    const regexCC = /^(?:[0-9]{13,16})?$/;

    if ($('#cc-num').val().length < 13) {
        $('#cc-num').css('border-color', '#B20000');
        $('[for="cc-num"] span').remove();
        $('[for="cc-num"]').append('<span><b> Credit card number should be at least 13 digits long </span>').css('color', '#B20000');
        return false;
    } else if ($('#cc-num').val().length > 16) {
        $('#cc-num').css('border-color', '#B20000');
        $('[for="cc-num"] span').remove();
        $('[for="cc-num"]').append('<span><b> Credit card number should be no more than 16 digits long </b></span>').css('color', '#B20000');
        return false;
    }
    else {
        if (regexCC.test($('#cc-num').val())) {
        $('#cc-num').css('border-color', '#794880');
        $('[for="cc-num"] span').remove();
        $('[for="cc-num"]').css('color', '#000000');
        return true;
    } else {
        $('#cc-num').css('border-color', '#B20000');
        $('[for="cc-num"] span').remove();
        $('[for="cc-num"]').append('<span><b> Please enter a valid credit card number </b></span>').css('color', '#B20000');
    return false;
        }
    }
}

//Event handler listens for changes in CC field
//Displays error message if validation rejected
//Displays error message if user clicks out of blank textbox (will engage before user submits form)

$('#cc-num').on('focusout', function () {
    validCC();
});

//Zip code requires 5 digits
//If validation not passed Zip text and border will turn red, error message generated

function validZip() {
    const regexZip = /^\d{5}$/;

    if (!(regexZip.test($('#zip').val()))) {
        $('#zip').css('border-color', '#B20000');
        $('[for="zip"] span').remove();
        $('[for="zip"]').append('<span><b> Please enter a valid zip code </b></span>').css('color', '#B20000');
        return false;
    } else {
        $('#zip').css('border-color', '#794880;');
        $('[for="zip"] span').remove();
        $('[for="zip"]').css('color', '#000000');
        return true;
    }
}

//Event handler listens for changes is Zip code field
//Displays error message if validation rejected
//Displays error message if user clicks out of blank textbox (will engage before user submits form)

$('#zip').on('focusout', function () {
    validZip();
});


//CVV requires 3 numbers for validation
//If validation not passed CVV text and border will turn red, error message generated

function validCVV() {
    const regexCVV = /^[0-9]{3}$/;

    if (!(regexCVV.test($('#cvv').val()))) { 
        $('#cvv').css('border-color', '#B20000');
        $('[for="cvv"] span').remove();
        $('[for="cvv"]').append('<span><b> Please enter a valid CVV </b></span>').css('color', '#B20000');
        return false;
    } else {
        $('#zip').css('border-color', '#794880');
        $('[for="cvv"] span').remove();
        $('[for="cvv"]').css('color', '#000000');
        return true;
    }
}

 
//Event handler listens for changes in CVV field
//Displays error message if CVV validation is rejected
//Displays error message if user clicks out of blank textbox (will engage before user submits form)

$('#cvv').on('focusout', function () {
        validCVV();
});


//Tests to ensure conditions for form validation on submit, preventing default behaviors
//CC form fields only required when CC payment option is selected


const validForm = $('form');

validForm.on('submit', function(event){

    if (validName() === false) { 
        event.preventDefault();
    } 
    
    if (validEmail() === false) {
        event.preventDefault();
    }

    if (validActivities() === false) {
        event.preventDefault();
    }

    if ($('[value="Credit Card"]').is(':selected')) { 
        if (validCC() === false) {
            event.preventDefault();
        }
        if (validZip() === false) {
            event.preventDefault();
        }
        if (validCVV() === false) {
            event.preventDefault();
        }
    }
      
});
});
