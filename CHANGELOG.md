# Changelog

This changelog records changes after v0.5.1.

## v0.5.2dev

- use boolean instead of male/female to store sex
- please migrate your database before upgrading :

```bash
node server/migrate/migratetov0.5.2.js
```

## v0.5.2dev-patch1

- patch profile not being able to display sex

## v0.5.2dev1

- minor changes to api
- patch thread creation

## v0.5.2dev2

- adopt a more modern design for menu thread

## v0.5.2dev3

- use "now" for time less than a minute

## v0.5.2dev4

- menu thread changes color on hover

## v0.5.3rc1

- menu thread use a lighter color if selected
- add user name to profile user information
