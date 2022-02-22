from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    #path('', include('app_fundamentals.urls'), name='Fundamentals'),
    path('api/', include('api_fundamentals.urls'), name='API'),
    path('', TemplateView.as_view(template_name='index.html')),
]
