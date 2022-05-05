from django.http import HttpRequest
from django.shortcuts import render,redirect
from bitrix24 import *


def indexQuiz(request):
    webhook = "https://novoedelo.bitrix24.ru/rest/16/eau4zk2xdxmrk5xs/"
    b = Bitrix24(webhook)
    print()
    if request.POST:
        addLead = b.callMethod(
            "crm.lead.add",
            fields={
                "TITLE": "Заявка из Квиза",
                "NAME": request.POST['FIO'],
                "STATUS_ID": "NEW",
                "OPENED": "Y",
                "PHONE": [{"VALUE": request.POST['Phone'], "VALUE_TYPE": "WORK"}],
                "SOURCE_DESCRIPTION":"Заявка с квиза",
                "UF_CRM_1640528064":request.POST['1'],
                "UF_CRM_1651668632":request.POST['2'],
                "UF_CRM_1651668762":request.POST['3'],
                "UF_CRM_1625646672":request.POST['4'],
                "UF_CRM_1651668913":request.POST['5'],
                "UF_CRM_1651668959":request.POST['6'],
                "UF_CRM_1594896052079":request.POST['9'],
                "UTM_SOURCE": request.GET.get('utm_source', ''),
                "UTM_MEDIUM": request.GET.get('utm_medium', ''),
                "UTM_CONTENT": request.GET.get('utm_content', ''),
                "UTM_CAMPAIGN": request.GET.get('utm_campaign', ''),
                "UTM_TERM": request.GET.get('utm_term', ''),
            }
        )
        return redirect("/ths")
    else:
        return render(request, "quizPage/index.html")

def thsQuiz(request):
    return render(request, "quizPage/ths.html")



