from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Locacao
from ..serializers.locacao import LocacaoSerializer
from django.core.exceptions import ObjectDoesNotExist


@api_view(['GET'])
def indexLocacoes(request):
    Locacaos = Locacao.objects.all()
    serializer = LocacaoSerializer(Locacaos, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def showLocacao(request, pk):
    try:
        locacao = Locacao.objects.get(pk=pk)
        serializer = LocacaoSerializer(locacao)
        return Response(serializer.data)
    except ObjectDoesNotExist:
        return Response({'error': 'Locacao not found'}, status=404)


@api_view(['POST'])
def addLocacao(request):
    serializer = LocacaoSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)


@api_view(['PUT'])
def updateLocacao(request, pk):
    try:
        locacao = Locacao.objects.get(pk=pk)
        serializer = LocacaoSerializer(locacao, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(serializer.errors, status=400)
    except ObjectDoesNotExist:
        return Response({'error': 'Locacao not found'}, status=404)


@api_view(['DELETE'])
def deleteLocacao(request, pk):
    try:
        locacao = Locacao.objects.get(pk=pk)
        locacao.delete()
        return Response(status=204)
    except Locacao.DoesNotExist:
        return Response({'error': 'Locacao not found'}, status=404)
