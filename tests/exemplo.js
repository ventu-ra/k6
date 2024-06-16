import http from 'k6/http';
import { check, sleep } from 'k6';
import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';

export const options = {
  stages: [
    { duration: '2s', target: 100 }, // traffic ramp-up from 1 to 1000 users over 2 minutes.
    { duration: '10s', target: 100 }, // stay at 1000 users for 30 minutes
    { duration: '2s', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% das requisições devem responder em até 2s
    http_req_failed: ['rate<0.01'] // Menos de 1% das requisições podem falhar
  }
};

export default function () {
  const url = 'http://localhost:3333/signup';

  const payload = JSON.stringify({
    email: `test${uuidv4}@test.io`,
    password: 'test123'
  });
  // console.log(`email:${payload}`);

  const headers = {
    // 'Content-Type': 'application/json'
    'Content-Type': 'application/json'
  };

  const res = http.post(url, payload, { headers });

  check(res, {
    'status should be 201': (r) => r.status === 201
  });

  sleep(1);
}
