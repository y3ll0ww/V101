from django.shortcuts import render
from .models import Companies, Statements, StatementRows, RowData


def company_list(request, industry='all'):
    if industry == 'all':
        cs = Companies.objects.all()
        add_string = '.'
    else:
        cs = Companies.objects.filter(industry=industry)
        add_string = ' in "' + industry + '".'

    context = {
        'companies': cs,
        'industry': industry,
        'total': len(cs),
        'string': add_string,
    }
    return render(request, 'fundamentals/companies_list.html', context)


def company_single(request, id, i=0):
    types = ['Income Statement', 'Balance Sheet', 'Cash Flow Statement']

    c = Companies.objects.get(company_id=id)
    s = Statements.objects.get(company_key=id, type=types[i])
    roic = Statements.objects.get(company_key=id, type='ROIC')

    sr = []
    rd = []
    ds = []

    def get_data(statement):
        res = []
        query = StatementRows.objects.filter(statement_key=statement.statement_id).order_by('row_nr')
        for statement_row in query:
            res.append(statement_row)
        return res

    for statement_row in get_data(s):
        sr.append(statement_row)

    for statement_row in get_data(roic):
        sr.append(statement_row)

    for statement_row in sr:
        dates = []
        query = RowData.objects.filter(row_key=statement_row.row_id)
        for row_data in query:
            rd.append(row_data)
            if row_data.date not in dates:
                dates.append(row_data.date)
        ds.append(dates)

    context = {
        'company': c,
        'statement': s,
        'st_rows': sr,
        'r_data': rd,
        'dates': ds,
        'types': types,
        'roic': roic,
    }
    return render(request, 'fundamentals/company.html', context)