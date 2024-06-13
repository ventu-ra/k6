import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '1s', target: 100 },
    { duration: '2s', target: 200 },
    { duration: '3s', target: 400 },
    { duration: '4s', target: 800 },
    { duration: '5s', target: 1200 },
    { duration: '6s', target: 1600 },
    { duration: '7s', target: 2000 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'], // 95% das requisições devem responder em até 2s
    http_req_failed: ['rate<0.01'] // Menos de 1% das requisições podem falhar
  }
};

export default function () {
  let res = http.get('http://localhost:3333/signup');
  check(res, { 'status was 200': (r) => r.status == 200 });
  sleep(1);
}
