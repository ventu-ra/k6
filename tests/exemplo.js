import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  vus: 10,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% das requisições devem responder em até 2s
    http_req_failed: ['rate<0.01'] // Menos de 1% das requisições podem falhar
  }
};

export default function () {
  const url = 'http://localhost:3333/signup';

  const randomEmail = `user${Math.floor(Math.random() * 10000000)}@test.io`;
  const payload = JSON.stringify({
    email: randomEmail,
    password: 'test123'
  });

  const headers = {
    'Content-Type': 'application/json'
  };

  const res = http.post(url, payload, { headers });

  check(res, {
    'status should be 201': (r) => r.status === 201
  });

  sleep(1);
}
