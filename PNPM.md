# Common PNPM Tasks

Below is a comprehensive list of common tasks you can perform with `pnpm`, along with the command line examples for each task.

---

## 1. Initialize a New Project

Creates a new interactive `package.json` file.

```bash
pnpm init
```

---

## 2. Install All Project Dependencies

Installs the packages listed in your `package.json`.

```bash
pnpm install
```

---

## 3. Add a New Dependency

Installs and adds a package to your project's dependencies.

```bash
pnpm add <package-name>
```

---

## 4. Add a Development Dependency

Installs and adds a package to the `devDependencies` section.

```bash
pnpm add <package-name> --save-dev
```

Alternatively, use the shorthand flag:

```bash
pnpm add <package-name> -D
```

---

## 5. Remove a Dependency

Uninstalls a package and removes it from your `package.json`.

```bash
pnpm remove <package-name>
```

---

## 6. Update Dependencies

- **Update a Specific Package:**
  ```bash
  pnpm update <package-name>
  ```
- **Update All Packages:**
  ```bash
  pnpm update
  ```

---

## 7. Run a Script

Executes a script defined in your `package.json` (e.g., starting a development server).

```bash
pnpm run <script-name>
```

For example, to run a development server:

```bash
pnpm run dev
```

---

## 8. List Installed Packages

Displays the dependency tree of installed packages.

```bash
pnpm ls
```

---

## 9. Check for Outdated Packages

Lists packages that have newer versions available.

```bash
pnpm outdated
```

---

## 10. Execute Package Binaries

Temporarily runs a package binary without installing it globally (similar to `npx`).

```bash
pnpm dlx <command>
```

---

## 11. Rebuild Native Add-ons

Rebuilds any native modules, which can be useful after updates.

```bash
pnpm rebuild
```

---

## 12. Audit Dependencies

Checks your project's dependencies for known security vulnerabilities.

```bash
pnpm audit
```

---

## 13. Investigate Package Reasons

Displays why a package is installed and its dependency chain.

```bash
pnpm why <package-name>
```

---

## 14. Prune Unused Dependencies

Removes extraneous packages that are not referenced in your `package.json`.

```bash
pnpm prune
```
