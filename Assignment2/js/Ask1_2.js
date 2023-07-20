"use strict";

/*Elenxos an oi 2 kwdikoi einai idioi kai elenxos an o kwdikos einai strong, medium 'h weak*/
var verify = function() {
  var password = document.getElementById("pass").value;
  var element_of_password = password.length;
  var numbers_in_password = password.replace(/[^0-9]/g, '').length;
  var lower = password.match(/[a-z]/g);
  var upper = password.match(/[A-Z]/g);
  var special = password.match(/[@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/g);

  if (password === document.getElementById("password1").value && password != "" && password != "helmepa" && password != "uoc" && password != "tuc") {
    document.getElementById("message").style.color = "green";
    document.getElementById("message").innerHTML = "Correct Password";
  }
  else if(password === "") {
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerHTML = "Fill the password please!";
  }
  else if(password === "helmepa" || password === "uoc" || password === "tuc") {
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerHTML = "Sorry, but you cannot use this name as passwords!!!";
  }
  else {
    document.getElementById("message").style.color = "red";
    document.getElementById("message").innerHTML = "Wrong Password";
  }

  if(numbers_in_password >= element_of_password/2) {
    document.getElementById("message0").style.color = "red";
    document.getElementById("message0").innerHTML = " | Weak password";
  }
  else if(lower.length >= 1 && upper.length >= 1 && special.length >= 2) {
    document.getElementById("message0").style.color = "green";
    document.getElementById("message0").innerHTML = " | Strong password";
  }
  else {
    document.getElementById("message0").style.color = "purple";
    document.getElementById("message0").innerHTML = " | Medium password";
  }
};

/*Koumpi pou emfanizei ton kwdiko*/
function visibility() {
  var x = document.getElementById("pass");
  if (x.type === "password") {
    x.type = "text";
  }
  else {
    x.type = "password";
  }
};

/*Check_Box*/
function check_box(){
	var x=document.getElementById("myCheck").checked

  var student = document.getElementById("studnets").value;
  var pass1 = new Date (document.getElementById("pass_start_val").value);
  var pass2 = new Date (document.getElementById("pass_end_val").value);

  var panepistimio = document.getElementById("university").value;
  var email = document.getElementById("email").value;
	
	if(x === false){
		document.getElementById("check_message").innerHTML = "You must accept the terms of use";
		document.getElementById("check_message").style.color = "red"
	}
  else if(document.getElementById("message0").innerHTML === " | Weak password") {
    document.getElementById("check_message").innerHTML = "You can't continue because the password is too weak";
		document.getElementById("check_message").style.color = "red"
  }
  else {
		document.getElementById("check_message").innerHTML = "You have successfully submit";
		document.getElementById("check_message").style.color = "green"
	}	

  if(student === "Undergraduate") {
    if(pass1.getFullYear()+6 < pass2.getFullYear()) {
      document.getElementById("check_message").innerHTML = "You can't continue check pass's years for Undergraduates";
      document.getElementById("check_message").style.color = "red"
    }
  }
  else if(student === "Postgraduate") {
    if(pass1.getFullYear()+2 < pass2.getFullYear()) {
      document.getElementById("check_message").innerHTML = "You can't continue check pass's years for Postgraduate";
      document.getElementById("check_message").style.color = "red"
    }
  }
  else if(student === "Ph.D.") {
    if(pass1.getFullYear()+5 < pass2.getFullYear()) {
      document.getElementById("check_message").innerHTML = "You can't continue check pass's years for Ph.D.";
      document.getElementById("check_message").style.color = "red"
    }
  }

  if(pass1.getFullYear() > pass2.getFullYear()) {
    document.getElementById("check_message").innerHTML = "You can't continue check pass's end and start date";
    document.getElementById("check_message").style.color = "red"
  }
  else if(pass1.getMonth() > pass2.getMonth() && pass1.getFullYear() == pass2.getFullYear()) {
    document.getElementById("check_message").innerHTML = "You can't continue check pass's end and start date";
    document.getElementById("check_message").style.color = "red"
  }
  else if(pass1.getDate() >= pass2.getDate() && pass1.getMonth() == pass2.getMonth() && pass1.getFullYear() == pass2.getFullYear()) {
    document.getElementById("check_message").innerHTML = "You can't continue check pass's end and start date";
    document.getElementById("check_message").style.color = "red"
  }	

  if(panepistimio === "UOC") {
    if(email.endsWith("uoc.gr") === false) {
      document.getElementById("check_message").innerHTML = "You can't continue check email for university";
      document.getElementById("check_message").style.color = "red"
    }
  }
  else if(panepistimio === "TUC") {
    if(email.endsWith("uoc.gr") === false) {
      document.getElementById("check_message").innerHTML = "You can't continue check email for university";
      document.getElementById("check_message").style.color = "red"
    }
  }
  else if(panepistimio === "HELMEPA") {
    if(email.endsWith("uoc.gr") === false) {
      document.getElementById("check_message").innerHTML = "You can't continue check email for university";
      document.getElementById("check_message").style.color = "red"
    }
  }
};

/*Ekstra elenxoi gia ton foititi*/
function extra_selection() {
	var xristis = document.getElementById("xristis").value;

	if(xristis === "Student"){
    document.getElementById("type_of_student").classList.remove("hidden");
    document.getElementById("pass_number").classList.remove("hidden");
    document.getElementById("pass_start").classList.remove("hidden");
    document.getElementById("pass_end").classList.remove("hidden");
    document.getElementById("university_other").classList.remove("hidden");
    document.getElementById("depart").classList.remove("hidden");

    document.getElementById("library_name").classList.add("hidden");
    document.getElementById("moreinfo").classList.add("hidden");

    document.getElementById("label_address").innerHTML="Student's Address:";
	}
  else {
    document.getElementById("type_of_student").classList.add("hidden");
    document.getElementById("pass_number").classList.add("hidden");
    document.getElementById("pass_start").classList.add("hidden");
    document.getElementById("pass_end").classList.add("hidden");
    document.getElementById("university_other").classList.add("hidden");
    document.getElementById("depart").classList.add("hidden");

    document.getElementById("library_name").classList.remove("hidden");
    document.getElementById("moreinfo").classList.remove("hidden");

    document.getElementById("label_address").innerHTML="Library's Address:";
  }
};

function pass() {
  var pass1 = new Date (document.getElementById("pass_start_val").value);
  var pass2 = new Date (document.getElementById("pass_end_val").value);

  if(pass1.getFullYear() > pass2.getFullYear()) {
    document.getElementById("message3").innerHTML = "The end date of student pass must be greater than start date.";
  }
  else if(pass1.getMonth() > pass2.getMonth() && pass1.getFullYear() == pass2.getFullYear()) {
    document.getElementById("message3").innerHTML = "The end date of student pass must be greater than start date.";
  }
  else if(pass1.getDate() >= pass2.getDate() && pass1.getMonth() == pass2.getMonth() && pass1.getFullYear() == pass2.getFullYear()) {
    document.getElementById("message3").innerHTML = "The end date of student pass must be greater than start date.";
  }
  else {
    document.getElementById("message3").innerHTML = "";
  }
}

function student_years() {
  var pass1 = new Date (document.getElementById("pass_start_val").value);
  var pass2 = new Date (document.getElementById("pass_end_val").value);
  var student = document.getElementById("studnets").value;

  if(student == "Undergraduate") {
    if(pass1.getFullYear()+6 < pass2.getFullYear()) {
      document.getElementById("message3").innerHTML = " For Undergraduates students must be at least 6 years.";
    }
    else {
      document.getElementById("message3").innerHTML = "";
    }
  }
  else if(student == "Postgraduate") {
    if(pass1.getFullYear()+2 < pass2.getFullYear()){
      document.getElementById("message3").innerHTML = " For Postgraduate students must be at least 2 years.";
    }
    else {
      document.getElementById("message3").innerHTML = "";
    }
  }
  else {
    if(pass1.getFullYear()+5 < pass2.getFullYear()){
      document.getElementById("message3").innerHTML = " For Ph.D. students must be at least 5 years.";
    }
    else {
      document.getElementById("message3").innerHTML = "";
    }
  }
}

/*Allazei email, analoga me to panepistimio pou einai*/
function email_name(){
	var panepistimio = document.getElementById("university").value;
  var email = document.getElementById("email").value;

  if(panepistimio === "UOC") {
    if(email.endsWith("uoc.gr") === false) {
      document.getElementById("message2").innerHTML="The email must ends with uoc.gr";
    }
    else {
      document.getElementById("message2").innerHTML="";
    }
  }
  else if(panepistimio === "TUC") {
    if(email.endsWith("tuc.gr") === false) {
      document.getElementById("message2").innerHTML="The email must ends with tuc.gr";
    }
    else {
      document.getElementById("message2").innerHTML="";
    }
  }
  else {
    if(email.endsWith("helmepa.gr") === false) {
      document.getElementById("message2").innerHTML="The email must ends with helmepa.gr";
    }
    else {
      document.getElementById("message2").innerHTML="";
    }
  }
};