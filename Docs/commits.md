Commit Guidelines

Commit Message Structure
<type>[<deployment_area>][<scope>]: <short summary>
Blank line
Optional body (at least 20 characters)
Blank line
Optional footer

Commit Types
[feat]: New feature
[fix]: Bug fix
[docs]: Documentation update
[chore]: Maintenance task
[refactor]: Code refactoring
[test]: Testing update


Deployment Areas
[server]: Server-side changes
[client]: Client-side changes

scopes 
[auth]: Authentication changes
[config]: Configuration changes
[database]: Database changes
[deploy]: Deployment changes
[core]: Redux, Endpoints, HelperFunctions
[hooks]: Custom hooks-related changes
[types]: Custom types-related changes
[endpoints]: Endpoints-related changes
[controller]: Controller-related changes
[styles]: Themes and central/core CSS styles
[store]: Zustand and global state management
[comps]: Core application and global reusable components
[build]: Build system and dependencies changes

Commit Message Best Practices
Use imperative, present tense (e.g. "add" instead of "added")
Keep summaries short and concise
Avoid capitalization and periods at the end of summaries
Explain the motivation for the change in the body
Reference issues, PRs, or other relevant information in the footer

Examples
feat[server][endpoints]: add API endpoint for user authentication

fix[client][auth]: fix issue with client-side validation

refactor[server][database]: improve server performance by optimizing database queries

chore[client][build]: update client dependencies to latest versions