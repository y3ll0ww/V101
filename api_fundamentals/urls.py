from django.urls import path
from . import views
from .views import *

app_name = 'API'


urlpatterns = [
    path('', views.getRoutes, name='Router'),
    path('companies/', views.getCompanies, name='getCompanies'),
    path('companies/<str:industry>/', views.getCompanies, name='getCompaniesByIndustry'),
    path('companies/by-id/<int:pk>/', views.getCompanyById, name='getSingleCompanyById'),
    path('companies/by-ticker/<str:ticker>/', views.getCompanyByTicker, name='getSingleCompanyByTicker'),
    path('statements/<int:key>/', views.getStatements, name='getStatements'),
    path('statements/single/<int:pk>/', views.getStatement, name='getSingleStatement'),

    #path('', CompanyList.as_view(), name='CompanyList'),
    #path('list/', CompaniesSearch.as_view(), name='CompaniesSearch'),
    #path('list/<str:industry>/', CompaniesByIndustry.as_view(), name='CompaniesByIndustry'),
    #path('company/<int:pk>/', CompanySingle.as_view(), name='CompanySingle'),
    #path('statement/<int:company_key>/', StatementsList.as_view(), name='StatementsList'),
    #path('statement/<int:company_key>/<str:type>', StatementSingle.as_view(), name='StatementSingle')
]