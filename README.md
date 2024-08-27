## Development Workflow

A typical workflow for developing new features looks like this:

1. Create a new branch for the feature:

   ```bash
   git checkout -b feature/feature-name
   ```

2. Make changes to the codebase.
3. Commit your changes:

   ```bash
   git add .
   git commit -m "Commit message"
   ```

   The commit message should follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.

4. Submit a pull request to the `main` branch.
