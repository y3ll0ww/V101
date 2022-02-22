from django.contrib import admin

# Register your models here.
from .models import Companies, GrowthRates, Roic, RowData, StatementRows, Statements

admin.site.register(Companies)
admin.site.register(GrowthRates)
admin.site.register(Roic)
admin.site.register(RowData)
admin.site.register(StatementRows)
admin.site.register(Statements)