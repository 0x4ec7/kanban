from django.conf.urls import patterns, url

from board import views

urlpatterns = patterns('',
	url(r'^$', views.index, name='index'),
	url(r'^ajax_get_members$', views.ajax_get_members, name='ajax_get_members'),
	url(r'^ajax_get_actions$', views.ajax_get_actions, name='ajax_get_actions'),
	url(r'^ajax_remove_member$', views.ajax_remove_member, name='ajax_remove_member'),
	url(r'^ajax_add_member$', views.ajax_add_member, name='ajax_add_member'),
	url(r'^ajax_add_action$', views.ajax_add_action, name='ajax_add_action'),
	url(r'^ajax_update_action$', views.ajax_update_action, name='ajax_update_action'),
	url(r'^ajax_update_action_state$', views.ajax_update_action_state, name='ajax_update_action_state'),
	url(r'^ajax_delete_action$', views.ajax_delete_action, name='ajax_delete_action'),
)