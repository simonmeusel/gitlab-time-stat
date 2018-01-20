# gitlab-time-stat
See the sum of the time spent on all your issues

## Installation

Install the module globally:

```
$ npm install -g gitlab-time-stat
```

Then get yourself an access token with api permissions at [gitlab.com](https://gitlab.com/profile/personal_access_tokens).
Set it as an environment variable:

```
$ export GITLAB_TIME_STAT_TOKEN=xxxxxxxxxxxxxxxxxx_x
```

(Maybe put at the end of your `.bashrc` file, else you have to execute in every shell)

## Usage

### Using namespaced path (recommended)

```
$ gitlab-time-stat projecttime  <path> [options]
```

Example:

```
$ gitlab-time-stat projecttime  simonmeusel/git-test '{"per_page": 100}'
```

### Using id

Get your Project's id with:

```
$ gitlab-time-stat projects [options]
```

Optional: `options` is a JSON formatted object following [those attributes](https://docs.gitlab.com/ce/api/projects.html#list-projects)

Example:

```
$ gitlab-time-stat projects '{"search": "My Project", "owned": true}'
```

Continue once you have your project's id.

Get the time spent on your project with:

```
$ gitlab-time-stat projecttime  <id> [options]
```

Required: `id` is your projects id

Optional: `options` are the options to filter the issues

Example:

```
$ gitlab-time-stat projecttime 1234567 '{"per_page": 100}'
```
