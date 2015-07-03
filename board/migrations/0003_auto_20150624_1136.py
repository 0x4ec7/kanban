# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0002_action_priority'),
    ]

    operations = [
        migrations.AlterField(
            model_name='action',
            name='state',
            field=models.CharField(max_length=30),
        ),
    ]
