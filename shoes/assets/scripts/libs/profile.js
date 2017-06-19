window.SB_USER = {
	params: {},

	user: {},

	init: function() {
		this.get.user();
	},

	get: {
		user: function() {
			Loader.show();
			$.post('/' + $.request.orgname + '/handler/get_user/', {user_id:window.PROFILE_USER_ID}, function(data) {
				Loader.hide();
				if(data) {
					var vuz = $.parseJSON(data.rel_sb_vuzid);
					SB_USER.user = data;
					SB_USER.params = {
						name: {
							value: data.name,
							editable: false,
							required: true,
							placeholder: "Имя",
							block: "text-edu-info"
						},
						rel_sb_vuzid: {
							value: vuz.name,
							editable: false,
							required: true,
							placeholder: "Университет",
							block: "text-edu-info"
						},
						faculty: {
							value: data.faculty,
							editable: true,
							required: false,
							placeholder: "Факультет",
							block: "text-edu-info"
						},
						department: {
							value: data.department,
							editable: true,
							required: false,
							placeholder: "Кафедра",
							block: "text-edu-info"
						},
						speciality: {
							value: data.speciality,
							editable: true,
							required: false,
							placeholder: "Специальность",
							block: "text-edu-info"
						},
						position: {
							value: data.position,
							editable: true,
							required: false,
							placeholder: "Должность",
							block: "text-edu-info"
						},
						email: {
							value: data.email,
							editable: true,
							required: true,
							placeholder: "Эл. почта",
							block: "text-contact-info"
						},
						phone: {
							value: data.phone,
							editable: true,
							required: false,
							placeholder: "Телефон",
							block: "text-contact-info"
						}
					};
					SB_USER.render.user(data);
					SB_USER.get.classes();
				}
			}, 'json');
		},
		classes: function() {
			$('.user-classes.user-classes-student ul, .add-classes.user-classes-student ul, .user-teacher-classes tbody').html("");
			Loader.show();
			$.post('/' + $.request.orgname + '/handler/get_classes/', {user_id:window.PROFILE_USER_ID}, function(data) {
				Loader.hide();
				if(data) {
					if(data.success) {
						SB_USER.render.classSelect(data);
						if(SB_USER.user.role == 2)
						{
							$('.classes').hide();
						}
						else if(SB_USER.user.role == 0 || (SB_USER.user.role == 1 && USER.recordid != window.PROFILE_USER_ID))
						{
							SB_USER.render.classes(data.classes, false);
						}
						else
						{
							SB_USER.get.availClasses(data.classes);
						}
					}
				}
			}, 'json');
		},
		availClasses: function(classes) {
			Loader.show();
			$.post('/' + $.request.orgname + '/handler/get_avail_classes/', {user_id:SB_USER.user.recordid}, function(data) {
				Loader.hide();
				if(data) {
					if(data.success) {
						SB_USER.render.classes(classes, data.availClasses);
					}
				}
			}, 'json');
		}
	},
	render: {
		user: function() {
			if(USER.recordid == window.PROFILE_USER_ID)
			{
				$('.text-contact-info').after(
					"<select class='display-contact'>" +
						"<option value='0' selected='selected'>Показывать всем</option>" +
						"<option value='1'>Не показывать</option>" +
					"</select>"
				);
				if(SB_USER.user.display_contact == 0 || SB_USER.user.display_contact == 1)
					$('.contact-info .display-contact').val(SB_USER.user.display_contact);
			}
			var html;

			for(var param in SB_USER.params) {
				if(SB_USER.user.role == 0 && param == "speciality") continue;
				if(SB_USER.user.role == 1 && param == "position")   continue;
				if(SB_USER.user.display_contact == 1 && param == "phone" && USER.recordid != window.PROFILE_USER_ID)   continue;
				if(SB_USER.user.display_contact == 1 && param == "email" && USER.recordid != window.PROFILE_USER_ID)   continue;


				EDIT_SPAN.add(SB_USER.params[param], param);
			}
			$('.user-info span').addClass('profile-span-vuz');
			if(SB_USER.user.display_contact == 1 && USER.recordid != window.PROFILE_USER_ID) {
				$('.text-contact-info').append("<span style='color: #76787a; font-style:italic;'>Пользователь скрыл информацию</span>");
			}
		},
		classes: function(classes, availClasses) {
			if(SB_USER.user.role == 0) {
				for(var i in classes) {
					if(classes[i].class_id == '00000000-0000-0000-0000-000000000000') continue;

					var group_html = "",
						del = (USER.recordid == window.PROFILE_USER_ID) ? '<span class="delete-group delete-group-class-el icon-close"></span>' : "";
					for(var j in classes[i].groups) {
						group_html +=
							"<span class='course-group' data-id='" + classes[i].groups[j].group_id + "'>" +
								classes[i].groups[j].group_name +
								del +
							"</span>";
					}
					if(USER.recordid == window.PROFILE_USER_ID) {
						group_html += "<input type='text' class='add-group-class autocomplete-group' placeholder='Добавить группу' value='' />";
					}
					$('.user-teacher-classes tbody').append(
						'<tr class="class-block" data-id="' + classes[i].class_id + '" vuz-id="' + classes[i].vuz_id + '">' +
							'<td>' + classes[i].class_name + ( (SB_USER.user.recordid == USER.recordid) ? '<span class="delete-class delete-class-el icon-close"></span></td>' : "" ) +
							'<td>' + group_html + '</td>' +
						'</tr>'
					);
				}
				$('.autocomplete-group').autocomplete({
					serviceUrl: "/" + $.request.orgname + "/handler/autocomplete_group/",
					minChars: 1,
					delimiter: /(,|;)\s*/,
					maxHeight: 200,
					width: 117,
					zIndex: 9999,
					deferRequestBy: 100,
					noCache: true,
					autoSelectFirst: false,
					triggerSelectOnValidInput: false,
					params: { "vuz_id": classes[i].vuz_id },
					onSelect: function(data){
						$(this).val(data.value);
						SB_USER.edit.addGroupSelect($(this));
					},
					onSearchComplete: function(data, result) {
//                        if(result.length == 1)
//                            $(this).val(result[0].value).change();
					}
				});
			} else if (SB_USER.user.role == 1) {
				var class_html = "",
					del = (USER.recordid == window.PROFILE_USER_ID) ? '<span class="delete-class delete-user-class-el icon-close"></span>' : "";
				for(var i in classes) {
					if(classes[i].class_id == '00000000-0000-0000-0000-000000000000' || classes[i].is_own) continue;

					class_html +=
						"<li>" +
							"<span class='class-el' data-id='" + classes[i].class_id + "'>" +
								classes[i].class_name +
								del +
							"</span>" +
						"</li>";
				}
				$('.user-classes.user-classes-student ul').html(class_html);

				if(availClasses && $('.add-classes.user-classes-student ul').length > 0) {
					var add = (USER.recordid == window.PROFILE_USER_ID) ? '<span class="add-class add-user-class-el icon-addmini"></span>' : "";
					class_html = "";

					for(var j in availClasses)
					{
						if(availClasses[j].class_id == '00000000-0000-0000-0000-000000000000' || availClasses[j].is_own) continue;

						if($('.user-classes-student ul li .class-el[data-id="' + availClasses[j].class_id + '"]').length == 0) {
							class_html +=
							"<li>" +
								"<span class='class-el' data-id='" + availClasses[j].class_id + "'>" +
									availClasses[j].class_name +
									add +
								"</span>" +
							"</li>";
						}
					}
					$('.add-classes.user-classes-student ul').html(class_html);
				}
			} else if (SB_USER.user.role == 2) {
				$('.classes').hide();
			}

		},
		classSelect: function(data) {
			$('.course-list div').remove();

			$(".course-list").append(
				"<div class='select-class'>" +
					"<ul></ul>" +
				"</div>"
			);

			$(".course-list").hover(function() {
				$(".course-list ul").show();
			}, function() {
				$(".course-list ul").hide();
			});
			var show_class = {};
			for(var i = 0 in data.classes){
				if(i == 0)
					show_class = data.classes[i];
				$('.select-class ul').append(
					"<li value=" + data.classes[i].class_id + ">" + data.classes[i].class_name + "</li>"
				);
				if(LAST.class == data.classes[i].class_id)
					show_class = data.classes[i];
			}
			if(data.classes.length > 0) {
				$('.select-class ul li[value="' + show_class.class_id + '"]').addClass('active');
				$('.select-class ul').before(
						"Предмет: <span class='course-select-name'>" +
						show_class.class_name +
						"</span><i class='dropdown'></i>"
				);
			}
			LAST.class = "";
		}
	},
	edit: {
		user: function(param) {
			var params = {
				user_id:SB_USER.user.recordid,
				edit: param
			};

			Loader.show();
			$.post('/' + $.request.orgname + '/handler/update_user/', params, function(data) {
				Loader.hide();
				$('.sys-message').css('top', $('.user-info').offset().top + $('.user-info').outerHeight() - 40 + 'px');
				if(data.success)
				{
					Message.show("Изменения сохранены");
				}
				else
				{
					Message.show("Ошибка!", true);
				}
			}, 'json');
		},
		delGroup: function(params) {
			Loader.show();
			$.post('/' + $.request.orgname + '/handler/class_delete_group/', params, function(data) {
				Loader.hide();
				if(data.success) {
					$('tr.class-block[data-id="' + params.class + '"] .course-group[data-id="' + params.group + '"]').remove();
				} else {
					alert(data.msg);
				}
			}, 'json');
		},
		addGroupSelect: function($this) {

			if($this.val() != "")
			{
				window.addGroupClass = {
					name: $this.val(),
					class: $this.parents('tr.class-block').attr('data-id'),
					vuz_id: $this.parents('tr.class-block').attr('vuz-id')
				};
			}

			$this.val("");

			if(window.addGroupClass.name != "")
			{
				window.setTimeout(function(){
					SB_USER.edit.addGroup(window.addGroupClass);
				}, 200);
			}
		},
		addGroup: function(params) {
			if(window.addGroupRequrest) return false;

			window.addGroupRequrest = true;
			Loader.show();
			$.post('/' + $.request.orgname + '/handler/class_add_group/', params, function(data) {
				Loader.hide();
				if(data.success) {
					if($('tr.class-block[data-id="' + params.class + '"] span.course-group[data-id="' + data.id + '"]').length == 0)
					{
						$('tr.class-block[data-id="' + params.class + '"] .add-group-class').before(
							"<span class='course-group' data-id='" + data.id + "'>" +
								data.name +
								'<span class="delete-group delete-group-class-el icon-close"></span>' +
							"</span>"
						);
					}
					$('.add-group-class').val('');
				}
				alert(data.msg);
				window.addGroupRequrest = false;
			}, 'json');
		},
		addClass: function(params) {
			Loader.show();
			$.post('/' + $.request.orgname + '/handler/class_add_user/', params, function(data) {
				Loader.hide();
				if(data.success)
				{
					SB_USER.get.classes();
				}
				else
				{
					alert(data.msg);
				}
			}, 'json');
		},
		delClass: function(params) {
			Loader.show();
			$.post('/' + $.request.orgname + '/handler/class_delete_user/', params, function(data) {
				Loader.hide();
				if(data.success)
				{
					SB_USER.get.classes();
				}
				else
				{
					alert(data.msg);
				}
			}, 'json');
		},
		deleteClass: function(params) {
			Loader.show();
			$.post('/' + $.request.orgname + '/handler/class_delete/', params, function(data) {
				Loader.hide();
				if(data.success)
				{
					SB_USER.get.classes();
				}
				else
				{
					alert(data.msg);
				}
			}, 'json');
		}
	}
};


$(function(){
	SB_USER.init();

	$('body').on('change', '.contact-info .display-contact', function() {
		SB_USER.edit.user({name:"display_contact", value:$(this).val()});
	});

	$('body').on('click', '.class-el .delete-user-class-el', function(){
		var params = {
			class: $(this).parent('.class-el').attr("data-id")
		};
		SB_USER.edit.delClass(params);
	});

	$('body').on('click', '.user-teacher-classes .delete-class-el', function(){
		if (confirm("Удалить предмет?")) {
			var params = {
				class: $(this).parents('.class-block').attr("data-id")
			};
			SB_USER.edit.deleteClass(params);
		}
	});

	$('body').on('click', '.class-el .add-user-class-el', function(){
		var params = {
			class: $(this).parent('.class-el').attr("data-id")
		};
		SB_USER.edit.addClass(params);
	});

	$('body').on('click', '.delete-group-class-el', function() {
		var params = {
			group: $(this).parents('.course-group').attr('data-id'),
			class: $(this).parents('tr.class-block').attr('data-id')
		};
		SB_USER.edit.delGroup(params);
	});

	$('body').on('keypress', '.add-group-class', function(event, el) {
		switch(event.keyCode) {
			case 27: // ESC
				$(this).val("").blur();
				break;
			case 13: // Enter
				SB_USER.edit.addGroupSelect($(this));
				break;
			default:
				break;
		}
	});

	$('body').on('click', 'span.editable-span', function() {
		EDIT_SPAN.edit($(this));
	});

	$('html').on('click', '.locker', function() {
		EDIT_SPAN.save();
	});

	$('body').on('mouseenter','.editable-input, .editable-span', function() {
		if($('body').hasClass('locker'))
			$('body').removeClass('locker');
	});

	$('body').on('mouseleave','.editable-input, .editable-span', function() {
		if(!$('body').hasClass('locker') && $('.editable-input').length > 0)
		{
			$('body').addClass('locker');
		}
	});

	$('body').on('click', '.load-avatar', function(event) {
		event.preventDefault();
		$('.overlay-container').fadeIn(function() {
			window.setTimeout(function(){
				$('.window-container').addClass('window-container-visible');
			}, 100);
		});
		return false;
	});

	$('body').on('click', '.select-class ul li', function() {
		window.location = "/" + $.request.orgname + "/site/class_main/?course_id=" + $(this).attr('value');
	});
});


window.EDIT_SPAN = {
	val: null,

	add: function(conf, name) {
		if(!conf.value && USER.recordid != window.PROFILE_USER_ID) return false;

		var html = "";
		html = "<span name='" + name + "' ";
		html += (conf.value) ? "value='" + conf.value + "' " : "value='' ";
		html += (conf.editable && USER.recordid == window.PROFILE_USER_ID) ? "class='editable-span" : "class='";
		html += (conf.value) ? "'" : " placeholder'";
		html += (conf.value) ? "placeholder=''" : "  placeholder='" + conf.placeholder + "'";
		html += (conf.required) ? " required='required'>" : ">";
		html += (conf.value) ? conf.value : conf.placeholder;
		html += (conf.editable) ? "<i></i>" : "";
		html += "</span>";

		$('.' + conf.block + ' span[name="' + name + '"]').remove();
		$('.' + conf.block).append(html);

		//if(name == 'rel_sb_vuzid') {


	},
	edit: function($el) {
		if(USER.recordid != window.PROFILE_USER_ID) return false;

		if($('.editable-input').length > 0)
		{
			$('body').addClass('locker').click();
		}

		var input = '<input class="editable-input"' +
					" placeholder='" + $el.attr('placeholder') + "'" +
					" name='" + $el.attr('name') + "'" +
					" value='" + $el.attr('value') + "'";

		input += ($el.attr('required') == "required") ? " required='required'" : "";
		input += " />";
		$el.after(input);
		$el.hide();
		$('.editable-input[name="' + $el.attr('name') + '"]').focus();
		this.val = $el.attr('value');

		return true;
	},
	save: function() {
		var $el = $('.editable-span[name="' + $('.editable-input').attr('name') + '"]');
		if($('.editable-input').val() !== "" || !$('.editable-input').prop('required'))
		{
			if(SB_USER.params[$('.editable-input').attr('name')].value != $('.editable-input').val())
			{
				SB_USER.params[$('.editable-input').attr('name')].value = $('.editable-input').val();
				$el.attr('value', $('.editable-input').val());
				if($('.editable-input').val())
				{
					$el.html($('.editable-input').val() + "<i></i>");
					if($el.hasClass('placeholder'))
						$el.removeClass('placeholder');
				}
				else
				{
				   $el.html(SB_USER.params[$('.editable-input').attr('name')].placeholder + "<i></i>");
				   if(!$el.hasClass('placeholder'))
						$el.addClass('placeholder');
				}

				if(this.val != $('.editable-input').val())
				{
					SB_USER.edit.user({name:$('.editable-input').attr('name'), value:$('.editable-input').val()});
				}
				this.val = null;
			}
		}
		$el.show();
		$('.editable-input').remove();
		$('.locker').removeClass('locker');
	}
};
