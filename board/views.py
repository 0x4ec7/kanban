from django.shortcuts import render
from django.http import HttpResponse, Http404
from django import template
from django.core import serializers

from board.models import *

def index(req):
	context = {}
	resp = render(req, 'board/index.html', context)
	return resp
 
def ajax_get_members(req):
	members = Member.objects.all().order_by('name')
	resp = serializers.serialize("json", members)
	return HttpResponse(resp)

def ajax_get_actions(req):
	actions = Action.objects.all().order_by('state', 'priority', '-created_at')
	resp = serializers.serialize("json", actions)
	return HttpResponse(resp)

def ajax_remove_member(req):
	id = req.POST['id'].strip()
	try:
		member = Member.objects.get(pk=id)
		member.delete()
	except Exception as e:
		return HttpResponse(False)

	return HttpResponse(True)

def ajax_add_member(req):
	name = req.POST['name'].strip()
	try:
		member = Member()
		member.name = name
		member.save()
	except Exception as e:
		return HttpResponse(False)

	return HttpResponse(True)

def ajax_add_action(req):
	detail = req.POST['detail']
	state = req.POST['state']
	priority = req.POST['priority']
	resp = req.POST['resp']

	try:
		action = Action()
		action.detail = detail
		action.state = state
		action.priority = priority
		action.responsible_id = resp
		action.save()
	except Exception as e:
		return HttpResponse(e)
	
	return HttpResponse(True)

def ajax_update_action(req):
	action_id = req.POST['action_id']
	detail = req.POST['detail']
	state = req.POST['state']
	priority = req.POST['priority']
	resp = req.POST['resp']

	try:
		action = Action.objects.get(pk=action_id)
		action.detail = detail
		action.state = state
		action.priority = priority
		action.responsible_id = resp
		action.save()
	except Exception as e:
		return HttpResponse(e)
	
	return HttpResponse(True)

def ajax_update_action_state(req):
	action_id = req.POST['action_id']
	state = req.POST['state']

	try:
		action = Action.objects.get(pk=action_id)
		action.state = state
		action.save()
	except Exception as e:
		return HttpResponse(e)
	
	return HttpResponse(True)

def ajax_delete_action(req):
	action_id = req.POST['action_id']

	try:
		action = Action.objects.get(pk=action_id)
		action.delete()
	except Exception as e:
		return HttpResponse(e)
	
	return HttpResponse(True)
