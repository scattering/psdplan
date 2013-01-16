# Create your views here.
## adds default objects to DB
#from ... import fillDB

import hashlib,os
import types
import tempfile
import json 

import random
from numpy import NaN
from numpy import array
import numpy as np
import hmac

from django.shortcuts import render_to_response, render
from django.http import HttpResponse, HttpResponseRedirect, QueryDict
from django.utils import simplejson
#from apps.tracks.forms import languageSelectForm, titleOnlyForm, experimentForm1, experimentForm2, titleOnlyFormExperiment
from django.template import RequestContext
from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger #paging for lists
from django.core.exceptions import ObjectDoesNotExist
import cStringIO, gzip
from django.db import transaction
from django.core.mail import send_mail

## models
from django.contrib.auth.models import User 
from django.contrib.auth import authenticate, login



from django.conf import settings
#FILES_DIR=settings.FILES_DIR

def home(request):
    return render(request,'plot_test.html')