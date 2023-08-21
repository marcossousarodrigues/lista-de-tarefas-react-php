
import axios from 'axios'
const urlDeploy = 'https://tasks.marcosrodrigues.net/backend/';
const urlLocal = 'http://localhost/project-marcos/marcos/app/projects/tasks/';
const url = urlDeploy;

export default axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }
});