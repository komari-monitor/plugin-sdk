"use strict";

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function hasText(value) {
  if (typeof value === "string") return value.trim().length > 0;
  if (!isObject(value)) return false;
  return Object.values(value).some((item) => typeof item === "string" && item.trim());
}

function isLocalPath(value) {
  if (typeof value !== "string" || !value) return false;
  const normalized = value.replaceAll("\\", "/");
  if (normalized.startsWith("/") || /^[A-Za-z]:\//.test(normalized)) return false;
  return !normalized.split("/").some((part) => part === "..") && normalized !== ".";
}

function validateManifest(manifest) {
  const errors = [];
  if (!isObject(manifest)) return ["manifest must be an object"];

  if (!hasText(manifest.name)) errors.push("name is required");
  if (typeof manifest.short !== "string" || !/^[A-Za-z0-9_-]+$/.test(manifest.short) || manifest.short === "default") {
    errors.push("short must contain only letters, digits, '_' and '-', and cannot be 'default'");
  }
  if (manifest.entry !== undefined && !isLocalPath(manifest.entry)) {
    errors.push("entry must be a relative path inside the plugin directory");
  }
  if (manifest.icon !== undefined && manifest.icon !== "" && !isLocalPath(manifest.icon)) {
    errors.push("icon must be a relative path inside the plugin directory");
  }
  if (manifest.version !== undefined && typeof manifest.version !== "string") {
    errors.push("version must be a string");
  }
  if (manifest.komari !== undefined && typeof manifest.komari !== "string") {
    errors.push("komari must be a string");
  }

  if (manifest.configuration !== undefined) {
    if (!isObject(manifest.configuration) || manifest.configuration.type !== "managed" || !Array.isArray(manifest.configuration.data)) {
      errors.push("configuration must be a managed configuration with a data array");
    } else {
      const itemTypes = new Set(["string", "number", "select", "switch", "title", "textbox", "richtext", "nodes", "pingtasks"]);
      manifest.configuration.data.forEach((item, index) => {
        if (!isObject(item)) {
          errors.push(`configuration.data[${index}] must be an object`);
          return;
        }
        if (item.type !== "title" && item.type !== "textbox" && (typeof item.key !== "string" || !item.key.trim())) errors.push(`configuration.data[${index}].key is required`);
        if (!hasText(item.name)) errors.push(`configuration.data[${index}].name is required`);
        if (!itemTypes.has(item.type)) errors.push(`configuration.data[${index}].type is invalid`);
      });
    }
  }

  if (manifest.permissions !== undefined) {
    if (!isObject(manifest.permissions)) {
      errors.push("permissions must be an object");
    } else {
      const booleanKeys = [
        "node",
        "allowSystemRPC",
        "allowRoutes",
        "allowHooks",
        "allowHTMLInject",
        "allowExec",
        "allowListen",
        "allowAllFileAccess",
      ];
      for (const key of booleanKeys) {
        if (manifest.permissions[key] !== undefined && typeof manifest.permissions[key] !== "boolean") {
          errors.push(`permissions.${key} must be a boolean`);
        }
      }
      for (const key of ["maxHTTPBodyBytes", "maxChildOutputBytes", "timeout"]) {
        if (manifest.permissions[key] !== undefined &&
            (!Number.isInteger(manifest.permissions[key]) || manifest.permissions[key] < 0)) {
          errors.push(`permissions.${key} must be a non-negative integer`);
        }
      }
    }
  }

  if (manifest.pages !== undefined) {
    if (!Array.isArray(manifest.pages)) {
      errors.push("pages must be an array");
    } else {
      manifest.pages.forEach((page, index) => {
        const prefix = `pages[${index}]`;
        if (!isObject(page)) {
          errors.push(`${prefix} must be an object`);
          return;
        }
        if (!hasText(page.title)) errors.push(`${prefix}.title is required`);
        const type = page.type || "iframe";
        const visibility = page.visibility || "admin";
        if (type !== "iframe" && type !== "redirect") errors.push(`${prefix}.type must be iframe or redirect`);
        if (visibility !== "admin" && visibility !== "public") errors.push(`${prefix}.visibility must be admin or public`);
        if (page.icon && !isLocalPath(page.icon)) errors.push(`${prefix}.icon must be a relative path`);
        if (type === "iframe" && !isLocalPath(page.file)) errors.push(`${prefix}.file must be a relative path`);
        if (type === "redirect" && !isSafeInternalPath(page.url)) errors.push(`${prefix}.url must be a safe internal path`);
      });
    }
  }

  return errors;
}

function isSafeInternalPath(value) {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//")) return false;
  if (value.includes("\\") || /^[A-Za-z][A-Za-z0-9+.-]*:/.test(value)) return false;
  return !value.split("/").includes("..");
}

function assertValidManifest(manifest) {
  const errors = validateManifest(manifest);
  if (errors.length > 0) throw new Error(errors.join("; "));
  return manifest;
}

module.exports = { assertValidManifest, validateManifest };
