from django.db import models

class Member(models.Model):
	name = models.CharField(max_length=30)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.name

class State(models.Model):
	name = models.CharField(max_length=30)
	order = models.IntegerField(default=1)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.name

class Action(models.Model):
	detail = models.TextField(default='')
	responsible = models.ForeignKey(Member)
	state = models.CharField(max_length=30)
	priority = models.SmallIntegerField(default=1)
	updated_at = models.DateTimeField(null=True, blank=True)
	created_at = models.DateTimeField(auto_now_add=True)

	def __str__(self):
		return self.detail
	