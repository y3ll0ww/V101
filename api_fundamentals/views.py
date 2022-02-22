from rest_framework.decorators import api_view
from rest_framework.response import Response

from .serializers import *


@api_view(['GET'])
def getRoutes(request):
    routes = [
        {'GET': '/api/companies'},
        {'GET': '/api/companies/industry'},
        {'GET': '/api/companies/by-id/company_id'},
        {'GET': '/api/companies/by-ticker/ticker'},
        {'GET': '/api/statements/company_key'},
        {'GET': '/api/statements/single/statement_id'},

        {'POST': '/api/users/token'},
        {'POST': '/api/users/token/refresh'},
    ]
    return Response(routes)


@api_view(['GET'])
def getCompanies(request, industry=None):
    if industry:
        companies = Companies.objects.filter(industry=first_letter_capital(industry))
    else:
        companies = Companies.objects.all()
    serializer = CompaniesSerializer(companies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getCompanyById(request, pk):
    company = Companies.objects.get(company_id=pk)
    serializer = CompaniesSerializer(company, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getCompanyByTicker(request, ticker):
    company = Companies.objects.get(ticker=ticker.upper())
    serializer = CompaniesSerializer(company, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def getStatements(request, key):
    statements = Statements.objects.filter(company_key=key).exclude(type='ROIC')
    serializer = StatementsSerializer(statements, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getStatement(request, pk):
    statement = Statements.objects.get(statement_id=pk)
    serializer = SingleStatementSerializer(statement, many=False)
    return Response(serializer.data)


def first_letter_capital(string):
    str_list = list(string)
    str_list[0] = str_list[0].upper()

    forcount = 0
    for character in str_list:
        if character in [' ', '!', '-']:
            try:
                str_list[forcount+1] = str_list[forcount+1].upper()
            except:
                continue
        forcount += 1

    return ''.join(str_list)