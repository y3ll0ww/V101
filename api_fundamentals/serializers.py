from rest_framework import serializers
from app_fundamentals.models import *


class CompaniesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Companies
        fields = ('company_id', 'ticker', 'name', 'industry')


class StatementsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Statements
        fields = ('statement_id', 'company_key', 'type', 'multiplier')


class RowDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = RowData
        fields = ('row_data_id', 'date', 'amount')


class StatementRowsSerializer(serializers.ModelSerializer):
    data = serializers.SerializerMethodField()

    class Meta:
        model = StatementRows
        fields = ('row_id', 'data_item', 'row_nr', 'style', 'data')

    def get_data(self, obj):
        data = obj.rowdata_set.all()
        serializer = RowDataSerializer(data, many=True)
        return serializer.data


class SingleStatementSerializer(serializers.ModelSerializer):
    #company_key = CompaniesSerializer(many=False)
    rows = serializers.SerializerMethodField()

    class Meta:
        model = Statements
        fields = ('statement_id', 'company_key', 'type', 'multiplier', 'rows')

    def get_rows(self, obj):
        rows = obj.statementrows_set.all()
        serializer = StatementRowsSerializer(rows, many=True)
        return serializer.data