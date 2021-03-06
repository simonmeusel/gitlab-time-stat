const axios = require('axios')
const process = require('process')

// Get token from environment
const token = process.env.GITLAB_TIME_STAT_TOKEN

// Get api base url
let base = 'https://gitlab.com/api/v4/'
if (process.env.hasOwnProperty('GITLAB_TIME_STAT_BASE')) {
  base = process.env.GITLAB_TIME_STAT_BASE
}

module.exports = {
  /**
   * Create an authenticated request to gitlab
   * @param  {string} path Path to be appended to the base url
   * @param  {[type]} options Options for the request
   * @return {[type]} Request
   */
  createRequest: function (path, options) {
    return axios.get(base + path, {
      params: Object.assign({
        private_token: token
      }, options)
    })
  },
  getProjects: function (options) {
    return this.createRequest('projects', options)
  },
  getIssuesOfProject: function (projectId, options) {
    return this.createRequest('projects/' + encodeURIComponent(projectId) + '/issues', options)
  },
  getTimeStatsOfIssue: function (projectId, issueIid) {
    return this.createRequest('projects/' + encodeURIComponent(projectId) + '/issues/' + issueIid + '/time_stats')
  },
  /**
   * Gets the time spent on a gitlab project
   * @param  {number | string} projectId Id of project or namespaced path
   * @param  {[type]} options
   * @return {Promise} Time spent on project
   */
  getTimeSpentOnProject: function (projectId, options) {
    return new Promise((resolve, reject) => {
      this.getIssuesOfProject(projectId, options)
      .then((issues) => {
        issues = issues.data
        let time = 0
        let pending = issues.length
        if (pending === 0) resolve(0)
        for (const issue of issues) {
          this.getTimeStatsOfIssue(projectId, issue.iid)
          .then((stats) => {
            time += stats.data.total_time_spent
            pending--
            if (pending === 0) {
              resolve(time)
            }
          })
          .catch((error) => {
            reject(error)
          })
        }
      })
      .catch(function (error) {
        reject(error)
      })
    })
  }
}
