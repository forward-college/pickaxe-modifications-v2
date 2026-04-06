//Main setup

const params = new URL(document.currentScript.src).searchParams;
const hub = params.get("hub");

const owner = "forward-college";
const repo = "pickaxe-modifications-v2";
const fileBase = `https://${owner}.github.io/${repo}/${hub}/`;

/** Build URL for a path under the hub (handles spaces in folder names). */
function hubAssetUrl(relativePath) {
  const normalized = String(relativePath).replace(/\\/g, "/");
  return (
    fileBase +
    normalized
      .split("/")
      .map((segment) => encodeURIComponent(segment))
      .join("/")
  );
}

if (!hub) {
  console.error(
    "pickaxe-modifications: missing ?hub= query (e.g. students or staff)"
  );
} else {
  (async () => {
    const res = await fetch(hubAssetUrl("manifest.json"));
    if (!res.ok) {
      console.error(
        "pickaxe-modifications: manifest.json failed",
        res.status,
        res.statusText
      );
      return;
    }

    let manifest;
    try {
      manifest = await res.json();
    } catch (e) {
      console.error("pickaxe-modifications: invalid manifest.json", e);
      return;
    }

    const cssList = Array.isArray(manifest.css) ? manifest.css : [];
    const jsList = Array.isArray(manifest.js) ? manifest.js : [];

    for (const file of cssList) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = hubAssetUrl(file);
      document.head.appendChild(link);
    }

    for (const file of jsList) {
      const script = document.createElement("script");
      script.src = hubAssetUrl(file);
      document.body.appendChild(script);
    }
  })();
}
