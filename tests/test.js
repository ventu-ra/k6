import http from 'k6/http';
import { check, sleep } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export let options = {
  stages: [
    { duration: '1m', target: 100 },
    { duration: '2m', target: 200 },
    { duration: '3m', target: 400 },
    { duration: '4m', target: 800 },
    { duration: '5m', target: 1200 },
    { duration: '6m', target: 1600 },
    { duration: '7m', target: 2000 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% das requisições devem responder em até 2s
    http_req_failed: ['rate<0.01'] // Menos de 1% das requisições podem falhar
  }
};

export default function () {
  const url = 'http://localhost:3333/signup'

  const payload = JSON.stringify(
    { email: `${uuidv4().substring(24)}@test.com`, password: 'pwd123' }
  )

  const headers = {
    'headers': {
      'Content-Type': 'application/json'
    }
  }
  const res = http.post(url, payload, headers)
  check(res, {
    'status should be 201': (r) => r.status === 201
  })

  sleep(1);
}

