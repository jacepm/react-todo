import axios from 'axios';
import { environment } from '../environments';

const api = environment.API_URL;

export function get(uri: string) {
  return axios.get(api + uri);
}

export function getById(uri: string) {
  return axios.get(api + uri);
}

export function create(uri: string, body: any) {
  return axios.post(api + uri, body);
}

export function replace(uri: string, body: any) {
  return axios.put(api + uri, body);
}

export function update(uri: string, body: any) {
  return axios.patch(api + uri, body);
}

export function remove(uri: string) {
  return axios.delete(api + uri);
}
