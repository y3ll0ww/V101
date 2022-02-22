# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Companies(models.Model):
    company_id = models.AutoField(primary_key=True, blank=True, null=False)
    ticker = models.CharField(max_length=10)
    name = models.CharField(max_length=45)
    industry = models.CharField(blank=True, null=True, max_length=30)

    def __str__(self):
        return str(self.name) + ' (' + str(self.ticker) + ')'

    class Meta:
        #managed = False
        db_table = 'companies'
        app_label = 'app_fundamentals'


class GrowthRates(models.Model):
    growth_rate_id = models.AutoField(primary_key=True, blank=True, null=False)
    company_key = models.ForeignKey(Companies, models.DO_NOTHING, db_column='company_key', blank=True, null=True)
    priority = models.IntegerField(blank=True, null=True)
    growth_rate = models.CharField(max_length=25)
    number_3y = models.DecimalField(db_column='3Y', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. Field renamed because it wasn't a valid Python identifier. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    number_5y = models.DecimalField(db_column='5Y', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. Field renamed because it wasn't a valid Python identifier. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    number_10y = models.DecimalField(db_column='10Y', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. Field renamed because it wasn't a valid Python identifier. max_digits and decimal_places have been guessed, as this database handles decimal fields as float
    number_15y = models.DecimalField(db_column='15Y', max_digits=10, decimal_places=5, blank=True, null=True)  # Field name made lowercase. Field renamed because it wasn't a valid Python identifier. max_digits and decimal_places have been guessed, as this database handles decimal fields as float

    def __str__(self):
        return str(self.growth_rate) + ' (CID:' + str(self.company_key) + ')'

    class Meta:
        #managed = False
        db_table = 'growth_rates'
        app_label = 'app_fundamentals'


class Roic(models.Model):
    roic_id = models.AutoField(primary_key=True, blank=True, null=False)
    company_key = models.ForeignKey(Companies, models.DO_NOTHING, db_column='company_key', blank=True, null=True)
    date = models.DateField()
    roic = models.DecimalField(max_digits=10, decimal_places=5, blank=True, null=True)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float

    def __str__(self):
        return str(self.roic_id) + ' (CID:' + str(self.company_key) + ')'

    class Meta:
        #managed = False
        db_table = 'roic'
        app_label = 'app_fundamentals'


class RowData(models.Model):
    row_data_id = models.AutoField(primary_key=True, blank=True, null=False)
    row_key = models.ForeignKey('StatementRows', models.DO_NOTHING, db_column='row_key', blank=True, null=True)
    date = models.DateField()
    amount = models.DecimalField(max_digits=20, decimal_places=5, blank=True, null=True)  # max_digits and decimal_places have been guessed, as this database handles decimal fields as float

    def __str__(self):
        return str(self.row_data_id)

    class Meta:
        #managed = False
        db_table = 'row_data'
        app_label = 'app_fundamentals'


class StatementRows(models.Model):
    row_id = models.AutoField(primary_key=True, blank=True, null=False)
    statement_key = models.ForeignKey('Statements', models.DO_NOTHING, db_column='statement_key', blank=True, null=True)
    data_item = models.TextField()
    row_nr = models.IntegerField()
    style = models.CharField(blank=True, null=True, max_length=10)

    def __str__(self):
        return str(self.data_item) + ' (SID:' + str(self.statement_key) + ')'

    class Meta:
        #managed = False
        db_table = 'statement_rows'
        app_label = 'app_fundamentals'


class Statements(models.Model):
    statement_id = models.AutoField(primary_key=True, blank=True, null=False)
    company_key = models.ForeignKey(Companies, models.DO_NOTHING, db_column='company_key', blank=True, null=True)
    type = models.CharField(max_length=30)
    multiplier = models.CharField(max_length=45)

    def __str__(self):
        return str(self.statement_id) + ': ' + str(self.type) + ' (CID:' + str(self.company_key) + ')'

    class Meta:
        #managed = False
        db_table = 'statements'
        app_label = 'app_fundamentals'
