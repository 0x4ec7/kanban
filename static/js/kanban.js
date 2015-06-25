(function(){
	'use strict';

	var kanban_members = [];
	var kanban_actions = [];

	function load_data(){
		load_members();
	}

	function load_members(){
		$.ajax({
			type: 'POST',
			url: '/board/ajax_get_members',
			data: {},
			dataType: 'json',
			success: function(data) {
				kanban_members = data;
				reset_member_list();
				init_add_action_modal();
				init_modify_action_modal();
				load_actions();
			},
			error: function(response){
				alert(response.statusText);
			}
		});
	}

	function load_actions(){
		$.ajax({
			type: 'POST',
			url: '/board/ajax_get_actions',
			data: {},
			dataType: 'json',
			success: function(data) {
				kanban_actions = data;
				reset_action_list();
			},
			error: function(response){
				alert(response.statusText);
			}
		});
	}

	function remove_member(id){
		$.ajax({
			type: 'POST',
			url: '/board/ajax_remove_member',
			data: {
				id: id
			},
			success: function(data) {
				if(data == 'True'){
					load_members();
				} else {
					alert('error');
					load_members();
				}
			},
			error: function(response){
				alert(response.statusText);
			}
		});
	}

	function add_member(name){
		$.ajax({
			type: 'POST',
			url: '/board/ajax_add_member',
			data: {
				name: name
			},
			success: function(data) {
				if(data == 'True'){
					load_members();
				} else {
					alert('error');
					load_members();
				}
			},
			error: function(response){
				alert(response.statusText);
			}
		});
	}

	function add_action(detail, state, priority, resp){
		$.ajax({
			type: 'POST',
			url: '/board/ajax_add_action',
			data: {
				detail: detail,
				state: state,
				priority: priority,
				resp: resp
			},
			success: function(data) {
				if(data == 'True'){
					load_actions();
				} else {
					alert('error');
					load_actions();
				}
			},
			error: function(response){
				alert(response.statusText);
			}
		});
	}

	function update_action(action_id, detail, state, priority, resp){
		$.ajax({
			type: 'POST',
			url: '/board/ajax_update_action',
			data: {
				action_id: action_id,
				detail: detail,
				state: state,
				priority: priority,
				resp: resp
			},
			success: function(data) {
				if(data == 'True'){
					load_actions();
				} else {
					alert('error');
					load_actions();
				}
			},
			error: function(response){
				alert(response.statusText);
			}
		});
	}

	function delete_action(action_id){
		$.ajax({
			type: 'POST',
			url: '/board/ajax_delete_action',
			data: {
				action_id: action_id
			},
			success: function(data) {
				if(data == 'True'){
					load_actions();
				} else {
					alert('error');
					load_actions();
				}
			},
			error: function(response){
				alert(response.statusText);
			}
		});
	}

	function update_action_state(action_id, state){
		$.ajax({
			type: 'POST',
			url: '/board/ajax_update_action_state',
			data: {
				action_id: action_id,
				state: state,
			},
			success: function(data) {
				if(data == 'True'){
					load_actions();
				} else {
					alert('error');
					load_actions();
				}
			},
			error: function(response){
				alert(response.statusText);
			}
		});
	}

	function reset_member_list(){
		var member_view = $('#member .avatars');
		var html = member_view.empty().html();
		for(var i in kanban_members){
			var member = kanban_members[i];
			var names = member.fields['name'].split(' ');
			var initial = '';
			for(var i = 0; i < 2; i++){
				initial += names[i][0].toUpperCase();
				if(names.length == 1){
					break;
				}
			}
			html += '<a class="avatar-initials" role="button" tabindex="0" value="' + member.pk + '" title="' + member.fields['name'] + '">' + initial + '</a>';
		}
		member_view.html(html);
		$('a.avatar-initials').popover({
			placement: 'bottom',
			trigger: 'focus',
			html: true,
			content: function() {
				return '<button class="btn btn-sm btn-primary" id="remove-member" value="' + $(this).attr('value') + '">Remove from list</button>'
			}
		}).parent().off().one('click', 'button#remove-member', function() {
			remove_member($(this).val());
		});
	}

	function reset_action_list(){
		var state_do_view = $('#state-do');
		var state_do_html = state_do_view.empty().html();
		var state_ip_view = $('#state-ip');
		var state_ip_html = state_ip_view.empty().html();
		var state_td_view = $('#state-td');
		var state_td_html = state_td_view.empty().html();
		for(var i in kanban_actions){
			var action = kanban_actions[i];
			var member = find_member(action.fields['responsible']);
			var names = member.fields['name'].split(' ');
			var initial = '';
			for(var i = 0; i < 2; i++){
				initial += names[i][0].toUpperCase();
				if(names.length == 1){
					break;
				}
			}
			if(action.fields['state'] == 'DO'){
				state_do_html = state_do_html + '<div class="card-outer"><a class="card-inner" href="javascript:void(0)" pk="' + action.pk + '"><div class="card-labels"><span class="card-label card-label-';
				state_do_html = state_do_html + action.fields['priority'] + '">&nbsp;</span></div><div class="card-detail">';
				state_do_html = state_do_html + action.fields['detail'] + '</div><div class="card-member"><span class="card-member-avatar" role="button" tabindex="0" value="1" title="';
				state_do_html = state_do_html + member.fields['name'] + '">' + initial + '</span></div></a></div>';
			} else if(action.fields['state'] == 'IP'){
				state_ip_html = state_ip_html + '<div class="card-outer"><a class="card-inner" href="javascript:void(0)" pk="' + action.pk + '"><div class="card-labels"><span class="card-label card-label-';
				state_ip_html = state_ip_html + action.fields['priority'] + '">&nbsp;</span></div><div class="card-detail">';
				state_ip_html = state_ip_html + action.fields['detail'] + '</div><div class="card-member"><span class="card-member-avatar" role="button" tabindex="0" value="1" title="';
				state_ip_html = state_ip_html + member.fields['name'] + '">' + initial + '</span></div></a></div>';
			} else {
				state_td_html = state_td_html + '<div class="card-outer"><a class="card-inner" href="javascript:void(0)" pk="' + action.pk + '"><div class="card-labels"><span class="card-label card-label-';
				state_td_html = state_td_html + action.fields['priority'] + '">&nbsp;</span></div><div class="card-detail">';
				state_td_html = state_td_html + action.fields['detail'] + '</div><div class="card-member"><span class="card-member-avatar" role="button" tabindex="0" value="1" title="';
				state_td_html = state_td_html + member.fields['name'] + '">' + initial + '</span></div></a></div>';
			}
		}
		state_do_view.html(state_do_html);
		state_ip_view.html(state_ip_html);
		state_td_view.html(state_td_html);
		$('.card-outer').off().on('click', function(e){
			var action_id = $(e.toElement).attr('pk');
			action = find_action(action_id);
			$('#modify-action-detail-content').val(action.fields['detail']);
			$('#modify-action-state-content').select2('val', action.fields['state']);
			$('#modify-action-priority-content').select2('val', action.fields['priority']);
			$('#modify-action-resp-content').select2('val', action.fields['responsible']);
			$('#modify-action-id').val(action_id);
			$('#modify-action-modal').modal('show');
		});
		init_drag_and_drop();
	}

	function find_member(id){
		for(var i in kanban_members){
			if(kanban_members[i].pk == id){
				return kanban_members[i];
			}
		}
		return kanban_members[0];
	}

	function find_action(id){
		for(var i in kanban_actions){
			if(kanban_actions[i].pk == id){
				return kanban_actions[i];
			}
		}
		return kanban_actions[0];
	}

	function init_member_editable(){
		$.fn.editable.defaults.mode = 'inline';
		$('a#add-member-edit').editable({
			value: '',
			validate: function(value) {
				if($.trim(value) == '') return 'Username is required';
			}
		});
		$('a#add-member-edit').on('shown', function(e, editable) {
			editable.input.$input.val('');
			editable.input.$input.attr('placeholder', 'Full Name');
		});
		$('a#add-member-edit').on('save', function(e, params) {
			name = $.trim(params.newValue);
			if(name == ''){
				alert('empty');
				return;
			}
			add_member(name);
		});
		$('a#add-member-edit').on('hidden', function(e, reason) {
			$('a#add-member-edit').text('Add Member');
		});
	}

	function init_add_action_modal(){
		$('#add-action-resp-content').empty();
		$('#add-action-state-content').select2({
			minimumResultsForSearch: Infinity
		});
		$('#add-action-priority-content').select2({
			minimumResultsForSearch: Infinity
		});
		var data = [];
		for(var i in kanban_members){
			var member = kanban_members[i];
			data.push({'id': member.pk, 'text': member.fields['name']});
		}
		$('#add-action-resp-content').select2({data: data});
	}

	function init_modify_action_modal(){
		$('#modify-action-resp-content').empty();
		$('#modify-action-state-content').select2({
			minimumResultsForSearch: Infinity
		});
		$('#modify-action-priority-content').select2({
			minimumResultsForSearch: Infinity
		});
		var data = [];
		for(var i in kanban_members){
			var member = kanban_members[i];
			data.push({'id': member.pk, 'text': member.fields['name']});
		}
		$('#modify-action-resp-content').select2({data: data});
	}

	function on_add_action_click(){
		$('.add-button-common').on('click', function(){
			$('#add-action-detail-content').val('');
			$('#add-action-state-content').select2('val', $(this).attr('state'));
			$('#add-action-modal').modal('show');
		});
		$('#save-action-button').on('click', function(){
			var detail = $('#add-action-detail-content').val();
			var state = $('#add-action-state-content').val();
			var priority = $('#add-action-priority-content').val();
			var resp = $('#add-action-resp-content').val();

			if($.trim(detail) == ''){
				alert('action content cannot be empty');
				return;
			}
			add_action(detail, state, priority, resp);
			$('#add-action-modal').modal('hide');
		});
	}

	function on_update_action_click(){
		$('#update-action-button').on('click', function(){
			var detail = $('#modify-action-detail-content').val();
			var state = $('#modify-action-state-content').val();
			var priority = $('#modify-action-priority-content').val();
			var resp = $('#modify-action-resp-content').val();
			var action_id = $('#modify-action-id').val();

			if($.trim(detail) == ''){
				alert('action content cannot be empty');
				return;
			}
			update_action(action_id, detail, state, priority, resp);
			$('#modify-action-modal').modal('hide');
		});
	}

	function on_delete_action_click(){
		$('#delete-action-button').on('click', function(){
			var action_id = $('#modify-action-id').val();
			delete_action(action_id);
			$('#modify-action-modal').modal('hide');
		});
	}

	function init_drag_and_drop(){
		$(".card-list").dragsort("destroy");
		$(".card-list").dragsort({
			dragSelector: ".card-outer",
			dragEnd: function() {
				var action_id = $(this).find('.card-inner').attr('pk');
				var state = $(this).parent().attr('id').split('-')[1].toUpperCase();
				update_action_state(action_id, state);
			},
			dragBetween: true,
			placeHolderTemplate: '<div class="card-outer-placeholder"></div>'
		});
	}

	$(document).ready(function(){
		load_data();
		init_member_editable();
		on_add_action_click();
		on_update_action_click();
		on_delete_action_click();
	});

})();