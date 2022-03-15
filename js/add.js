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

$("#formValidateServers").validate({
	rules: {
		name: {
			required: true,
			minlength: 3,
			maxlength: 32,
			sqldangerous: true
		},
		SID: {
			required: true,
			sqldangerous: true,
			maxlength: 32,
			steam: true
		},
		password: {
			required: true,
			sqldangerous: true,
			maxlength: 32
		},
		days: {
			required: true,
			specialcharacters: true
		},
		type:"required"
	},
	//For custom messages
	messages: {
		name:{
			required: "Wpisz nick.",
			minlength: "Nick musi posiadać przynajmniej 3 znaki.",
			maxlength: "Nick nie może posiadać więcej niż 32 znaki.",
			sqldangerous: "Nick nie może posiadać takich znaków specjalnych."
		},
		SID:{
			required: "Wpisz SID.",
			sqldangerous: "SID nie może posiadać takich znaków specjalnych.",
			maxlength: "SID nie może posiadać więcej niż 32 znaki.",
			steam: "To nie jest Steam ID."
		},
		password:{
			required: "Wpisz hasło.",
			sqldangerous: "Hasło nie może posiadać takich znaków specjalnych.",
			maxlength: "Hasło nie może posiadać więcej niż 32 znaki.",
		},
		days:{
			required: "Wpisz ilość dni.",
			specialcharacters: "Pole dni nie może posiadać znaków specjalnych."
		},
		type:{
			required: "Musisz wybrać jedną z opcji powyżej."
		}
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
 $("#formValidateForum").validate({
	rules: {
		uid: {
			required: true,
			sqldangerous: true
		},
		days: {
			specialcharacters: true
		}
	},
	//For custom messages
	messages: {
		uid:{
			required: "Wpisz ID użytkownika.",
			sqldangerous: "UID nie może posiadać takich znaków specjalnych.",
			maxlength: "SID nie może posiadać więcej niż 32 znaki."
		},
		days:{
			specialcharacters: "Pole dni nie może posiadać znaków specjalnych."
		}
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