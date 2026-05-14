import json
import os
import urllib.request
import urllib.error


SYSTEM_PROMPT = """Ты — AI-ассистент автотехцентра «Авто Тех Центр Люблино». 
Ты помогаешь клиентам только по автомобильным темам: диагностика, ремонт, техническое обслуживание, 
замена масла, шиномонтаж, кузовные работы, запчасти, цены на услуги, запись на сервис.

Если вопрос НЕ связан с автомобилями или техцентром — вежливо откажи и перенаправь на автотему.
Отвечай на русском языке. Будь дружелюбным и профессиональным. Отвечай кратко — 2-4 предложения."""


def handler(event: dict, context) -> dict:
    """AI-ассистент автотехцентра на базе OpenRouter"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body') or '{}')
    user_message = body.get('message', '').strip()

    if not user_message:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Сообщение не может быть пустым'})
        }

    api_key = os.environ.get('OPENROUTER_API_KEY', '')

    MODELS = [
        'nousresearch/hermes-3-llama-3.1-405b:free',
        'minimax/minimax-m2.5:free',
        'meta-llama/llama-3.3-70b-instruct:free',
    ]

    result = None
    last_error = None
    for model in MODELS:
        payload_data = json.dumps({
            'model': model,
            'messages': [
                {'role': 'system', 'content': SYSTEM_PROMPT},
                {'role': 'user', 'content': user_message}
            ],
            'max_tokens': 300,
            'temperature': 0.7
        }).encode('utf-8')
        req2 = urllib.request.Request(
            'https://openrouter.ai/api/v1/chat/completions',
            data=payload_data,
            headers={
                'Authorization': f'Bearer {api_key}',
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://poehali.dev',
                'X-Title': 'Auto Tech Center'
            },
            method='POST'
        )
        try:
            with urllib.request.urlopen(req2, timeout=25) as resp:
                result = json.loads(resp.read().decode('utf-8'))
            break
        except urllib.error.HTTPError:
            continue

    if not result:
        return {
            'statusCode': 200,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'reply': 'AI-ассистент временно недоступен. Попробуйте позже или позвоните нам!'}, ensure_ascii=False)
        }

    reply = result['choices'][0]['message']['content'].strip()

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'reply': reply}, ensure_ascii=False)
    }