from django.urls import path
from django.views.generic import TemplateView
from . import views

app_name = 'Fundamentals'

urlpatterns = [
    path('', TemplateView.as_view(template_name='fundamentals/companies_list.html')),
    #path('overview/', views.company_list, name='Companies'),
    #path('overview/industry=<str:industry>', views.company_list, name='Companies'),
    #path('company/<int:id>/<int:i>', views.company_single, name='Company')
]