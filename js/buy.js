//Valid

jQuery.validator.addMethod("specialcharacters", function(a,b) {
  return this.optional(b) || /^[0-9a-zA-Z]+$/.test(a);
  });

jQuery.validator.addMethod("sqldangerous", function(a,b) {
  return this.optional(b) || /^[^\\\'\`\%\=]+$/.test(a);
  });

jQuery.validator.addMethod("steam", function(a,b) {
//  return this.optional(b) || /\b(?=\w)STEAM_\d[:]\d[:]\d+/.test(a);
  return this.optional(b) || /^STEAM_[0-1]:[0-1]:\d+$/.test(a);
  });

$("#steps").validate({
	rules: {
		name: {
			required: true,
			minlength: 3,
			maxlength: 32,
			sqldangerous: true
		},
		sid: {
			required: true,
			sqldangerous: true,
			maxlength: 64,
			steam: true
		},
		password: {
			required: true,
			sqldangerous: true,
			minlength: 6,
			maxlength: 32
		},
		codesms: {
			specialcharacters: true,
			minlength: 8,
			maxlength: 8
		},
		securityq: {
			required: true,
			step: 4
		},
		agree:"required",
		
		service: {
			required: true
		},
		
		payment: {
			required: true
		},
	},
	//For custom messages
	messages: {
		name:{
			required: "Wpisz swój nick.",
			minlength: "Nick musi posiadać przynajmniej 3 znaki.",
			maxlength: "Nick nie może posiadać więcej niż 32 znaki.",
			sqldangerous: "Nick nie może posiadać takich znaków specjalnych."
		},
		sid:{
			required: "Wpisz swój SID.",
			sqldangerous: "SID nie może posiadać takich znaków specjalnych.",
			maxlength: "SID nie może posiadać więcej niż 32 znaki.",
			steam: "To nie jest Steam ID."
		},
		password:{
			required: "Wpisz swoje hasło.",
			sqldangerous: "Hasło nie może posiadać takich znaków specjalnych.",
			minlength: "Hasło musi posiadać przynajmniej 6 znaków.",
			maxlength: "Hasło nie może posiadać więcej niż 32 znaki."
		},
		codesms:{
			specialcharacters: "Kod nie może posiadać znaków specjalnych.",
			minlength: "Kod musi mieć 8 znaków.",
			maxlength: "Kod musi mieć 8 znaków."
		},
		securityq:{
			required: "Musisz podać odpowiedź.",
			step: "Podana odpowiedź jest błędna."
		},
		agree:{
			required: "Żeby dokonać rejestracji, musisz zaakceptować regulamin"
		},
		service: {
			required: "Musisz wybrać usługe."
		},
		
		value: {
			required: "Musisz wybrać wartość usługi."
		},
		
		payment: {
			required: "Musisz wybrać płatność."
		},
	},
	errorElement : 'div',
	errorPlacement: function(error, element) {
	  var placement = $(element).data('error');
	  if (placement) {
		$(placement).append(error)
	  } else {
		error.insertAfter(element);
	  }
	}
 });


// Step configure

var form = $("#steps").show();
 
form.steps({
    headerTag: "h3",
    bodyTag: "section",
    transitionEffect: "slide",
    onStepChanging: function (event, currentIndex, newIndex)
    {
        // Allways allow previous action even if the current form is not valid!
        if (currentIndex > newIndex)
        {
            return true;
        }
        // Forbid next action on "Warning" step if the user is to young
        if (newIndex === 3 && Number($("#age-2").val()) < 18)
        {
            return false;
        }
        // Needed in some cases if the user went back (clean up)
        if (currentIndex < newIndex)
        {
            // To remove error styles
            form.find(".body:eq(" + newIndex + ") label.error").remove();
            form.find(".body:eq(" + newIndex + ") .error").removeClass("error");
        }
        form.validate().settings.ignore = ":disabled,:hidden";
        return form.valid();
    },
    onStepChanged: function (event, currentIndex, priorIndex)
    {
        // Used to skip the "Warning" step if the user is old enough.
        if (currentIndex === 2 && Number($("#age-2").val()) >= 18)
        {
            form.steps("next");
        }
        // Used to skip the "Warning" step if the user is old enough and wants to the previous step.
        if (currentIndex === 2 && priorIndex === 3)
        {
            form.steps("previous");
        }
    },
    onFinishing: function (event, currentIndex)
    {
        form.validate().settings.ignore = ":disabled";
        return form.valid();
    },
    onFinished: function (event, currentIndex)
    {
        alert("Submitted!");
    }
}).validate({
    errorPlacement: function errorPlacement(error, element) { element.before(error); },
    rules: {
        confirm: {
            equalTo: "#password-2"
        }
    }
});